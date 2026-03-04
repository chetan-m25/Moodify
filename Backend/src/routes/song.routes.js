import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadSong, getSong } from "../controllers/song.controller.js";

const songRouter = Router();

songRouter.post("/", upload.single("song"), uploadSong);

songRouter.get("/", getSong);

export default songRouter;
