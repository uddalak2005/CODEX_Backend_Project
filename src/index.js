import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import eventRouter from "./routes/event.routes.js";
import connectDB from "./config/db.js";
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
//</Middlewares>

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Backend is on!");
});
app.listen(PORT, () => {
  connectDB();
  console.log(`server is running successfully on http://localhost:${PORT}`);
});
