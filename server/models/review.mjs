import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    username:{type: String},
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5, default: 3 },
    reviewTitle: { type: String, required: true },
    reviewText: { type: String, required: true },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);

export default Review;
