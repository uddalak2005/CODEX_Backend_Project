import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const verifyJWT=asyncHandler( async(req,_,next) => {
    try {
        const token=req.cookies?.accessToken || req.header("Authorization").replace("Bearer ","");
        
        if(!token)
            throw new ApiError(401,"Token's missing");
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user=await User.findById(decodedToken?._id);
        console.log(user);
    
        if(!user)
            throw new ApiError(401,"Invalid token");
    
        req.user=user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Token not valid");
    }
});
// console.log("Here tokenised authentication will happen");
export const isAuthMiddleware=verifyJWT;