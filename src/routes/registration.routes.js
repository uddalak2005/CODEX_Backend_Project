import express from "express"
import {
    bulkDeleteRegistrations,
    bulkUpdateRegistrationStatus,
    cancelRegistration,
    registerForEvent,
    getEventRegistrations,
    rsvpConfirmation
} from "../controllers/registration.controllers.js"
import { isAuth } from "../middleware/isAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registrationRouter=express.Router();

// Public route (no auth required)
registrationRouter.get("/rsvp", asyncHandler(rsvpConfirmation));

// Protected routes
registrationRouter.use(isAuth);

//User
registrationRouter.post("/registerUser/:id", asyncHandler(registerForEvent));
registrationRouter.patch("/cancelRegistration/:id", asyncHandler(cancelRegistration));

//admin
registrationRouter.get("/getRegistrations/:id", asyncHandler(getEventRegistrations));
registrationRouter.patch("/updateStatus", asyncHandler(bulkUpdateRegistrationStatus));
registrationRouter.delete("/deleteRegistrations", asyncHandler(bulkDeleteRegistrations));



export default registrationRouter;