import axios, { AxiosError } from 'axios';

// Your backend URL
const BACKEND_URL = 'http://localhost:8000';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  role: 'user';
  email: string;
  password: string;
}

interface AuthResponseData {
  message: string;
  token?: string;
  user?: {
    id?: string;
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

interface AuthResponse {
  ok: boolean;
  data: AuthResponseData;
  status: number;
}

interface SessionData {
  user: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  isExpired: boolean;
}

// Function to register a new user
export async function registerUser(formData: RegisterFormData): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/register`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Registration successful:', response.data);
    return {
      ok: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthResponseData>;
      return {
        ok: false,
        data: axiosError.response?.data || { message: 'Registration failed' },
        status: axiosError.response?.status || 500
      };
    }
    
    return {
      ok: false,
      data: { message: 'Network error occurred' },
      status: 500
    };
  }
}

// Function to log in a user
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/login`, 
      { email, password }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    // If login is successful, store the token in localStorage
    if (response.data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.data.token);
      }
    }
    
    console.log('Login successful:', response.data);
    return {
      ok: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Login error:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthResponseData>;
      return {
        ok: false,
        data: axiosError.response?.data || { message: 'Login failed' },
        status: axiosError.response?.status || 500
      };
    }
    
    return {
      ok: false,
      data: { message: 'Network error occurred' },
      status: 500
    };
  }
}

// Helper function to get auth token (for authenticated requests)
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid token format');
    }
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Helper function to check if token is expired
function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
}

// Main function to get current session data
export function getSession(): SessionData {
  if (typeof window === 'undefined') {
    // Server-side rendering - no localStorage access
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isExpired: false
    };
  }

  const token = getAuthToken();
  
  if (!token) {
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isExpired: false
    };
  }

  const isExpired = isTokenExpired(token);
  
  if (isExpired) {
    // Clean up expired token
    localStorage.removeItem('authToken');
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isExpired: true
    };
  }

  // Decode token to get user data
  const decoded = decodeJWT(token);
  
  if (!decoded) {
    // Invalid token
    localStorage.removeItem('authToken');
    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isExpired: false
    };
  }

  return {
    user: {
      id: decoded.id || decoded.userId || decoded._id,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      role: decoded.role,
    },
    token,
    isAuthenticated: true,
    isExpired: false
  };
}

// Function to logout user
export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  const session = getSession();
  return session.isAuthenticated;
}

// Function to get user info only
export function getCurrentUser() {
  const session = getSession();
  return session.user;
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000, // 10 seconds timeout
});

// Axios interceptor to automatically add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        // Optionally redirect to login page
        // window.location.href = '/auth/Login';
      }
    }
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export { apiClient };

// Alternative functions using the configured axios instance
export async function registerUserWithClient(formData: RegisterFormData): Promise<AuthResponse> {
  try {
    const response = await apiClient.post('/user/register', formData);
    
    console.log('Registration successful:', response.data);
    return {
      ok: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthResponseData>;
      return {
        ok: false,
        data: axiosError.response?.data || { message: 'Registration failed' },
        status: axiosError.response?.status || 500
      };
    }
    
    return {
      ok: false,
      data: { message: 'Network error occurred' },
      status: 500
    };
  }
}

export async function loginUserWithClient(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await apiClient.post('/user/login', { email, password });
    
    // If login is successful, store the token in localStorage
    if (response.data.token && typeof window !== 'undefined') {
      localStorage.setItem('authToken', response.data.token);
    }
    
    console.log('Login successful:', response.data);
    return {
      ok: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('Login error:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AuthResponseData>;
      return {
        ok: false,
        data: axiosError.response?.data || { message: 'Login failed' },
        status: axiosError.response?.status || 500
      };
    }
    
    return {
      ok: false,
      data: { message: 'Network error occurred' },
      status: 500
    };
  }
}