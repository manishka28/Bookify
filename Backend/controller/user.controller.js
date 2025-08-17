import User from "../modal/user.model.js";
import bcryptjs from "bcryptjs";
import { generateAccessToken,generateRefreshToken } from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    // console.log(req.body);
    
    const { fullname, email, password,phone } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
      phone:phone
    });
    const accessToken =generateAccessToken(user._id);
    const refreshToken=generateRefreshToken(user._id);
    user.refreshTokens.push(refreshToken);
    await user.save();
    res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,      // only send over HTTPS
  sameSite: "None",  // required if frontend & backend are on different domains
  maxAge: 7 * 24 * 60 * 60 * 1000
});
    res.status(201).json({ message: "User Created Successfully",
      accessToken,
      user:{
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phone:user.phone,
      }
     });

  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" });

    }
    const accessToken=generateAccessToken(user._id);
    const refreshToken=generateRefreshToken(user._id);
    console.log("Access Token ",accessToken);
    console.log("Refresh Token ",refreshToken);
    

    user.refreshTokens.push(refreshToken);
    if(user.refreshTokens.length>5){
      user.refreshTokens=user.refreshTokens.slice(-5);
      // only 5 sessions at a time. last 5 sessions choosen if >5 
    }
    await user.save();
    res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,      // only send over HTTPS
  sameSite: "None",  // required if frontend & backend are on different domains
  maxAge: 7 * 24 * 60 * 60 * 1000
});
    return res.status(200).json({
      message:"Login Successful",
      accessToken,
      
      user:{
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phone:user.phone,
      },
    });

  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
