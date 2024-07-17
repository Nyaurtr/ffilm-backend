const mongoose = require("mongoose");

const URI = "mongodb+srv://katurtr:123456789katurtr@ffilm.78nju8p.mongodb.net/?retryWrites=true&w=majority&appName=FFilm";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(URI);
    console.log("DB Connected Successfully ✅");
  } catch (e) {
    console.log(`Authentication to database failed ❗`);
    process.exit(1);
  }
};

module.exports = connectDB;
