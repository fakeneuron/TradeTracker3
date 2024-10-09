import React from 'react';
import ChartNotes from '../components/ChartNotes';

const Chart: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Chart</h1>
      <ChartNotes />
    </div>
  );
};

export default Chart;