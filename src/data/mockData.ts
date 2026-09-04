import { Asset, AISignal, PortfolioPosition, Order, UserProfile, WatchlistItem, AdminUserRecord, SystemStats } from '../types';

export const INITIAL_ASSETS: Asset[] = [
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'Crypto',
    price: 94850.50,
    change24h: 3.82,
    high24h: 96200.00,
    low24h: 91400.00,
    volume24h: 38400000000,
    marketCap: '$1.86 Trillion',
    chartData: [
      { time: '00:00', open: 91500, high: 92100, low: 91200, close: 91900, price: 91900, volume: 1200 },
      { time: '04:00', open: 91900, high: 92800, low: 91700, close: 92600, price: 92600, volume: 1800 },
      { time: '08:00', open: 92600, high: 93400, low: 92400, close: 93200, price: 93200, volume: 2400 },
      { time: '12:00', open: 93200, high: 94100, low: 93000, close: 93800, price: 93800, volume: 3100 },
      { time: '16:00', open: 93800, high: 95100, low: 93600, close: 94600, price: 94600, volume: 4200 },
      { time: '20:00', open: 94600, high: 96200, low: 94200, close: 94850.50, price: 94850.50, volume: 3900 }
    ]
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    category: 'Crypto',
    price: 3420.25,
    change24h: 5.14,
    high24h: 3480.00,
    low24h: 3210.00,
    volume24h: 21500000000,
    marketCap: '$412 Billion',
    chartData: [
      { time: '00:00', open: 3220, high: 3260, low: 3200, close: 3250, price: 3250, volume: 4000 },
      { time: '04:00', open: 3250, high: 3310, low: 3240, close: 3290, price: 3290, volume: 5500 },
      { time: '08:00', open: 3290, high: 3350, low: 3280, close: 3340, price: 3340, volume: 6200 },
      { time: '12:00', open: 3340, high: 3400, low: 3320, close: 3380, price: 3380, volume: 7100 },
      { time: '16:00', open: 3380, high: 3480, low: 3360, close: 3420.25, price: 3420.25, volume: 8900 }
    ]
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    category: 'Stocks',
    price: 138.60,
    change24h: 4.25,
    high24h: 141.20,
    low24h: 132.80,
    volume24h: 18200000000,
    marketCap: '$3.40 Trillion',
    chartData: [
      { time: '09:30', open: 133.0, high: 134.5, low: 132.8, close: 134.2, price: 134.2, volume: 15000 },
      { time: '11:00', open: 134.2, high: 136.8, low: 133.9, close: 136.0, price: 136.0, volume: 22000 },
      { time: '13:00', open: 136.0, high: 138.5, low: 135.5, close: 137.9, price: 137.9, volume: 18000 },
      { time: '15:00', open: 137.9, high: 141.2, low: 137.2, close: 138.6, price: 138.6, volume: 29000 }
    ]
  },
  {
    symbol: 'SOL/USD',
    name: 'Solana',
    category: 'Crypto',
    price: 194.80,
    change24h: -1.85,
    high24h: 202.50,
    low24h: 189.20,
    volume24h: 8900000000,
    marketCap: '$91 Billion',
    chartData: [
      { time: '00:00', open: 198.5, high: 201.2, low: 197.0, close: 199.8, price: 199.8, volume: 3000 },
      { time: '06:00', open: 199.8, high: 202.5, low: 196.0, close: 197.2, price: 197.2, volume: 4200 },
      { time: '12:00', open: 197.2, high: 198.0, low: 189.2, close: 192.5, price: 192.5, volume: 5600 },
      { time: '18:00', open: 192.5, high: 196.0, low: 191.0, close: 194.8, price: 194.8, volume: 4800 }
    ]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc',
    category: 'Stocks',
    price: 254.30,
    change24h: 6.80,
    high24h: 258.90,
    low24h: 238.10,
    volume24h: 14500000000,
    marketCap: '$808 Billion',
    chartData: [
      { time: '09:30', open: 239.0, high: 243.5, low: 238.1, close: 242.0, price: 242.0, volume: 12000 },
      { time: '11:30', open: 242.0, high: 249.8, low: 241.5, close: 248.5, price: 248.5, volume: 19000 },
      { time: '13:30', open: 248.5, high: 254.0, low: 247.0, close: 252.1, price: 252.1, volume: 21000 },
      { time: '15:30', open: 252.1, high: 258.9, low: 251.0, close: 254.3, price: 254.3, volume: 26000 }
    ]
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc',
    category: 'Stocks',
    price: 228.40,
    change24h: 0.95,
    high24h: 230.10,
    low24h: 226.50,
    volume24h: 9200000000,
    marketCap: '$3.48 Trillion',
    chartData: [
      { time: '09:30', open: 226.8, high: 228.0, low: 226.5, close: 227.4, price: 227.4, volume: 8000 },
      { time: '12:00', open: 227.4, high: 229.5, low: 227.0, close: 228.9, price: 228.9, volume: 11000 },
      { time: '15:30', open: 228.9, high: 230.1, low: 228.0, close: 228.4, price: 228.4, volume: 14000 }
    ]
  },
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    category: 'Forex',
    price: 1.0892,
    change24h: 0.32,
    high24h: 1.0915,
    low24h: 1.0845,
    volume24h: 120000000000,
    marketCap: 'N/A',
    chartData: [
      { time: '00:00', open: 1.0855, high: 1.0870, low: 1.0845, close: 1.0862, price: 1.0862, volume: 45000 },
      { time: '08:00', open: 1.0862, high: 1.0895, low: 1.0860, close: 1.0888, price: 1.0888, volume: 62000 },
      { time: '16:00', open: 1.0888, high: 1.0915, low: 1.0880, close: 1.0892, price: 1.0892, volume: 51000 }
    ]
  },
  {
    symbol: 'GOLD',
    name: 'Gold Spot',
    category: 'Commodities',
    price: 2685.50,
    change24h: 1.15,
    high24h: 2698.00,
    low24h: 2652.00,
    volume24h: 42000000000,
    marketCap: '$17.2 Trillion',
    chartData: [
      { time: '00:00', open: 2655, high: 2668, low: 2652, close: 2664, price: 2664, volume: 18000 },
      { time: '08:00', open: 2664, high: 2682, low: 2661, close: 2678, price: 2678, volume: 24000 },
      { time: '16:00', open: 2678, high: 2698, low: 2675, close: 2685.5, price: 2685.5, volume: 29000 }
    ]
  }
];

