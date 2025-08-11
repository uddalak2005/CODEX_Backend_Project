import {ApiError} from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAdminMiddleware=asyncHandler(async(req, res, next) => {
 try {
       const role=req.user?.role;
       if(role !== "admin")
         throw new ApiError(403,"Unauthorized access,you are not an admin");
        next();
 } catch (error) {
    throw new ApiError(403,error?.message || "Role invalidation error"); 
}
})