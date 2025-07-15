import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import eventRouter from "./routes/event.route.js";
import userRouter from "./routes/user.route.js";


import connectDB from "./config/db.js";

import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

//<Middlewares>
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/api/event", eventRouter);
app.use("/auth", userRouter);
//</Middlewares>

app.use(errorMiddleware);

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Backend is on!");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`server is running successfully on http://localhost:${PORT}`);
});