export const INITIAL_SIGNALS: AISignal[] = [
  {
    id: 'sig-101',
    symbol: 'BTC/USD',
    assetName: 'Bitcoin',
    direction: 'BULLISH',
    confidence: 92,
    timeframe: '4H',
    entryPrice: 94250,
    targetPrice: 98800,
    stopLoss: 91900,
    riskRewardRatio: '1:2.9',
    summary: 'Bullish continuation pattern above 50 EMA on high volume inflow.',
    catalysts: [
      'Institutional ETF net inflow +$410M today',
      'MACD momentum crossover on 4H chart',
      'Exchange reserve drain hitting 6-month lows'
    ],
    reasoning: 'On-chain accumulation metrics coupled with high taker buy volume indicate potential breakout towards $98,800. Strong floor support established at $91,900.',
    timestamp: '10 minutes ago',
    status: 'ACTIVE',
    technicalIndicators: {
      rsi: 64.2,
      macd: 'Bullish Crossover',
      ema20: 'Above 20 EMA',
      volume: 'High (+34%)'
    }
  },
  {
    id: 'sig-102',
    symbol: 'NVDA',
    assetName: 'NVIDIA Corp',
    direction: 'BULLISH',
    confidence: 89,
    timeframe: '1D',
    entryPrice: 136.50,
    targetPrice: 152.00,
    stopLoss: 129.80,
    riskRewardRatio: '1:2.3',
    summary: 'Strong AI chip demand trajectory and bullish option flow setup.',
    catalysts: [
      'Hyperscaler capex guidance raised across tech sector',
      'Call option sweepers detected at $145 strike',
      'Breakout from 3-week consolidation wedge'
    ],
    reasoning: 'Fundamental tailwinds remain robust with technical consolidation completed. Favorable momentum indicators signal next leg towards $152.',
    timestamp: '25 minutes ago',
    status: 'ACTIVE',
    technicalIndicators: {
      rsi: 58.9,
      macd: 'Neutral-Bullish',
      ema20: 'Above 50 EMA',
      volume: 'Above Average'
    }
  },
  {
    id: 'sig-103',
    symbol: 'SOL/USD',
    assetName: 'Solana',
    direction: 'BEARISH',
    confidence: 76,
    timeframe: '1H',
    entryPrice: 196.20,
    targetPrice: 182.00,
    stopLoss: 201.50,
    riskRewardRatio: '1:2.7',
    summary: 'Short-term momentum weakening near key $200 psychological barrier.',
    catalysts: [
      'DeFi DEX volume down 8% 24h',
      'RSI bearish divergence on 1H timeframe',
      'Rejection at $202 resistance band'
    ],
    reasoning: 'Short-term exhaustion visible near $200 resistance. Target entry for quick scalp back down to $182 support level.',
    timestamp: '1 hour ago',
    status: 'ACTIVE',
    technicalIndicators: {
      rsi: 69.8,
      macd: 'Bearish Divergence',
      ema20: 'At 20 EMA',
      volume: 'Declining'
    }
  },
  {
    id: 'sig-104',
    symbol: 'GOLD',
    assetName: 'Gold Spot',
    direction: 'BULLISH',
    confidence: 94,
    timeframe: '1D',
    entryPrice: 2675.00,
    targetPrice: 2750.00,
    stopLoss: 2635.00,
    riskRewardRatio: '1:1.9',
    summary: 'Central bank hedging and geopolitical safe-haven flow escalation.',
    catalysts: [
      'Central bank reserve accumulation continues for 7th month',
      'Macro rate cut expectations fueling commodity surge',
      'All-time high close imminent'
    ],
    reasoning: 'Persistent macro demand maintaining steady upward trendline. Low correlation to risk assets makes it a prime allocation asset.',
    timestamp: '2 hours ago',
    status: 'ACTIVE',
    technicalIndicators: {
      rsi: 61.0,
      macd: 'Sustained Bullish',
      ema20: 'Well Above 200 EMA',
      volume: 'Steady'
    }
  }
];

