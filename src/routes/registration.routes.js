import express from "express"
import {
    bulkDeleteRegistrations,
    bulkUpdateRegistrationStatus,
    cancelRegistration,
    registerForEvent,
    getEventRegistrations
} from "../controllers/registration.controllers.js"
import { isAuth } from "../middleware/isAuth.js";

const registrationRouter=express.Router();

registrationRouter.use(isAuth);

//User
registrationRouter.post("/registerUser/:id",registerForEvent);
registrationRouter.patch("/cancelRegistration/:id",cancelRegistration);

//admin
registrationRouter.get("/getRegistrations/:id",getEventRegistrations);
registrationRouter.patch("/updateStatus",bulkUpdateRegistrationStatus);
registrationRouter.delete("/deleteRegistrations",bulkDeleteRegistrations);

export default registrationRouter;