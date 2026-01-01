const mongoose = require("mongoose");
const User = require("../models/User");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const email = process.argv[2];

if (!email) {
  console.log(
    "Please provide an email address. Usage: node scripts/makeAdmin.js <email>"
  );
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const makeAdmin = async () => {
  await connectDB();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User not found with email: ${email}`);
      process.exit(1);
    }

    user.role = "admin";
    user.isApproved = true; // Admins should be approved automatically
    await user.save();

    console.log(`Success! User ${user.name} (${user.email}) is now an Admin.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

makeAdmin();
