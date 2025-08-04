import express from "express";
import adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signup", adminController.signUpAdmin);
router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);

export default router;