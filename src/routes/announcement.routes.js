import express from "express";
import { createAnnouncement, deleteAnnouncement, editAnnouncement, getAnnouncements, getSingleAnnouncement } from "../controllers/announcement.controllers.js";
import { isAuth } from "../middleware/isAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const announcementRouter=express.Router();

announcementRouter.use(isAuth);
//admin
announcementRouter.post("/", asyncHandler(createAnnouncement))
announcementRouter.patch("/:id", asyncHandler(editAnnouncement))
announcementRouter.get("/", asyncHandler(getAnnouncements))
announcementRouter.get("/:id", asyncHandler(getSingleAnnouncement))
announcementRouter.delete("/:id", asyncHandler(deleteAnnouncement))

export default announcementRouter;