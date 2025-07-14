import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {
  createEvent,
  deleteEvent,
  editEventDetails,
  getAllEvents,
  getSingleEvent,
  registerForEvent,
  cancelRegistration,
  getEventRegistrations,
  uploadEventImage
} from "../controllers/event.controllers.js";

const eventRouter = express.Router();

// Public routes
eventRouter.get("/events", getAllEvents);
eventRouter.get("/events/:id", getSingleEvent);

// Secure event CRUD
eventRouter.post("/events", isAuth, isAdmin, createEvent);
eventRouter.patch("/events/:id", isAuth, isAdmin, editEventDetails);
eventRouter.delete("/events/:id", isAuth, isAdmin, deleteEvent);

// RSVP system
eventRouter.post("/events/:id/register", isAuth, registerForEvent);
eventRouter.delete("/events/:id/register", isAuth, cancelRegistration);
eventRouter.get("/events/:id/registrations", isAuth, isAdmin, getEventRegistrations);

// Optional: image upload
eventRouter.post("/events/:id/image", isAuth, isAdmin, uploadEventImage);

export default eventRouter;
