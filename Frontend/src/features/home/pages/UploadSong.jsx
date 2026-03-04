import { useState } from "react";
import jsmediatags from "jsmediatags/dist/jsmediatags.min.js";
import { useSong } from "../hooks/useSong";
import "../style/upload.scss";
import { toast } from "react-toastify";

const UploadSong = () => {
  const { handleUploadSong } = useSong();

  const [file, setFile] = useState(null);
  const [mood, setMood] = useState("");
  const [meta, setMeta] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const moods = ["Happy", "Sad", "Angry", "Surprised"];

  function readMetadata(file) {
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const picture = tag.tags.picture;
        let artwork = null;

        if (picture) {
          const { data, format } = picture;
          let base64String = "";

          for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i]);
          }

          artwork = `data:${format};base64,${window.btoa(base64String)}`;
        }

        setMeta({
          title: tag.tags.title || "Unknown Title",
          artist: tag.tags.artist || "Unknown Artist",
          artwork,
        });
      },

      onError: function () {
        setMeta({
          title: file.name,
          artist: "Unknown Artist",
          artwork: null,
        });
      },
    });
  }

  function handleFile(file) {
    if (!file) return;

    if (file.type !== "audio/mpeg") {
      toast.error("Only MP3 files allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }

    setFile(file);
    readMetadata(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function handleChange(e) {
    handleFile(e.target.files[0]);
  }

  async function upload(e) {
    e.preventDefault();

    if (!file || !mood) {
      toast.warning("Please select file and mood");
      return;
    }

    try {
      setUploading(true);

      await handleUploadSong({
        file,
        mood,
      });

      toast.success("Song uploaded successfully");

      setFile(null);
      setMeta(null);
      setMood("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="upload-page">
      <div
        className={`upload-drop ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? <p>{file.name}</p> : <p>Drag & Drop MP3 or Click</p>}

        <input type="file" accept="audio/mp3" onChange={handleChange} />
      </div>

      {meta && (
        <div className="music-preview">
          {meta.artwork && <img src={meta.artwork} alt="album art" />}

          <div className="music-info">
            <p className="title">{meta.title}</p>
            <p className="artist">{meta.artist}</p>
          </div>
        </div>
      )}

      {file && (
        <audio
          controls
          src={URL.createObjectURL(file)}
          className="audio-preview"
        />
      )}

      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">Select Mood</option>
        {moods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button className="upload-btn" onClick={upload} disabled={uploading}>
        {uploading ? (
          <span className="upload-spinner">
            <span className="spinner"></span>
            Uploading...
          </span>
        ) : (
          "Upload Song"
        )}
      </button>
    </div>
  );
};

export default UploadSong;
