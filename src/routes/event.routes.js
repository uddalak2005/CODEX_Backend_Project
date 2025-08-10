import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createEvent,
  deleteEvent,
  editEventDetails,
  getAllEvents,
  getSingleEvent,
} from "../controllers/event.controllers.js";

const eventRouter = express.Router();

// Public routes
eventRouter.get("/", asyncHandler(getAllEvents));
eventRouter.get("/:id", asyncHandler(getSingleEvent));

// Secure event CRUD
eventRouter.post("/", asyncHandler(createEvent));
eventRouter.patch("/:id", asyncHandler(editEventDetails));
eventRouter.delete("/:id", asyncHandler(deleteEvent));


export default eventRouter;