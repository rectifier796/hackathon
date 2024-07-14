import jwt from "jsonwebtoken";
import { config } from "./config_cookie.helper.js";

export const generateResponse = (res, status, message, data, success) => {
  if(!Array.isArray(message)){
    message = [message];
  }
  res.status(status).json({
    success,
    message,
    no_of_item : data ? data.length : 0,
    data,
  });
};

export const generateLoginResponse = (res, user) => {
  try {
    const authToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "10d" }
    );

    user.password = undefined;
    
    res.cookie("authToken", authToken, config);
    res.cookie("refreshToken", refreshToken, config);

    const { _id, name, email, phone, address, pincode } = user;

    return generateResponse(
      res,
      200,
      "Logged In Successfully",
      { user: { _id, name, email, phone, address, pincode }, authToken, refreshToken },
      true
    );
  } catch (err) {
    console.log(err);
    return generateResponse(res, 500, "Internal Server Error", null, false);
  }
};
