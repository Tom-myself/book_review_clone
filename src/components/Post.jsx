import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-stars";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import reviewApi from "../api/reviewApi.mjs";
import { useAuth, useReviewDispatch } from "../context/AppContext";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(3);
  const reviewDispatch = useReviewDispatch();
  const userId = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputs) => {
    const post = {
      username: inputs.username,
      bookId: id,
      userId,
      reviewTitle: inputs.reviewTitle,
      reviewText: inputs.reviewText,
      rating: rating,
    };
    if (userId) {
      reviewApi
        .createReview(post)
        .then(() => {
          reviewDispatch({ type: "review/create", review: post });
          navigate(`/book/${id}`);
        })
        .catch((e) => {
          // console.log(e);
        });
    } else navigate("/login");
    // console.log(post, inputs);
  };

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <>
      <Fieldset.Root
        maxWidth={"800px"}
        border={"2px solid gray"}
        borderRadius={"7px"}
        p={"10px"}
        width={"80%"}
        m={"auto"}
        my={"60px"}
      >
        <Stack>
          <Fieldset.Legend fontSize={"2xl"} textAlign={"center"} my={"30px"}>
            レビュー投稿フォーム
          </Fieldset.Legend>
        </Stack>

        <Fieldset.Content width={"80%"} m={"auto"}>
          <Field.Root invalid={!!errors.username}>
            <Field.Label type="text">ユーザー名</Field.Label>
            <Input
              p={"10px"}
              placeholder="ユーザー名"
              {...register("username", { required: "ユーザー名は必須です" })}
            />
            {errors.username && (
              <Field.ErrorText>{errors.username.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.reviewTitle}>
            <Field.Label>レビューのタイトル</Field.Label>
            <Input
              p={"10px"}
              placeholder="レビューのタイトル"
              {...register("reviewTitle", {
                required: "レビューのタイトルは必須です",
              })}
            />
            {errors.reviewTitle && (
              <Field.ErrorText>{errors.reviewTitle.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.reviewText}>
            <Field.Label>本文</Field.Label>
            <Textarea
              p={"10px"}
              placeholder="レビューの本文を入力してください"
              {...register("reviewText", { required: "本文は必須です" })}
            />
            {errors.reviewText && (
              <Field.ErrorText>{errors.reviewText.message}</Field.ErrorText>
            )}
          </Field.Root>
          <div>
            <p>評価</p>
            <ReactStars
              count={5} // 星の数
              value={rating} // 現在の評価値
              onChange={setRating} // 評価値が変わるたびに状態を更新
              size={30} // 星のサイズ
              color2={"#ffd700"} // 評価された星の色
            />
          </div>
        </Fieldset.Content>

        <Button
          type="submit"
          width={"80%"}
          m={"auto"}
          my={"40px"}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Fieldset.Root>

      {/* <div className="form-container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>レビュー投稿フォーム</h2>
          <div className="form-content">
            <p>ユーザー名</p>
            <input
              type="text"
              placeholder="ユーザー名"
              {...register("username", { required: "ユーザー名は必須です" })}
            />
            {errors.username && (
              <div className="error-msg">{errors.username.message}</div>
            )}
          </div>
          <div className="form-content">
            <p>レビューのタイトル</p>
            <input
              type="text"
              placeholder="レビューのタイトル"
              {...register("reviewTitle", {
                required: "レビューのタイトルは必須です",
              })}
            />
            {errors.reviewTitle && (
              <div className="error-msg">{errors.reviewTitle.message}</div>
            )}
          </div>
          <div className="form-content">
            <p>本文</p>
            <textarea
              type="text"
              placeholder="レビューの本文を入力してください"
              {...register("reviewText", { required: "本文は必須です" })}
            />
            {errors.reviewText && (
              <div className="error-msg">{errors.reviewText.message}</div>
            )}
          </div>
          <div className="form-content">
            <p>評価</p>
            <ReactStars
              count={5} // 星の数
              value={rating} // 現在の評価値
              onChange={setRating} // 評価値が変わるたびに状態を更新
              size={30} // 星のサイズ
              color2={"#ffd700"} // 評価された星の色
              className="star-rating"
            />
          </div>
          <button className="form-button">投稿</button>
        </form>
      </div> */}
    </>
  );
}

export default Post;
