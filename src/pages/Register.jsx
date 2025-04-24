import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApi from "../api/authApi.mjs";
import { useAuth, useAuthDispatch } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = useAuth();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  const onSubmit = (inputs) => {
    // console.log(inputs);
    authApi
      .register(inputs)
      .then((_data) => {
        console.log(_data)
        authDispatch({ type: "auth/register", auth: _data.userId });
        // 元のページ（`location.state.from`）があればそこに戻る、なければホームへ
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  useEffect(() => {
    // console.log(userId);
  }, [userId]);

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
            ログインフォーム
          </Fieldset.Legend>
        </Stack>

        <Fieldset.Content width={"80%"} m={"auto"}>

          <Field.Root invalid={!!errors.username} my={"10px"}>
            <Field.Label type="mail">ユーザー名</Field.Label>
            <Input
              p={"10px"}
              {...register("username", { required: "ユーザー名は必須です" })}
              placeholder="メールアドレス"
            />
            {errors.username && (
              <Field.ErrorText>{errors.username.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.email} my={"10px"}>
            <Field.Label type="mail">メールアドレス</Field.Label>
            <Input
              p={"10px"}
              {...register("email", { required: "メールアドレスは必須です" })}
              placeholder="メールアドレス"
            />
            {errors.email && (
              <Field.ErrorText>{errors.email.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.password} my={"10px"}>
            <Field.Label>パスワード</Field.Label>
            <Input
              type="password"
              placeholder={"パスワード"}
              p={"10px"}
              {...register("password", {
                required: "パスワートは必須です",
                minLength: {
                  value: 5,
                  message: "５文字以上で入力してください",
                },
              })}
            />
            {errors.password && (
              <Field.ErrorText>{errors.password.message}</Field.ErrorText>
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
          登録
        </Button>
      </Fieldset.Root>

      {/* <div className="form-container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>新規登録フォーム</h2>
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
            <p>メールアドレス</p>
            <input
              type="text"
              placeholder="メールアドレス"
              {...register("email", { required: "メールアドレスは必須です" })}
            />
            {errors.email && (
              <div className="error-msg">{errors.email.message}</div>
            )}
          </div>
          <div className="form-content">
            <p>パスワード</p>
            <input
              type="password"
              placeholder="パスワード"
              {...register("password", {
                required: "パスワートは必須です",
                minLength: {
                  value: 5,
                  message: "５文字以上で入力してください",
                },
              })}
            />
            {errors.password && (
              <div className="error-msg">{errors.password.message}</div>
            )}
          </div>
          <button className="form-button">新規登録</button>
        </form>
      </div> */}
    </>
  );
}

export default Register;
