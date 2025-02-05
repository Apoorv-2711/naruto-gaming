"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import screenfull from "screenfull"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import CaptionSelector from "./CaptionSelector"
import ThumbnailPreview from "./ThumbnailPreview"
import QualitySelector from "./QualitySelector"

interface VideoPlayerProps {
  sources: { url: string; type: string }[]
  tracks: { file: string; label: string; kind: string; default?: boolean }[]
  intro: { start: number; end: number }
  outro: { start: number; end: number }
}

const Player: React.FC<VideoPlayerProps> = ({ sources, tracks, intro, outro }) => {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(false)
  const [thumbnailPosition, setThumbnailPosition] = useState(0)
  const [lastTapTime, setLastTapTime] = useState(0)
  const [showSkipAnimation, setShowSkipAnimation] = useState<"forward" | "backward" | null>(null)
  const [buffering, setBuffering] = useState(false)
  const [activeCaptionTrack, setActiveCaptionTrack] = useState<TextTrack | null>(null)

  const playerRef = useRef<ReactPlayer>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => setPlaying(!playing)
  const handleVolumeChange = (newValue: number[]) => setVolume(newValue[0])
  const handleToggleMute = () => setMuted(!muted)
  const handleSeekChange = (newValue: number[]) => {
    setPlayed(newValue[0])
    playerRef.current?.seekTo(newValue[0])
  }

  const handleProgress = (state: { played: number; buffered: number }) => {
    setPlayed(state.played)
    setBuffering(state.buffered < state.played + 0.05) // Consider buffering if less than 5% ahead
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleFullscreenToggle = () => {
    if (screenfull.isEnabled && playerContainerRef.current) {
      screenfull.toggle(playerContainerRef.current)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const width = bounds.width
    setThumbnailPosition(x / width)
    setShowThumbnail(true)
  }

  const handleMouseLeave = () => {
    setShowThumbnail(false)
  }

  const skipIntro = () => {
    playerRef.current?.seekTo(intro.end)
  }

  const skipOutro = () => {
    playerRef.current?.seekTo(outro.end)
  }

  const handleDoubleTap = (direction: "forward" | "backward") => {
    const currentTime = Date.now()
    const tapLength = currentTime - lastTapTime
    const skipTime = 10 // Skip time in seconds

    if (tapLength < 300) {
      if (direction === "forward") {
        playerRef.current?.seekTo((playerRef.current.getCurrentTime() || 0) + skipTime)
      } else {
        playerRef.current?.seekTo((playerRef.current.getCurrentTime() || 0) - skipTime)
      }
      setShowSkipAnimation(direction)
      setTimeout(() => setShowSkipAnimation(null), 500)
    }

    setLastTapTime(currentTime)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchX = e.touches[0].clientX
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const direction = touchX - left < width / 2 ? "backward" : "forward"
    handleDoubleTap(direction)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.clientX
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const direction = clickX - left < width / 2 ? "backward" : "forward"
    handleDoubleTap(direction)
  }

  const handleCaptionChange = (trackLabel: string) => {
    if (!videoRef.current) return

    const textTracks = videoRef.current.textTracks
    for (let i = 0; i < textTracks.length; i++) {
      const track = textTracks[i]
      if (track.kind === "captions" || track.kind === "subtitles") {
        if (track.label === trackLabel) {
          track.mode = "showing"
          setActiveCaptionTrack(track)
        } else {
          track.mode = "disabled"
        }
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

//   useEffect(() => {
//     if (videoRef.current) {
//       const textTracks = videoRef.current.textTracks
//       for (let i = 0; i < textTracks.length; i++) {
//         const track = textTracks[i]
//         if (track.kind === "captions" || track.kind === "subtitles") {
//           track.mode = "disabled"
//           if (track.default) {
//             track.mode = "showing"
//             setActiveCaptionTrack(track)
//           }
//         }
//       }
//     }
//   }, [])

  return (
    <div ref={playerContainerRef} className="relative w-full aspect-video">
      <ReactPlayer
        ref={playerRef}
        url={sources[0].url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100%"
        height="100%"
        config={{
          file: {
            tracks: tracks,
            attributes: {
              crossOrigin: "anonymous",
            },
          },
        }}
      >
        <video ref={videoRef} />
      </ReactPlayer>
      <div
        className="absolute top-0 left-0 w-1/2 h-full"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      />
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      />
      {showSkipAnimation && (
        <div
          className={`absolute top-1/2 ${showSkipAnimation === "forward" ? "right-4" : "left-4"} transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-4`}
        >
          {showSkipAnimation === "forward" ? (
            <ChevronRight className="h-8 w-8 text-white" />
          ) : (
            <ChevronLeft className="h-8 w-8 text-white" />
          )}
        </div>
      )}
      {buffering && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
        <div
          className="relative w-full h-1 mb-2 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Slider value={[played]} min={0} max={1} step={0.01} onValueChange={handleSeekChange} className="w-full" />
          {showThumbnail && (
            <ThumbnailPreview
              vttFile={tracks.find((track) => track.kind === "thumbnails")?.file || ""}
              currentTime={thumbnailPosition * duration}
              duration={duration}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" onClick={handlePlayPause}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button size="icon" variant="ghost" onClick={handleToggleMute}>
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider value={[volume]} min={0} max={1} step={0.1} onValueChange={handleVolumeChange} className="w-24" />
            <span className="text-white text-sm">
              {formatTime(played * duration)} / {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {played * duration >= intro.start && played * duration <= intro.end && (
              <Button size="sm" onClick={skipIntro}>
                Skip Intro
              </Button>
            )}
            {played * duration >= outro.start && played * duration <= outro.end && (
              <Button size="sm" onClick={skipOutro}>
                Skip Outro
              </Button>
            )}
            <CaptionSelector
              tracks={tracks.filter((track) => track.kind === "captions")}
              onCaptionChange={handleCaptionChange}
              activeCaptionTrack={activeCaptionTrack}
            />
            <QualitySelector />
            <Button size="icon" variant="ghost" onClick={handleFullscreenToggle}>
              {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const formatTime = (seconds: number) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

const pad = (string: number) => {
  return ("0" + string).slice(-2)
}

export default Player

