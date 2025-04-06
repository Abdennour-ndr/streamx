import React from 'react';

interface CategoryTabsProps {
  categories: {
    id: string;
    name: string;
    href: string;
  }[];
  activeCategory?: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory
}) => {
  return (
    <div className="border-b border-gray-800">
      <div className="container mx-auto px-4">
        <nav className="flex overflow-x-auto py-4 hide-scrollbar">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={category.href}
                className={`whitespace-nowrap px-1 py-2 text-sm font-medium border-b-2 ${
                  activeCategory === category.id
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default CategoryTabs;
