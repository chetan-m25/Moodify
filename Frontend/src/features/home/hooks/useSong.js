import { getSong, uploadSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../context/song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  const { loading, setLoading, song, setSong } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.song);
    setLoading(false);
  }

  async function handleUploadSong({ file, mood }) {
    setLoading(true);
    const data = await uploadSong({ file, mood });
    setSong(data.song);
    setLoading(false);
  }

  return { loading, song, handleGetSong, handleUploadSong };
};
