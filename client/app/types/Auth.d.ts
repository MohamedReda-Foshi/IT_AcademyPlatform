// types/Auth.ts

// what your register endpoint actually returns:
export interface RegisterResponse {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    // usually you don’t send the password back!
  }
  
  // what your login endpoint returns (example):
  export interface LoginResponse {
    token: string;
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }
  