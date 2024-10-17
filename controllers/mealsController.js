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
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    // check if item already exists
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

module.exports.editItem = async (req, res) => {
  try {
    const { price, description, totalStock, category } = req.body;
    const itemId = req.params.itemId;

    // checks for the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find user" });
    }

    // checks if the user is admin
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    // checks for the item
    const item = await Item.findById(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find item" });
    }

    item.price = price || item.price;
    item.description = description || item.description;
    item.totalStock = totalStock || item.totalStock;
    item.category = category || item.category;

    await item.save();
    res
      .status(200)
      .json({ success: true, message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
