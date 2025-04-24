import React, { useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useBookDispatch, useBooks } from "../context/AppContext";
import { useForm } from "react-hook-form";
import bookApi from "../api/bookApi.mjs";
import Review from "../components/Review";
import {
  Button,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Stack,
  Textarea,
} from "@chakra-ui/react";

function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const books = useBooks();
  const dispatch = useBookDispatch();
  const userId = useAuth();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputs) => {
    const editedBook = {
      id: id,
      title: inputs.title,
      auth: inputs.auth,
      category: inputs.category,
      summary: inputs.summary,
    };
    // console.log(editedBook);
    bookApi
      .updateBook(editedBook)
      .then((_book) => {
        dispatch({ type: "books/update", book: _book });
        bookApi.getAllBooks().then((_books) => {
          dispatch({ type: "books/init", books: _books });
        });
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleDelete = () => {
    bookApi
      .deleteBook(id)
      .then(() => {
        dispatch({ type: "books/delete", bookId: id });
        bookApi.getAllBooks().then((_books) => {
          dispatch({ type: "books/init", books: _books });
        });
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    bookApi.getBook(id).then((_book) => {
      setValue("title", _book.title);
      setValue("auth", _book.auth);
      setValue("category", _book.category);
      setValue("summary", _book.summary);
    });
  }, [setValue, id]);

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
            詳細画面
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
            <Textarea p={"10px"} {...register("summary")} />
            {errors.auth && (
              <Field.ErrorText>{errors.auth.message}</Field.ErrorText>
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
          edit
        </Button>
        {userId && (
          <Button
            type="submit"
            width={"80%"}
            m={"auto"}
            onClick={handleDelete}
            bg={"tomato"}
            mb={"20px"}
          >
            delete
          </Button>
        )}
      </Fieldset.Root>

      {/* <div className="form-container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content">
            <label>タイトル</label>
            <input
              type="text"
              {...register("title", { required: "タイトルは必須です" })}
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
            />
            {errors.auth && (
              <div className="error-msg">{errors.auth.message}</div>
            )}
          </div>
          <div className="form-content">
            <label>カテゴリ</label>
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
          <button className="form-button">編集を確定する</button>
        </form>
        <button className="form-button delete-button" onClick={handleDelete}>
          削除する
        </button>
      </div> */}
      <Review id={id} />
    </>
  );
}

export default Book;
