import { LeftOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './VideoStream.css'

function VideoStream() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const initialVideo = location.state?.video || null
  const videoRef = useRef(null)
  const [video, setVideo] = useState(initialVideo)
  const [loading, setLoading] = useState(!initialVideo)
  const [error, setError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // We expect the video object to be passed via navigation state
    if (!initialVideo) {
      setError('Video not found. Please open from dashboard.')
      setLoading(false)
    }
  }, [id, initialVideo])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setProgress(0)
      // Ensure volume state is in sync with element
      videoRef.current.volume = volume
    }
  }

  const handleTimeUpdate = () => {
    const vid = videoRef.current
    if (!vid || !vid.duration) return
    setProgress((vid.currentTime / vid.duration) * 100)
  }

  const togglePlay = () => {
    const vid = videoRef.current
    if (!vid) return

    if (vid.paused) {
      vid.play()
      setIsPlaying(true)
    } else {
      vid.pause()
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value)
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value
      setIsMuted(value === 0)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleSeek = (e) => {
    const vid = videoRef.current
    if (!vid || !vid.duration) return

    const value = Number(e.target.value)
    const newTime = (value / 100) * vid.duration
    vid.currentTime = newTime
    setProgress(value)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const el = document.querySelector('.video-player-shell')
      if (el && el.requestFullscreen) {
        el.requestFullscreen()
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  if (loading) {
    return (
      <div className="video-stream-loading">
        <Spin />
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="video-stream-error">
        <p>{error || 'Video not found'}</p>
        <Button type="primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="video-stream-page">
      <header className="video-stream-header">
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate('/dashboard')}
        >
          Back
        </Button>
        <h2 className="video-stream-title">{video.title || 'Video'}</h2>
      </header>

      <div className="video-player-shell">
        <video
          ref={videoRef}
          className="video-player"
          src={`http://localhost:5000${video.filepath}`}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false)
            setProgress(0)
          }}
        />

        <div className="video-controls">
          <div className="video-controls-row">
            <button type="button" onClick={togglePlay}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={toggleMute}>
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <label className="video-volume-label">
              Volume
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
              />
            </label>
            <button type="button" onClick={toggleFullscreen}>
              Fullscreen
            </button>
          </div>

          <input
            type="range"
            className="video-progress"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
          />
        </div>
      </div>
    </div>
  )
}

export default VideoStream
