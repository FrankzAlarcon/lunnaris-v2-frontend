import { Slider } from "@/components/ui/slider"
import { useCallback } from "react"

interface VideoTimeProps {
  time: number
  duration: number
  onTimeChange: (value: number[]) => void
}

const VideoTime = ({
  duration,
  time,
  onTimeChange
}: VideoTimeProps) => {
  const formatTime = useCallback((timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
  }, [])
  return (
    <div className="relative w-full">
      <Slider
        className="w-full bg-gray-400 cursor-pointer rounded-md"
        trackClassName="h-2"
        rangeClassName="!bg-green-500"
        thumbClassName="!h-5 !w-5 "
        value={[time]}
        onValueChange={onTimeChange}
        max={duration}
        step={1}
      />
      <div className="absolute top-4 flex justify-between items-center w-full">
        <span className="text-white text-xs">{formatTime(time)}</span>
        <span className="text-white text-xs">{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default VideoTime