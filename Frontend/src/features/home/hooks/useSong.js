import { getSong, uploadSong } from "../services/song.api";
import { useContext } from "react";
import { SongContext } from "../context/song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  const {
    loading,
    setLoading,
    song,
    setSong,
    songs,
    setSongs,
    currentIndex,
    setCurrentIndex,
  } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);

    const data = await getSong({ mood });

    setSongs(data.songs || []);
    setSong(data.songs?.[0] || null);
    setCurrentIndex(0);

    setLoading(false);
  }

  async function handleUploadSong({ file, mood }) {
    setLoading(true);

    const data = await uploadSong({ file, mood });

    setSong(data.song);

    setLoading(false);
  }

  function nextSong() {
    if (!songs.length) return;

    const nextIndex = (currentIndex + 1) % songs.length;

    setCurrentIndex(nextIndex);
    setSong(songs[nextIndex]);
  }

  function prevSong() {
    if (!songs.length) return;

    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;

    setCurrentIndex(prevIndex);
    setSong(songs[prevIndex]);
  }

  return {
    loading,
    song,
    songs,
    currentIndex,
    setCurrentIndex,
    nextSong,
    prevSong,
    handleGetSong,
    handleUploadSong,
  };
};
