import React, { useState } from 'react';
import { NavTab, Asset, AISignal, UserProfile } from '../types';
import { 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Bot, 
  ShieldCheck, 
  Zap, 
  LineChart, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Cpu, 
  DollarSign,
  ChevronRight,
  Globe,
  Sliders,
  BarChart3
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/formatters';

interface LandingPageProps {
  setCurrentTab: (tab: NavTab) => void;
  assets: Asset[];
  signals: AISignal[];
  onSelectAsset: (asset: Asset) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  user?: UserProfile | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setCurrentTab,
  assets,
  signals,
  onSelectAsset,
  onOpenAuth,
  user
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const heroAsset = assets.find(a => a.symbol === 'BTC/USD') || assets[0];
  const topSignal = signals[0];

  const categories = ['All', 'Crypto', 'Stocks', 'Forex', 'Commodities'];
  const filteredAssets = activeCategory === 'All' 
    ? assets 
    : assets.filter(a => a.category === activeCategory);

  return (
    <div id="landing-page" className="space-y-20 pb-12">
      
      {/* HERO SECTION */}
      <section id="hero-section" className="relative pt-12 pb-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>OFFICIAL AI QUANTITATIVE ENGINE 3.0 IS LIVE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                Trade Smarter with <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  AI TRADING CENTER
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Institutional-grade algorithmic execution, real-time market sentiment scanning, and high-conviction Gemini AI signals across Crypto, Stocks, and Forex.
              </p>

              {/* Key Metrics Pill Row */}
              <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <div className="text-xl font-bold font-mono text-cyan-400">$2.4B+</div>
                  <div className="text-[11px] text-slate-400">24h Volume</div>
                </div>
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <div className="text-xl font-bold font-mono text-emerald-400">94.2%</div>
                  <div className="text-[11px] text-slate-400">Signal Accuracy</div>
                </div>
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                  <div className="text-xl font-bold font-mono text-indigo-400">&lt; 0.04s</div>
                  <div className="text-[11px] text-slate-400">Execution Latency</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  id="btn-hero-trade-now"
                  onClick={() => setCurrentTab('trading')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <LineChart className="w-4 h-4" />
                  <span>Launch Live Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="btn-hero-ai-signals"
                  onClick={() => setCurrentTab('signals')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Explore AI Signals</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Card Preview */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                
                {/* Header of Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                      ₿
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-base text-slate-100">{heroAsset.symbol}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">BITCOIN</span>
                      </div>
                      <div className="text-xs text-slate-400">Live AI Stream</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-mono font-bold text-slate-100">
                      {formatCurrency(heroAsset.price, user?.currency || 'INR')}
                    </div>
                    <div className={`text-xs font-semibold ${heroAsset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {heroAsset.change24h >= 0 ? '+' : ''}{heroAsset.change24h}%
                    </div>
                  </div>
                </div>

                {/* Live Mini Chart */}
                <div className="h-44 my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={heroAsset.chartData}>
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                        labelStyle={{ color: '#94a3b8' }}
                      />
                      <Area type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#heroGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* AI Signal Badge Overlay inside Card */}
                {topSignal && (
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-cyan-500/30 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center space-x-1 font-semibold text-cyan-300">
                        <Bot className="w-3.5 h-3.5 text-cyan-400" />
                        <span>AI RECOMMENDATION</span>
                      </span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
                        {topSignal.direction} ({topSignal.confidence}% Conviction)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2">{topSignal.summary}</p>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                      <span>Target: ${topSignal.targetPrice.toLocaleString()}</span>
                      <span>Stop Loss: ${topSignal.stopLoss.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    onSelectAsset(heroAsset);
                    setCurrentTab('trading');
                  }}
                  className="w-full mt-4 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Trade {heroAsset.symbol} Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIVE MARKET OVERVIEW TABLE */}
      <section id="live-markets-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <Activity className="w-4 h-4" />
              <span>Real-Time Quotes</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Live Market Center</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Markets Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Asset</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">24h Change</th>
                  <th className="py-3.5 px-4">24h High / Low</th>
                  <th className="py-3.5 px-4">Market Cap</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAssets.map((asset) => (
                  <tr key={asset.symbol} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-100 flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-cyan-400 border border-slate-700">
                        {asset.symbol.substring(0, 3)}
                      </span>
                      <div>
                        <div className="text-slate-100 font-bold">{asset.symbol}</div>
                        <div className="text-[10px] text-slate-400">{asset.name}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-200 font-semibold">
                      {formatCurrency(asset.price, user?.currency || 'INR')}
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      <span className={`px-2 py-0.5 rounded font-mono ${
                        asset.change24h >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                      {formatCurrency(asset.high24h, user?.currency || 'INR')} / {formatCurrency(asset.low24h, user?.currency || 'INR')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {asset.marketCap}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          onSelectAsset(asset);
                          setCurrentTab('trading');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-semibold text-xs border border-cyan-500/30 transition-all cursor-pointer"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* AI ENGINE ARCHITECTURE / FEATURES */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">Engine Architecture</div>
          <h2 className="text-3xl font-black text-white">Why AI TRADING CENTER Leads</h2>
          <p className="text-slate-400 text-sm mt-2">
            Combining neural NLP model scanning with sub-millisecond execution infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Gemini Neural Sentiment</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Continuously ingests global news, social liquidity sentiment, SEC filings, and on-chain whale activity to formulate predictive entry setups.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Sub-Millisecond Execution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Co-located order execution servers route trades across tier-1 liquidity providers ensuring minimum slippage and zero order rejections.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Quantum Risk Matrix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated stop-loss trailing, dynamic leverage adjustment, and position sizing algorithms protect capital during high volatility events.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white">Ready to Deploy AI Signals?</h2>
            <p className="text-slate-300 text-sm">
              Sign up in less than 60 seconds. Test our high-conviction AI signals with a risk-free simulated paper trading balance.
            </p>
            <div className="pt-2 flex justify-center space-x-4">
              <button
                onClick={() => onOpenAuth('register')}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                Create Account Now
              </button>
              <button
                onClick={() => setCurrentTab('about')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
