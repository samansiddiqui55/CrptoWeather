
import React from 'react';
import { Link } from 'react-router-dom';
import { CryptoData } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/context/DashboardContext';
import { ArrowUp, ArrowDown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CryptoCardProps {
  crypto: CryptoData;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value > 1 ? 2 : 6,
  }).format(value);
};

const formatMarketCap = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return formatCurrency(value);
};

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const { favoriteItems, addFavoriteCrypto, removeFavoriteCrypto } = useDashboard();
  const isFavorite = favoriteItems.cryptos.includes(crypto.id);
  
  const priceChangeIsPositive = crypto.priceChangePercentage24h >= 0;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavoriteCrypto(crypto.id);
    } else {
      addFavoriteCrypto(crypto.id);
    }
  };
  
  return (
    <Link to={`/crypto/${crypto.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="h-10 w-10 mr-3 rounded-full overflow-hidden">
                <img src={crypto.image} alt={crypto.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dashboard-dark-blue">{crypto.name}</h3>
                <p className="text-gray-500 text-sm">{crypto.symbol.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xl font-bold">{formatCurrency(crypto.price)}</span>
              <div className={cn(
                "flex items-center text-sm",
                priceChangeIsPositive ? "text-dashboard-green" : "text-dashboard-red"
              )}>
                {priceChangeIsPositive ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(crypto.priceChangePercentage24h).toFixed(2)}%
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              <p className="font-medium">{formatMarketCap(crypto.marketCap)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">24h Volume</p>
              <p className="font-medium">{formatMarketCap(crypto.volume24h)}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 bg-gray-50 flex justify-between">
          <p className="text-sm text-gray-500 flex items-center">
            Circulating Supply: {crypto.circulatingSupply.toLocaleString()}
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

export default CryptoCard;
