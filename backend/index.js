import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
