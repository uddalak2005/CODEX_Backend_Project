import express from "express"
import { createManagedUser, deleteManagedUser, getAllManagedUsers, getManagedUserById, updateManagedUser } from "../controllers/managedUser.controller.js";
const managedUserRouter=express.Router();

// admin
managedUserRouter.post("/",createManagedUser)
managedUserRouter.get("/:id",getManagedUserById)
managedUserRouter.get("/",getAllManagedUsers)
managedUserRouter.delete("/:id",deleteManagedUser)
managedUserRouter.patch("/update/:id", updateManagedUser)


export default managedUserRouter;