const mongoose = require("mongoose");

function mongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
    });
}

module.exports = mongoDB;
