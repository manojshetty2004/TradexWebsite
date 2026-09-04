import React, { useState } from 'react';
import { AISignal, Asset, NavTab, UserProfile } from '../types';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  BarChart3, 
  Zap,
  ChevronDown
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface AISignalsViewProps {
  signals: AISignal[];
  assets: Asset[];
  setCurrentTab: (tab: NavTab) => void;
  onSelectAsset: (asset: Asset) => void;
  onAddGeneratedSignal: (signal: AISignal) => void;
  user?: UserProfile | null;
}

export const AISignalsView: React.FC<AISignalsViewProps> = ({
  signals,
  assets,
  setCurrentTab,
  onSelectAsset,
  onAddGeneratedSignal,
  user
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(assets[0]?.symbol || 'BTC/USD');
  const [timeframe, setTimeframe] = useState('4H');
  const [riskProfile, setRiskProfile] = useState<'Conservative' | 'Moderate' | 'Aggressive'>('Moderate');
  const [isGenerating, setIsGenerating] = useState(false);

  // Chat copilot state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI Trading Copilot powered by Gemini. Ask me anything about chart patterns, risk parameters, or macro market sentiment!'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleGenerateSignal = async () => {
    setIsGenerating(true);
    try {
      const targetAsset = assets.find(a => a.symbol === selectedSymbol);
      const res = await fetch('/api/ai-signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: selectedSymbol,
          assetType: targetAsset?.category || 'Crypto',
          timeframe,
          riskTolerance: riskProfile
        })
      });
      const data = await res.json();
      if (data.signal) {
        const newSig: AISignal = {
          id: `sig-${Date.now()}`,
          symbol: selectedSymbol,
          assetName: targetAsset?.name || selectedSymbol,
          direction: data.signal.direction || 'BULLISH',
          confidence: data.signal.confidence || 88,
          timeframe,
          entryPrice: data.signal.entryPrice || targetAsset?.price || 100,
          targetPrice: data.signal.targetPrice || ((targetAsset?.price || 100) * 1.1),
          stopLoss: data.signal.stopLoss || ((targetAsset?.price || 100) * 0.94),
          riskRewardRatio: data.signal.riskRewardRatio || '1:2.8',
          summary: data.signal.summary || 'Technical breakout analysis generated.',
          catalysts: data.signal.catalysts || ['Volume surge detected', 'Momentum crossover'],
          reasoning: data.signal.reasoning || 'High probability setup derived from multi-timeframe evaluation.',
          timestamp: 'Just now',
          status: 'ACTIVE',
          technicalIndicators: data.signal.technicalIndicators || {
            rsi: 62.1,
            macd: 'Bullish Crossover',
            ema20: 'Above EMA',
            volume: 'High'
          }
        };
        onAddGeneratedSignal(newSig);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: chatMessages
        })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'Analysis completed.' }]);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div id="ai-signals-hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>GEMINI QUANTITATIVE ENGINE</span>
          </div>
          <h1 className="text-3xl font-black text-white">AI Signals Hub</h1>
          <p className="text-xs text-slate-400 mt-1">High-conviction algorithmic trade setups evaluated by neural sentiment models.</p>
        </div>
      </div>

      {/* Generator Tool & Chat Assistant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Custom Signal Generator Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center space-x-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <span>Generate Custom AI Signal</span>
            </h3>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">
              GEMINI 3.6 FLASH
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Select Asset Instrument</label>
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {assets.map(a => (
                  <option key={a.symbol} value={a.symbol}>
                    {a.symbol} ({a.name}) — ${a.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Timeframe Horizon</label>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {['1H', '4H', '1D'].map(tf => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeframe(tf)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        timeframe === tf ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Risk Profile</label>
                <select
                  value={riskProfile}
                  onChange={(e: any) => setRiskProfile(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Conservative">Conservative</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Aggressive">Aggressive</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateSignal}
              disabled={isGenerating}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Scanning Order Book & Sentiment...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Live AI Signal Synthesis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Trading Copilot Chat Drawer */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xl min-h-[380px]">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-base text-white flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>AI Trading Assistant</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
          </div>

          <div className="flex-1 space-y-3 max-h-64 overflow-y-auto pr-1">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-semibold rounded-br-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-950 border border-slate-800 text-cyan-400 p-3 rounded-2xl text-xs flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating market structure...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendChat} className="flex space-x-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              placeholder="Ask AI: e.g., 'What is the support level for NVDA?'"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={chatLoading}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Signals Feed Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <span>Active High-Conviction Signals</span>
          <span className="text-xs bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded">
            {signals.length} ACTIVE
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {signals.map((sig) => (
            <div
              key={sig.id}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 space-y-4 shadow-xl transition-all relative overflow-hidden"
            >
              {/* Top Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-cyan-400 border border-slate-700">
                    {sig.symbol.substring(0, 3)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{sig.symbol}</h3>
                    <p className="text-xs text-slate-400">{sig.assetName} • {sig.timeframe} Timeframe</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono inline-block ${
                    sig.direction === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {sig.direction} ({sig.confidence}% Conviction)
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{sig.timestamp}</div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {sig.summary}
              </p>

              {/* Price Targets Matrix */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Entry Price</div>
                  <div className="font-bold text-slate-200">{formatCurrency(sig.entryPrice, user?.currency || 'INR')}</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-emerald-400 uppercase">Target Price</div>
                  <div className="font-bold text-emerald-400">{formatCurrency(sig.targetPrice, user?.currency || 'INR')}</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-rose-400 uppercase">Stop Loss</div>
                  <div className="font-bold text-rose-400">{formatCurrency(sig.stopLoss, user?.currency || 'INR')}</div>
                </div>
              </div>

              {/* Catalysts list */}
              {sig.catalysts && (
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-300">Key Fundamental Catalysts:</div>
                  <ul className="space-y-1">
                    {sig.catalysts.map((c, idx) => (
                      <li key={idx} className="text-[11px] text-slate-400 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => {
                  const target = assets.find(a => a.symbol === sig.symbol);
                  if (target) onSelectAsset(target);
                  setCurrentTab('trading');
                }}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
              >
                <span>Execute Signal on Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
