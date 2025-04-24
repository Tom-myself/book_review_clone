import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApi from "../api/authApi.mjs";
import { useAuth, useAuthDispatch } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = useAuth();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const onSubmit = (inputs) => {
    // console.log(inputs);
    authApi
      .login(inputs)
      .then((_data) => {
        // setError(_data)
        authDispatch({ type: "auth/login", auth: _data.userId });
        // 元のページ（`location.state.from`）があればそこに戻る、なければホームへ
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((e) => {
        console.log(e.response.data.msg);
        setError(e.response.data.msg);
      });
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

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

        {error && <Text color={"red.500"}>{error}</Text>}
        
        <Button
          type="submit"
          width={"80%"}
          m={"auto"}
          my={"40px"}
          onClick={handleSubmit(onSubmit)}
        >
          ログイン
        </Button>
        <ChakraLink
          href="/register"
          variant="underline"
          color={"blue.600"}
          m={"auto"}
          mb={"10px"}
        >
          新規登録はこちら
        </ChakraLink>
      </Fieldset.Root>

      {/* <div className="form-container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <h2>ログイン</h2>
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
            {error && <div className="error-msg">{error}</div>}
          </div>
          <button className="form-button">ログイン</button>
        </form>
        <Link to={"/register"}>新規登録はこちら</Link>
      </div> */}
    </>
  );
}

export default Login;
