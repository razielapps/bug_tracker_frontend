import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getAccessToken, clearTokens, refreshAccessToken } from './auth';

interface AxiosRetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Added timeout for better error handling
});

// Type for failed queue items
type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (err: any) => void;
};

// Global state for token refresh
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

/**
 * Process all queued requests after token refresh
 */
const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

/* -------------------- REQUEST INTERCEPTOR -------------------- */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* -------------------- RESPONSE INTERCEPTOR -------------------- */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRetryConfig;
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // If refresh is already in progress, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject: (err: any) => {
              reject(err);
            },
          });
        });
      }
      
      // Mark request as retried and start refresh process
      originalRequest._retry = true;
      isRefreshing = true;
      
      try {
        // Attempt to refresh the access token
        const newToken = await refreshAccessToken();
        
        if (!newToken) {
          throw new Error('Refresh failed: No token returned');
        }
        
        // Process queued requests with new token
        processQueue(null, newToken);
        
        // Update the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        
        // Retry the original request
        return api(originalRequest);
        
      } catch (refreshError) {
        // Clear tokens and redirect to login on refresh failure
        processQueue(refreshError, null);
        clearTokens();
        
        // Only redirect on client side
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
        
      } finally {
        isRefreshing = false;
      }
    }
    
    // For non-401 errors or already retried requests
    return Promise.reject(error);
  }
);

export default api;