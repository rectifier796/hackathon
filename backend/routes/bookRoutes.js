import express from "express";
import { parseData } from "../middlewares/parseData.middleware.js";
import { isbnValidation, updateGenreValidation } from "../middlewares/validator.middleware.js";
import { decreaseBookCount, deleteBooks, getBookById, getBooksByQuery, recomendedSystemByAuthor, registerBook, syncBook, trendingBook, updateGenre } from "../controllers/book.controller.js";
import { checkAdmin } from "../middlewares/checkAdmin.middleware.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getFine, getIssueByUser, issueBook, returnBook, updateFineDetails } from "../controllers/issue.controller.js";
import { checkLibrarian } from "../middlewares/checkLibrarian.js";

const bookRoutes = express.Router();

bookRoutes.post("/register",checkAuth, checkAdmin, parseData, isbnValidation, registerBook);

bookRoutes.post("/sync",checkAuth, checkAdmin, parseData, isbnValidation, syncBook);

bookRoutes.post("/update/genre",checkAuth, checkAdmin, parseData, updateGenreValidation, updateGenre);

bookRoutes.get("/search", getBooksByQuery);

bookRoutes.delete("/delete", checkAuth, checkAdmin, deleteBooks);

bookRoutes.post("/issue",checkAuth, checkLibrarian, issueBook);


bookRoutes.post("/return",checkAuth, checkLibrarian, returnBook);

bookRoutes.get("/issue-details",checkAuth, getIssueByUser);

bookRoutes.get("/fine-details",checkAuth, getFine);

bookRoutes.post("/update-fine-details",checkAuth, checkLibrarian, updateFineDetails);


bookRoutes.post("/decrease-book-count",checkAuth, checkAdmin, decreaseBookCount);

bookRoutes.get("/trending-books", trendingBook);

bookRoutes.get("/get-book-by-id", getBookById);

bookRoutes.get("/recommendedBooks", checkAuth, recomendedSystemByAuthor);





export default bookRoutes;
