import React from 'react'
import VideoPlayer from '../_components/video-player'

const VideoPage = ({
  params
} : {
  params: {
    videoId: string
  }
}) => {
  return (
    <div className='min-h-screen'>
      <VideoPlayer mediaId={params.videoId} />
    </div>
  )
}

export default VideoPage