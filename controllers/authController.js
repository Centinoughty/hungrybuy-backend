const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

module.exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // checks if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // create a new cart
    const newCart = new Cart();

    // create a new user
    const newUser = new User({
      email,
      password,
      profile: { firstName, lastName },
      cart: newCart._id,
    });

    newCart.owner = newUser._id;

    // create a token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    await newCart.save();
    await newUser.save();

    res.status(201).json({ success: true, message: "Account created", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checks if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find user" });
    }

    // checks password
    if (!(await user.isPasswordMatch(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, message: "Login succesful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
