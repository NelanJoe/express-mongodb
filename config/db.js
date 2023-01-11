const { default: mongoose } = require("mongoose");

const { MONGO_URI } = process.env;

const connectToMongoDB = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log("Database Connected");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectToMongoDB };
