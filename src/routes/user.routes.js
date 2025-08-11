import express from "express";
import UserController from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isAuthMiddleware } from "../middleware/isAuth.middleware.js";

const userRouter = express.Router();

// User registration
userRouter.post("/signUp", asyncHandler(UserController.signUpAsUser));

// User login
userRouter.post("/login", asyncHandler(UserController.loginUser));

// User logout
userRouter.post("/logout",isAuthMiddleware, asyncHandler(UserController.logoutUser));

export default userRouter;