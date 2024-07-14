import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { checkAdmin } from "../middlewares/checkAdmin.middleware.js";
import { registerLibrarianValidation } from "../middlewares/validator.middleware.js";
import { getLibrarianByUserId, registerLibrarian } from "../controllers/admin.controller.js";
import { parseData } from "../middlewares/parseData.middleware.js";


const adminRoutes = express.Router();

adminRoutes.post("/register/librarian", checkAuth, checkAdmin, parseData, registerLibrarianValidation, registerLibrarian);

adminRoutes.get("/librarian",getLibrarianByUserId);

export default adminRoutes;
