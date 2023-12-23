import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js"

// description login user
//route POST /api/users/login
//access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
   generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    res.json({ error: "invalid email or password" });
  }
});

// description register user
//route POST /api/users
//access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

// description logout user
//route POST /api/users/logout
//access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully !" });
});

// description get user profile
//route GET /api/users/profile
//access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  

// description update user profile
//route PUT /api/users/profile
//access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

// ADMIN CONTROLLERS

// description get all users
//route GET /api/users
//access private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// description get user bu ID
//route GET /api/users/:id
//access private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get one user");
});

// description delete user
//route DELETE /api/users/:id
//access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// description upadte user
//route PUT /api/users/:id
//access private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
