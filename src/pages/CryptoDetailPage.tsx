
import React from 'react';
import Header from '@/components/Header';
import CryptoDetail from '@/components/crypto/CryptoDetail';

const CryptoDetailPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <CryptoDetail />
    </div>
  );
};

export default CryptoDetailPage;
