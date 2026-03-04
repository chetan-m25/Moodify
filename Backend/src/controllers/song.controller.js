import songModel from "../models/song.model.js";
import id3 from "node-id3";
import { uploadFile } from "../services/storage.service.js";

async function uploadSong(req, res) {
  if (!req.file) {
    return res.status(400).json({
      message: "Song file is required",
    });
  }

  const songBuffer = req.file.buffer;
  const { mood } = req.body;
  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    uploadFile({
      buffer: songBuffer,
      filename: `${tags.title}.mp3`,
      folder: "/Moodify/songs",
    }),
    uploadFile({
      buffer: tags.image?.imageBuffer,
      filename: `${tags.title}.jpeg`,
      folder: "/Moodify/posters",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(201).json({
    message: "Song created successfully",
    song,
  });
}

async function getSong(req, res) {
  const { mood } = req.query;

  const song = await songModel.findOne({
    mood,
  });

  res.status(200).json({
    message: "Song fetched Successfully",
    song,
  });
}

export { uploadSong, getSong };
