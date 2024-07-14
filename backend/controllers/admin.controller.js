import mongoose from "mongoose";
import { generateResponse } from "../helpers/response.helper.js";
import { validationResult } from "express-validator";
import userModel from "../model/user.model.js";
import { createMailBody_Welcome, sendMail } from "../helpers/otp.helper.js";
import { generate } from "generate-password";
import bcrypt from "bcrypt";

export const registerLibrarian = async (req, res) => {
  const { name, email, phone, address, pincode } = req.fields;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.errors)
    const allError = errors.errors.map((e) => e.msg);
    return generateResponse(res, 400, allError, null, false);
  }

  // return res.send(req.fields);

  const session = await mongoose.startSession();

  try {
    const checkUser = await userModel.findOne({ email });

    if (checkUser) {
      return generateResponse(
        res,
        200,
        "Email already registered!!!.",
        null,
        true
      );
    }
    session.startTransaction();

    const password = generate({ length: 6, numbers: true });

    try {
      const user = await userModel.create(
        [
          {
            name,
            email,
            password: await bcrypt.hash(password, 10),
            phone,
            address,
            pincode,
            isVerified: true,
            role: "Librarian",
          },
        ],
        {
          session,
        }
      );
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return generateResponse(res, 500, "Internal Server Error", null, false);
    } finally {
      session.endSession();
    }
    const html = createMailBody_Welcome(name, email, password);
    const response = sendMail(
      email,
      html,
      "Welcome To DevGyan Pustakalay Centre"
    );
    if (response.success == false) {
      return generateResponse(res, 500, "Internal Server Error", null, false);
    }

    return generateResponse(
      res,
      200,
      "Librarian successfully registered!!!.",
      null,
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const getLibrarianByUserId = async (req, res) => {
  const {id} = req.query;

  const config = {};

  if (id) {
    if (!mongoose.isValidObjectId(id)) {
      return generateResponse(res, 400, "Invalid Librarian Id", null, false);
    }

    config["_id"] = id;
  }

  config["role"]="Librarian"

  try {
    const data = await userModel.find(config).select("name email address phone pincode");

    return generateResponse(res, 200, "Data Fetched", data, true);
  } catch (err) {
    console.log(err.message);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};
