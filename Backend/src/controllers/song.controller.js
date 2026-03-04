import songModel from "../models/song.model.js";
import id3 from "node-id3";
import { uploadFile } from "../services/storage.service.js";

async function uploadSong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Song file is required",
      });
    }

    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({
        message: "Mood category is required",
      });
    }

    const songBuffer = req.file.buffer;

    const tags = id3.read(songBuffer) || {};

    const title = tags.title || req.file.originalname.replace(".mp3", "");

    const songFile = await uploadFile({
      buffer: songBuffer,
      filename: `${title}.mp3`,
      folder: "/Moodify/songs",
    });

    let posterUrl = "";

    if (tags.image?.imageBuffer) {
      const posterFile = await uploadFile({
        buffer: tags.image.imageBuffer,
        filename: `${title}.jpg`,
        folder: "/Moodify/posters",
      });

      posterUrl = posterFile.url;
    }

    const song = await songModel.create({
      title,
      url: songFile.url,
      posterUrl,
      mood,
    });

    res.status(201).json({
      message: "Song uploaded successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getSong(req, res) {
  const { mood } = req.query;

  const song = await songModel.findOne({ mood });

  res.status(200).json({
    message: "Song fetched Successfully",
    song,
  });
}

export { uploadSong, getSong };
