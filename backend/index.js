import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors";
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
import orderRoute from "./route/orderRoute.js";
import progressRoutes from "./route/progress.js"; // Fixed path

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Your routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/order", orderRoute);
app.use("/api/progress", progressRoutes); // Progress routes

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
