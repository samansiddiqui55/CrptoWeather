
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboard } from '@/context/DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const WeatherDetail: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  
  const { 
    weatherData, 
    weatherHistory, 
    isLoading, 
    error, 
    fetchWeatherHistoryForCity 
  } = useDashboard();
  
  const cityData = weatherData.find(city => city.id === cityId);
  
  useEffect(() => {
    if (cityId) {
      fetchWeatherHistoryForCity(cityId);
    }
  }, [cityId, fetchWeatherHistoryForCity]);
  
  if (!cityData) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>City not found</AlertDescription>
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
  
  const chartData = weatherHistory?.history.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    temperature: item.temperature,
    humidity: item.humidity,
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
            <div>
              <CardTitle className="text-2xl font-bold">{cityData.city}, {cityData.country}</CardTitle>
              <p className="text-gray-500 mt-1">Current weather and historical data</p>
            </div>
            <div className="text-4xl">{cityData.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Temperature</p>
                <p className="text-3xl font-bold">{cityData.temperature}°C</p>
                <p className="text-gray-600 capitalize">{cityData.condition}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Humidity</p>
                <p className="text-3xl font-bold">{cityData.humidity}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Wind Speed</p>
                <p className="text-3xl font-bold">{cityData.windSpeed} km/h</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Updated</p>
                <p className="text-xl font-bold">{new Date(cityData.timestamp).toLocaleTimeString()}</p>
                <p className="text-gray-600">{new Date(cityData.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-4">24-Hour Weather History</h3>
            
            {isLoading.weatherHistory ? (
              <Skeleton className="h-80 w-full" />
            ) : error.weatherHistory ? (
              <Alert variant="destructive">
                <AlertDescription>{error.weatherHistory}</AlertDescription>
              </Alert>
            ) : chartData ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      angle={-45} 
                      textAnchor="end"
                      height={60}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis yAxisId="left" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#0EA5E9" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-gray-500">No historical data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherDetail;
