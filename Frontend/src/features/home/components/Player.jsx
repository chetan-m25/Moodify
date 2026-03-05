import { useRef, useState, useEffect, useContext } from "react";
import { useSong } from "../hooks/useSong";
import "../style/player.scss";
import { SongContext } from "../context/song.context";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const Player = () => {
  const { song, songs, nextSong, prevSong } = useSong();
  const { currentIndex, setCurrentIndex, setSong } = useContext(SongContext);

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const queueRef = useRef(null);

  const [showQueue, setShowQueue] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !song) return;

    const audio = audioRef.current;
    audio.load();
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [song]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (queueRef.current && !queueRef.current.contains(e.target)) {
        setShowQueue(false);
      }
    };

    if (showQueue) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showQueue]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const skip = (secs) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + secs, 0),
      duration,
    );
  };

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (s) => {
    setSpeed(s);
    audioRef.current.playbackRate = s;
    setShowSpeed(false);
  };

  const handleVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSongEnd = () => nextSong();

  const playFromQueue = (songItem, index) => {
    setSong(songItem);
    setCurrentIndex(index);
    setShowQueue(false);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!song) return null;

  return (
    <>
      <div className="player">
        <audio
          ref={audioRef}
          src={song.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleSongEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="player__info">
          <img
            className="player__poster"
            src={song.posterUrl}
            alt={song.title}
          />
          <div className="player__meta">
            <p className="player__title">{song.title}</p>
            <span className="player__mood">{song.mood}</span>
          </div>
        </div>

        <button
          className="player__btn player__queue-btn-mobile"
          onClick={(e) => {
            e.stopPropagation();
            setShowQueue(!showQueue);
          }}
        >
          <i className="ri-list-check list-icon"></i>
          <span className="playlist-tooltip">Song List</span>
        </button>

        <div className="player__progress-wrap">
          <span className="player__time">{formatTime(currentTime)}</span>

          <div
            className="player__progress"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div
              className="player__progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div
              className="player__progress-thumb"
              style={{ left: `${progress}%` }}
            />
          </div>

          <span className="player__time">{formatTime(duration)}</span>
        </div>

        <div className="player__controls">
          <div className="player__speed-wrap">
            <button
              className="player__btn player__btn--speed"
              onClick={() => setShowSpeed(!showSpeed)}
            >
              {speed}×
            </button>

            {showSpeed && (
              <div className="player__speed-menu">
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    className={`player__speed-option ${s === speed ? "active" : ""}`}
                    onClick={() => handleSpeedChange(s)}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="player__btn player__btn--skip"
            onClick={() => skip(-5)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.6" />
            </svg>
            <span>5s</span>
          </button>

          <button className="player__btn" onClick={prevSong}>
            ⏮
          </button>

          <button
            className="player__btn player__btn--play"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="28"
                height="28"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="28"
                height="28"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          <button className="player__btn" onClick={nextSong}>
            ⏭
          </button>

          <button
            className="player__btn player__btn--skip"
            onClick={() => skip(5)}
          >
            <span>5s</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-.49-3.6" />
            </svg>
          </button>

          <div className="player__volume">
            <button
              className="player__btn player__btn--vol"
              onClick={toggleMute}
            >
              <i
                className={
                  isMuted ? "ri-volume-mute-fill" : "ri-volume-down-fill"
                }
              ></i>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="player__volume-slider"
            />
          </div>

          <button
            className="player__btn player__btn--queue-desktop"
            onClick={(e) => {
              e.stopPropagation();
              setShowQueue(!showQueue);
            }}
          >
            <i className="ri-list-check list-icon"></i>
            <span className="playlist-tooltip">Song List</span>
          </button>
        </div>
      </div>

      {showQueue && (
        <div className="queue" ref={queueRef}>
          <h3>Playlist</h3>
          {songs.map((s, i) => (
            <div
              key={i}
              className={`queue__item ${i === currentIndex ? "active" : ""}`}
              onClick={() => playFromQueue(s, i)}
            >
              <img src={s.posterUrl} alt={s.title} />
              <span>{s.title}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Player;
