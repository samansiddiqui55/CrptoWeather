
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import WeatherCard from './WeatherCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WeatherSection: React.FC = () => {
  const { weatherData, isLoading, error } = useDashboard();

  if (isLoading.weather) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Weather</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden border border-gray-200">
              <Skeleton className="h-56 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error.weather) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Weather</h2>
        <Alert variant="destructive">
          <AlertDescription>{error.weather}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Weather</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weatherData.map((weather) => (
          <WeatherCard key={weather.id} weather={weather} />
        ))}
      </div>
    </div>
  );
};

export default WeatherSection;
