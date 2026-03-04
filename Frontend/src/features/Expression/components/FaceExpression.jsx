import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../style/face.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState(
    "Click below to detect your mood",
  );

  const moodEmoji = {
    Happy: "😄",
    Sad: "😢",
    Angry: "😠",
    Surprised: "😲",
  };

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    setExpression("Analyzing your facial expression...");
    const result = detect({ landmarkerRef, videoRef, setExpression });
    onClick(result);
  }

  const renderExpression = () => {
    if (expression.startsWith("Analyzing") || expression.startsWith("Click")) {
      return expression;
    }

    const emoji = moodEmoji[expression];
    if (!emoji) return `Mood Detected: ${expression}`;

    return `${emoji} Mood Detected: ${expression}`;
  };

  return (
    <div className="face-expression">
      <div className="face-expression__camera">
        <video ref={videoRef} className="face-expression__video" playsInline />
      </div>
      <h2 className="face-expression__status">{renderExpression()}</h2>
      <button className="face-expression__btn" onClick={handleClick}>
        Detect Mood
      </button>
    </div>
  );
}
