import React, { useEffect } from "react";
import ReviewCard from "./cards/ReviewCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import { Heading, Box, Flex, Button } from "@chakra-ui/react";

function Review({ id }) {
  const navigate = useNavigate();
  const userId = useAuth();
  const location = useLocation();

  const handleClick = () => {
    if (!userId) navigate("/login", { state: { from: location } });
    else navigate(`/post/${id}`);
  };

  useEffect(() => {
    // console.log(location);
  });

  return (
    <Box color={"blackAlpha.700"} width={"80%"} m={"auto"} maxWidth={"800px"} mb={"40px"}>
      <Flex gap={"10px"} my={"30px"} alignItems={"center"}>
        <Heading>レビュー</Heading>
        <Button p={"7px"} variant="outline" onClick={handleClick}>
          この本のレビューを書く
        </Button>
      </Flex>
      <ReviewCard id={id} />
      {/* <div className="review-content">
        <div className="review-write">
          <h2>レビュー</h2>
          <button onClick={handleClick}>この本のレビューを書く</button>
        </div>
      </div> */}
    </Box>
  );
}

export default Review;
