import Admin from "../models/admin.model.js";
import joi from "joi";
import { ApiError } from "../utils/ApiError.js";
import { generateTokens } from "../utils/tokenUtils.js";

class AdminController {
  async signUpAdmin(req, res, next) {
    const schema = joi.object({
      regNumber: joi.string().alphanum().required(),
      fullName: joi.string().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) throw new ApiError(400, "Validation Failed", error.details);

    const { regNumber, fullName, email, password } = value;

    try {
      const existing = await Admin.findOne({ $or: [{ email }, { regNumber }] });
      if (existing) throw new ApiError(409, "Admin already exists");

      const newAdmin = await Admin.create({ regNumber, fullName, email, password });
      const { accessToken, refreshToken } = generateTokens(newAdmin);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        admin: {
          id: newAdmin._id,
          fullName: newAdmin.fullName,
          email: newAdmin.email,
          regNumber: newAdmin.regNumber
        }
      });
    } catch (err) {
      next(err);
    }
  }
  async loginAdmin(req, res, next) {
    const schema = joi.object({
      regNumber: joi.string().required(),
      password: joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) throw new ApiError(400, "Validation Failed", error.details);

    const { regNumber, password } = value;

    try {
      const admin = await Admin.findOne({ regNumber });
      if (!admin) throw new ApiError(404, "Admin not found");

      const isValid = await admin.isPasswordCorrect(password);
      if (!isValid) throw new ApiError(401, "Invalid credentials");

      const { accessToken, refreshToken } = generateTokens(admin);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        admin: {
          id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          regNumber: admin.regNumber
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async logoutAdmin(req, res, next) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.status(200).json({
        success: true,
        message: "Logout successful"
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new AdminController();