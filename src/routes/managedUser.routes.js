import express from "express"
import { createManagedUser, deleteManagedUser, getAllManagedUsers, getManagedUserById, updateManagedUser } from "../controllers/managedUser.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const managedUserRouter=express.Router();

// admin
managedUserRouter.post("/", asyncHandler(createManagedUser))
managedUserRouter.get("/:id", asyncHandler(getManagedUserById))
managedUserRouter.get("/", asyncHandler(getAllManagedUsers))
managedUserRouter.delete("/:id", asyncHandler(deleteManagedUser))
managedUserRouter.patch("/update/:id", asyncHandler(updateManagedUser))


export default managedUserRouter;