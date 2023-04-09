const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
  },
  bio: { type: String, maxlength: 200 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Usermodel = mongoose.model("User", userSchema);

module.exports = {
  Usermodel
};
