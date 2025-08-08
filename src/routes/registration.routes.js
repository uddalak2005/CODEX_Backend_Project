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

const registrationRouter=express.Router();

registrationRouter.use(isAuth); //Comment it to disable the auth middleware

//User
registrationRouter.post("/registerUser/:id",registerForEvent);
registrationRouter.patch("/cancelRegistration/:id",cancelRegistration);
registrationRouter.get("/rsvp", rsvpConfirmation)

//admin
registrationRouter.get("/getRegistrations/:id",getEventRegistrations);
registrationRouter.patch("/updateStatus",bulkUpdateRegistrationStatus);
registrationRouter.delete("/deleteRegistrations",bulkDeleteRegistrations);



export default registrationRouter;