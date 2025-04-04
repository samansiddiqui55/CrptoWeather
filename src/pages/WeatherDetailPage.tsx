
import React from 'react';
import Header from '@/components/Header';
import WeatherDetail from '@/components/weather/WeatherDetail';

const WeatherDetailPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <WeatherDetail />
    </div>
  );
};

export default WeatherDetailPage;
