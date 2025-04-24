// import axios from "axios";

// const ENDPOINT_URL = "http://localhost:8080/api/auth";

// const authApi = {
//   async register(body) {
//     const result = await axios.post(ENDPOINT_URL + "/register", body);
//     const {email, password} = body;
//     await axios.post(
//       ENDPOINT_URL + "/login",
//       { email, password },
//       {
//         withCredentials: true, // クッキーを送信する設定
//       }
//     );

//     return result.data;
//   },
//   async login(body) {
//     const result = await axios.post(ENDPOINT_URL + "/login", body);
//     const {email, password} = body;
//     await axios.post(
//       ENDPOINT_URL + "/login",
//       { email, password },
//       {
//         withCredentials: true, // クッキーを送信する設定
//       }
//     );

//     return result.data;
//   },
//   async logout() {
//     const result = await axios.post(ENDPOINT_URL + "/logout");
//     return result.data;
//   },
// };

// export default authApi;

import axios from "axios";

const ENDPOINT_URL = "/api/auth";

const authApi = {
  async register(body) {
    // ユーザー登録処理
    // const result = await axios.post(ENDPOINT_URL + "/register", body);

    // // 登録後に自動でログインする場合（email と password が body に含まれていることを前提）
    // const { email, password } = body; // body から email と password を取得

    // ログイン処理
    const result = await axios.post(
      ENDPOINT_URL + "/register",
      body,
      {
        withCredentials: true, // クッキーを送信する設定
      }
    );

    return result.data;
  },

  async login(body) {
    // ログイン処理
    const { email, password } = body; // body から email と password を取得

    const result = await axios.post(
      ENDPOINT_URL + "/login",
      { email, password },
      {
        withCredentials: true, // クッキーを送信する設定
      }
    );

    return result.data;
  },

  async logout() {
    const result = await axios.post(ENDPOINT_URL + "/logout");
    return result.data;
  },
};

export default authApi;
