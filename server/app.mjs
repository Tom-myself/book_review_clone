// import path from "path";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import env from "dotenv";
env.config();

import apiRoutes from "./routes/index.mjs";

const app = express();
const port = 8082;

mongoose.connect(process.env.MONGO_URI);

// app.use(express.static("dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // クッキーの有効期限（例：1日）
    },
  })
);
app.use("/api", apiRoutes);

// app.get("*", (req, res) => {
//   const indexHtml = path.resolve("dist", "index.html");
//   res.sendFile(indexHtml);
// });

app.listen(port, () => {
  console.log(`Server start: http://localhost:${port}`);
});
