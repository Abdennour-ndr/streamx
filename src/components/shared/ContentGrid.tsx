import React from 'react';

interface ContentGridProps {
  title: string;
  children: React.ReactNode;
  viewAllLink?: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  title,
  children,
  viewAllLink
}) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All
            </a>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentGrid;
