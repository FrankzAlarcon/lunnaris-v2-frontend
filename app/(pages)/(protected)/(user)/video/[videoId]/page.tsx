import React from 'react'
import VideoPlayer from '../_components/video-player'
import { getOneMedia } from '@/actions/get-media'

const VideoPage = ({
  params
} : {
  params: {
    videoId: string
  }
}) => {
  return (
    <div className='min-h-screen'>
      <VideoPlayer videoId={params.videoId} />
    </div>
  )
}

export default VideoPage