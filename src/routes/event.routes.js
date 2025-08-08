import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
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
eventRouter.get("/", asyncHandler(getAllEvents));
eventRouter.get("/:id", asyncHandler(getSingleEvent));

// Secure event CRUD
eventRouter.post("/", asyncHandler(createEvent));
eventRouter.patch("/:id", asyncHandler(editEventDetails));
eventRouter.delete("/:id", asyncHandler(deleteEvent));


// Image upload later on will be added
// eventRouter.post("/events/:id/image", isAuth, isAdmin, uploadEventImage);

export default eventRouter;