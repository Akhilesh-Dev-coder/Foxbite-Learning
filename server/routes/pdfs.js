const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const PDF = require("../models/PDF");
const User = require("../models/User");

// Initialize GridFS Bucket
let gfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "pdfs",
  });
});

// Helper to stream buffer to GridFS
const streamUpload = (buffer, filename, mimetype) => {
  return new Promise((resolve, reject) => {
    const writeStream = gfsBucket.openUploadStream(filename, {
      contentType: mimetype,
    });

    writeStream.on("error", (err) => {
      reject(err);
    });

    writeStream.on("finish", () => {
      resolve({ _id: writeStream.id });
    });

    writeStream.end(buffer);
  });
};

// @route   POST api/pdfs
// @desc    Upload PDF (Admin Only)
// @access  Private/Admin
router.post("/", [auth, upload.single("file")], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { title, subject, batch } = req.body;

    // Manually stream buffer to GridFS
    const uploadedFile = await streamUpload(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname}`,
      req.file.mimetype
    );

    const newPDF = new PDF({
      title,
      subject,
      batch,
      fileId: uploadedFile._id,
      uploadedBy: req.user.id,
    });

    const pdf = await newPDF.save();
    res.json(pdf);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/pdfs
// @desc    Get all PDFs (Filtered by batch for students)
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    let query = {};
    if (user.role === "student") {
      query.batch = user.batch;
    }

    console.log(`User: ${user.name} (${user.role}), Batch: ${user.batch}`);
    console.log("Query:", query);

    const pdfs = await PDF.find(query).sort({ uploadDate: -1 });
    res.json(pdfs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/pdfs/stream/:id
// @desc    Stream PDF file
// @access  Private (Paid & Approved & Correct Batch)
router.get("/stream/:id", auth, async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);
    if (!pdf) {
      return res.status(404).json({ msg: "PDF Metadata not found" });
    }

    const user = await User.findById(req.user.id);

    // Access Control Logic
    if (user.role !== "admin") {
      if (!user.isApproved) {
        return res.status(403).json({ msg: "Account not approved" });
      }
      if (!user.hasPaid) {
        return res.status(403).json({ msg: "Payment required" });
      }
      if (user.batch !== pdf.batch) {
        return res
          .status(403)
          .json({ msg: "This material is not for your batch" });
      }
    }

    const fileId = new mongoose.Types.ObjectId(pdf.fileId);

    // Check if file exists in GridFS
    const files = await gfsBucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ msg: "File not found" });
    }

    // Stream response
    const readStream = gfsBucket.openDownloadStream(fileId);
    res.set("Content-Type", files[0].contentType || "application/pdf");
    res.set("Content-Disposition", "inline");
    readStream.pipe(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/pdfs/:id
// @desc    Update PDF Metadata (Admin Only)
// @access  Private/Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    const { title, subject, batch } = req.body;
    let pdf = await PDF.findById(req.params.id);

    if (!pdf) return res.status(404).json({ msg: "PDF not found" });

    pdf.title = title || pdf.title;
    pdf.subject = subject || pdf.subject;
    pdf.batch = batch || pdf.batch;

    await pdf.save();
    res.json(pdf);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/pdfs/:id
// @desc    Delete PDF (Admin Only)
// @access  Private/Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access required" });
    }

    const pdf = await PDF.findById(req.params.id);
    if (!pdf) return res.status(404).json({ msg: "PDF not found" });

    // Delete file from GridFS
    const fileId = new mongoose.Types.ObjectId(pdf.fileId);
    await gfsBucket.delete(fileId);

    // Delete metadata
    await pdf.deleteOne();

    res.json({ msg: "PDF removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
