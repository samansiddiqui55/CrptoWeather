
import { NewsArticle } from '@/types';

// Mock news data for demo
const NEWS_SOURCES = ['CryptoNews', 'BlockchainToday', 'CoinDesk', 'Decrypt', 'The Block', 'CoinTelegraph'];

const CRYPTO_NEWS_TITLES = [
  'Bitcoin Surges Past $40,000 as Institutional Interest Grows',
  'Ethereum 2.0 Upgrade: What You Need to Know',
  'Regulatory Clarity Coming for Cryptocurrency Markets, Officials Say',
  'Major Bank Announces Crypto Custody Services for Institutional Clients',
  'DeFi Protocols See Record-Breaking Total Value Locked',
  'NFT Market Rebounds as Collections Reach New Highs',
  'Central Banks Accelerate CBDC Development in Response to Private Cryptocurrencies',
  'Mining Difficulty Adjusts Following Price Volatility',
  'New Tax Guidelines for Cryptocurrency Traders Introduced',
  'Climate Concerns Growing Over Bitcoin\'s Energy Consumption'
];

// Mock implementation for demo 
export const fetchNewsArticles = async (): Promise<NewsArticle[]> => {
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return CRYPTO_NEWS_TITLES.slice(0, 5).map((title, index) => {
    const now = Date.now();
    const hoursAgo = Math.floor(Math.random() * 24);
    const publishedAt = new Date(now - hoursAgo * 60 * 60 * 1000).toISOString();
    const source = NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)];
    
    return {
      id: `news-${index}`,
      title,
      description: `${title} - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in odio eget nunc faucibus commodo. Sed commodo magna sit amet enim dictum, ac tempor nunc eleifend.`,
      url: '#',
      source,
      imageUrl: `https://source.unsplash.com/random/300x200?crypto&sig=${index}`,
      publishedAt
    };
  });
};
