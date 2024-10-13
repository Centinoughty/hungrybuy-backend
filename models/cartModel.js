const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [CartItemSchema],
  },
  { timestamps: true }
);

CartSchema.pre("save", function (next) {
  this.cartItems = this.cartItems.filter((item) => item.quantity >= 1);
  next();
});

module.exports = mongoose.model("Cart", CartSchema);
