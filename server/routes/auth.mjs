import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.mjs";
import reqestErrorHandller from "../helpers/errorHandller.mjs";

const router = express.Router();

// create user
router.post(
  "/register",
  reqestErrorHandller(async (req, res) => {
    const { password, ...userData } = req.body;
    const salt = await bcrypt.genSalt(12); // Generate a salt with 12 rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ ...userData, password: hashedPassword });
    const savedUser = await newUser.save();
    req.session.user = { id: savedUser._id };
    res.json({ msg: "User registered successfully", userId: savedUser._id });
  })
);

// login user
router.post(
  "/login",
  reqestErrorHandller(async (req, res) => {
    const { password, email } = req.body;
    // const salt = await bcrypt.genSalt(12); // Generate a salt with 12 rounds
    // const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ msg: "Invalid password" });

    req.session.user = { id: user._id };
    // セッション情報が保存されたことを確認
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ msg: "Error saving session" });
      }
    });
    // console.log("Session after login:", req.session.user); // デバッグ用
    res.json({ msg: "Login successfully", userId: user._id });
  })
);

// logout user
router.post(
  "/logout",
  reqestErrorHandller(async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Failed to destroy session:", err);
        return res.status(500).json({ msg: "Failed to log out" });
      }
      res.json({ msg: "Logout successfully" });
    });
  })
);

export default router;
