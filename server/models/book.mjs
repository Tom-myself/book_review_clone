import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    auth: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      max: 100,
    },
    
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);

export default Book;