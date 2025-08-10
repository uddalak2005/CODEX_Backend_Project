import express from "express";
import {
  createEvent,
  deleteEvent,
  editEventDetails,
  getAllEvents,
  getSingleEvent,
} from "../controllers/event.controllers.js";

const eventRouter = express.Router();

// Public routes
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getSingleEvent);

// Secure event CRUD
eventRouter.post("/", createEvent);
eventRouter.patch("/:id",  editEventDetails);
eventRouter.delete("/:id", deleteEvent);


export default eventRouter;