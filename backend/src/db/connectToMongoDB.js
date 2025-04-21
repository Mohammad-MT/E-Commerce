const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL2);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error: Connecting to MongoDB", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;
