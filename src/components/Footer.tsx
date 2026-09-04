import React from 'react';
import { NavTab } from '../types';
import { Cpu, ShieldCheck, Zap, Lock, Sparkles, Globe, Terminal } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer id="app-footer" className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-sm text-slate-100">AI TRADING CENTER</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Autonomous quantitative trading engine powered by Gemini AI neural market sentiment modeling and sub-millisecond execution routing.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM OPERATIONAL (99.99% Uptime)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Platform Views</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentTab('home')} className="hover:text-cyan-400 transition-colors">Landing Page</button></li>
              <li><button onClick={() => setCurrentTab('about')} className="hover:text-cyan-400 transition-colors">About Technology</button></li>
              <li><button onClick={() => setCurrentTab('dashboard')} className="hover:text-cyan-400 transition-colors">Overview Dashboard</button></li>
              <li><button onClick={() => setCurrentTab('trading')} className="hover:text-cyan-400 transition-colors">Live Trading Terminal</button></li>
              <li><button onClick={() => setCurrentTab('signals')} className="hover:text-cyan-400 transition-colors">AI Signals Hub</button></li>
            </ul>
          </div>

          {/* Account & Security */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Account & Management</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentTab('portfolio')} className="hover:text-cyan-400 transition-colors">Portfolio Analytics</button></li>
              <li><button onClick={() => setCurrentTab('watchlist')} className="hover:text-cyan-400 transition-colors">Watchlist & Alerts</button></li>
              <li><button onClick={() => setCurrentTab('orders')} className="hover:text-cyan-400 transition-colors">Orders & Execution</button></li>
              <li><button onClick={() => setCurrentTab('settings')} className="hover:text-cyan-400 transition-colors">Security & Preferences</button></li>
              <li><button onClick={() => setCurrentTab('profile')} className="hover:text-cyan-400 transition-colors">KYC Profile</button></li>
            </ul>
          </div>

          {/* Security & Tech Specs */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Security & Compliance</h4>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Institutional Security</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cold storage multisig vaults, AES-256 encrypted API keys, and automated continuous audit logs.
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="max-w-3xl">
            <strong className="text-slate-400">Financial Disclosure:</strong> Trading stocks, cryptocurrencies, foreign exchange, and leveraged financial products involves substantial risk of loss and is not suitable for all investors. AI Signals are generated via probabilistic machine learning models and do not guarantee future profits. Past performance is non-indicative of future outcomes.
          </p>
          <div className="text-slate-400 font-mono text-[11px] shrink-0">
            © 2026 AI TRADING CENTER. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
