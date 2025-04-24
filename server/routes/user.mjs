import express from "express";
import User from "../models/user.mjs";

const router = express.Router();

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: body,
    },
    { new: true }
  );
  res.json(updatedUser);
});

router.get("/profile/:userId", async (req, res) => {
    const {userId} = req.params;
    if (!req.session.user.id || !req.session.user)  return res.status(403).json({msg: "ログインしてください"});
    const user = await User.findById(userId);
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
})

export default router;
