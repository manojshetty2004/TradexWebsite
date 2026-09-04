import React, { useState, useEffect } from 'react';
import { Asset, Order, PortfolioPosition, UserProfile, AISignal } from '../types';
import { 
  LineChart as ChartIcon, 
  TrendingUp, 
  TrendingDown, 
  Bot, 
  Sparkles, 
  Sliders, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Zap, 
  AlertCircle,
  Activity,
  Layers,
  Search,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { formatCurrency } from '../utils/formatters';

interface TradingViewProps {
  selectedAsset: Asset;
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
  user: UserProfile | null;
  onPlaceOrder: (newOrder: Order) => void;
  signals: AISignal[];
}

export const TradingView: React.FC<TradingViewProps> = ({
  selectedAsset,
  assets,
  onSelectAsset,
  user,
  onPlaceOrder,
  signals
}) => {
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP_LOSS'>('MARKET');
  const [orderPrice, setOrderPrice] = useState<number>(selectedAsset.price);
  const [amount, setAmount] = useState<string>('1');
  const [leverage, setLeverage] = useState<number>(1);
  const [takeProfit, setTakeProfit] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  const [timeframe, setTimeframe] = useState<string>('4H');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [showAIModal, setShowAIModal] = useState<boolean>(false);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  // Indicators toggle
  const [showRsi, setShowRsi] = useState<boolean>(true);
  const [showEma, setShowEma] = useState<boolean>(true);

  // Asset selector dropdown
  const [assetDropdownOpen, setAssetDropdownOpen] = useState(false);

  useEffect(() => {
    setOrderPrice(selectedAsset.price);
  }, [selectedAsset]);

  // Live Simulated Trades Stream
  const [tradesStream, setTradesStream] = useState([
    { id: 1, price: selectedAsset.price + 0.5, amount: 0.12, side: 'BUY', time: '12:04:15' },
    { id: 2, price: selectedAsset.price - 0.2, amount: 0.45, side: 'SELL', time: '12:04:12' },
    { id: 3, price: selectedAsset.price + 0.1, amount: 1.20, side: 'BUY', time: '12:04:08' },
    { id: 4, price: selectedAsset.price - 0.8, amount: 0.05, side: 'SELL', time: '12:04:02' },
  ]);

  // Dynamic simulated price tick updates
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * (selectedAsset.price * 0.002);
      const newPrice = Number((selectedAsset.price + delta).toFixed(2));
      const side = delta >= 0 ? 'BUY' : 'SELL';
      const newTrade = {
        id: Date.now(),
        price: newPrice,
        amount: Number((Math.random() * 0.8 + 0.01).toFixed(2)),
        side,
        time: new Date().toLocaleTimeString()
      };
      setTradesStream(prev => [newTrade, ...prev.slice(0, 9)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [selectedAsset]);

  // Calculate order metrics
  const amountNum = parseFloat(amount) || 0;
  const executionPrice = orderType === 'MARKET' ? selectedAsset.price : orderPrice;
  const totalNotional = amountNum * executionPrice;
  const marginRequired = totalNotional / leverage;

  const handlePercentageAllocation = (pct: number) => {
    if (!user) return;
    const availableBalance = user.balanceUsd * (pct / 100);
    const calculatedNotional = availableBalance * leverage;
    const calculatedAmount = calculatedNotional / executionPrice;
    setAmount(calculatedAmount.toFixed(4));
  };

  const handleExecuteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setExecutionMessage('Please log in or select a demo account to place orders.');
      return;
    }

    if (amountNum <= 0) {
      setExecutionMessage('Please enter a valid amount.');
      return;
    }

    const newOrder: Order = {
      id: `ord-${Math.floor(10000 + Math.random() * 90000)}`,
      symbol: selectedAsset.symbol,
      side: orderSide,
      type: orderType,
      price: executionPrice,
      amount: amountNum,
      total: totalNotional,
      status: orderType === 'MARKET' ? 'FILLED' : 'OPEN',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      leverage,
      pnl: 0
    };

    onPlaceOrder(newOrder);
    setExecutionMessage(`Order ${newOrder.id} executed successfully! (${orderSide} ${amountNum} ${selectedAsset.symbol})`);
    setTimeout(() => setExecutionMessage(null), 4000);
  };

  const handleFetchAIAnalysis = async () => {
    setShowAIModal(true);
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: selectedAsset.symbol,
          assetType: selectedAsset.category,
          timeframe,
          riskTolerance: user?.aiRiskPreference || 'Moderate'
        })
      });
      const data = await res.json();
      if (data.signal) {
        setAiAnalysis(data.signal);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  // Order Book simulated data
  const asks = [
    { price: selectedAsset.price + 12.0, amount: 1.45, total: 3.8 },
    { price: selectedAsset.price + 8.5, amount: 0.92, total: 2.35 },
    { price: selectedAsset.price + 4.2, amount: 0.88, total: 1.43 },
    { price: selectedAsset.price + 1.5, amount: 0.55, total: 0.55 }
  ];

  const bids = [
    { price: selectedAsset.price - 1.2, amount: 0.62, total: 0.62 },
    { price: selectedAsset.price - 3.8, amount: 1.10, total: 1.72 },
    { price: selectedAsset.price - 7.5, amount: 1.85, total: 3.57 },
    { price: selectedAsset.price - 11.0, amount: 2.40, total: 5.97 }
  ];

  return (
    <div id="trading-view-screen" className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 space-y-4 text-slate-100">
      
      {/* Top Asset Header & Stats Bar */}
      <div id="trading-asset-bar" className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Asset Selector */}
        <div className="relative">
          <button
            onClick={() => setAssetDropdownOpen(!assetDropdownOpen)}
            className="flex items-center space-x-3 bg-slate-950 hover:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700/80 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
              {selectedAsset.symbol.substring(0, 3)}
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1.5 font-bold text-sm text-white">
                <span>{selectedAsset.symbol}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-400">{selectedAsset.name}</div>
            </div>
          </button>

          {/* Asset Dropdown */}
          {assetDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden p-1 max-h-80 overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                Select Trading Instrument
              </div>
              {assets.map(a => (
                <button
                  key={a.symbol}
                  onClick={() => {
                    onSelectAsset(a);
                    setAssetDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors my-0.5 ${
                    a.symbol === selectedAsset.symbol ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{a.symbol}</div>
                    <div className="text-[10px] text-slate-400">{a.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold">${a.price.toFixed(2)}</div>
                    <div className={`text-[10px] ${a.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {a.change24h >= 0 ? '+' : ''}{a.change24h}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 24h Price Metrics */}
        <div className="flex flex-wrap items-center gap-6 text-xs border-l border-slate-800/80 pl-4">
          <div>
            <div className="text-slate-400 text-[10px]">Mark Price</div>
            <div className="text-base font-black font-mono text-white">
              {formatCurrency(selectedAsset.price, user?.currency || 'INR')}
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">24h Change</div>
            <div className={`font-mono font-bold ${selectedAsset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {selectedAsset.change24h >= 0 ? '+' : ''}{selectedAsset.change24h}%
            </div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">24h High</div>
            <div className="font-mono text-slate-200">{formatCurrency(selectedAsset.high24h, user?.currency || 'INR')}</div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">24h Low</div>
            <div className="font-mono text-slate-200">{formatCurrency(selectedAsset.low24h, user?.currency || 'INR')}</div>
          </div>

          <div>
            <div className="text-slate-400 text-[10px]">24h Volume</div>
            <div className="font-mono text-slate-200">{formatCurrency(selectedAsset.volume24h, user?.currency || 'INR', true)}</div>
          </div>
        </div>

        {/* AI Insight Trigger */}
        <button
          onClick={handleFetchAIAnalysis}
          className="px-3.5 py-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-500/40 rounded-xl text-cyan-300 text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer shadow-sm shadow-cyan-500/10"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Gemini AI Signal Analysis</span>
        </button>

      </div>

      {/* Main Terminal Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left/Center Column: Chart & Indicator Terminal */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Chart Header Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              
              {/* Timeframes */}
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {['1M', '5M', '1H', '4H', '1D', '1W'].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded ${
                      timeframe === tf ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Indicator Controls */}
              <div className="flex items-center space-x-2 text-xs">
                <button
                  onClick={() => setShowRsi(!showRsi)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                    showRsi ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  RSI (14)
                </button>
                <button
                  onClick={() => setShowEma(!showEma)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                    showEma ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  EMA (20/50)
                </button>
                <div className="flex items-center space-x-1 bg-slate-950 p-0.5 rounded border border-slate-800">
                  <button
                    onClick={() => setChartType('area')}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${chartType === 'area' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
                  >
                    Area
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${chartType === 'bar' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
                  >
                    Bars
                  </button>
                </div>
              </div>

            </div>

            {/* Recharts Canvas */}
            <div className="h-80 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'area' ? (
                  <AreaChart data={selectedAsset.chartData}>
                    <defs>
                      <linearGradient id="tradeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedAsset.change24h >= 0 ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={selectedAsset.change24h >= 0 ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                    <YAxis stroke="#475569" fontSize={11} domain={['auto', 'auto']} orientation="right" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} 
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={selectedAsset.change24h >= 0 ? '#10b981' : '#f43f5e'} 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#tradeGradient)" 
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={selectedAsset.chartData}>
                    <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                    <YAxis stroke="#475569" fontSize={11} orientation="right" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="volume" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>

              {/* Indicator overlay notice */}
              {showEma && (
                <div className="absolute top-2 left-2 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 text-[10px] font-mono text-cyan-300">
                  EMA20: ${(selectedAsset.price * 0.992).toFixed(2)} | EMA50: ${(selectedAsset.price * 0.985).toFixed(2)}
                </div>
              )}
            </div>

          </div>

          {/* Bottom Row: Order Book & Recent Trades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Live Order Book */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span>Order Book (Depth)</span>
                <span className="text-[10px] text-slate-400 font-mono">SPREAD: $0.80</span>
              </div>

              <div className="space-y-1 text-xs font-mono">
                {/* Asks (Sell Orders) */}
                <div className="space-y-1">
                  {asks.map((ask, idx) => (
                    <div key={idx} className="flex justify-between items-center text-rose-400 text-[11px] relative overflow-hidden py-0.5 px-1 rounded">
                      <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 pointer-events-none" style={{ width: `${(ask.amount / 2) * 100}%` }} />
                      <span>${ask.price.toFixed(2)}</span>
                      <span className="text-slate-300">{ask.amount}</span>
                      <span className="text-slate-500">{ask.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Current Mid Price */}
                <div className="py-1.5 border-y border-slate-800 my-1 text-center font-bold text-slate-100 flex items-center justify-center space-x-2">
                  <span className="text-emerald-400">${selectedAsset.price.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 font-normal">Last Traded</span>
                </div>

                {/* Bids (Buy Orders) */}
                <div className="space-y-1">
                  {bids.map((bid, idx) => (
                    <div key={idx} className="flex justify-between items-center text-emerald-400 text-[11px] relative overflow-hidden py-0.5 px-1 rounded">
                      <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 pointer-events-none" style={{ width: `${(bid.amount / 3) * 100}%` }} />
                      <span>${bid.price.toFixed(2)}</span>
                      <span className="text-slate-300">{bid.amount}</span>
                      <span className="text-slate-500">{bid.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Market Trades Stream */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Market Trades</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono animate-pulse">● LIVE STREAM</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                {tradesStream.map(t => (
                  <div key={t.id} className="flex justify-between items-center py-1 border-b border-slate-800/40 text-[11px]">
                    <span className={t.side === 'BUY' ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                      ${t.price.toFixed(2)}
                    </span>
                    <span className="text-slate-300">{t.amount} {selectedAsset.symbol.split('/')[0]}</span>
                    <span className="text-slate-500">{t.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Interactive Buy/Sell Order Ticket */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 sticky top-20 shadow-2xl">
            
            {/* Ticket Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white">Order Execution</h3>
              <div className="text-[11px] font-mono text-cyan-300 font-semibold">
                Avail: {user ? formatCurrency(user.balanceUsd, user.currency) : formatCurrency(0, 'INR')}
              </div>
            </div>

            {/* Buy / Sell Side Switcher */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setOrderSide('BUY')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  orderSide === 'BUY'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                BUY / LONG
              </button>
              <button
                onClick={() => setOrderSide('SELL')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  orderSide === 'SELL'
                    ? 'bg-rose-500 text-slate-950 shadow-lg shadow-rose-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            {/* Order Types */}
            <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {(['MARKET', 'LIMIT', 'STOP_LOSS'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 py-1 rounded text-[10px] font-semibold transition-colors ${
                    orderType === type ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleExecuteOrder} className="space-y-4">
              
              {/* Order Price (Limit or Stop) */}
              {orderType !== 'MARKET' && (
                <div>
                  <label className="block text-[11px] text-slate-400 font-medium mb-1">Target Order Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    value={orderPrice}
                    onChange={(e) => setOrderPrice(parseFloat(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {/* Amount Input */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Order Size ({selectedAsset.symbol.split('/')[0]})</span>
                  <span>Max: {(user ? user.balanceUsd / executionPrice : 0).toFixed(2)}</span>
                </div>
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Allocation Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                {[25, 50, 75, 100].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handlePercentageAllocation(pct)}
                    className="py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-[10px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              {/* Leverage Slider */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Leverage Margin</span>
                  <span className="font-mono text-cyan-400 font-bold">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-0.5">
                  <span>1x (Spot)</span>
                  <span>10x</span>
                  <span>50x</span>
                  <span>100x</span>
                </div>
              </div>

              {/* TP & SL Optional Inputs */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Take Profit ($)</label>
                  <input
                    type="text"
                    placeholder={(selectedAsset.price * 1.08).toFixed(2)}
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Stop Loss ($)</label>
                  <input
                    type="text"
                    placeholder={(selectedAsset.price * 0.95).toFixed(2)}
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary Metrics Box */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Total Position Value:</span>
                  <span className="font-mono text-slate-200">{formatCurrency(totalNotional, user?.currency || 'INR')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Margin Required:</span>
                  <span className="font-mono text-cyan-400 font-bold">{formatCurrency(marginRequired, user?.currency || 'INR')}</span>
                </div>
              </div>

              {/* Execution Feedback Message */}
              {executionMessage && (
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs text-cyan-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{executionMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer ${
                  orderSide === 'BUY'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                    : 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/20'
                }`}
              >
                Place {orderSide} Order ({selectedAsset.symbol})
              </button>

            </form>

          </div>
        </div>

      </div>

      {/* GEMINI AI SIGNAL MODAL */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setShowAIModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>GEMINI AI TRADING ENGINE ANALYSIS</span>
            </div>

            <h3 className="text-xl font-bold text-white">AI Signal Breakdown for {selectedAsset.symbol}</h3>

            {aiLoading ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-400">Ingesting live order book depth, RSI trends, and sentiment feeds...</p>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Direction & Conviction</span>
                    <span className={`font-bold text-sm ${aiAnalysis.direction === 'BULLISH' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {aiAnalysis.direction} ({aiAnalysis.confidence}% Confidence)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Risk / Reward Ratio</span>
                    <span className="font-bold text-sm text-cyan-300 font-mono">{aiAnalysis.riskRewardRatio || '1:2.5'}</span>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {aiAnalysis.summary}
                </p>

                {aiAnalysis.catalysts && (
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">Key Technical Catalysts:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      {aiAnalysis.catalysts.map((c: string, idx: number) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-2 border-t border-slate-800">
                  <div className="p-2 bg-slate-950 rounded">
                    <span className="text-slate-500 block text-[9px]">Entry</span>
                    <span className="text-slate-200">${aiAnalysis.entryPrice || selectedAsset.price}</span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded">
                    <span className="text-slate-500 block text-[9px]">Target Price</span>
                    <span className="text-emerald-400 font-bold">${aiAnalysis.targetPrice}</span>
                  </div>
                  <div className="p-2 bg-slate-950 rounded">
                    <span className="text-slate-500 block text-[9px]">Stop Loss</span>
                    <span className="text-rose-400 font-bold">${aiAnalysis.stopLoss}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOrderSide(aiAnalysis.direction === 'BULLISH' ? 'BUY' : 'SELL');
                    if (aiAnalysis.targetPrice) setTakeProfit(aiAnalysis.targetPrice.toString());
                    if (aiAnalysis.stopLoss) setStopLoss(aiAnalysis.stopLoss.toString());
                    setShowAIModal(false);
                  }}
                  className="w-full py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 transition-all cursor-pointer"
                >
                  Apply AI Parameters to Order Ticket
                </button>
              </div>
            ) : null}

          </div>
        </div>
      )}

    </div>
  );
};
