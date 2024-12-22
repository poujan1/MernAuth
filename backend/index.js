import express from "express";
import { connectDb } from "./db/connectdb.js";
import { router as authRouter } from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello server");
});

server.use("/api/auth", authRouter);

const connect = connectDb();
connect.then(() => {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`sever is running at port :${PORT}`);
  });
});
