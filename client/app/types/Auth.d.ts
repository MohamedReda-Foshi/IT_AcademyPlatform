// types/Auth.ts

// what your register endpoint actually returns:
export interface RegisterResponse {
    _id: string;
    FirtName: string;
    LastName: string;
    Email: string;
    Role: string;
    ImageURL: string;
    Pyament: string;
    // usually you don’t send the password back!
  }
  export interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    provider: string;
    image: string;
    Pyament: string;
    about:string
    // usually you don’t send the password back!
  }
  
  // what your login endpoint returns (example):
  export interface LoginResponse {
    token: string;
    user: {
      _id: string;
      FirtName: string;
      LastName: string;
      Email: string;
      ImageURL: string;
      Role: string;
      Pyament: string;
    };
  }
  