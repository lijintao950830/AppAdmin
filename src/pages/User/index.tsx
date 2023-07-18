import { useEffect, useRef } from 'react';
import videojs from 'video.js';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoPlayer = videojs(videoRef.current);

    videoPlayer.currentTime(START_TIME);

    const checkTime = () => {
      if (videoPlayer.currentTime() >= END_TIME) {
        videoPlayer.pause();
      }
    };

    videoPlayer.on('timeupdate', checkTime);

    return () => {
      videoPlayer.off('timeupdate', checkTime);
      videoPlayer.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default VideoPlayer;
