import React from 'react';
import NewsSection from '../components/NewsSection';

const News: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">News</h1>
      <NewsSection />
    </div>
  );
};

export default News;