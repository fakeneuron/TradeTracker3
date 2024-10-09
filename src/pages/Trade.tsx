import React from 'react';
import TradeForm from '../components/TradeForm';
import TradeManagement from '../components/TradeManagement';

const Trade: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Trade</h1>
      <TradeForm onAddTrade={(trade) => console.log('New trade:', trade)} />
      <TradeManagement />
    </div>
  );
};

export default Trade;