import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import auth from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";
import path from "path";

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO);
  console.log("database connected");
}

app.listen(3000, () => {
  console.log("server running at port 3000!");
});

app.use("/api/users", userRouter);
app.use("/api/auth", auth);
app.use("/api/posts", postRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})





// ======app middleware ========//
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
