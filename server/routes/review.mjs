import express from "express";
import Review from "../models/review.mjs";
import reqestErrorHandller from "../helpers/errorHandller.mjs";

const router = express.Router();

// get reviews which are related to clicked book
router.get(
  "/:bookId",
  reqestErrorHandller(async (req, res) => {
    const { bookId } = req.params;
    if (!bookId) return res.status(404).json({ msg: "Not Found" });
    const reviews = await Review.find({ bookId });
    res.json(reviews);
  })
);

// get a review
router.get(
  "/:reviewId",
  reqestErrorHandller(async (req, res) => {
    const { bookId, reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId, bookId });
    res.json(review);
  })
);

// add a review
router.post(
  "/",
  reqestErrorHandller(async (req, res) => {
    const body = req.body;
    const review = new Review(body);
    await review.save();
    res.status(201).json(review);
  })
);

// edit a review
router.patch(
  "/:reviewId",
  reqestErrorHandller(async (req, res) => {
    const { reviewId } = req.params;
    const body = req.body;
    const review = await Review.findByIdAndUpdate(reviewId, body, {
      new: true,
    });
    if (review === null) return res.status(404).json({ msg: "Not Found" });
    res.json(review);
  })
);

// delete a review
router.delete(
  "/:reviewId",
  reqestErrorHandller(async (req, res) => {
    const { reviewId } = req.params;
    const deletedReview = await Review.findById(reviewId);
    if (deletedReview.userId == req.session.user.id) {
      const review = await Review.findByIdAndDelete(reviewId);
      if (review === null) return res.status(404).json({ msg: "Not Found" });
    }
    const reviews = await Review.find();
    res.json(reviews);
  })
);

// toggle likes
router.get(
  "/:reviewId/likes",
  reqestErrorHandller(async (req, res) => {
    const review = await Review.findById(req.params.reviewId);
    //   if review don't press likes
    if (!review.likes.includes(req.session.user.id)) {
      await review.updateOne({ $push: { likes: req.session.user.id } });
      res.status(200).json("The post has been liked");
    } else {
      await review.updateOne({ $pull: { likes: req.session.user.id } });
      res.status(200).json("The post has been disliked");
    }
  })
);

export default router;
