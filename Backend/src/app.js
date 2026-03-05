import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
  }),
);

import authRouter from "./routes/auth.routes.js";
import songRouter from "./routes/song.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);

export default app;
