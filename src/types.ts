export type NavTab =
  | 'home'
  | 'about'
  | 'login'
  | 'dashboard'
  | 'trading'
  | 'portfolio'
  | 'watchlist'
  | 'orders'
  | 'signals'
  | 'settings'
  | 'profile'
  | 'admin';

export type AssetCategory = 'Crypto' | 'Stocks' | 'Forex' | 'Commodities';

export interface ChartPoint {
  time: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Asset {
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: string;
  chartData: ChartPoint[];
  iconUrl?: string;
}

export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_LOSS';
export type OrderStatus = 'OPEN' | 'FILLED' | 'CANCELLED';

export interface Order {
  id: string;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price: number;
  amount: number;
  total: number;
  status: OrderStatus;
  date: string;
  leverage: number;
  pnl?: number;
}

export interface PortfolioPosition {
  symbol: string;
  name: string;
  category: AssetCategory;
  amount: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface AISignal {
  id: string;
  symbol: string;
  assetName: string;
  direction: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  timeframe: string;
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  riskRewardRatio: string;
  summary: string;
  catalysts: string[];
  reasoning: string;
  timestamp: string;
  status: 'ACTIVE' | 'TARGET_HIT' | 'EXPIRED';
  technicalIndicators?: {
    rsi?: number;
    macd?: string;
    ema20?: string;
    volume?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'TRADER' | 'ADMIN';
  avatar: string;
  kycLevel: 'Verified (Tier 2)' | 'Pending' | 'Unverified';
  balanceUsd: number;
  totalInvested: number;
  totalProfit: number;
  winRate: number;
  totalTradesCount: number;
  currency: string;
  twoFactorEnabled: boolean;
  aiRiskPreference: 'Conservative' | 'Moderate' | 'Aggressive';
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  targetPriceAlert?: number;
  addedAt: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  balanceUsd: number;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
  status: 'ACTIVE' | 'SUSPENDED';
  joinedDate: string;
  totalTrades: number;
}

export interface SystemStats {
  totalUsers: number;
  totalVolume24h: number;
  activeSignalsCount: number;
  aiAccuracy: number;
  systemHealth: 'OPTIMAL' | 'DEGRADED' | 'MAINTENANCE';
  liquidityPool: number;
}
