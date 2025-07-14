import express from "express";
import UserController from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isAuth } from "../middleware/isAuth.js";

const userRouter = express.Router();

// User registration
userRouter.post("/signUp", asyncHandler(UserController.signUpAsUser));

// User login
userRouter.post("/login", asyncHandler(UserController.loginUser));

// User logout
userRouter.post("/logout",isAuth,asyncHandler(UserController.logoutUser));

export default userRouter;