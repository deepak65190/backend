const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  age: Number,
});
const authModel = mongoose.model("user", authSchema);
module.exports = {
  authModel,
};
