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
eventRouter.post("/", isAuth,createEvent);
eventRouter.patch("/:id", isAuth, editEventDetails);
eventRouter.delete("/:id", isAuth, deleteEvent);


// Image upload later on will be added
// eventRouter.post("/events/:id/image", isAuth, isAdmin, uploadEventImage);

export default eventRouter;
