
// Weather types
export interface WeatherData {
  id: string;
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  timestamp: number;
}

export interface WeatherHistoryItem {
  timestamp: number;
  temperature: number;
  humidity: number;
  condition: string;
}

export interface WeatherHistoryData {
  city: string;
  country: string;
  history: WeatherHistoryItem[];
}

// Cryptocurrency types
export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  image: string;
}

export interface CryptoHistoryItem {
  timestamp: number;
  price: number;
}

export interface CryptoHistoryData {
  id: string;
  history: CryptoHistoryItem[];
}

// News types
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  imageUrl?: string;
  publishedAt: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'price_alert' | 'weather_alert';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}
