import React, { useEffect, useState, createContext } from "react";
import Books from "../components/Books";
import bookApi from "../api/bookApi.mjs";
import { useBookDispatch, useBooks } from "../context/AppContext";
import { set } from "mongoose";
import { Card, Container, Heading, Highlight, Button } from "@chakra-ui/react";

function Home() {
  // const [books, setBooks] = useState([]);
  // const [category, setCategory] = useState("mystery");
  // const [isCategorized, setIsCategorized] = useState(true);
  const [key, setKey] = useState(0); // 再レンダリング用キー
  const books = useBooks();

  useEffect(() => {
    setKey((prev) => prev + 1);
    // console.log(books)
  }, [books]);
  // const bookDispatch = useBookDispatch();

  // const handleCategorize = (category) => {
  //   setIsCategorized(false);
  //   if (!isCategorized) {
  //     bookApi.getAllBooks().then((_books) => {
  //       // console.log(_books);
  //       bookDispatch({ type: "books/init", books: _books });
  //     });
  //   }
  //   // console.log(category);

  //   bookApi.getBooksByCategory(category).then((_books) => {
  //     // console.log(_books);
  //     setIsCategorized((prev) => !prev);
  //     bookDispatch({ type: "books/categorize", books: _books });
  //   });
  // };

  // useEffect(() => {
  //   bookApi.getAllBooks().then(_books => {
  //       console.log(_books)
  //       bookDispatch({type: "books/init", books: _books})
  //   })
  //   console.log(books);
  //   console.log(isCategorized);
  // }, [books]);

  return (
    <>
      <Container color={"blackAlpha.700"} width={"80%"} m={"auto"}>
        <Heading fontSize={"3xl"} textAlign={"center"} my={"50px"}>
          <Highlight
            query="Book Review"
            styles={{
              color: "white",
              bgColor: "blackAlpha.700",
              p: "5px",
              py: "none",
              borderRadius: "7px",
            }}
          >
            Book Review Site
          </Highlight>
        </Heading>
      </Container>
      <Books books={books} />
      <div className="container">
        {/* <select onChange={(e) => setCategory(e.target.value)}>
          <option value="mystery">ミステリー</option>
          <option value="love">恋愛</option>
          <option value="fantasy">ファンタジー</option>
          <option value="history">歴史</option>
          <option value="nonfiction">ノンフィクション</option>
          <option value="essay">エッセイ</option>
          <option value="lightNovel">ライトノベル</option>
        </select>
        <button onClick={() => handleCategorize(category)}>入れ替える</button>
        <button
          onClick={() =>
            bookApi.getAllBooks().then((_books) => {
              // console.log(_books);
              bookDispatch({ type: "books/init", books: _books });
            })
          }
        >
          解除
        </button> */}
      </div>
    </>
  );
}

export default Home;