export const DEMO_USERS: Record<string, UserProfile> = {
  trader: {
    id: 'usr-7890',
    name: 'Alex Vance',
    email: 'alex.vance@aitradingcenter.io',
    role: 'TRADER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    kycLevel: 'Verified (Tier 2)',
    balanceUsd: 124500.80,
    totalInvested: 88400.00,
    totalProfit: 36100.80,
    winRate: 78.4,
    totalTradesCount: 142,
    currency: 'INR',
    twoFactorEnabled: true,
    aiRiskPreference: 'Moderate'
  },
  admin: {
    id: 'usr-0001',
    name: 'Elena Rostova (Admin)',
    email: 'admin@aitradingcenter.io',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    kycLevel: 'Verified (Tier 2)',
    balanceUsd: 540000.00,
    totalInvested: 300000.00,
    totalProfit: 240000.00,
    winRate: 86.2,
    totalTradesCount: 420,
    currency: 'INR',
    twoFactorEnabled: true,
    aiRiskPreference: 'Aggressive'
  }
};

export const INITIAL_POSITIONS: PortfolioPosition[] = [
  {
    symbol: 'BTC/USD',
    name: 'Bitcoin',
    category: 'Crypto',
    amount: 0.65,
    avgBuyPrice: 82100.00,
    currentPrice: 94850.50,
    totalValue: 61652.82,
    pnl: 8287.82,
    pnlPercent: 15.53
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    category: 'Stocks',
    amount: 150,
    avgBuyPrice: 118.40,
    currentPrice: 138.60,
    totalValue: 20790.00,
    pnl: 3030.00,
    pnlPercent: 17.06
  },
  {
    symbol: 'ETH/USD',
    name: 'Ethereum',
    category: 'Crypto',
    amount: 4.2,
    avgBuyPrice: 3100.00,
    currentPrice: 3420.25,
    totalValue: 14365.05,
    pnl: 1345.05,
    pnlPercent: 10.33
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-901',
    symbol: 'BTC/USD',
    side: 'BUY',
    type: 'LIMIT',
    price: 92500.00,
    amount: 0.25,
    total: 23125.00,
    status: 'OPEN',
    date: '2026-08-03 08:30',
    leverage: 5
  },
  {
    id: 'ord-902',
    symbol: 'TSLA',
    side: 'BUY',
    type: 'MARKET',
    price: 254.30,
    amount: 20,
    total: 5086.00,
    status: 'FILLED',
    date: '2026-08-02 14:15',
    leverage: 1,
    pnl: 340.00
  },
  {
    id: 'ord-903',
    symbol: 'SOL/USD',
    side: 'SELL',
    type: 'STOP_LOSS',
    price: 185.00,
    amount: 15,
    total: 2775.00,
    status: 'OPEN',
    date: '2026-08-01 19:40',
    leverage: 2
  },
  {
    id: 'ord-904',
    symbol: 'GOLD',
    side: 'BUY',
    type: 'LIMIT',
    price: 2650.00,
    amount: 5,
    total: 13250.00,
    status: 'FILLED',
    date: '2026-07-30 11:20',
    leverage: 10,
    pnl: 177.50
  }
];

