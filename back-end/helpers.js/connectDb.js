import mongoose from ("mongoose");
require("dotenv").config();

module.exports = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log("Connection Failed!");
      } else {
        console.log("Database Connected...");
      }
    }
  );
};
