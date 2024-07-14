import express from "express";
import {
  aboutMe,
  loginUser,
  logout,
  registerUser,
  updateDetails,
  userDetails,
  validateUser,
} from "../controllers/auth.controller.js";
import { loginValidation, registrationValidation, updateValidation, validValidation } from "../middlewares/validator.middleware.js";
import { parseData } from "../middlewares/parseData.middleware.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", parseData, registrationValidation,registerUser);

authRoutes.post("/validate", parseData, validValidation, validateUser);

authRoutes.post("/login", parseData, loginValidation, loginUser);

authRoutes.get("/logout", checkAuth, logout);

authRoutes.get("/me", checkAuth, aboutMe);

authRoutes.get("/profile", checkAuth, userDetails);

authRoutes.post("/update", checkAuth, parseData, updateValidation, updateDetails);

export default authRoutes;
