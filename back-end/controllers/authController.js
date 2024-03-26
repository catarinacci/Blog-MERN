const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("E-mail already registred", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  //console.log(email)
  try {
    if (!email) {
      return next(new ErrorResponse("Please add email", 400));
    }
    if (!password) {
      return next(new ErrorResponse("Please add password", 400));
    }

    const user = await User.findOne({ email });
    //console.log(user)
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }
    // console.log(user,'000000')
    const isMatched = await user.comparePassword({ password });
    if (!isMatched) {
      // console.log(user,'111111')
      return next(new ErrorResponse("Invalid credentials", 400));
    }
    // console.log(user, '222222')
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = (user, codeStatus, res) => {
  console.log(user, 'tokennnnn')
  const token = user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    .json({
      success: true,
      id: user._id,
      role: user.role,
    });
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

exports.userProfile = (req, res, next) => {
  const user = User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};
