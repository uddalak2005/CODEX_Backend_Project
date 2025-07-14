import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const verifyJWT=asyncHandler( async(req,_,next) => {
    try {
        const token=req.header("Authorization").replace("Bearer ","") || req.cookies?.accessToken;
        
        if(!token)
            throw new ApiError(401,"Token's missing");
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_SECRET_TOKEN);
    
        const user=await User.findById(decodedToken?._id);
    
        if(!user)
            throw new ApiError(401,"Invalid token");
    
        req.user={
            regNumber:decodedToken.regNumber,    // regNumber as PK
        }

        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Token not valid");
    }
});
// console.log("Here tokenised authentication will happen");
export const isAuth=verifyJWT;