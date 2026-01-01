const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },
  batch: {
    type: String,
    enum: ["+1", "+2"],
    // Required only if role is student
    required: function () {
      return this.role === "student";
    },
  },
  isApproved: {
    type: Boolean,
    default: true,
  },
  hasPaid: {
    type: Boolean,
    default: false,
  },
  permittedSubjects: [
    {
      // e.g., 'Physics', 'Chemistry', 'Maths' or 'All'
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mustChangePassword: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
