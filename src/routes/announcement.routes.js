import express from "express";
import { createAnnouncement, deleteAnnouncement, editAnnouncement, getAnnouncements, getSingleAnnouncement } from "../controllers/announcement.controllers.js";
import { isAuth } from "../middleware/isAuth.js";

const announcementRouter=express.Router();

announcementRouter.use(isAuth);
//admin
announcementRouter.post("/",createAnnouncement)
announcementRouter.patch("/:id",editAnnouncement)
announcementRouter.get("/",getAnnouncements)
announcementRouter.get("/:id",getSingleAnnouncement)
announcementRouter.delete("/:id",deleteAnnouncement)

export default announcementRouter;