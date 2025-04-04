
import { WeatherData, WeatherHistoryItem } from '@/types';

const WEATHER_ICONS: Record<string, string> = {
  'clear': '☀️',
  'clouds': '☁️',
  'rain': '🌧️',
  'snow': '❄️',
  'thunderstorm': '⛈️',
  'drizzle': '🌦️',
  'mist': '🌫️'
};

// Mock implementation for demo 
export const fetchWeatherData = async (cities: string[]): Promise<WeatherData[]> => {

  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return cities.map(city => {
    const conditions = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'drizzle', 'mist'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const countryMap: Record<string, string> = {
      'New York': 'USA',
      'London': 'UK',
      'Tokyo': 'Japan',
      'Paris': 'France',
      'Sydney': 'Australia',
      'Berlin': 'Germany',
      'Moscow': 'Russia',
      'Beijing': 'China',
      'Cairo': 'Egypt',
      'Rio de Janeiro': 'Brazil'
    };
    
    return {
      id: city.toLowerCase().replace(/\s+/g, '-'),
      city,
      country: countryMap[city] || 'Unknown',
      temperature: Math.floor(Math.random() * 35) - 5, 
      condition,
      humidity: Math.floor(Math.random() * 100),
      windSpeed: Math.floor(Math.random() * 30),
      icon: WEATHER_ICONS[condition],
      timestamp: Date.now()
    };
  });
};

export const fetchWeatherHistory = async (city: string): Promise<WeatherHistoryItem[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const history: WeatherHistoryItem[] = [];
  const now = Date.now();
  const conditions = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'drizzle', 'mist'];
  
  // Generate data for the last 24 hours 
  for (let i = 0; i < 24; i++) {
    const hourAgo = now - (i * 60 * 60 * 1000);
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    history.push({
      timestamp: hourAgo,
      temperature: Math.floor(Math.random() * 35) - 5, 
      humidity: Math.floor(Math.random() * 100),
      condition
    });
  }
  
  return history.sort((a, b) => a.timestamp - b.timestamp);
};
