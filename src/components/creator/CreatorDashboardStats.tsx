import React from 'react';

interface CreatorDashboardStatsProps {
  stats: {
    totalViews: number;
    totalSubscribers: number;
    totalRevenue: number;
    viewsChange: number;
    subscribersChange: number;
    revenueChange: number;
    topContent: {
      id: string;
      title: string;
      views: number;
      thumbnailUrl: string;
    }[];
  };
}

const CreatorDashboardStats: React.FC<CreatorDashboardStatsProps> = ({
  stats
}) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Dashboard Overview</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">Total Views</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stats.viewsChange >= 0 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-red-900/30 text-red-400'
              }`}>
                {stats.viewsChange >= 0 ? '+' : ''}{stats.viewsChange}%
              </span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {stats.totalViews.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">Subscribers</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stats.subscribersChange >= 0 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-red-900/30 text-red-400'
              }`}>
                {stats.subscribersChange >= 0 ? '+' : ''}{stats.subscribersChange}%
              </span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {stats.totalSubscribers.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stats.revenueChange >= 0 
                  ? 'bg-green-900/30 text-green-400' 
                  : 'bg-red-900/30 text-red-400'
              }`}>
                {stats.revenueChange >= 0 ? '+' : ''}{stats.revenueChange}%
              </span>
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              ${stats.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* Top Content */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Top Performing Content</h3>
          <div className="space-y-4">
            {stats.topContent.map((content, index) => (
              <div key={content.id} className="flex items-center bg-gray-800 p-3 rounded-lg">
                <div className="flex-shrink-0 mr-4">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={content.thumbnailUrl} 
                    alt={content.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{content.title}</h4>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    {content.views.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <a 
            href="/creator/upload" 
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 text-center"
          >
            Upload New Content
          </a>
          <a 
            href="/creator/analytics" 
            className="px-4 py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 text-center"
          >
            View Detailed Analytics
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardStats;
