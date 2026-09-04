import React, { useState } from 'react';
import { AdminUserRecord, SystemStats, AISignal, Asset } from '../types';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  DollarSign, 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  Ban, 
  CheckCircle2, 
  PlusCircle, 
  Lock, 
  Sliders 
} from 'lucide-react';

interface AdminDashboardViewProps {
  adminUsers: AdminUserRecord[];
  systemStats: SystemStats;
  assets: Asset[];
  onBroadcastSignal: (signal: AISignal) => void;
  onToggleUserStatus: (userId: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  adminUsers,
  systemStats,
  assets,
  onBroadcastSignal,
  onToggleUserStatus
}) => {
  // Broadcast signal modal
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastSymbol, setBroadcastSymbol] = useState(assets[0]?.symbol || 'BTC/USD');
  const [broadcastDirection, setBroadcastDirection] = useState<'BULLISH' | 'BEARISH'>('BULLISH');
  const [broadcastConfidence, setBroadcastConfidence] = useState(90);
  const [broadcastTarget, setBroadcastTarget] = useState('98000');
  const [broadcastStop, setBroadcastStop] = useState('91000');
  const [broadcastSummary, setBroadcastSummary] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const assetObj = assets.find(a => a.symbol === broadcastSymbol);
    const newSig: AISignal = {
      id: `sig-admin-${Date.now()}`,
      symbol: broadcastSymbol,
      assetName: assetObj?.name || broadcastSymbol,
      direction: broadcastDirection,
      confidence: broadcastConfidence,
      timeframe: '4H',
      entryPrice: assetObj?.price || 100,
      targetPrice: parseFloat(broadcastTarget) || 100,
      stopLoss: parseFloat(broadcastStop) || 90,
      riskRewardRatio: '1:2.8',
      summary: broadcastSummary || `Admin Broadcast signal for ${broadcastSymbol}`,
      catalysts: ['Admin Manual High-Conviction Broadcast', 'System Liquidity Priority'],
      reasoning: 'Direct signal broadcasted from AI TRADING CENTER Command Desk.',
      timestamp: 'Just now',
      status: 'ACTIVE'
    };

    onBroadcastSignal(newSig);
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setBroadcastOpen(false);
      setBroadcastSummary('');
    }, 1500);
  };

  return (
    <div id="admin-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>COMMAND DESK CONTROL PANEL</span>
          </div>
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Platform-wide risk oversight, manual AI signal broadcasting, and user management.</p>
        </div>

        <button
          onClick={() => setBroadcastOpen(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span>Broadcast Manual AI Signal</span>
        </button>
      </div>

      {/* System Metrics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400">Platform 24h Volume</div>
          <div className="text-2xl font-black font-mono text-amber-400">
            ${(systemStats.totalVolume24h / 1e9).toFixed(2)}B
          </div>
          <div className="text-[11px] text-slate-500">Sub-second DMA execution</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400">Total Registered Traders</div>
          <div className="text-2xl font-black font-mono text-white">
            {systemStats.totalUsers.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400">+142 new today</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400">AI Signal Accuracy Rate</div>
          <div className="text-2xl font-black font-mono text-cyan-400">
            {systemStats.aiAccuracy}%
          </div>
          <div className="text-[11px] text-slate-400">Evaluated over 30 days</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400">Managed Liquidity Vaults</div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ${(systemStats.liquidityPool / 1e6).toFixed(1)}M
          </div>
          <div className="text-[11px] text-emerald-400/80">System Health: {systemStats.systemHealth}</div>
        </div>

      </div>

      {/* User Management Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-white flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>User Accounts & Risk Compliance</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Total Users: {adminUsers.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">User ID</th>
                <th className="py-3 px-3">Name & Email</th>
                <th className="py-3 px-3">Balance (USD)</th>
                <th className="py-3 px-3">KYC Level</th>
                <th className="py-3 px-3">Joined Date</th>
                <th className="py-3 px-3">Total Trades</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {adminUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/40 font-mono">
                  <td className="py-3 px-3 text-slate-500">{u.id}</td>
                  <td className="py-3 px-3 font-sans">
                    <div className="font-bold text-slate-100">{u.name}</div>
                    <div className="text-[10px] text-slate-400">{u.email}</div>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-200">${u.balanceUsd.toLocaleString()}</td>
                  <td className="py-3 px-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.kycStatus === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {u.kycStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[10px] font-sans">{u.joinedDate}</td>
                  <td className="py-3 px-3 text-slate-300">{u.totalTrades}</td>
                  <td className="py-3 px-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onToggleUserStatus(u.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold font-sans transition-all cursor-pointer ${
                        u.status === 'ACTIVE'
                          ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BROADCAST SIGNAL MODAL */}
      {broadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setBroadcastOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Bot className="w-5 h-5 text-amber-400" />
              <span>Broadcast System-Wide AI Signal</span>
            </h3>

            <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Select Target Asset</label>
                <select
                  value={broadcastSymbol}
                  onChange={(e) => setBroadcastSymbol(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                >
                  {assets.map(a => (
                    <option key={a.symbol} value={a.symbol}>{a.symbol} ({a.name})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Direction</label>
                  <select
                    value={broadcastDirection}
                    onChange={(e: any) => setBroadcastDirection(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                  >
                    <option value="BULLISH">BULLISH</option>
                    <option value="BEARISH">BEARISH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Conviction Confidence (%)</label>
                  <input
                    type="number"
                    value={broadcastConfidence}
                    onChange={(e) => setBroadcastConfidence(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Target Price ($)</label>
                  <input
                    type="text"
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Stop Loss ($)</label>
                  <input
                    type="text"
                    value={broadcastStop}
                    onChange={(e) => setBroadcastStop(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Signal Summary & Catalysts</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Major institutional liquidity pool breach detected on 4H chart."
                  value={broadcastSummary}
                  onChange={(e) => setBroadcastSummary(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none"
                />
              </div>

              {broadcastSuccess && (
                <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300">
                  ✓ Signal broadcasted successfully to all traders!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all cursor-pointer"
              >
                Broadcast Signal Now
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
