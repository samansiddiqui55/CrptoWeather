
import { CryptoData, CryptoHistoryItem } from '@/types';

// Mock crypto data for demo 
const CRYPTO_INFO = {
  'bitcoin': {
    name: 'Bitcoin',
    symbol: 'BTC',
    basePrice: 35000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    circulatingSupply: 19000000
  },
  'ethereum': {
    name: 'Ethereum',
    symbol: 'ETH',
    basePrice: 2000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    circulatingSupply: 120000000
  },
  'solana': {
    name: 'Solana',
    symbol: 'SOL',
    basePrice: 100,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    circulatingSupply: 400000000
  },
  'cardano': {
    name: 'Cardano',
    symbol: 'ADA',
    basePrice: 0.5,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    circulatingSupply: 35000000000
  },
  'ripple': {
    name: 'XRP',
    symbol: 'XRP',
    basePrice: 0.6,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    circulatingSupply: 45000000000
  }
};

// Mock implementation for demo 
export const fetchCryptoData = async (cryptoIds: string[]): Promise<CryptoData[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return cryptoIds.map(id => {
    const info = CRYPTO_INFO[id] || {
      name: id.charAt(0).toUpperCase() + id.slice(1),
      symbol: id.substring(0, 3).toUpperCase(),
      basePrice: 10,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      circulatingSupply: 1000000
    };
    
    const priceVariation = Math.random() * 0.2 - 0.1; 
    const price = info.basePrice * (1 + priceVariation);
    const priceChangePercentage24h = (Math.random() * 10) - 5; 
    
    return {
      id,
      name: info.name,
      symbol: info.symbol,
      price,
      priceChangePercentage24h,
      marketCap: price * info.circulatingSupply,
      volume24h: price * info.circulatingSupply * (Math.random() * 0.2),
      circulatingSupply: info.circulatingSupply,
      image: info.image
    };
  });
};

export const fetchCryptoHistory = async (cryptoId: string): Promise<CryptoHistoryItem[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const history: CryptoHistoryItem[] = [];
  const now = Date.now();
  const info = CRYPTO_INFO[cryptoId] || {
    basePrice: 10
  };
  
  // Generate data for the last 30 days 
  for (let i = 0; i < 30; i++) {
    const dayAgo = now - (i * 24 * 60 * 60 * 1000);
    const priceVariation = Math.random() * 0.4 - 0.2; 
    
    history.push({
      timestamp: dayAgo,
      price: info.basePrice * (1 + priceVariation)
    });
  }
  
  return history.sort((a, b) => a.timestamp - b.timestamp);
};
