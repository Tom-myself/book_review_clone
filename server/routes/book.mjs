import express from "express";
import env from "dotenv";
env.config();

import Book from "../models/book.mjs";
import reqestErrorHandller from "../helpers/errorHandller.mjs";

const router = express.Router();

// get books
router.get(
  "/",
  reqestErrorHandller(async (req, res) => {
    const books = await Book.find();
    res.json(books);
  })
);

// get a book
router.get(
  "/:id",
  reqestErrorHandller(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.json(book);
  })
);

// get categorized books
router.get(
  "/category/:category",
  reqestErrorHandller(async (req, res) => {
    const { category } = req.params;
    const sortedBooks = await Book.find({ category });
    if (!sortedBooks) {
      return res.status(404).json({ msg: "Not Found" });
    }
    res.json(sortedBooks);
  })
);

// create a book
router.post(
  "/",
  reqestErrorHandller(async (req, res) => {
    const body = req.body;
    const newBook = new Book(body);
    await newBook.save();
    res.status(201).json(newBook);
  })
);

// update a book
router.patch(
  "/:id",
  reqestErrorHandller(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true, // 更新後のデータを返す
      runValidators: true, // バリデーションを実行する
    });
    res.json(updatedBook);
  })
);

// delete a book
router.delete(
  "/:id",
  reqestErrorHandller(async (req, res) => {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    res.json({ msg: "Deleted successed" });
  })
);

export default router;
