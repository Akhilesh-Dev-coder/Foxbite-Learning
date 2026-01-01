const multer = require("multer");

// Use memory storage to buffer the file, then we stream it manually to GridFS
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
