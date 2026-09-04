import React, { useState } from 'react';
import { PortfolioPosition, UserProfile, NavTab, Asset } from '../types';
import { 
  PieChart as PieIcon, 
  TrendingUp, 
  TrendingDown, 
  PlusCircle, 
  ArrowDownLeft, 
  Wallet, 
  DollarSign, 
  ShieldCheck, 
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  X
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/formatters';

interface PortfolioViewProps {
  user: UserProfile | null;
  positions: PortfolioPosition[];
  assets: Asset[];
  setCurrentTab: (tab: NavTab) => void;
  onSelectAsset: (asset: Asset) => void;
  onOpenDeposit: () => void;
  onClosePosition: (symbol: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  user,
  positions,
  assets,
  setCurrentTab,
  onSelectAsset,
  onOpenDeposit,
  onClosePosition
}) => {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  if (!user) {
    return (
      <div id="portfolio-guest-state" className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <Wallet className="w-12 h-12 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Log in to view your portfolio</h2>
        <p className="text-xs text-slate-400">Track your asset allocation, unrealized P&L, and transaction logs.</p>
      </div>
    );
  }

  const pieColors = ['#06b6d4', '#3b82f6', '#10b981', '#8b5cf6'];
  const pieData = positions.map(pos => ({
    name: pos.symbol,
    value: pos.totalValue
  }));

  const totalPositionsValue = positions.reduce((acc, p) => acc + p.totalValue, 0);
  const totalUnrealizedPnl = positions.reduce((acc, p) => acc + p.pnl, 0);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setWithdrawModalOpen(false);
      setWithdrawAmount('');
    }, 2000);
  };

  return (
    <div id="portfolio-view-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white">Portfolio & Custody</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time asset valuation, P&L breakdown, and deposit/withdrawal controls.</p>
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
            onClick={() => setWithdrawModalOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <ArrowDownLeft className="w-4 h-4 text-cyan-400" />
            <span>Withdraw Cash</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400">Total Net Worth</div>
          <div className="text-2xl font-black font-mono text-white">
            {formatCurrency(user.balanceUsd, user.currency)}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold">Includes Cash + Positions</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400">Active Positions Equity</div>
          <div className="text-2xl font-black font-mono text-cyan-400">
            {formatCurrency(totalPositionsValue, user.currency)}
          </div>
          <div className="text-[11px] text-slate-400">{positions.length} active holdings</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400">Total Unrealized P&L</div>
          <div className={`text-2xl font-black font-mono ${totalUnrealizedPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {totalUnrealizedPnl >= 0 ? '+' : ''}{formatCurrency(totalUnrealizedPnl, user.currency)}
          </div>
          <div className="text-[11px] text-slate-400">Overall return rate</div>
        </div>

      </div>

      {/* Asset Allocation & Holdings Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Allocation Pie Chart */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-base text-white flex items-center space-x-2">
            <PieIcon className="w-4 h-4 text-cyan-400" />
            <span>Asset Distribution</span>
          </h3>

          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={45}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 border-t border-slate-800 pt-3">
            {positions.map((p, idx) => (
              <div key={p.symbol} className="flex justify-between items-center text-xs">
                <span className="flex items-center space-x-2 text-slate-200 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieColors[idx % pieColors.length] }} />
                  <span>{p.symbol} ({p.name})</span>
                </span>
                <span className="font-mono text-slate-300">
                  {((p.totalValue / totalPositionsValue) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Positions Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-white">Holdings & Positions</h3>
            <span className="text-xs font-mono text-slate-400">Total Holdings: {positions.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Asset</th>
                  <th className="py-3 px-3">Holdings</th>
                  <th className="py-3 px-3">Avg Buy</th>
                  <th className="py-3 px-3">Current</th>
                  <th className="py-3 px-3">Total Value</th>
                  <th className="py-3 px-3">P&L</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {positions.map(p => (
                  <tr key={p.symbol} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-100">{p.symbol}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{p.amount}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{formatCurrency(p.avgBuyPrice, user.currency)}</td>
                    <td className="py-3 px-3 font-mono text-slate-200">{formatCurrency(p.currentPrice, user.currency)}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-100">{formatCurrency(p.totalValue, user.currency)}</td>
                    <td className={`py-3 px-3 font-mono font-bold ${p.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {p.pnl >= 0 ? '+' : ''}{formatCurrency(p.pnl, user.currency)} ({p.pnlPercent}%)
                    </td>
                    <td className="py-3 px-3 text-right space-x-1">
                      <button
                        onClick={() => {
                          const target = assets.find(a => a.symbol === p.symbol);
                          if (target) onSelectAsset(target);
                          setCurrentTab('trading');
                        }}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-[11px] font-semibold hover:bg-cyan-500/30"
                      >
                        Trade
                      </button>
                      <button
                        onClick={() => onClosePosition(p.symbol)}
                        className="px-2 py-1 bg-rose-500/20 text-rose-300 rounded text-[11px] font-semibold hover:bg-rose-500/30"
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* WITHDRAWAL MODAL */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-slate-100 relative shadow-2xl">
            <button
              onClick={() => setWithdrawModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">Withdraw Funds to Bank / Wallet</h3>
            <p className="text-xs text-slate-400">Available Cash: ${user.balanceUsd.toLocaleString()}</p>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Withdrawal Amount ($)</label>
                <input
                  type="number"
                  required
                  placeholder="500.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Destination IBAN / Wallet Address</label>
                <input
                  type="text"
                  required
                  placeholder="US893700019284019284"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {withdrawSuccess && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
                  ✓ Withdrawal request submitted! Processing via Wire Transfer.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition-all cursor-pointer"
              >
                Confirm Instant Withdrawal
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
