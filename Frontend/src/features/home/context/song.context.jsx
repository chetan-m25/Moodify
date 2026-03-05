import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider
      value={{
        songs,
        setSongs,
        song,
        setSong,
        currentIndex,
        setCurrentIndex,
        loading,
        setLoading,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
