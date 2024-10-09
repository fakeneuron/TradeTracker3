import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, TrendingUp, Newspaper, LayoutDashboard } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">Financial Trade Tracker</Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/chart" className="flex items-center hover:text-blue-200 transition-colors">
                  <BarChart2 className="mr-2" size={20} />
                  Chart
                </Link>
              </li>
              <li>
                <Link to="/trade" className="flex items-center hover:text-blue-200 transition-colors">
                  <TrendingUp className="mr-2" size={20} />
                  Trade
                </Link>
              </li>
              <li>
                <Link to="/news" className="flex items-center hover:text-blue-200 transition-colors">
                  <Newspaper className="mr-2" size={20} />
                  News
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center hover:text-blue-200 transition-colors">
                  <LayoutDashboard className="mr-2" size={20} />
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;