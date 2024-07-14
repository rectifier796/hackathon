import mongoose from "mongoose";
import {
  generateLoginResponse,
  generateResponse,
} from "../helpers/response.helper.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import userModel from "../model/user.model.js";
import { createMailBody, generateOTP, sendOTP } from "../helpers/otp.helper.js";

export const registerUser = async (req, res) => {
  const { name, email, password, phone, address, pincode } = req.fields;

  console.log(req.fields);

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

    if (checkUser && !checkUser.isVerified) {
      const otp = generateOTP();
      const hashedOtp = await bcrypt.hash(otp, 10);
      session.startTransaction();
      try {
        checkUser.otp = hashedOtp;
        await checkUser.save();
        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        console.log(err);
        return generateResponse(res, 500, "Internal Server Error", null, false);
      } finally {
        session.endSession();
      }
      const html = createMailBody(name, otp);
      const otpResponse = sendOTP(email, html);
      if (otpResponse.success == false) {
        return generateResponse(res, 500, "Internal Server Error", null, false);
      }
      return generateResponse(
        res,
        200,
        "User already registered!!!. Check email for OTP.",
        null,
        true
      );
    }
    if (checkUser && checkUser.isVerified) {
      return generateResponse(
        res,
        400,
        "User already present!!!. Please login.",
        null,
        false
      );
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    session.startTransaction();

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
            otp: hashedOtp,
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
    const html = createMailBody(name, otp);
    const otpResponse = sendOTP(email, html);
    if (otpResponse.success == false) {
      return generateResponse(res, 500, "Internal Server Error", null, false);
    }

    return generateResponse(
      res,
      200,
      "User successfully registered!!!. Check email for OTP.",
      null,
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const validateUser = async (req, res) => {
  try {
    const { email, otp } = req.fields;

    if (!email) {
      return generateResponse(res, 400, "Email is required!!!", null, false);
    }
    if (!otp) {
      return generateResponse(res, 400, "OTP is required!!!", null, false);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.errors)
      const allError = errors.errors.map((e) => e.msg);
      return generateResponse(res, 400, allError, null, false);
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return generateResponse(
        res,
        400,
        "User Not Found. Please register",
        null,
        false
      );
    }
    if (user.isVerified) {
      return generateLoginResponse(res, user);
    }
    const isCorrect = await bcrypt.compare(otp, user.otp);
    if (!isCorrect) {
      return generateResponse(res, 400, "Invalid OTP", null, false);
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    return generateLoginResponse(res, user);
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const loginUser = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { email, password } = req.fields;
    if (!email) {
      return generateResponse(res, 400, "Email is required", null, false);
    }
    if (!password) {
      return generateResponse(res, 400, "Password is required", null, false);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors.errors)
      const allError = errors.errors.map((e) => e.msg);
      return generateResponse(res, 400, allError, null, false);
    }

    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return generateResponse(res, 400, "Invalid Credentials", null, false);
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    console.log(isCorrect);
    if (!isCorrect) {
      return generateResponse(res, 400, "Invalid Credentials", null, false);
    }

    if (!user.isVerified) {
      const otp = generateOTP();
      const hashedOtp = await bcrypt.hash(otp, 10);
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        user.otp = hashedOtp;
        await user.save();
        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        console.log(err);
        return generateResponse(res, 500, "Internal Server Error", null, false);
      } finally {
        session.endSession();
      }
      const html = createMailBody(user.name, otp);
      const otpResponse = sendOTP(email, html);
      if (otpResponse.success == false) {
        return generateResponse(res, 500, "Internal Server Error", null, false);
      }
      return generateResponse(
        res,
        201,
        "User not verified. Check email for OTP.",
        null,
        true
      );
    }

    return generateLoginResponse(res, user);
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("authToken");
  res.clearCookie("refreshToken");
  return generateResponse(res, 200, "Logged out Successfully", null, true);
};

export const aboutMe = async (req, res) => {
  return generateResponse(res, 200, "Authorized", { id: req.userId }, true);
};

export const userDetails = async (req, res) => {
  const id = req.userId;
  const data = await userModel
    .findById(id)
    .select("name email phone address pincode role isAdmin");
  return generateResponse(res, 200, "User Details", data, true);
};

export const updateDetails = async (req, res) => {
  const { name, phone, address, pincode } = req.fields;

  const userId = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.errors)
    const allError = errors.errors.map((e) => e.msg);
    return generateResponse(res, 400, allError, null, false);
  }

  // return res.send(req.fields);

  const session = await mongoose.startSession();

  try {
    const checkUser = await userModel.findOne({ _id: userId });

    if (!checkUser) {
      return generateResponse(res, 200, "User Not registered!!!.", null, true);
    }

    checkUser.name=name;
    checkUser.phone = phone;
    checkUser.address = address;
    checkUser.pincode = pincode;

    await checkUser.save();

    return generateResponse(
      res,
      200,
      "User successfully Updated!!!.",
      null,
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};
