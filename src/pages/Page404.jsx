import { Box, Heading, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <>
      <Box maxWidth={"800px"} width={"80%"} m={"auto"} my={"60px"}>
        <Heading textAlign={"center"}>お探しのページは見つかりません</Heading>
        <Box textAlign={"center"} my={"30px"}>
          <ChakraLink variant={"underline"} href="/">
            topに戻る
          </ChakraLink>
        </Box>
      </Box>
      {/* <div className="page404">
        <h3>お探しのページは見つかりません</h3>
      </div> */}
    </>
  );
}

export default Page404;
