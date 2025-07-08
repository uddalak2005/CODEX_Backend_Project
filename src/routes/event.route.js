import express from "express";
import  {isAuth}  from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { createEvent } from "../controllers/event.controllers.js";

const eventRouter = express.Router();

// eventRouter.post("/register",{registerUser});

//Secure routes
eventRouter.post("/addEvent",isAuth,isAdmin, createEvent);

export default eventRouter;
