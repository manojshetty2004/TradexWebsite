import React, { useState } from 'react';
import { WatchlistItem, Asset, NavTab, UserProfile } from '../types';
import { Star, Plus, Trash2, LineChart, Bell, Search, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface WatchlistViewProps {
  watchlist: WatchlistItem[];
  assets: Asset[];
  setCurrentTab: (tab: NavTab) => void;
  onSelectAsset: (asset: Asset) => void;
  onAddToWatchlist: (asset: Asset) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  user?: UserProfile | null;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  watchlist,
  assets,
  setCurrentTab,
  onSelectAsset,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  user
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const availableToAdd = assets.filter(
    a => !watchlist.some(w => w.symbol === a.symbol)
  );

  return (
    <div id="watchlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <span>Market Watchlist & Price Alerts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Monitor priority instruments with custom volatility and target price notifications.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Asset to Watchlist</span>
        </button>
      </div>

      {/* Grid of Watchlist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlist.map((item) => {
          const liveAsset = assets.find(a => a.symbol === item.symbol);
          const currentPrice = liveAsset ? liveAsset.price : item.price;
          const change24h = liveAsset ? liveAsset.change24h : item.change24h;

          return (
            <div
              key={item.symbol}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 space-y-4 transition-all shadow-lg relative group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-cyan-400 border border-slate-700">
                    {item.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{item.symbol}</h3>
                    <p className="text-xs text-slate-400">{item.name}</p>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromWatchlist(item.symbol)}
                  className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Remove from Watchlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Price & Change */}
              <div className="flex items-baseline justify-between border-y border-slate-800/80 py-3">
                <div className="text-2xl font-black font-mono text-white">
                  {formatCurrency(currentPrice, user?.currency || 'INR')}
                </div>
                <div className={`flex items-center text-xs font-bold font-mono px-2 py-0.5 rounded ${
                  change24h >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {change24h >= 0 ? '+' : ''}{change24h}%
                </div>
              </div>

              {/* Price Alert Badge */}
              <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="flex items-center space-x-1">
                  <Bell className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Target Alert:</span>
                </span>
                <span className="font-mono text-cyan-300 font-semibold">
                  {item.targetPriceAlert ? formatCurrency(item.targetPriceAlert, user?.currency || 'INR') : 'Not Set'}
                </span>
              </div>

              {/* Actions */}
              <button
                onClick={() => {
                  if (liveAsset) onSelectAsset(liveAsset);
                  setCurrentTab('trading');
                }}
                className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <LineChart className="w-4 h-4" />
                <span>Trade {item.symbol} Terminal</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white">Add Asset to Watchlist</h3>
            
            <div className="max-h-60 overflow-y-auto space-y-1">
              {availableToAdd.map(a => (
                <button
                  key={a.symbol}
                  onClick={() => {
                    onAddToWatchlist(a);
                    setShowAddModal(false);
                  }}
                  className="w-full text-left p-3 hover:bg-slate-800 rounded-xl flex items-center justify-between transition-colors border border-slate-800"
                >
                  <div>
                    <div className="font-bold text-xs">{a.symbol}</div>
                    <div className="text-[10px] text-slate-400">{a.name}</div>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <div>${a.price.toFixed(2)}</div>
                    <div className={a.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {a.change24h}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
