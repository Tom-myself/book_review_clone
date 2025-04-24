import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Book from "../pages/Book";
import { Box, Button, Card, Flex } from "@chakra-ui/react";

const Books = ({ books }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [key, setKey] = useState(0); // 再レンダリング用キー

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [books]);

  return (
    <>
      <Flex
        width={"80%"}
        m={"auto"}
        maxWidth={"1200px"}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {books.map((_book) => {
          return (
            // <div
            //   className="card-content"
            //   key={_book._id}
            // onClick={() => {
            //   setIsEdit((prev) => !prev);
            //   return navigate(`/book/${_book._id}`);
            // }}
            // >
            //   <div className="card-text">
            //     <p>タイトル</p>
            //     <p>{_book.title}</p>
            //   </div>
            //   <div className="card-text">
            //     <p>著者</p>
            //     <p>{_book.auth}</p>
            //   </div>
            //   {/* {isEdit && <Book book={_book} />} */}
            // </div>
            <Card.Root
              width={"300px"}
              p={"10px"}
              my={"20px"}
              mx={{ base: "auto" }}
              key={_book.id}
            >
              <Card.Body gap="2">
                <Card.Title mt="2" fontSize={"2xl"}>
                  {_book.title}
                </Card.Title>
                <Card.Description fontSize={"xl"}>
                  著者:{_book.auth}
                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEdit((prev) => !prev);
                    return navigate(`/book/${_book._id}`);
                  }}
                >
                  詳細
                </Button>
              </Card.Footer>
            </Card.Root>
          );
        })}
      </Flex>
    </>
  );
};

export default Books;
