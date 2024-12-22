import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";
export const router = express.Router();
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
