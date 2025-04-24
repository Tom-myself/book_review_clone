import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useAuth,
  useAuthDispatch,
  useBookDispatch,
  useBooks,
} from "../context/AppContext";
import authApi from "../api/authApi.mjs";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  CloseButton,
  Highlight,
  useBreakpointValue,
  Drawer,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import bookApi from "../api/bookApi.mjs";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const userId = useAuth();
  const authDispatch = useAuthDispatch();

  const [category, setCategory] = useState("mystery");
  const [isCategorized, setIsCategorized] = useState(true);

  const books = useBooks();
  const bookDispatch = useBookDispatch();

  const handleCategorize = (category) => {
    setIsCategorized(false);
    if (!isCategorized) {
      bookApi.getAllBooks().then((_books) => {
        // console.log(_books);
        bookDispatch({ type: "books/init", books: _books });
      });
    }
    // console.log(category);

    bookApi.getBooksByCategory(category).then((_books) => {
      // console.log(_books);
      setIsCategorized((prev) => !prev);
      bookDispatch({ type: "books/categorize", books: _books });
    });
  };
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    authApi
      .logout(userId)
      .then(() => {
        authDispatch({ type: "auth/logout" });
        // console.log(userId);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <>
      <Box
        p={{ base: "10px", sm: "20px" }}
        bg={"white"}
        color={"blackAlpha.700"}
        borderBottom="2px solid"
      >
        <Flex justifyContent={"space-between"}>
          <Heading fontSize={{ base: "xl", sm: "3xl" }} my={"20px"}>
            <Link to={"/"}>
              <Highlight
                query="Book Review"
                styles={{
                  color: "white",
                  bgColor: "blackAlpha.700",
                  p: "5px",
                  borderRadius: "7px",
                }}
              >
                Book Review Site
              </Highlight>
            </Link>
          </Heading>

          <Flex alignItems={"center"}>
            <LuSearch />
            <select
              onChange={(e) => setCategory(e.target.value)}
              style={isMobile ? { width: "18px", p: "auto" } : {}}
            >
              <option value="mystery">ミステリー</option>
              <option value="love">恋愛</option>
              <option value="fantasy">ファンタジー</option>
              <option value="history">歴史</option>
              <option value="nonfiction">ノンフィクション</option>
              <option value="essay">エッセイ</option>
              <option value="lightNovel">ライトノベル</option>
            </select>
            <Button
              onClick={() => handleCategorize(category)}
              bg="bg.subtle"
              variant="outline"
              p={"2px"}
            >
              sort
            </Button>
            <CloseButton
              onClick={() =>
                bookApi.getAllBooks().then((_books) => {
                  // console.log(_books);
                  bookDispatch({ type: "books/init", books: _books });
                })
              }
            />
          </Flex>
          {/* <Flex gap={"20px"} alignItems={"center"}>
            {userId ? (
              <Link to="/form" fontWeight={"bold"} fontSize={"17px"}>
                <Text fontWeight={"bold"} fontSize={"17px"}>
                  {" "}
                  新規作成
                </Text>
              </Link>
            ) : (
              <ChakraLink href="/login" fontWeight={"bold"} fontSize={"17px"}>
                ログインして新規作成
              </ChakraLink>
            )}
            {!userId ? (
              <ChakraLink href="/login" fontWeight={"bold"} fontSize={"17px"}>
                ログイン
              </ChakraLink>
            ) : (
              <ChakraLink
                onClick={handleLogout}
                fontWeight={"bold"}
                fontSize={"17px"}
              >
                ログアウト
              </ChakraLink>
            )}
          </Flex> */}
          {isMobile ? (
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <Button variant="outline" m={"auto"} mx={"0px"} p={"7px"}>
                  Open Drawer
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content p={"20px"}>
                    <Drawer.Body>
                      {userId ? (
                        <Link to="/form" fontWeight={"bold"} fontSize={"17px"}>
                          <Text fontWeight={"bold"} fontSize={"17px"}>
                            {" "}
                            新規作成
                          </Text>
                        </Link>
                      ) : (
                        <ChakraLink
                          href="/login"
                          fontWeight={"bold"}
                          fontSize={"17px"}
                          display={"block"}
                          my={"20px"}
                        >
                          ログインして新規作成
                        </ChakraLink>
                      )}
                      {!userId ? (
                        <ChakraLink
                          href="/login"
                          fontWeight={"bold"}
                          fontSize={"17px"}
                        >
                          ログイン
                        </ChakraLink>
                      ) : (
                        <ChakraLink
                          onClick={handleLogout}
                          fontWeight={"bold"}
                          fontSize={"17px"}
                          my={"20px"}
                        >
                          ログアウト
                        </ChakraLink>
                      )}
                    </Drawer.Body>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          ) : (
            <Flex gap={"20px"} alignItems={"center"}>
              {userId ? (
                <Link to="/form" fontWeight={"bold"} fontSize={"17px"}>
                  <Text fontWeight={"bold"} fontSize={"17px"}>
                    {" "}
                    新規作成
                  </Text>
                </Link>
              ) : (
                <ChakraLink href="/login" fontWeight={"bold"} fontSize={"17px"}>
                  ログインして新規作成
                </ChakraLink>
              )}
              {!userId ? (
                <ChakraLink href="/login" fontWeight={"bold"} fontSize={"17px"}>
                  ログイン
                </ChakraLink>
              ) : (
                <ChakraLink
                  onClick={handleLogout}
                  fontWeight={"bold"}
                  fontSize={"17px"}
                >
                  ログアウト
                </ChakraLink>
              )}
            </Flex>
          )}
        </Flex>
      </Box>
      {/* <div className="header-bg">
        <div className="header-container">
          <Link to={"/"}>
            <h1>Books Review Site</h1>
          </Link>
          <ul className="header-list">
            {userId ? (
              <Link to={"/form"}>
                <li>新規作成</li>
              </Link>
            ) : (
              <Link to={"/login"}>
                <li>ログインして新規作成</li>
              </Link>
            )}
            {!userId ? (
              <Link to={"/login"}>
                <li>ログイン</li>
              </Link>
            ) : (
              <li onClick={handleLogout}>ログアウト</li>
            )}
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default Header;
