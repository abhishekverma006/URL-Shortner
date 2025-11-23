// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";

// export const verifyJWT = async (req, _, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     // console.log(token);
//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log(decodedToken._id);

//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// };
// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
  try {
    // Debug logs — helpful while developing
    console.log("verifyJWT - cookies:", req.cookies);
    console.log("verifyJWT - auth header:", req.headers.authorization);

    const tokenFromCookie = req.cookies?.accessToken || req.cookies?.token;
    const tokenFromHeader = req.header("Authorization")?.replace("Bearer ", "");
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
      // use next() so your centralized error handler gets it
      return next(new ApiError(401, "Unauthorized request"));
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      // jwt.verify can throw (expired/invalid) — map to 401
      return next(new ApiError(401, err.message || "Invalid access token"));
    }

    // Safety: ensure we have an id to query
    const userId = decodedToken?._id || decodedToken?.id;
    if (!userId) return next(new ApiError(401, "Invalid access token"));

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) return next(new ApiError(401, "Invalid Access Token"));

    req.user = user;
    return next();
  } catch (error) {
    // unexpected error -> forward to error handler (500-level if not an ApiError)
    console.error("verifyJWT unexpected error:", error);
    return next(
      error instanceof ApiError ? error : new ApiError(500, "Server error in auth")
    );
  }
};
