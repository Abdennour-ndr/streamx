import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  title: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  quality?: '480p' | '720p' | '1080p' | '4k';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  title,
  autoPlay = false,
  onEnded,
  quality = '1080p'
}) => {
  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={videoUrl}
        poster={thumbnailUrl}
        controls
        autoPlay={autoPlay}
        onEnded={onEnded}
        title={title}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Custom Controls Overlay (to be implemented) */}
      <div className="absolute bottom-0 left-0 right-0 hidden">
        <div className="flex items-center justify-between p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center space-x-2">
            <button className="text-white">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="w-64 h-1 bg-gray-600 rounded-full">
              <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">Quality: {quality}</span>
            <button className="text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
