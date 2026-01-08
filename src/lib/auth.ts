import Cookies from 'js-cookie';
import api from './axios';
import axios from 'axios';
// const ACCESS_TOKEN_KEY = 'accessToken';

// // Set token in cookie (expires in 7 days by default)
// export const setToken = (token: string) => {
//   Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7 });
// };

// // Get token from cookie
// export const getToken = (): string | undefined => {
//   return Cookies.get(ACCESS_TOKEN_KEY);
// };

// // Remove token from cookie
// export const clearToken = () => {
//   Cookies.remove(ACCESS_TOKEN_KEY);

// };

// // Check if user is authenticated
// export const isAuthenticated = (): boolean => {
//   return !!getToken();
// };


// lib/auth.ts

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

/**
 * Save tokens in localStorage
 */
export function saveTokens(access: string, refresh: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
}

/**
 * Get access token from localStorage
 */
export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get refresh token from localStorage
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
      { refresh }
    );

    saveTokens(res.data.access, refresh);
    return res.data.access;
  } catch {
    clearTokens();
    return null;
  }
}
/**
 * Remove tokens (logout)
 */
export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAccessToken();
  return token !== null && token !== undefined;
}


/**
 * Register a new user
 */
export async function registerUser(userData: {
  username: string;
  email: string;
  password: string;
  password2: string;
  role: 'developer' | 'reporter';
  first_name: string;
  bio?: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await api.post("/auth/register/",
      userData
    );
    
    // If registration returns tokens, save them
    if (res.data.access && res.data.refresh) {
      saveTokens(res.data.access, res.data.refresh);
      return { success: true, data: res.data };
    }
    
    return { success: true, data: res.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle validation errors from backend
      if (error.response?.data) {
        return { 
          success: false, 
          error: formatValidationErrors(error.response.data) 
        };
      }
    }
    return { 
      success: false, 
      error: "Registration failed. Please try again." 
    };
  }
}

/**
 * Format validation errors from Django REST Framework
 */
function formatValidationErrors(errorData: any): string {
  if (typeof errorData === 'string') {
    return errorData;
  }
  
  if (Array.isArray(errorData)) {
    return errorData.join(', ');
  }
  
  if (typeof errorData === 'object') {
    const messages: string[] = [];
    
    for (const [field, errors] of Object.entries(errorData)) {
      if (Array.isArray(errors)) {
        messages.push(`${field}: ${errors.join(', ')}`);
      } else if (typeof errors === 'string') {
        messages.push(`${field}: ${errors}`);
      }
    }
    
    return messages.join('; ');
  }
  
  return "Registration failed";
}