import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { X, LogIn, UserPlus, ShieldCheck, Sparkles, KeyRound, Mail, User, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Generate a user profile if not selecting demo
      const newUser: UserProfile = {
        id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name || email.split('@')[0] || 'Trader',
        email: email || 'user@aitradingcenter.io',
        role: email.includes('admin') ? 'ADMIN' : 'TRADER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        kycLevel: 'Verified (Tier 2)',
        balanceUsd: 50000.00,
        totalInvested: 0.00,
        totalProfit: 0.00,
        winRate: 100.0,
        totalTradesCount: 0,
        currency: 'USD',
        twoFactorEnabled: true,
        aiRiskPreference: 'Moderate'
      };
      onSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleQuickDemo = (role: 'trader' | 'admin') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(DEMO_USERS[role]);
      onClose();
    }, 400);
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div id="auth-modal-card" className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden text-slate-100 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 bg-gradient-to-b from-slate-800/80 to-slate-900 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI TRADING CENTER AUTH</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {mode === 'login' ? 'Welcome Back, Trader' : 'Create Your Trading Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' 
              ? 'Access real-time AI market signals, execution algorithms, and portfolio tools.' 
              : 'Join over 14,000+ traders using AI sentiment models.'}
          </p>

          {/* Mode Switcher */}
          <div className="flex mt-4 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register' 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Quick Demo Login Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span>QUICK DEMO ACCESSIBILITY</span>
            <span className="text-cyan-400 font-mono">1-CLICK LOGIN</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo('trader')}
              className="px-3 py-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition-all hover:border-cyan-500/50 group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">Trader Pro</div>
              <div className="text-[10px] text-slate-400 font-mono">$124,500.80 Balance</div>
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="px-3 py-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition-all hover:border-amber-500/50 group"
            >
              <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300">Admin User</div>
              <div className="text-[10px] text-slate-400 font-mono">Full Control</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="email"
                required
                placeholder="trader@aitradingcenter.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === 'login' ? 'Authenticate & Enter' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
