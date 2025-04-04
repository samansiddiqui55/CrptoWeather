
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { cn } from '@/lib/utils';

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

const CryptoDetail: React.FC = () => {
  const { cryptoId } = useParams<{ cryptoId: string }>();
  const navigate = useNavigate();
  
  const { 
    cryptoData, 
    cryptoHistory, 
    isLoading, 
    error, 
    fetchCryptoHistoryForCoin 
  } = useDashboard();
  
  const cryptoInfo = cryptoData.find(crypto => crypto.id === cryptoId);
  
  useEffect(() => {
    if (cryptoId) {
      fetchCryptoHistoryForCoin(cryptoId);
    }
  }, [cryptoId, fetchCryptoHistoryForCoin]);
  
  if (!cryptoInfo) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>Cryptocurrency not found</AlertDescription>
        </Alert>
        <Button
          className="mt-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
      </div>
    );
  }
  
  const priceChangeIsPositive = cryptoInfo.priceChangePercentage24h >= 0;
  
  const chartData = cryptoHistory?.history.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    price: item.price,
  }));
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 mr-4 rounded-full overflow-hidden">
                <img src={cryptoInfo.image} alt={cryptoInfo.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">{cryptoInfo.name} ({cryptoInfo.symbol.toUpperCase()})</CardTitle>
                <div className="flex items-center mt-1">
                  <p className="text-xl font-semibold">{formatCurrency(cryptoInfo.price)}</p>
                  <div className={cn(
                    "flex items-center ml-2 px-2 py-0.5 rounded",
                    priceChangeIsPositive ? "bg-green-100 text-dashboard-green" : "bg-red-100 text-dashboard-red"
                  )}>
                    {priceChangeIsPositive ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(cryptoInfo.priceChangePercentage24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Market Cap</p>
                <p className="text-2xl font-bold">{formatMarketCap(cryptoInfo.marketCap)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">24h Volume</p>
                <p className="text-2xl font-bold">{formatMarketCap(cryptoInfo.volume24h)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Circulating Supply</p>
                <p className="text-2xl font-bold">{cryptoInfo.circulatingSupply.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Price Change (24h)</p>
                <p className={cn(
                  "text-2xl font-bold",
                  priceChangeIsPositive ? "text-dashboard-green" : "text-dashboard-red"
                )}>
                  {priceChangeIsPositive ? '+' : ''}{cryptoInfo.priceChangePercentage24h.toFixed(2)}%
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">Price History (30 Days)</h3>
            
            {isLoading.cryptoHistory ? (
              <Skeleton className="h-80 w-full" />
            ) : error.cryptoHistory ? (
              <Alert variant="destructive">
                <AlertDescription>{error.cryptoHistory}</AlertDescription>
              </Alert>
            ) : chartData ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                      domain={['dataMin', 'dataMax']}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number), 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8B5CF6" 
                      fill="#8B5CF6" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-gray-500">No price history available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoDetail;
