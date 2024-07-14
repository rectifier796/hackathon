import mongoose from "mongoose";
import issueModel from "../model/issue.model.js";
import { generateResponse } from "../helpers/response.helper.js";
import userModel from "../model/user.model.js";
import bookModel from "../model/book.model.js";

export const issueBook = async (req, res) => {
  try {
    const { userId, bookId } = req.fields;

    if (!mongoose.isValidObjectId(userId)) {
      return generateResponse(res, 400, "Invalid User Id", null, false);
    }

    if (!mongoose.isValidObjectId(bookId)) {
      return generateResponse(res, 400, "Invalid Book Id", null, false);
    }

    const findUser = await userModel.findById(userId);

    if (!findUser) {
      return generateResponse(res, 400, "User Not Found", null, false);
    }

    const findBook = await bookModel.findById(bookId);

    if (!findBook) {
      return generateResponse(res, 400, "Book Not Found", null, false);
    }

    if (findBook.currentlyAvailable < 1) {
      return generateResponse(
        res,
        400,
        "Book Not Available Currently",
        null,
        false
      );
    }

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const issueDate = Date.now();

      const date = new Date();

      const dueDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);

      const issueDatails = await issueModel.create(
        [
          {
            userId,
            bookId,
            issueDate,
            dueDate,
          },
        ],
        {
          session,
        }
      );

      findBook.currentlyAvailable = findBook.currentlyAvailable - 1;

      findBook.no_of_issue = findBook.no_of_issue + 1;

      await findBook.save();

      await session.commitTransaction();

      return generateResponse(
        res,
        201,
        "Book Issued Successfully",
        issueDatails,
        true
      );
    } catch (err) {
      await session.abortTransaction();
      console.log(err.message);
      return generateResponse(res, 500, "Internal Server Error", null, false);
    } finally {
      await session.endSession();
    }
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const returnBook = async (req, res) => {
  try {
    const { issueId } = req.fields;

    if (!mongoose.isValidObjectId(issueId)) {
      return generateResponse(res, 400, "Invalid Issue Id", null, false);
    }

    const findIssueBook = await issueModel.findById(issueId);

    if (!findIssueBook) {
      return generateResponse(res, 400, "Issue Details Not Found", null, false);
    }

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      findIssueBook.isReturned = true;

      let fine = 0;
      if (findIssueBook.dueDate < Date.now) {
        fine =
          ((Date.now().getTime() - findIssueBook.dueDate.getTime()) /
            (1000 * 60 * 60 * 24)) *
          50; //Rs 50 / day
      }
      if (fine == 0) findIssueBook.isFinePaid = true;

      findIssueBook.fine = fine;

      await findIssueBook.save();

      await session.commitTransaction();

      return generateResponse(
        res,
        201,
        "Book Returned Successfully",
        findIssueBook,
        true
      );
    } catch (err) {
      await session.abortTransaction();
      console.log(err.message);
      return generateResponse(res, 500, "Internal Server Error", null, false);
    } finally {
      await session.endSession();
    }
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const getIssueByUser = async (req, res) => {
  try {
    const userId = req.userId;

    const details = await issueModel.find({ userId });

    return generateResponse(res, 200, "Issue Details Fetched", details, true);
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const getFine = async (req, res) => {
  try {
    const userId = req.userId;
console.log(userId);
    let sum = 0;
    const d = await issueModel.find({userId, isFinePaid:false});

    d.map((e)=>{
        sum+=e.fine;
    })

    console.log(d);

    return generateResponse(
      res,
      200,
      "Fine Details Fetched",
      { fine: sum },
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};
