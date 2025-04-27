import jwt from "jsonwebtoken";
import usermodal from "../models/usermodal.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization; // Bearer <token>
    

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usermodal.findById(decoded._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    req.user = user; // Store user info for next middleware
    next();

  } catch (error) {
    console.log("verifyToken error:", error.message);
    res.status(401).send({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};


