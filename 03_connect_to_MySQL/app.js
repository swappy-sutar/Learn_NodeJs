import express from "express";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.send({
    message: "Server is running...",
  });
});

import userRouter from "./Routes/user.Routes.js";

app.use("/api/v1",userRouter);

export { app };
