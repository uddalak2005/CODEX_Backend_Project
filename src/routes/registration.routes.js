import express from "express"
import {
    bulkDeleteRegistrations,
    bulkUpdateRegistrationStatus,
    cancelRegistration,
    registerForEvent,
    getEventRegistrations,
    rsvpConfirmation
} from "../controllers/registration.controller.js"
import { isAuthMiddleware } from "../middleware/isAuth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registrationRouter=express.Router();

// Public route (no auth required)
registrationRouter.get("/rsvp", asyncHandler(rsvpConfirmation));

// Protected routes
registrationRouter.use(isAuthMiddleware);

//User
registrationRouter.post("/registerUser/:id", asyncHandler(registerForEvent));
registrationRouter.patch("/cancelRegistration/:id", asyncHandler(cancelRegistration));

//admin
registrationRouter.get("/getRegistrations/:id", asyncHandler(getEventRegistrations));
registrationRouter.patch("/updateStatus", asyncHandler(bulkUpdateRegistrationStatus));
registrationRouter.delete("/deleteRegistrations", asyncHandler(bulkDeleteRegistrations));



export default registrationRouter;