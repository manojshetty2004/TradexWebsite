import React from 'react';
import { NavTab } from '../types';
import { Cpu, ShieldCheck, Zap, Bot, Globe, Award, Database, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  setCurrentTab: (tab: NavTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentTab }) => {
  return (
    <div id="about-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-slate-100">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>OFFICIAL QUANTITATIVE TRADING PLATFORM & ENGINE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          About AI TRADING CENTER
        </h1>
        <p className="text-slate-300 text-base leading-relaxed font-light">
          We bridge cutting-edge generative AI models with institutional financial infrastructure, giving retail and professional traders equal access to predictive AI signals.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Gemini Sentiment Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our multi-modal engine analyzes technical price charts along with real-time news streams, social sentiment, SEC filings, and order book pressure to spot institutional footprints before retail breakouts occur.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Low-Latency Execution</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct market access (DMA) smart routing algorithms ensure order fills within 40 milliseconds across centralized exchanges, dark pools, and decentralized liquidity protocols.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Bank-Grade Custody</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            User funds are held in isolated, multi-signature cold storage vaults protected by hardware security modules (HSM) and continuously monitored risk parameters.
          </p>
        </div>
      </div>

      {/* Tech Specifications */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">Architecture Breakdown</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold">01 / SIGNAL GENERATION</div>
            <div className="text-sm font-bold text-slate-200">Transformer Neural Analysis</div>
            <p className="text-xs text-slate-400">
              Evaluates multi-timeframe moving averages, volume clusters, and RSI divergence combined with macroeconomic news feeds to issue high-probability target prices and stop losses.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold">02 / ORDER ROUTING</div>
            <div className="text-sm font-bold text-slate-200">Smart Liquidity Aggregation</div>
            <p className="text-xs text-slate-400">
              Aggregates depth from top global exchanges to prevent price slippage on large market and limit orders.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold">03 / RISK ENGINE</div>
            <div className="text-sm font-bold text-slate-200">Automated Trailing Protection</div>
            <p className="text-xs text-slate-400">
              Continuous position monitoring automatically triggers stop-loss orders during black swan market movements.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-semibold">04 / API INTEGRATION</div>
            <div className="text-sm font-bold text-slate-200">Encrypted WebSocket Feeds</div>
            <p className="text-xs text-slate-400">
              Real-time tick-by-tick order book updates and position state sync back to the user interface seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentTab('trading')}
          className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-cyan-500/25 inline-flex items-center space-x-2 transition-all cursor-pointer"
        >
          <span>Launch AI Trading Terminal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
