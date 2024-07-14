import { config } from "../helpers/config_cookie.helper.js";
import { generateResponse } from "../helpers/response.helper.js";
import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  // console.log(req);
  // console.log(req);
  const authToken = req.cookies.authToken;
  const refreshToken = req.cookies.refreshToken;

  if (!authToken || !refreshToken) {
    return generateResponse(res, 400, "Unauthorized", null, false);
  }

  jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_KEY,
        (refreshErr, refreshDecoded) => {
          if (refreshErr) {
            return generateResponse(res, 400, "Unauthorized", null, false);
          } else {
            const authToken = jwt.sign(
              { userId: refreshDecoded.userId },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1d" }
            );
            const refreshToken = jwt.sign(
              { userId: refreshDecoded.userId },
              process.env.JWT_REFRESH_KEY,
              { expiresIn: "10d" }
            );

  
            res.cookie("authToken", authToken, config);
            res.cookie("refreshToken", refreshToken, config);
            req.userId = refreshDecoded.userId;
            next();
          }
        }
      );
    } else {
      // console.log(decoded);
      req.userId = decoded.userId;
      next();
    }
  });
};
