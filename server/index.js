const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
// Init Middleware
app.use(
  cors({
    origin: [
      "https://foxbite.in",
      "https://www.foxbite.in",
      "https://foxbite-learning.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.options(/.*/, cors());
app.use(express.json({ extended: false }));

// Define Routes
app.get("/", (req, res) => res.send("Foxbite Learning API Running"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/pdfs", require("./routes/pdfs"));

// Future Routes
// app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
