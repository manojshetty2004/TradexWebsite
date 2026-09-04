import React from 'react';
import { NavTab, Asset, AISignal, PortfolioPosition, Order, UserProfile } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart as PieIcon, 
  Bot, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  ArrowDownLeft, 
  Wallet, 
  Activity, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/formatters';

interface DashboardViewProps {
  user: UserProfile | null;
  setCurrentTab: (tab: NavTab) => void;
  assets: Asset[];
  signals: AISignal[];
  positions: PortfolioPosition[];
  orders: Order[];
  onSelectAsset: (asset: Asset) => void;
  onOpenDeposit: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  setCurrentTab,
  assets,
  signals,
  positions,
  orders,
  onSelectAsset,
  onOpenDeposit,
  onOpenAuth
}) => {
  if (!user) {
    return (
      <div id="dashboard-guest-state" className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
          <Wallet className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Access Your Trading Dashboard</h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Sign in or try our 1-click Demo Trader account to view portfolio stats, active AI signals, and trade execution metrics.
        </p>
        <button
          onClick={() => onOpenAuth('login')}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 transition-all cursor-pointer"
        >
          Sign In / Demo Login
        </button>
      </div>
    );
  }

  // Account P&L growth history curve
  const performanceData = [
    { date: 'Mon', value: 112000 },
    { date: 'Tue', value: 114500 },
    { date: 'Wed', value: 113800 },
    { date: 'Thu', value: 118200 },
    { date: 'Fri', value: 121000 },
    { date: 'Sat', value: 123400 },
    { date: 'Sun', value: user.balanceUsd }
  ];

  // Portfolio Pie data
  const pieColors = ['#06b6d4', '#3b82f6', '#10b981', '#8b5cf6'];
  const pieData = positions.map((pos) => ({
    name: pos.symbol,
    value: pos.totalValue
  }));

  const topGainers = [...assets].sort((a, b) => b.change24h - a.change24h).slice(0, 3);
  const openOrdersCount = orders.filter(o => o.status === 'OPEN').length;

  return (
    <div id="dashboard-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-slate-100">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2">
            <span>Welcome back, {user.name}</span>
            <span className="text-xs font-semibold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              {user.kycLevel}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Overview of your active portfolio, AI signals, and execution status.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenDeposit}
            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Deposit Funds</span>
          </button>
          <button
            onClick={() => setCurrentTab('trading')}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Net Worth */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden">
          <div className="text-xs text-slate-400 font-medium">Total Portfolio Value</div>
          <div className="text-2xl font-black font-mono text-white">
            {formatCurrency(user.balanceUsd, user.currency)}
          </div>
          <div className="flex items-center space-x-1 text-xs font-semibold text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span>+{formatCurrency(user.totalProfit, user.currency)} (+29.0%) Total</span>
          </div>
        </div>

        {/* Total Profit/Loss */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Unrealized P&L</div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            +{formatCurrency(positions.reduce((acc, p) => acc + p.pnl, 0), user.currency)}
          </div>
          <div className="text-[11px] text-slate-400">Across {positions.length} active positions</div>
        </div>

        {/* AI Win Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="text-xs text-slate-400 font-medium flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Signal Win Rate</span>
          </div>
          <div className="text-2xl font-black font-mono text-cyan-400">{user.winRate}%</div>
          <div className="text-[11px] text-slate-400">Over last {user.totalTradesCount} trades</div>
        </div>

        {/* Active Open Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="text-xs text-slate-400 font-medium">Open Pending Orders</div>
          <div className="text-2xl font-black font-mono text-slate-100">{openOrdersCount}</div>
          <button 
            onClick={() => setCurrentTab('orders')} 
            className="text-xs text-cyan-400 hover:underline flex items-center space-x-1 font-semibold"
          >
            <span>Manage Orders</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main Charts & Allocation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Performance Chart */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-white">Portfolio Growth History</h3>
              <p className="text-xs text-slate-400">Net equity curve performance (USD)</p>
            </div>
            <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
              7D Trend
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="dashboardPerf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#dashboardPerf)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Distribution */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">Asset Allocation</h3>
            <PieIcon className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={40}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-slate-800 pt-3">
            {positions.map((pos, idx) => (
              <div key={pos.symbol} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieColors[idx % pieColors.length] }} />
                  <span className="text-slate-200 font-semibold">{pos.symbol}</span>
                </div>
                <div className="font-mono text-slate-300">
                  {formatCurrency(pos.totalValue, user.currency)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Active Positions & AI Signals Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Open Positions Table */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">Open Positions</h3>
            <button onClick={() => setCurrentTab('portfolio')} className="text-xs text-cyan-400 hover:underline">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Avg Buy</th>
                  <th className="py-2.5 px-3">Current</th>
                  <th className="py-2.5 px-3 text-right">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {positions.map((pos) => (
                  <tr key={pos.symbol} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-slate-100">{pos.symbol}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{pos.amount}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{formatCurrency(pos.avgBuyPrice, user.currency)}</td>
                    <td className="py-3 px-3 font-mono text-slate-200">{formatCurrency(pos.currentPrice, user.currency)}</td>
                    <td className={`py-3 px-3 font-mono text-right font-bold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {pos.pnl >= 0 ? '+' : ''}{formatCurrency(pos.pnl, user.currency)} ({pos.pnlPercent}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Signal Feed */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-base text-white">Live AI Signals</h3>
            </div>
            <button onClick={() => setCurrentTab('signals')} className="text-xs text-cyan-400 hover:underline">
              View Signals Hub
            </button>
          </div>

          <div className="space-y-3">
            {signals.slice(0, 3).map((sig) => (
              <div key={sig.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-100">{sig.symbol}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    sig.direction === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {sig.direction} ({sig.confidence}%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{sig.summary}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
                  <span>Target: {formatCurrency(sig.targetPrice, user.currency)}</span>
                  <button 
                    onClick={() => {
                      const targetAsset = assets.find(a => a.symbol === sig.symbol);
                      if (targetAsset) onSelectAsset(targetAsset);
                      setCurrentTab('trading');
                    }}
                    className="text-cyan-400 hover:underline font-semibold"
                  >
                    Execute Signal →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
