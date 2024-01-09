'use client'

import { useEffect, useRef, useState } from "react"
import FullscreenControl from "./video-player-controls/fullscreen-control"
import { useEventListener } from "usehooks-ts"
import VolumeControl from "./video-player-controls/volume-control"
import VideoControls from "./video-player-controls/video-controls"
import VideoTime from "./video-player-controls/video-time"
import VideoHeader from "./video-player-controls/video-header"
import { useMediaManagement } from "@/hooks/useMediaManagement"

interface VideoPlayerProps {
  mediaId: string
}

const VideoPlayer = ({
  mediaId
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { media } = useMediaManagement()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const selectedMedia = media.find((m) => m.id === mediaId)

  const onVolumeChange = (value: number) => {
    setVolume(+value)
    if (videoRef?.current) {
      videoRef.current.muted = value === 0
      videoRef.current.volume = value * 0.01
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0

    setVolume(isMuted ? 50 : 0)

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted
      videoRef.current.volume = isMuted ? 0.5 : 0
    }
  }

  useEffect(() => {
    onVolumeChange(50)
  }, [])

  useEffect(() => {
    if (videoRef.current !== null && (!duration || duration === 0)) {
      setDuration(videoRef.current.duration)
    }
  }, [videoRef, duration])

  const onTogglePlay = () => {
    if (videoRef?.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPaused(false)
      } else {
        videoRef.current.pause()
        setIsPaused(true)
      }
    }
  }

  const onAdvance = () => {
    if (videoRef?.current) {
      videoRef.current.currentTime += 10
    }
  }

  const onGoBack = () => {
    if (videoRef?.current) {
      videoRef.current.currentTime -= 10
    }
  }

  const handleOnTimeUpdate = (value: number[]) => {
    if (videoRef?.current) {
      setTime(value[0])
      videoRef.current.currentTime = value[0]
    }
  }

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen()
    }
  }

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null
    setIsFullscreen(isCurrentlyFullscreen)
  }

  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef)
  return (
    <div
      ref={wrapperRef}
      className='aspect-video border-b group relative w-full h-full'
    >
      <video
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${selectedMedia?.file}`}
        ref={videoRef}
        width='100%'
        onTimeUpdate={() => {setTime(videoRef.current?.currentTime || 0)}}
        onLoadedData={() => {setDuration(videoRef.current?.duration || 0)}}
      />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute top-0 w-full h-20 items-center justify-between bg-gradient-to-r from-neutral-900">
          <VideoHeader title={selectedMedia?.title as string} />
        </div>
        <div className="absolute bottom-20 w-full px-4">
          <VideoTime
            onTimeChange={handleOnTimeUpdate}
            duration={duration}
            time={time}
          />
        </div>
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <VideoControls
            isPaused={isPaused}
            onTogglePlay={onTogglePlay}
            onAdvance={onAdvance}
            onGoBack={onGoBack}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer