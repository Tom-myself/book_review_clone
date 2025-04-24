import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { db } from "../db/db.mjs";
import bookApi from "../api/bookApi.mjs";

const BookContext = createContext();
const BookDispatchContext = createContext();
const useBooks = () => useContext(BookContext);
const useBookDispatch = () => useContext(BookDispatchContext);

const ReviewContext = createContext();
const ReviewDispatchContext = createContext();
const useReviews = () => useContext(ReviewContext);
const useReviewDispatch = () => useContext(ReviewDispatchContext);

const AuthContext = createContext();
const AuthDispatchContext = createContext();
const useAuth = () => useContext(AuthContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

// const UserIdContext = createContext();
// const useUserId = () => useContext(UserIdContext);

const reducer = (books, action) => {
  switch (action.type) {
    case "books/init":
      return action.books;
    case "books/create":
      return [...books, action.book]; //action.bookを配列に追加する
    case "books/update":
      const updatedBooks = books.map((_book) => {
        // console.log(_book._id)
        // console.log(action.book._id === _book._id)
        return _book._id === action.book.id
          ? { ..._book, ...action.book }   //同じidのbookを上書きする
          : _book;
      });
      // console.log(updatedBooks)
      return [...updatedBooks];
    case "books/delete":
      const deletedBooks = books.filter((_book) => _book._id !== action.bookId);
      return [...deletedBooks];
    case "books/categorize":
      return action.books;
    default:
      return books;
  }
};
const bookReducer = (books, action) => {
  switch (action.type) {
    // crud books
    case "books/init":
      return action.books;
    case "books/create":
      return [...books, action.book];
    case "books/patch":
      const updatedBooks = books.map((_book) =>
        _book.id === action.book.id ? { ..._book, ...action.book } : _book
      );
      return [...updatedBooks];
    case "books/delete":
      const deletedBooks = books.filter((_book) => _book.id !== action.book.id);
      return [...deletedBooks];
    default:
      books;
  }
};

const reviewReducer = (reviews, action) => {
  switch (action.type) {
    // crud reviews
    case "reviews":
      return action.review;
    case "review":
      return action.review;
    case "review/create":
      return [...reviews, action.review];
    case "review/update":
      const updatedReviews = reviews.map((_review) => {
        return _review._id === action.review._id
          ? { ..._review, ...action.review }
          : _review;
      });
      return updatedReviews;
    case "review/delete":
      const deletedReviews = reviews.filter(
        (_review) => _review._id !== action.review._id
      );
      return deletedReviews;
    default:
      return reviews;
  }
};

const authReducer = (auth, action) => {
  switch (action.type) {
    case "auth/register":
      return action.auth;
    case "auth/login":
      return action.auth;
    case "auth/logout":
      return null;
    default:
      return auth;
  }
};

const AppProvider = ({ children }) => {
  const [books, dispatch] = useReducer(reducer, []);
  const [reviews, reviewDispatch] = useReducer(reviewReducer, []);
  const [user, authDispatch] = useReducer(authReducer, "");

  useEffect(() => {
    bookApi.getAllBooks().then((_books) => {
      // console.log(_books);
      dispatch({ type: "books/init", books: _books });
    });
  }, []);
  //   const createBook = (book) => {
  //     const newBook = {
  //       id: books.length,
  //       title: book.title,
  //       auth: book.auth,
  //       category: book.category,
  //     };
  //     setBooks([...books, newBook]);
  //   };

  return (
    <BookContext.Provider value={books}>
      <BookDispatchContext.Provider value={dispatch}>
        <ReviewContext.Provider value={reviews}>
          <ReviewDispatchContext.Provider value={reviewDispatch}>
            <AuthContext.Provider value={user}>
              <AuthDispatchContext.Provider value={authDispatch}>
                {children}
              </AuthDispatchContext.Provider>
            </AuthContext.Provider>
          </ReviewDispatchContext.Provider>
        </ReviewContext.Provider>
      </BookDispatchContext.Provider>
    </BookContext.Provider>
  );
};

export {
  AppProvider,
  useBookDispatch,
  useBooks,
  useReviews,
  useReviewDispatch,
  useAuth,
  useAuthDispatch,
};
