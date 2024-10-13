const mongoose = require("mongoose");

module.exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection succesful");
  } catch (error) {
    console.log("Connection failed");
  }
};
