import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.routes.js";

import eventRouter from "./routes/event.routes.js";
import userController from "./routes/user.routes.js";
import connectDB from "./config/db.js";

import { errorMiddleware } from "./middleware/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import registrationRouter from "./routes/registration.routes.js"

const app = express();

//<Middlewares>
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/registers",registrationRouter);
//</Middlewares>

app.use(errorMiddleware);

const PORT = process.env.PORT;
app.get("/", (_, res) => {
  res.send("Backend is on!");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});
