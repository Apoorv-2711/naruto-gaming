import type React from "react"
import { useState, useEffect } from "react"

interface ThumbnailPreviewProps {
  vttFile: string
  currentTime: number
  duration: number
}

interface Cue {
  startTime: number
  endTime: number
  text: string
}

const ThumbnailPreview: React.FC<ThumbnailPreviewProps> = ({ vttFile, currentTime, duration }) => {
  const [cues, setCues] = useState<Cue[]>([])
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch(vttFile)
      .then((response) => response.text())
      .then((vttContent) => {
        const parsedCues = parseVTT(vttContent)
        setCues(parsedCues)
      })
  }, [vttFile])

  useEffect(() => {
    const currentCue = cues.find((cue) => currentTime >= cue.startTime && currentTime < cue.endTime)
    if (currentCue) {
      setThumbnailUrl(currentCue.text)
    }
  }, [currentTime, cues])

  if (!thumbnailUrl) return null

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <img src={thumbnailUrl || "/placeholder.svg"} alt="Preview" className="max-w-xs max-h-24" />
    </div>
  )
}

const parseVTT = (vttContent: string): Cue[] => {
  const lines = vttContent.trim().split("\n")
  const cues: Cue[] = []
  let currentCue: Partial<Cue> | null = null

  for (const line of lines) {
    if (line.includes("-->")) {
      const [start, end] = line.split("-->").map((timeString) => parseVTTTime(timeString.trim()))
      currentCue = { startTime: start, endTime: end }
    } else if (line.trim() !== "" && currentCue) {
      currentCue.text = line.trim()
      cues.push(currentCue as Cue)
      currentCue = null
    }
  }

  return cues
}

const parseVTTTime = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number.parseFloat)
  return hours * 3600 + minutes * 60 + seconds
}

export default ThumbnailPreview

