
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { 
  WeatherData, 
  CryptoData, 
  NewsArticle, 
  Notification,
  WeatherHistoryData,
  CryptoHistoryData
} from '@/types';
import { fetchWeatherData, fetchWeatherHistory } from '@/lib/api/weather';
import { fetchCryptoData, fetchCryptoHistory } from '@/lib/api/crypto';
import { fetchNewsArticles } from '@/lib/api/news';

interface DashboardContextType {
  weatherData: WeatherData[];
  cryptoData: CryptoData[];
  newsArticles: NewsArticle[];
  notifications: Notification[];
  weatherHistory: WeatherHistoryData | null;
  cryptoHistory: CryptoHistoryData | null;
  isLoading: {
    weather: boolean;
    crypto: boolean;
    news: boolean;
    weatherHistory: boolean;
    cryptoHistory: boolean;
  };
  error: {
    weather: string | null;
    crypto: string | null;
    news: string | null;
    weatherHistory: string | null;
    cryptoHistory: string | null;
  };
  favoriteItems: {
    cities: string[];
    cryptos: string[];
  };
  addFavoriteCity: (cityId: string) => void;
  removeFavoriteCity: (cityId: string) => void;
  addFavoriteCrypto: (cryptoId: string) => void;
  removeFavoriteCrypto: (cryptoId: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  fetchWeatherHistoryForCity: (cityId: string) => void;
  fetchCryptoHistoryForCoin: (cryptoId: string) => void;
}

const DEFAULT_CITIES = ['New York', 'London', 'Tokyo'];
const DEFAULT_CRYPTOS = ['bitcoin', 'ethereum', 'solana'];

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [weatherHistory, setWeatherHistory] = useState<WeatherHistoryData | null>(null);
  const [cryptoHistory, setCryptoHistory] = useState<CryptoHistoryData | null>(null);
  
  const [isLoading, setIsLoading] = useState({
    weather: true,
    crypto: true,
    news: true,
    weatherHistory: false,
    cryptoHistory: false,
  });
  
  const [error, setError] = useState({
    weather: null as string | null,
    crypto: null as string | null,
    news: null as string | null,
    weatherHistory: null as string | null,
    cryptoHistory: null as string | null,
  });
  
  const [favoriteItems, setFavoriteItems] = useState({
    cities: [] as string[],
    cryptos: [] as string[],
  });

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('dashboardFavorites');
    if (savedFavorites) {
      setFavoriteItems(JSON.parse(savedFavorites));
    }
    
    // Fetch initial data
    fetchInitialData();
    
    // Set up WebSocket for crypto updates
    setupWebSocket();
    
