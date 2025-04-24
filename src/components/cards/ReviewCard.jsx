import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import reviewApi from "../../api/reviewApi.mjs";
import { useAuth, useReviewDispatch } from "../../context/AppContext";
import authApi from "../../api/authApi.mjs";
import {
  Card,
  Heading,
  Stack,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

function ReviewCard({ id }) {
  const [reviews, setReviews] = useState([]);
  const userId = useAuth();
  const reviewDispatch = useReviewDispatch();

  useEffect(() => {
    reviewApi.getReviews(id).then((_review) => {
      // console.log(_review);
      setReviews(_review);
    });
  }, [id]);

  const deleteReview = (review) => {
    console.log(review);
    reviewApi.deleteReview(review).then((_reviews) => {
      reviewDispatch({ type: "review/delete", review: _reviews });
      reviewApi.getReviews(id).then((_review) => {
        // console.log(_review);
        setReviews(_review);
      });
    });
  };

  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          return (
            <>
              <Stack key={review._id}>
                <Card.Root p={"15px"}>
                  <Card.Header>
                    <Heading>{review.username}</Heading>
                  </Card.Header>
                  <Flex>
                    <Card.Body>
                      <Flex
                        gap={"6px"}
                        alignItems={"center"}
                        justifyContent={"start"}
                      >
                        <ReactStars
                          count={5} // 星の数
                          value={review.rating} // 現在の評価値
                          size={20} // 星のサイズ
                          color2={"#ffd700"} // 評価された星の色
                          edit={false}
                        />
                      <Heading mx={"5px"} size={"md"}>{review.reviewTitle}</Heading>
                      </Flex>
                      <Text my={"10px"}>{review.reviewText}</Text>
                    </Card.Body>
                    <Flex justifyContent={"space-between"} alignItems={"flex-end"}>
                      {userId === review.userId && (
                        <Button  onClick={() => deleteReview(review)}>
                          削除
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                </Card.Root>
              </Stack>
              {/* <div key={review._id} className="review-card">
                <h3>{review.username}</h3>
                <div style={{ display: "flex", gap: "10px" }}>
                  <ReactStars
                    count={5} // 星の数
                    value={review.rating} // 現在の評価値
                    size={20} // 星のサイズ
                    color2={"#ffd700"} // 評価された星の色
                    edit={false}
                  />
                  <h3>{review.reviewTitle}</h3>
                </div>
                <p>{review.reviewText}</p>
                {userId === review.userId && (
                  <button onClick={() => deleteReview(review)}>削除</button>
                )}
              </div> */}
            </>
          );
        })
      ) : (
        <div className="review-card">レビューはまだありません</div>
      )}
    </>
  );
}

export default ReviewCard;
