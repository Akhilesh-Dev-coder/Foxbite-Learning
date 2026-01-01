const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Middleware to check if admin
const verifyAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== "admin") {
    return res.status(403).json({ msg: "Admin access required" });
  }
  next();
};

// @route   GET api/admin/users
// @desc    Get all users
// @access  Admin
router.get("/users", auth, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ role: 1, createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/users/:id/approve
// @desc    Approve/Block user
// @access  Admin
router.put("/users/:id/approve", auth, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.isApproved = !user.isApproved; // Toggle
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/users/:id/payment
// @desc    Toggle Payment Status
// @access  Admin
router.put("/users/:id/payment", auth, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.hasPaid = !user.hasPaid; // Toggle
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/users/:id/role
// @desc    Update User Role
// @access  Admin
router.put("/users/:id/role", auth, verifyAdmin, async (req, res) => {
  console.log("Update Role Request Received");
  console.log("Target User ID:", req.params.id);
  console.log("Body:", req.body);

  try {
    const { role } = req.body;
    if (!["student", "admin"].includes(role)) {
      console.log("Invalid Role:", role);
      return res.status(400).json({ msg: "Invalid role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    console.log(`Changing role from ${user.role} to ${role}`);
    user.role = role;
    // If promoting to admin, auto-approve
    if (role === "admin") {
      user.isApproved = true;
    }

    await user.save();
    console.log("Role updated successfully");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete User
// @access  Admin
router.delete("/users/:id", auth, verifyAdmin, async (req, res) => {
  console.log("Attempting to delete user:", req.params.id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ msg: "User not found" });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ msg: "Cannot delete yourself" });
    }

    await user.deleteOne();
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/users/:id/batch
// @desc    Update User Batch
// @access  Admin
router.put("/users/:id/batch", auth, verifyAdmin, async (req, res) => {
  console.log(
    "Batch update request received for:",
    req.params.id,
    "New Batch:",
    req.body.batch
  );
  try {
    const { batch } = req.body;
    // Validate batch if needed (e.g., must be '+1' or '+2')

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.batch = batch;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/admin/users/:id/password
// @desc    Admin Reset User Password
// @access  Admin
router.put("/users/:id/password", auth, verifyAdmin, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Hash the new password manually since we are updating directly
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.mustChangePassword = true; // Force user to change it on next login

    await user.save();
    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
