import express from "express";
import {
  createEvent,
  deleteEvent,
  editEventDetails,
  getAllEvents,
  getSingleEvent,
  // registerForEvent,
  // cancelRegistration,
  // getEventRegistrations,
  // uploadEventImage
} from "../controllers/event.controllers.js";

const eventRouter = express.Router();

// Public routes
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getSingleEvent);

// Secure event CRUD
eventRouter.post("/", createEvent);
eventRouter.patch("/:id",  editEventDetails);
eventRouter.delete("/:id", deleteEvent);


// Image upload later on will be added
// eventRouter.post("/events/:id/image", isAuth, isAdmin, uploadEventImage);

export default eventRouter;