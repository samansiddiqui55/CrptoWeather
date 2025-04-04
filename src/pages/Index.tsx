
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import Header from '@/components/Header';
import WeatherSection from '@/components/weather/WeatherSection';
import CryptoSection from '@/components/crypto/CryptoSection';
import NewsSection from '@/components/news/NewsSection';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-8">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
