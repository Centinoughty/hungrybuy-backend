const User = require("../models/userModel");

module.exports.getInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find user" });
    }

    res
      .status(200)
      .json({ success: true, message: "Fetched user details", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
