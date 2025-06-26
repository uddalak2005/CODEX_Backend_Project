import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createEvent } from "../controllers/event.controllers";

const eventRouter = express.Router();

eventRouter.post("/addEvent", isAuth, createEvent);

export default eventRouter;
