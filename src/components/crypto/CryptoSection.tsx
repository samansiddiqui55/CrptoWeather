
import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import CryptoCard from './CryptoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CryptoSection: React.FC = () => {
  const { cryptoData, isLoading, error } = useDashboard();

  if (isLoading.crypto) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cryptocurrency</h2>
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

  if (error.crypto) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cryptocurrency</h2>
        <Alert variant="destructive">
          <AlertDescription>{error.crypto}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cryptocurrency</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cryptoData.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

export default CryptoSection;
