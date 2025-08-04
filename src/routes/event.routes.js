import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
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
eventRouter.patch("/:id", editEventDetails);
eventRouter.delete("/:id", deleteEvent);


// Image upload later on will be added
// eventRouter.post("/events/:id/image", isAuth, isAdmin, uploadEventImage);

export default eventRouter;
