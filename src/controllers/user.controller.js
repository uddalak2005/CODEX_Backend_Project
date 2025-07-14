import User from "../../CODEX_Backend_Project/src/models/user.model.js";
import joi from "joi";
import jwt from "jsonwebtoken";
import { ApiError } from "../../CODEX_Backend_Project/src/utils/ApiError.js";
import { generateTokens} from "../utils/tokenUtils.js";

class UserController {

    async signUpAsUser(req, res, next) {
        const schema = joi.object({
            fullName: joi.string().required().min(3),
            email: joi.string().email().required(),
            password: joi.string().required(),
            regNumber: joi.string().required().alphanum()
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw new ApiError(400, "Schema Mismatch", error.details);
        }

        const { fullName, email, password, regNumber } = value;

        try {

            const newUser = await User.create({
                fullName,
                email,
                password,
                regNumber,
                branch: req.body.branch || "Not specified",
                year: req.body.year || 1,
                teamName: req.body.teamName || "Individual",
                teamSize: req.body.teamSize || 1,
                expectations: req.body.expectations || "Learning and growth"
            });

            // Generate JWT tokens
            const { accessToken, refreshToken } = generateTokens(newUser);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: {
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    regNumber: newUser.regNumber,
                    role: newUser.role
                }
            });


        } catch (error) {
            next(error);
        }
    }

    async loginUser(req, res, next) {
        const schema = joi.object({
            regNumber: joi.string().required().alphanum(),
            password: joi.string().required()
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw new ApiError(400, "Schema Mismatch", error.details);
        }

        const { regNumber, password } = value;

        try {

            //Indexing via registration Number
            const user = await User.findOne({ regNumber });

            if (!user) {
                throw new ApiError(404, "User not found");
            }

            const isPasswordValid = await user.isPasswordCorrect(password);

            if (!isPasswordValid) {
                throw new ApiError(401, "Invalid credentials");
            }

            // Generate JWT tokens
            const { accessToken, refreshToken } = generateTokens(user);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    regNumber: user.regNumber,
                    role: user.role
                }
            });

        } catch (error) {
            next(error);
        }
    }

    async logoutUser(req, res, next) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.status(200).json({
                success: true,
                message: "Logout successful"
            });

        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();