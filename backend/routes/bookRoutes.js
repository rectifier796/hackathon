import express from "express";
import { parseData } from "../middlewares/parseData.middleware.js";
import { isbnValidation, updateGenreValidation } from "../middlewares/validator.middleware.js";
import { getBooksByQuery, registerBook, syncBook, updateGenre } from "../controllers/book.controller.js";
import { checkAdmin } from "../middlewares/checkAdmin.middleware.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const bookRoutes = express.Router();

bookRoutes.post("/register",checkAuth, checkAdmin, parseData, isbnValidation, registerBook);

bookRoutes.post("/sync",checkAuth, checkAdmin, parseData, isbnValidation, syncBook);

bookRoutes.post("/update/genre",checkAuth, checkAdmin, parseData, updateGenreValidation, updateGenre);

bookRoutes.get("/search", getBooksByQuery);


export default bookRoutes;
