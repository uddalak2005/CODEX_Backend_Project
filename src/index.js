import express from "express";
import "dotenv/config";
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Backend is on!");
});
app.listen(PORT, () => {
  console.log(`server is running successfully on http://localhost:${PORT}`);
});
