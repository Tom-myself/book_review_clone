import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bookApi from "../api/bookApi.mjs";
import {
  Button,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";

function Form({ dispatch }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (inputs) => {
    console.log(inputs);
    bookApi
      .createBook(inputs)
      .then((_book) => {
        dispatch({ type: "books/create", book: inputs });
        bookApi.getAllBooks().then((_books) => {
          // console.log(_books);
          dispatch({ type: "books/init", books: _books });
        });
        navigate("/");
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <div>
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
            新規作成フォーム
          </Fieldset.Legend>
        </Stack>

        <Fieldset.Content width={"80%"} m={"auto"}>
          <Field.Root invalid={!!errors.title}>
            <Field.Label type="text">タイトル</Field.Label>
            <Input
              p={"10px"}
              {...register("title", { required: "タイトルは必須です" })}
              placeholder="タイトル名"
            />
            {errors.title && (
              <Field.ErrorText>{errors.title.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.auth}>
            <Field.Label>著者</Field.Label>
            <Input
              placeholder={"著者名"}
              p={"10px"}
              {...register("auth", { required: "著者は必須です" })}
            />
            {errors.auth && (
              <Field.ErrorText>{errors.auth.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root>
            <Field.Label>カテゴリ</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field p={"10px"} {...register("category")}>
                <option value="mystery">ミステリー</option>
                <option value="love">恋愛</option>
                <option value="fantasy">ファンタジー</option>
                <option value="history">歴史</option>
                <option value="nonfiction">ノンフィクション</option>
                <option value="essay">エッセイ</option>
                <option value="lightNovel">ライトノベル</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>

          <Field.Root invalid={!!errors.summary}>
            <Field.Label>概要</Field.Label>
            <Textarea
              p={"10px"}
              {...register("summary", {
                maxLength: {
                  value: 100,
                  message: "100字以内で入力してください",
                },
              })}
            />
            {errors.summary && (
              <Field.ErrorText>{errors.summary.message}</Field.ErrorText>
            )}
          </Field.Root>
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
      {/* <form
        action=""
        className="form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>新規作成フォーム</h2>
        <div className="form-content">
          <label>タイトル</label>
          <input
            type="text"
            {...register("title", { required: "タイトルは必須です" })}
            placeholder="タイトル名"
          />
          {errors.title && (
            <div className="error-msg">{errors.title.message}</div>
          )}
        </div>
        <div className="form-content">
          <label>著者</label>
          <input
            type="text"
            {...register("auth", { required: "著者名は必須です" })}
            placeholder="著者名"
          />
          {errors.auth && (
            <div className="error-msg">{errors.auth.message}</div>
          )}
        </div>
        <div className="form-content">
          <select {...register("category")}>
            <option value="mystery">ミステリー</option>
            <option value="love">恋愛</option>
            <option value="fantasy">ファンタジー</option>
            <option value="history">歴史</option>
            <option value="nonfiction">ノンフィクション</option>
            <option value="essay">エッセイ</option>
            <option value="lightNovel">ライトノベル</option>
          </select>
        </div>
        <button className="form-button">新規作成</button>
      </form> */}
    </div>
  );
}

export default Form;
