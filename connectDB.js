const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log(`Connected to database`);
    })
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;
