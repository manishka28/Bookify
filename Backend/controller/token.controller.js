import jwt from "jsonwebtoken";
import User from "../modal/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

// API to hit to regenrate access and refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token Required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id).select("+refreshTokens");
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const exists = user.refreshTokens.includes(refreshToken);
    if (!exists) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    // Remove the old refresh token
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);

    // Generate new tokens
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);
    console.log("New Access Token",newAccessToken);
    console.log("New Refresh Token", newRefreshToken);
    
    

    user.refreshTokens.push(newRefreshToken);
    console.log("New Refresh Token DB ", user.refreshAccessTokens);
    
    await user.save();

    // Set the new refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// API to logout and remove refresh token
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("Logout",refreshToken);
    
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh Token required" });
    }
    // console.log("Before log out", refreshToken);
    

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("+refreshTokens");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const before = user.refreshTokens.length;
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
    await user.save();

    // Clear the cookie
    res.clearCookie("refreshToken");
    console.log("Refresh after logout", user.refreshTokens);
    

    return res.json({
      message:
        before !== user.refreshTokens.length
          ? "Logged Out Successfully"
          : "Session already closed",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
