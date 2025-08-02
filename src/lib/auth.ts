import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';

// Set token in cookie (expires in 7 days by default)
export const setToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7 });
};

// Get token from cookie
export const getToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

// Remove token from cookie
export const clearToken = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};
