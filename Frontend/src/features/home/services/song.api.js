import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get(`/api/songs?mood=${mood}`);
  return response.data;
}

export async function uploadSong({ file, mood, onUploadProgress }) {
  const formData = new FormData();
  formData.append("song", file);
  formData.append("mood", mood);

  const response = await api.post("/api/songs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });

  return response.data;
}
