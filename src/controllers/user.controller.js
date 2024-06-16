import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ userId });
  if (userExists) {
    throw new ApiError(400, "User already exists | Give unique user ID");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    userId,
    password: encryptedPassword,
    passwordExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
