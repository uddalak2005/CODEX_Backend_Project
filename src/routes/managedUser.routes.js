import express from "express"
import { createManagedUser, deleteManagedUser, getAllManagedUsers, getManagedUserById } from "../controllers/managedUser.controller.js";
import { isAuth } from "../middleware/isAuth.js";
const managedUserRouter=express.Router();

managedUserRouter.use(isAuth);
// admin
managedUserRouter.post("/",createManagedUser)
managedUserRouter.get("/:id",getManagedUserById)
managedUserRouter.get("/",getAllManagedUsers)
managedUserRouter.delete("/:id",deleteManagedUser)

export default managedUserRouter;