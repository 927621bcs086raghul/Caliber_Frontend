import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./VideoPlayer.css";
import { useNavigate } from 'react-router-dom';
import DashboardHeader from "../dashboard/components/DashboardHeader";

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [liveVideos, setLiveVideos] = useState([]);
  
  // Video control states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/${id}`)
      .then((res) => res.json())
      .then(setVideo);

    fetch("http://localhost:5000/api/videos", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLiveVideos(data.reverse());
        }
      })
      .catch((err) => console.error("Failed to load videos", err));
  }, [id]);

  // Video event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setVolume(volume || 0.5);
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const changeSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedMenu(false);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.parentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleControlsMouseEnter = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
  };

  const handleControlsMouseLeave = () => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }
  };

  if (!video) return <p className="loading">Loading...</p>;

  return (
    <>
      <DashboardHeader />
      <div className="watch-page">
        <div className="watch-main">
          <div 
            className="video-wrapper"
            onMouseMove={handleMouseMove}
          >
            <video
              ref={videoRef}
              className="video-player"
              src={`http://localhost:5000/api/videos/stream/${id}`}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={handlePlayPause}
            />
            
            {/* Custom Controls Overlay */}
            <div 
              className="controls-overlay"
              style={{
                opacity: showControls ? 1 : 0,
                pointerEvents: showControls ? 'auto' : 'none'
              }}
              onMouseEnter={handleControlsMouseEnter}
              onMouseLeave={handleControlsMouseLeave}
            >
              {/* Progress Bar */}
              <div className="progress-container" onClick={handleProgressClick}>
                <div className="progress-bar">
                  <div 
                    className="progress-filled"
                    style={{width: `${(currentTime / duration) * 100}%`}}
                  />
                  <div 
                    className="progress-handle"
                    style={{left: `${(currentTime / duration) * 100}%`}}
                  />
                </div>
              </div>

              {/* Controls Bar */}
              <div className="controls-bar">
                <div className="controls-left">
                  <button onClick={handlePlayPause} className="control-btn">
                    {isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    )}
                  </button>
                  
                  <button onClick={() => skip(-10)} className="control-btn control-btn-small" title="Rewind 10s">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 19 2 12 11 5 11 19"/>
                      <polygon points="22 19 13 12 22 5 22 19"/>
                    </svg>
                    <span className="skip-label">10</span>
                  </button>
                  
                  <button onClick={() => skip(10)} className="control-btn control-btn-small" title="Forward 10s">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 19 22 12 13 5 13 19"/>
                      <polygon points="2 19 11 12 2 5 2 19"/>
                    </svg>
                    <span className="skip-label">10</span>
                  </button>

                  <div className="volume-control">
                    <button onClick={toggleMute} className="control-btn control-btn-small">
                      {isMuted || volume === 0 ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <line x1="23" y1="9" x2="17" y2="15"/>
                          <line x1="17" y1="9" x2="23" y2="15"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                  </div>

                  <span className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="controls-right">
                  <div className="speed-control">
                    <button 
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)} 
                      className="control-btn control-btn-small"
                      title="Playback Speed"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
                      </svg>
                      <span className="speed-text">{playbackSpeed}x</span>
                    </button>
                    
                    {showSpeedMenu && (
                      <div className="speed-menu">
                        <div className="speed-menu-header">Playback Speed</div>
                        {speedOptions.map(speed => (
                          <button
                            key={speed}
                            onClick={() => changeSpeed(speed)}
                            className={`speed-option ${playbackSpeed === speed ? 'active' : ''}`}
                          >
                            {speed === 1 ? 'Normal' : `${speed}x`}
                            {playbackSpeed === speed && (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button onClick={toggleFullscreen} className="control-btn control-btn-small">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h1 className="video-title">{video.title}</h1>

          <div className="video-actions">
            <div className="channel-info">
              <div className="avatar">{video.User?.name?.[0]}</div>
              <div>
                <p className="channel-name">{video.User?.name}</p>
                <span className="sub-count">
                  {new Date(video.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="video-description">
            <p>{video.description}</p>
          </div>
        </div>

        <div className="watch-sidebar">
          {liveVideos
            .filter((v) => v.id !== video?.id)
            .map((v) => (
<div
  key={v.id}
  className="suggested-video"
  onClick={() => navigate(`/video/${v.id}`)}
>
                <div
                  className="thumb"
                  style={{
                    backgroundImage: v.thumbnailPath
                      ? `url(http://localhost:5000${v.thumbnailPath})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="suggested-info">
                  <p className="suggested-title">{v.title}</p>
                  <span>{v.User?.name}</span>
                  <span>{new Date(v.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default VideoPlayer;