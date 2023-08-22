import express from "express";
import {
  getMyProfile,
  getNewUser,
  loginUser,
  logoutUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", getNewUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
