{/*import asyncHandler from 'express-async-handler';

interface RegisterParams {
  firstNameUser: string;
  lastName: string;
  email: string;
  password: string;
  adminName: string;
}

export const register = asyncHandler(async (req, res) => {
  try {
    const userData: RegisterParams = {
      firstNameUser: req.body.firstNameUser,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      adminName: req.body.adminName,
    };

    console.log(req.body);

    const data = await register(userData);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

*/}