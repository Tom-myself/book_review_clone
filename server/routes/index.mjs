import express from "express";
import bookRouter from "./book.mjs";
import reviewRouter from "./review.mjs"
import authRouter from "./auth.mjs"

const router = express.Router();

router.use("/book", bookRouter);
router.use("/review", reviewRouter);
router.use("/auth", authRouter);

export default router;