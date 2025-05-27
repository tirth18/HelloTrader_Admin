'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrendingClientsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/trading-clients');
  }, [router]);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <h1>Redirecting...</h1>
      <p>You are being redirected to the Trading Clients page.</p>
    </div>
  );
} 