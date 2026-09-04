import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  Clock, 
  Sliders, 
  CheckCircle2, 
  Zap,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Asset } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandleStickChartProps {
  assets: Asset[];
  currency?: string;
}

export const CandleStickChart: React.FC<CandleStickChartProps> = ({ assets, currency = 'INR' }) => {
  const [selectedCategory, setSelectedCategory] = useState<'F&O' | 'Stocks' | 'ETFs' | 'Crypto'>('F&O');
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('NIFTY-50-FUT');
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '1D'>('15m');
  const [showSMA, setShowSMA] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  // Trade form state
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [lots, setLots] = useState(1);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [stopLoss, setStopLoss] = useState<string>('');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState<string | null>(null);

  // Assets list mapped to category
  const availableAssets = useMemo(() => {
    if (selectedCategory === 'F&O') {
      return [
        { symbol: 'NIFTY-50-FUT', name: 'Nifty 50 Index Futures', price: 24350.80, change: 1.25, lotSize: 25 },
        { symbol: 'BANKNIFTY-52000-CE', name: 'BankNifty 52000 Call Option', price: 420.50, change: 14.80, lotSize: 15 },
        { symbol: 'NIFTY-24500-PE', name: 'Nifty 24500 Put Option', price: 185.20, change: -8.40, lotSize: 25 },
        { symbol: 'RELIANCE-FUT', name: 'Reliance Futures', price: 3012.00, change: 0.85, lotSize: 250 }
      ];
    } else if (selectedCategory === 'Stocks') {
      return [
        { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2985.40, change: 1.12, lotSize: 1 },
        { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4210.00, change: -0.45, lotSize: 1 },
        { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1640.25, change: 0.90, lotSize: 1 },
        { symbol: 'INFY', name: 'Infosys Ltd', price: 1820.60, change: 2.15, lotSize: 1 }
      ];
    } else if (selectedCategory === 'ETFs') {
      return [
        { symbol: 'NIFTYBEES', name: 'Nifty 50 ETF BeES', price: 268.40, change: 0.75, lotSize: 1 },
        { symbol: 'GOLDBEES', name: 'Nippon Gold ETF', price: 68.20, change: 1.05, lotSize: 1 },
        { symbol: 'ITBEES', name: 'Nippon India IT ETF', price: 42.10, change: 1.80, lotSize: 1 },
        { symbol: 'BANKBEES', name: 'Nifty Bank ETF', price: 512.30, change: 0.40, lotSize: 1 }
      ];
    } else {
      return [
        { symbol: 'BTC/USD', name: 'Bitcoin', price: 94850.50, change: 3.82, lotSize: 1 },
        { symbol: 'ETH/USD', name: 'Ethereum', price: 3420.25, change: 5.14, lotSize: 1 },
        { symbol: 'SOL/USD', name: 'Solana', price: 194.80, change: -1.85, lotSize: 1 }
      ];
    }
  }, [selectedCategory]);

  const currentAsset = useMemo(() => {
    return availableAssets.find(a => a.symbol === selectedAssetSymbol) || availableAssets[0];
  }, [availableAssets, selectedAssetSymbol]);

  // Generate realistic candlestick data based on selected timeframe & base price
  const candlesData = useMemo(() => {
    const basePrice = currentAsset.price;
    const count = 32;
    const items: CandleData[] = [];
    let price = basePrice * 0.96;

    for (let i = 0; i < count; i++) {
      const isUp = Math.random() > 0.42;
      const volatility = basePrice * (selectedCategory === 'F&O' ? 0.012 : 0.006);
      const delta = (Math.random() * volatility) * (isUp ? 1 : -1);
      
      const open = Number(price.toFixed(2));
      const close = Number((price + delta).toFixed(2));
      const high = Number((Math.max(open, close) + Math.random() * volatility * 0.8).toFixed(2));
      const low = Number((Math.min(open, close) - Math.random() * volatility * 0.8).toFixed(2));
      const volume = Math.floor(Math.random() * 50000) + 12000;

      // Time string format based on timeframe
      let timeLabel = `${0 + i}:00`;
      if (timeframe === '1m' || timeframe === '5m' || timeframe === '15m') {
        const mins = (i * (timeframe === '1m' ? 1 : timeframe === '5m' ? 5 : 15)) % 60;
        const hrs = 9 + Math.floor((i * (timeframe === '1m' ? 1 : timeframe === '5m' ? 5 : 15)) / 60);
        timeLabel = `${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins}`;
      } else if (timeframe === '1D') {
        timeLabel = `Aug ${i + 1}`;
      }

      items.push({ time: timeLabel, open, high, low, close, volume });
      price = close;
    }

    // Force last candle to match current price
    items[items.length - 1].close = currentAsset.price;
    items[items.length - 1].high = Math.max(items[items.length - 1].high, currentAsset.price);
    items[items.length - 1].low = Math.min(items[items.length - 1].low, currentAsset.price);

    return items;
  }, [currentAsset, timeframe, selectedCategory]);

  const activeCandle = hoveredCandle || candlesData[candlesData.length - 1];

  // Calculate chart bounds
  const { minPrice, maxPrice, priceRange, maxVolume } = useMemo(() => {
    let minP = Infinity;
    let maxP = -Infinity;
    let maxV = 0;

    candlesData.forEach(c => {
      if (c.low < minP) minP = c.low;
      if (c.high > maxP) maxP = c.high;
      if (c.volume > maxV) maxV = c.volume;
    });

    const padding = (maxP - minP) * 0.08 || 1;
    return {
      minPrice: minP - padding,
      maxPrice: maxP + padding,
      priceRange: (maxP + padding) - (minP - padding),
      maxVolume: maxV || 1
    };
  }, [candlesData]);

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 360;
  const chartHeight = 270;
  const volumeHeight = 70;
  const volumeTop = 280;

  // Calculate 20-period SMA
  const smaPoints = useMemo(() => {
    if (!showSMA) return [];
    const points: { x: number; y: number }[] = [];
    const candleWidth = svgWidth / candlesData.length;

    for (let i = 0; i < candlesData.length; i++) {
      const window = candlesData.slice(Math.max(0, i - 9), i + 1);
      const sum = window.reduce((acc, c) => acc + c.close, 0);
      const avg = sum / window.length;

      const x = i * candleWidth + candleWidth / 2;
      const y = chartHeight - ((avg - minPrice) / priceRange) * chartHeight;
      points.push({ x, y });
    }
    return points;
  }, [candlesData, showSMA, minPrice, priceRange]);

  const smaPath = useMemo(() => {
    if (smaPoints.length === 0) return '';
    return smaPoints.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  }, [smaPoints]);

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = lots * (currentAsset.lotSize || 1);
    const amount = (qty * currentAsset.price).toFixed(2);
    setTradeSuccessMsg(
      `${orderSide} order executed for ${qty} ${currentAsset.symbol} at ${formatCurrency(currentAsset.price, currency)} (Total: ${formatCurrency(Number(amount), currency)})`
    );
    setTimeout(() => setTradeSuccessMsg(null), 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
      
      {/* Header & Asset Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Candles Trading Engine</h2>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">
              LIVE OHLC
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time candlestick charts with timeframe switches, volume indicators, and instant order routing.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-medium">
          {(['F&O', 'Stocks', 'ETFs', 'Crypto'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const first = cat === 'F&O' ? 'NIFTY-50-FUT' : cat === 'Stocks' ? 'RELIANCE' : cat === 'ETFs' ? 'NIFTYBEES' : 'BTC/USD';
                setSelectedAssetSymbol(first);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedCategory === cat 
                  ? 'bg-white text-blue-600 shadow-xs border border-slate-200/60 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Selector Dropdown & Timeframe Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
        
        {/* Asset Selection */}
        <div className="flex items-center space-x-3">
          <label className="text-xs font-semibold text-slate-500">Asset:</label>
          <select
            value={selectedAssetSymbol}
            onChange={(e) => setSelectedAssetSymbol(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 px-3 py-1.5 focus:outline-none focus:border-blue-500"
          >
            {availableAssets.map(a => (
              <option key={a.symbol} value={a.symbol}>
                {a.symbol} - {a.name} ({formatCurrency(a.price, currency)})
              </option>
            ))}
          </select>
          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
            currentAsset.change >= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {currentAsset.change >= 0 ? '+' : ''}{currentAsset.change}%
          </span>
        </div>

        {/* Timeframe Selector & Indicators */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-white border border-slate-200 p-0.5 rounded-lg text-xs">
            {(['1m', '5m', '15m', '1h', '1D'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-mono font-semibold text-[11px] ${
                  timeframe === tf ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSMA(!showSMA)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors flex items-center space-x-1 ${
              showSMA ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-white text-slate-500 border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SMA 20</span>
          </button>
        </div>
      </div>

      {/* Active Candle Info Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 bg-slate-900 text-white p-3 rounded-xl font-mono text-xs">
        <div>
          <span className="text-slate-400 text-[10px] block font-sans">TIME</span>
          <span className="font-bold text-amber-400">{activeCandle.time}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block font-sans">OPEN</span>
          <span className="font-bold">{activeCandle.open}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block font-sans">HIGH</span>
          <span className="font-bold text-emerald-400">{activeCandle.high}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block font-sans">LOW</span>
          <span className="font-bold text-rose-400">{activeCandle.low}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block font-sans">CLOSE</span>
          <span className={`font-bold ${activeCandle.close >= activeCandle.open ? 'text-emerald-400' : 'text-rose-400'}`}>
            {activeCandle.close}
          </span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block font-sans">VOLUME</span>
          <span className="font-bold text-blue-300">{activeCandle.volume.toLocaleString()}</span>
        </div>
      </div>

      {/* Main Grid: Interactive SVG Candlestick Chart + Order Entry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Candlestick Chart Area */}
        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative overflow-hidden">
          
          <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-400 flex items-center space-x-3 z-10">
            <span className="text-white font-bold">{currentAsset.symbol} ({timeframe})</span>
            {showSMA && <span className="text-amber-400">SMA(20)</span>}
          </div>

          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto cursor-crosshair select-none"
            onMouseLeave={() => setHoveredCandle(null)}
          >
            {/* Gridlines */}
            {[0.2, 0.4, 0.6, 0.8].map(ratio => {
              const y = chartHeight * ratio;
              return (
                <line 
                  key={ratio}
                  x1={0} y1={y} x2={svgWidth} y2={y}
                  stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8"
                />
              );
            })}

            {/* Price Scale Lines */}
            <line x1={0} y1={volumeTop} x2={svgWidth} y2={volumeTop} stroke="#475569" strokeWidth="1" />

            {/* Candlestick Rendering */}
            {candlesData.map((candle, idx) => {
              const candleWidth = svgWidth / candlesData.length;
              const x = idx * candleWidth + candleWidth / 2;
              const isGreen = candle.close >= candle.open;

              const openY = chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight;
              const closeY = chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight;
              const highY = chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight;
              const lowY = chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight;

              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(Math.abs(closeY - openY), 2);
              const barWidth = Math.max(candleWidth * 0.65, 4);

              // Volume bar height
              const volH = (candle.volume / maxVolume) * volumeHeight;
              const volY = svgHeight - volH;

              return (
                <g 
                  key={idx}
                  onMouseEnter={() => setHoveredCandle(candle)}
                  className="transition-opacity hover:opacity-100"
                >
                  {/* Upper/Lower Wick */}
                  <line 
                    x1={x} y1={highY} x2={x} y2={lowY}
                    stroke={isGreen ? '#22c55e' : '#ef4444'}
                    strokeWidth="1.5"
                  />

                  {/* Body Box */}
                  <rect 
                    x={x - barWidth / 2}
                    y={bodyTop}
                    width={barWidth}
                    height={bodyHeight}
                    fill={isGreen ? '#22c55e' : '#ef4444'}
                    rx="1"
                  />

                  {/* Volume Bar */}
                  <rect
                    x={x - barWidth / 2}
                    y={volY}
                    width={barWidth}
                    height={volH}
                    fill={isGreen ? 'rgba(34, 197, 94, 0.35)' : 'rgba(239, 68, 68, 0.35)'}
                    rx="0.5"
                  />
                </g>
              );
            })}

            {/* SMA 20 Line Overlay */}
            {showSMA && smaPath && (
              <path
                d={smaPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>

          {/* Timeframe Footer Info */}
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 pt-2 border-t border-slate-800">
            <span>Chart Engine: Real-time Candlestick OHLC</span>
            <span>Scale: Logarithmic Auto-adjust</span>
          </div>

        </div>

        {/* Quick Order Entry Panel */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h3 className="font-bold text-sm text-slate-900">Trade Execution</h3>
              <span className="text-[11px] font-mono text-slate-500">{currentAsset.symbol}</span>
            </div>

            {/* Buy / Sell Switch */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setOrderSide('BUY')}
                className={`py-2 rounded-lg transition-colors ${
                  orderSide === 'BUY' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                BUY / LONG
              </button>
              <button
                type="button"
                onClick={() => setOrderSide('SELL')}
                className={`py-2 rounded-lg transition-colors ${
                  orderSide === 'SELL' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            <form onSubmit={handleExecuteTrade} className="space-y-3 text-xs">
              
              {/* Order Type */}
              <div className="flex justify-between items-center">
                <label className="text-slate-600 font-medium">Order Type:</label>
                <div className="flex space-x-1 font-mono">
                  <button
                    type="button"
                    onClick={() => setOrderType('MARKET')}
                    className={`px-2 py-0.5 rounded border ${orderType === 'MARKET' ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-slate-600 border-slate-300'}`}
                  >
                    MARKET
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('LIMIT')}
                    className={`px-2 py-0.5 rounded border ${orderType === 'LIMIT' ? 'bg-blue-600 text-white border-blue-600 font-bold' : 'bg-white text-slate-600 border-slate-300'}`}
                  >
                    LIMIT
                  </button>
                </div>
              </div>

              {/* Quantity / Lots */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Lots / Quantity:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {lots * (currentAsset.lotSize || 1)} Units
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={lots}
                    onChange={(e) => setLots(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[11px] text-slate-500 font-mono">Lot size: {currentAsset.lotSize}</span>
                </div>
              </div>

              {/* Stop Loss & Target Price */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-slate-500 text-[11px] font-medium block">Stop Loss:</label>
                  <input
                    type="text"
                    placeholder="e.g. 24100"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-500 text-[11px] font-medium block">Target Price:</label>
                  <input
                    type="text"
                    placeholder="e.g. 24800"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Required Capital Calculation */}
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>Est. Value:</span>
                  <span>{formatCurrency(currentAsset.price * lots * currentAsset.lotSize, currency)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold">
                  <span>Execution Price:</span>
                  <span>{formatCurrency(currentAsset.price, currency)}</span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-white text-xs uppercase tracking-wider shadow-md transition-all ${
                  orderSide === 'BUY' 
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' 
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                }`}
              >
                Place {orderSide} Order
              </button>
            </form>
          </div>

          {/* Success Notification */}
          {tradeSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{tradeSuccessMsg}</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
