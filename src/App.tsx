import React, { useState, useEffect } from 'react';
import { Asset, AISignal, UserProfile } from './types';
import { INITIAL_ASSETS, INITIAL_SIGNALS, DEMO_USERS } from './data/mockData';
import { SinglePageWebsite } from './components/SinglePageWebsite';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USERS.trader);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [signals] = useState<AISignal[]>(INITIAL_SIGNALS);

  // Dynamic price ticker fluctuations for the single page
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prevAssets =>
        prevAssets.map(asset => {
          const deltaPct = (Math.random() - 0.49) * 0.4;
          const newPrice = Math.max(0.01, Number((asset.price * (1 + deltaPct / 100)).toFixed(2)));
          const newChange = Number((asset.change24h + deltaPct * 0.1).toFixed(2));
          return {
            ...asset,
            price: newPrice,
            change24h: newChange
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SinglePageWebsite
      assets={assets}
      signals={signals}
      user={user}
      setUser={setUser}
    />
  );
}
