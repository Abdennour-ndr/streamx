import React from 'react';

interface EpisodeListProps {
  episodes: {
    id: string;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    duration: number;
    episodeNumber: number;
    seasonNumber: number;
    releaseDate?: string;
  }[];
  currentEpisodeId?: string;
  onSelectEpisode: (episodeId: string) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  currentEpisodeId,
  onSelectEpisode
}) => {
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Group episodes by season
  const episodesBySeason = episodes.reduce((acc, episode) => {
    const season = episode.seasonNumber;
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(episode);
    return acc;
  }, {} as Record<number, typeof episodes>);

  // Sort seasons
  const seasons = Object.keys(episodesBySeason).map(Number).sort((a, b) => a - b);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Episodes</h3>
      </div>
      
      <div className="p-4">
        {seasons.map((season) => (
          <div key={season} className="mb-6 last:mb-0">
            <h4 className="text-md font-medium text-white mb-3">Season {season}</h4>
            
            <div className="space-y-3">
              {episodesBySeason[season]
                .sort((a, b) => a.episodeNumber - b.episodeNumber)
                .map((episode) => (
                  <div 
                    key={episode.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      currentEpisodeId === episode.id 
                        ? 'bg-blue-900/50' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    onClick={() => onSelectEpisode(episode.id)}
                  >
                    <div className="flex-shrink-0 mr-4">
                      {episode.thumbnailUrl ? (
                        <img 
                          src={episode.thumbnailUrl} 
                          alt={episode.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-24 h-16 bg-gray-700 rounded flex items-center justify-center">
                          <span className="text-gray-500">No Preview</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">
                          {episode.episodeNumber}. {episode.title}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDuration(episode.duration)}
                        </span>
                      </div>
                      
                      {episode.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {episode.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
