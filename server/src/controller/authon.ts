import asyncHandler from 'express-async-handler';
import { register } from '../services/adminServices';

interface RegisterParams {
  firstNameUser: string;
  lastName: string;
  email: string;
  password: string;
  adminname: string;
}

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const userData: RegisterParams = {
      firstNameUser: req.body.firstNameUser,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      adminname: req.body.adminname,
    };

    console.log(req.body);

    const data = await register(userData);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

