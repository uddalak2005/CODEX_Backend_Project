import express from "express";
import { createAnnouncement, deleteAnnouncement, editAnnouncement, getAnnouncements, getSingleAnnouncement } from "../controllers/announcement.controller.js";
import { isAuthMiddleware } from "../middleware/isAuth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const announcementRouter=express.Router();

announcementRouter.use(isAuthMiddleware);
//admin
announcementRouter.post("/", asyncHandler(createAnnouncement))
announcementRouter.patch("/:id", asyncHandler(editAnnouncement))
announcementRouter.get("/", asyncHandler(getAnnouncements))
announcementRouter.get("/:id", asyncHandler(getSingleAnnouncement))
announcementRouter.delete("/:id", asyncHandler(deleteAnnouncement))

export default announcementRouter;