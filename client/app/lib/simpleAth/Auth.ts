import axios from 'axios';

// Your backend URL


interface RegisterFormData {
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  email: string;
  password: string;
}

interface AuthResponseData {
  message: string;
  token?: string;
  user?: {
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

// Function to register a new user
export async function registerUser(formData: RegisterFormData): Promise<AuthResponse> {
  try {
    // Make a POST request to your backend endpoint
    const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/register`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // If successful, return the response
    console.log('Registration successful:', response.data);
    return {
      ok: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Return error information
    return {
      ok: false,
      data: error.response?.data || { message: 'Network error occurred' },
      status: error.response?.status || 500
    };
  }
}

// Function to log in a user
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    // Make a POST request to your backend login endpoint
    const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // If login is successful, store the token in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    console.error('Login error:', response.data);
    return {
      ok: true,
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    console.error('Login error:', error);
    
    return {
      ok: false,
      data: error.response?.data || { message: 'Network error occurred' },
      status: error.response?.status || 500
    };
  }
}

// In your @/app/lib/auth/simpleAth/Auth file
export const createUser = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    return {
      ok: response.ok,
      data,
      status: response.status
    };
  } catch (error) {
    console.error('Create user error:', error);
    return {
      ok: false,
      data: { message: 'Network error' },
      status: 500
    };
  }
};

// Helper function to get auth token (for authenticated requests)
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}
