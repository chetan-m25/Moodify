import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadSong, getSong } from "../controllers/song.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const songRouter = Router();

songRouter.post("/", authUser, upload.single("song"), uploadSong);

songRouter.get("/", getSong);

export default songRouter;