export const INITIAL_WATCHLIST: WatchlistItem[] = [
  { symbol: 'BTC/USD', name: 'Bitcoin', price: 94850.50, change24h: 3.82, targetPriceAlert: 100000, addedAt: '2 days ago' },
  { symbol: 'ETH/USD', name: 'Ethereum', price: 3420.25, change24h: 5.14, targetPriceAlert: 3600, addedAt: '1 week ago' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 138.60, change24h: 4.25, targetPriceAlert: 150, addedAt: '3 days ago' },
  { symbol: 'SOL/USD', name: 'Solana', price: 194.80, change24h: -1.85, targetPriceAlert: 220, addedAt: '4 days ago' },
  { symbol: 'GOLD', name: 'Gold Spot', price: 2685.50, change24h: 1.15, targetPriceAlert: 2750, addedAt: '5 days ago' }
];

export const INITIAL_ADMIN_USERS: AdminUserRecord[] = [
  { id: 'usr-101', name: 'Alex Vance', email: 'alex.vance@aitradingcenter.io', balanceUsd: 124500.80, kycStatus: 'VERIFIED', status: 'ACTIVE', joinedDate: '2025-11-12', totalTrades: 142 },
  { id: 'usr-102', name: 'Marcus Sterling', email: 'marcus@quantumfund.com', balanceUsd: 890400.00, kycStatus: 'VERIFIED', status: 'ACTIVE', joinedDate: '2025-09-04', totalTrades: 388 },
  { id: 'usr-103', name: 'Sophia Chen', email: 'sophia.c@techtrader.org', balanceUsd: 45200.00, kycStatus: 'PENDING', status: 'ACTIVE', joinedDate: '2026-01-18', totalTrades: 29 },
  { id: 'usr-104', name: 'David Miller', email: 'davidm@gmail.com', balanceUsd: 8200.50, kycStatus: 'VERIFIED', status: 'ACTIVE', joinedDate: '2026-03-02', totalTrades: 12 },
  { id: 'usr-105', name: 'Suspicious Bot Account', email: 'bot_runner_99@tempmail.com', balanceUsd: 0.00, kycStatus: 'REJECTED', status: 'SUSPENDED', joinedDate: '2026-07-29', totalTrades: 1 }
];

export const INITIAL_SYSTEM_STATS: SystemStats = {
  totalUsers: 14850,
  totalVolume24h: 1420800000,
  activeSignalsCount: 28,
  aiAccuracy: 94.2,
  systemHealth: 'OPTIMAL',
  liquidityPool: 45200000
};
