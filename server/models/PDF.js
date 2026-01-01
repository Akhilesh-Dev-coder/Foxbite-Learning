const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    enum: ["Physics", "Chemistry", "Maths"],
  },
  batch: {
    type: String,
    required: true,
    enum: ["+1", "+2"],
  },
  fileId: {
    // GridFS File ID
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PDF", pdfSchema);