    // Simulate random notifications for demo purposes
    const notificationInterval = setInterval(() => {
      simulateRandomNotification();
    }, 60000); // Every minute
    
    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, weather: true }));
      const weatherResults = await fetchWeatherData(DEFAULT_CITIES);
      setWeatherData(weatherResults);
      setIsLoading(prev => ({ ...prev, weather: false }));
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(prev => ({ ...prev, weather: 'Failed to load weather data. Please try again later.' }));
      setIsLoading(prev => ({ ...prev, weather: false }));
    }
    
    try {
      setIsLoading(prev => ({ ...prev, crypto: true }));
      const cryptoResults = await fetchCryptoData(DEFAULT_CRYPTOS);
      setCryptoData(cryptoResults);
      setIsLoading(prev => ({ ...prev, crypto: false }));
    } catch (err) {
      console.error('Error fetching crypto data:', err);
      setError(prev => ({ ...prev, crypto: 'Failed to load cryptocurrency data. Please try again later.' }));
      setIsLoading(prev => ({ ...prev, crypto: false }));
    }
    
    try {
      setIsLoading(prev => ({ ...prev, news: true }));
      const newsResults = await fetchNewsArticles();
      setNewsArticles(newsResults);
      setIsLoading(prev => ({ ...prev, news: false }));
    } catch (err) {
      console.error('Error fetching news data:', err);
      setError(prev => ({ ...prev, news: 'Failed to load news data. Please try again later.' }));
      setIsLoading(prev => ({ ...prev, news: false }));
    }
  };

  const setupWebSocket = () => {
    // This would be a real WebSocket connection in production
    // For demo purposes, we'll simulate WebSocket updates
    const cryptoUpdateInterval = setInterval(() => {
      setCryptoData(prevData => 
        prevData.map(crypto => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() * 0.02 - 0.01)), // -1% to +1% change
          priceChangePercentage24h: crypto.priceChangePercentage24h + (Math.random() * 0.4 - 0.2), // -0.2% to +0.2% change
        }))
      );
    }, 5000); // Every 5 seconds
    
    return () => {
      clearInterval(cryptoUpdateInterval);
    };
  };

  const simulateRandomNotification = () => {
    const notificationTypes = ['price_alert', 'weather_alert'] as const;
    const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    let title, message;
    
    if (type === 'price_alert') {
      const crypto = cryptoData[Math.floor(Math.random() * cryptoData.length)];
      const direction = Math.random() > 0.5 ? 'increased' : 'decreased';
      const percentage = (Math.random() * 5 + 1).toFixed(2);
      
      title = `${crypto?.name || 'Crypto'} Price Alert`;
      message = `${crypto?.name || 'Crypto'} has ${direction} by ${percentage}% in the last hour.`;
    } else {
      const weather = weatherData[Math.floor(Math.random() * weatherData.length)];
      const conditions = ['heavy rain', 'thunderstorms', 'extreme heat', 'high winds', 'snow'];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      
      title = `Weather Alert: ${weather?.city || 'City'}`;
      message = `${condition.charAt(0).toUpperCase() + condition.slice(1)} expected in ${weather?.city || 'your area'}.`;
    }
    
    const newNotification: Notification = {
      id: `notification-${Date.now()}`,
      type,
      title,
      message,
      timestamp: Date.now(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
    
    // Also show as toast
    toast({
      title: newNotification.title,
      description: newNotification.message,
      variant: type === 'price_alert' ? 'default' : 'destructive',
    });
  };

  const fetchWeatherHistoryForCity = async (cityId: string) => {
    try {
      setIsLoading(prev => ({ ...prev, weatherHistory: true }));
      setError(prev => ({ ...prev, weatherHistory: null }));
      
      const city = weatherData.find(w => w.id === cityId);
      if (!city) throw new Error('City not found');
      
      const historyData = await fetchWeatherHistory(city.city);
      setWeatherHistory({
        city: city.city,
        country: city.country,
        history: historyData
      });
      setIsLoading(prev => ({ ...prev, weatherHistory: false }));
    } catch (err) {
      console.error('Error fetching weather history:', err);
      setError(prev => ({ ...prev, weatherHistory: 'Failed to load weather history. Please try again later.' }));
      setIsLoading(prev => ({ ...prev, weatherHistory: false }));
    }
  };

  const fetchCryptoHistoryForCoin = async (cryptoId: string) => {
    try {
      setIsLoading(prev => ({ ...prev, cryptoHistory: true }));
      setError(prev => ({ ...prev, cryptoHistory: null }));
      
      const historyData = await fetchCryptoHistory(cryptoId);
      setCryptoHistory({
        id: cryptoId,
        history: historyData
      });
      setIsLoading(prev => ({ ...prev, cryptoHistory: false }));
    } catch (err) {
      console.error('Error fetching crypto history:', err);
      setError(prev => ({ ...prev, cryptoHistory: 'Failed to load price history. Please try again later.' }));
      setIsLoading(prev => ({ ...prev, cryptoHistory: false }));
    }
  };

  const addFavoriteCity = (cityId: string) => {
    setFavoriteItems(prev => {
      const newFavorites = {
        ...prev,
        cities: [...prev.cities, cityId]
      };
      localStorage.setItem('dashboardFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavoriteCity = (cityId: string) => {
    setFavoriteItems(prev => {
      const newFavorites = {
        ...prev,
        cities: prev.cities.filter(id => id !== cityId)
      };
      localStorage.setItem('dashboardFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const addFavoriteCrypto = (cryptoId: string) => {
    setFavoriteItems(prev => {
      const newFavorites = {
        ...prev,
        cryptos: [...prev.cryptos, cryptoId]
      };
      localStorage.setItem('dashboardFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFavoriteCrypto = (cryptoId: string) => {
    setFavoriteItems(prev => {
      const newFavorites = {
        ...prev,
        cryptos: prev.cryptos.filter(id => id !== cryptoId)
      };
      localStorage.setItem('dashboardFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <DashboardContext.Provider
      value={{
        weatherData,
        cryptoData,
        newsArticles,
        notifications,
        weatherHistory,
        cryptoHistory,
        isLoading,
        error,
        favoriteItems,
        addFavoriteCity,
        removeFavoriteCity,
        addFavoriteCrypto,
        removeFavoriteCrypto,
        markNotificationAsRead,
        clearAllNotifications,
        fetchWeatherHistoryForCity,
        fetchCryptoHistoryForCoin,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
