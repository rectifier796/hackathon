import { validationResult } from "express-validator";
import { generateResponse } from "../helpers/response.helper.js";
import axios from "axios";
import bookModel from "../model/book.model.js";
import mongoose from "mongoose";

export const registerBook = async (req, res) => {
  const { isbn } = req.fields;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.errors)
      const allError = errors.errors.map((e) => e.msg);
      return generateResponse(res, 400, allError, null, false);
    }

    const book = await bookModel.findOne({ isbn });

    if (book) {
      book.quantity = book.quantity + 1;
      book.currentlyAvailable = book.currentlyAvailable + 1;
      await book.save();
      return generateResponse(
        res,
        200,
        "Book Updated Successfully",
        book,
        true
      );
    }

    const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    const data = await axios.get(bookUrl);

    // console.log(data.data);

    if (data.data.totalItems == 0) {
      return generateResponse(res, 400, "No Book Found", null, false);
    }

    const bookData = data.data.items[0];

    console.log(bookData.volumeInfo.langauge);

    const newData = await bookModel.create({
      isbn,
      title: bookData.volumeInfo.title,
      author: bookData.volumeInfo.authors,
      publishedDate: bookData.volumeInfo.publishedDate,
      description: bookData.volumeInfo.description,
      quantity: 1,
      currentlyAvailable: 1,
      thumbnail: bookData.volumeInfo.imageLinks.thumbnail,
      smallThumbnail: bookData.volumeInfo.imageLinks.smallThumbnail,
      language: bookData.volumeInfo.language,
      searchInfo: bookData.searchInfo.textSnippet,
    });

    return generateResponse(res, 200, "Book Added Successfully", newData, true);
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const syncBook = async (req, res) => {
  const { bookId } = req.fields;

  try {
    if (!mongoose.isValidObjectId(bookId)) {
      return generateResponse(res, 400, "Invalid Book Id", null, false);
    }

    const book = await bookModel.findById(bookId);

    if (!book) {
      return generateResponse(
        res,
        400,
        "No Book Found, Register First!!!",
        null,
        false
      );
    }

    console.log(book);

    const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`;

    const data = await axios.get(bookUrl);

    // console.log(data.data);

    if (data.data.totalItems == 0) {
      return generateResponse(res, 400, "No Book Found", null, false);
    }

    const bookData = data.data.items[0];

    book.title = bookData.volumeInfo.title;
    book.author = bookData.volumeInfo.authors;
    book.publishedDate = bookData.volumeInfo.publishedDate;
    book.description = bookData.volumeInfo.description;
    book.thumbnail = bookData.volumeInfo.imageLinks.thumbnail;
    book.smallThumbnail = bookData.volumeInfo.imageLinks.smallThumbnail;
    book.langauge = bookData.volumeInfo.langauge;
    book.searchInfo = bookData.searchInfo.textSnippet;

    await book.save();

    return generateResponse(res, 200, "Book Synched Successfully", book, true);
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const updateGenre = async (req, res) => {
  const { bookId, genre } = req.fields;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.errors)
      const allError = errors.errors.map((e) => e.msg);
      return generateResponse(res, 400, allError, null, false);
    }

    if (!mongoose.isValidObjectId(bookId)) {
      return generateResponse(res, 400, "Invalid Book Id", null, false);
    }

    const book = await bookModel.findById(bookId);

    if (!book) {
      return generateResponse(
        res,
        400,
        "No Book Found, Register First!!!",
        null,
        false
      );
    }

    // console.log(book);

    book.genre = genre;

    await book.save();

    return generateResponse(res, 200, "Book Updated Successfully", book, true);
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const getBooksByQuery = async (req, res) => {
  try {
    const config = {};
    const { title, isbn, author, keyword = "", genre, language } = req.query;
    if (title) {
      config["title"] = title;
    }
    if (isbn) {
      config["isbn"] = isbn;
    }
    if (author) {
      config["author"] = author;
    }
    if (genre) {
      config["genre"] = genre;
    }
    if (language) {
      config["language"] = language;
    }

    // console.log(config);

    const allQuery = await bookModel
      .find({
        $or: [
          { description: { $regex: keyword, $options: "i" } },
          { searchInfo: { $regex: keyword, $options: "i" } },
        ],
      })
      .find(config);

    return generateResponse(res, 200, "Query Data Fetched", allQuery, true);
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const deleteBooks = async (req, res) => {
  try {
    const {bookId} = req.query;

    console.log(req.query);

    if (!mongoose.isValidObjectId(bookId)) {
      return generateResponse(res, 400, "Invalid Book Id", null, false);
    }

    await bookModel.deleteOne({_id:bookId});

    return generateResponse(res, 200, "Book Deleted", null, true);
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};
