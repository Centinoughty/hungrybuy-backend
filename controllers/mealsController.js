const Item = require("../models/itemModel");
const User = require("../models/userModel");

module.exports.addItem = async (req, res) => {
  try {
    const { name, price, description, category, totalStock } = req.body;

    // checks for the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find user" });
    }

    // checks if the user is an admin
    if (user.role != "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    const existingItem = await Item.findOne({ name });
    if (existingItem) {
      return res
        .status(409)
        .json({ success: false, message: "Item already exists" });
    }

    const newItem = new Item({
      name,
      price,
      description,
      category,
      totalStock: totalStock || 1,
    });
    await newItem.save();
    res.status(201).json({ success: true, message: "New item created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
