
import React from 'react';
import { Link } from 'react-router-dom';
import { WeatherData } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/context/DashboardContext';
import { Star } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { favoriteItems, addFavoriteCity, removeFavoriteCity } = useDashboard();
  const isFavorite = favoriteItems.cities.includes(weather.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavoriteCity(weather.id);
    } else {
      addFavoriteCity(weather.id);
    }
  };
  
  return (
    <Link to={`/weather/${weather.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-dashboard-dark-blue">{weather.city}</h3>
              <p className="text-gray-500 text-sm">{weather.country}</p>
            </div>
            <div className="text-4xl">{weather.icon}</div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-end">
              <span className="text-3xl font-bold">{weather.temperature}</span>
              <span className="text-xl">°C</span>
            </div>
            <p className="text-gray-600 capitalize mt-1">{weather.condition}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Humidity</p>
              <p className="font-medium">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Wind</p>
              <p className="font-medium">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 bg-gray-50 flex justify-between">
          <p className="text-sm text-gray-500">
            Updated: {new Date(weather.timestamp).toLocaleTimeString()}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className={isFavorite ? "text-dashboard-orange" : "text-gray-400"}
            onClick={handleToggleFavorite}
          >
            <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default WeatherCard;
