const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      user: user,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while registering user",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(500).json({
        success: true,
        message: "User not found",
      });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, 
      sameSite: "none"
    };
    user.password = ''
    res.cookie("token", token, options).status(200).json({
      success: true,
      token: token,
      user,
      message: "User Logged In Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while Login. Please try again.",
    });
  }
};
const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false 
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully"
    });
};


module.exports = { register, login, logout };
