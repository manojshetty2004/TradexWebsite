import React, { useState } from 'react';
import { NavTab, Asset, UserProfile } from '../types';
import { 
  TrendingUp, 
  Cpu, 
  LayoutDashboard, 
  LineChart, 
  PieChart, 
  Star, 
  ListOrdered, 
  Bot, 
  Settings, 
  User, 
  ShieldCheck, 
  LogIn, 
  LogOut, 
  Bell, 
  Search, 
  PlusCircle,
  Menu,
  X,
  Sparkles,
  Info,
  Home
} from 'lucide-react';

import { formatCurrency } from '../utils/formatters';

interface HeaderProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  user: UserProfile | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
  assets: Asset[];
  onSelectAsset: (asset: Asset) => void;
  onOpenDeposit: () => void;
  onUpdateUserCurrency?: (currency: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  user,
  onOpenAuth,
  onLogout,
  assets,
  onSelectAsset,
  onOpenDeposit,
  onUpdateUserCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const filteredAssets = assets.filter(
    a => a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
         a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trading', label: 'Trade', icon: LineChart },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'watchlist', label: 'Watchlist', icon: Star },
    { id: 'orders', label: 'Orders', icon: ListOrdered },
    { id: 'signals', label: 'AI Signals', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (user?.role === 'ADMIN') {
    navItems.push({ id: 'admin', label: 'Admin', icon: ShieldCheck });
  }

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Ticker Bar */}
      <div id="ticker-ribbon" className="bg-slate-900/80 border-b border-slate-800/80 text-xs py-1.5 px-4 overflow-x-auto no-scrollbar flex items-center space-x-6 text-slate-400">
        <div className="flex items-center space-x-2 text-cyan-400 font-extrabold shrink-0">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-black">AI MARKET STREAM</span>
          <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold border border-cyan-500/30">⚡ GEMINI 2.5 REAL-TIME</span>
        </div>
        <div className="flex items-center space-x-6 shrink-0">
          {assets.map(a => (
            <button
              key={a.symbol}
              onClick={() => {
                onSelectAsset(a);
                setCurrentTab('trading');
              }}
              className="flex items-center space-x-2 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-slate-200">{a.symbol}</span>
              <span className="text-slate-300">{formatCurrency(a.price, user?.currency || 'INR')}</span>
              <span className={`flex items-center text-[11px] font-medium ${a.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {a.change24h >= 0 ? '+' : ''}{a.change24h.toFixed(2)}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  AI TRADING CENTER
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-extrabold tracking-wider uppercase border border-cyan-500/40">
                  OFFICIAL
                </span>
              </div>
              <p className="text-[9px] text-slate-400 font-medium tracking-wide">QUANTITATIVE AI ENGINE • INSTITUTIONAL PLATFORM</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Asset Search Input */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search assets (BTC, NVDA...)"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(e.target.value.trim().length > 0);
                  }}
                  onFocus={() => setShowSearchDropdown(searchQuery.trim().length > 0)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  className="bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 w-48 xl:w-56 transition-all"
                />
              </div>

              {/* Search Dropdown Results */}
              {showSearchDropdown && filteredAssets.length > 0 && (
                <div id="search-results-dropdown" className="absolute top-full right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Assets Matching "{searchQuery}"
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredAssets.map(asset => (
                      <button
                        key={asset.symbol}
                        onClick={() => {
                          onSelectAsset(asset);
                          setCurrentTab('trading');
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-slate-800/80 flex items-center justify-between transition-colors border-b border-slate-800/40 last:border-0"
                      >
                        <div>
                          <span className="font-semibold text-xs text-slate-200">{asset.symbol}</span>
                          <span className="text-[11px] text-slate-400 ml-2">{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono text-slate-200">${asset.price.toFixed(2)}</div>
                          <div className={`text-[10px] ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                id="btn-notifications"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-lg relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500" />
              </button>

              {notificationsOpen && (
                <div id="notifications-popover" className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-semibold text-slate-200">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Live AI Signal Alerts</span>
                    </span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded">NEW</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="p-2 bg-slate-950/60 rounded-lg border border-emerald-500/30">
                      <div className="flex justify-between font-semibold text-emerald-400">
                        <span>BTC/USD Bullish Alert</span>
                        <span>Just now</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">High conviction target hit on 4H chart. +$98,800 projected.</p>
                    </div>
                    <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                      <div className="flex justify-between font-semibold text-slate-300">
                        <span>Order Filled #ord-902</span>
                        <span>10m ago</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">Bought 20 shares of TSLA @ $254.30</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative flex items-center">
              <select
                id="header-currency-select"
                value={user?.currency || 'INR'}
                onChange={(e) => onUpdateUserCurrency?.(e.target.value)}
                className="bg-slate-900 text-cyan-300 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-500 cursor-pointer hover:bg-slate-800 transition-all shadow-sm"
                title="Select Platform Currency"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
                <option value="JPY">¥ JPY</option>
              </select>
            </div>

            {/* Auth or User Info */}
            {user ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
                <button
                  id="btn-quick-deposit"
                  onClick={onOpenDeposit}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition-all"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Deposit</span>
                </button>

                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full ring-2 ring-cyan-500/40 object-cover cursor-pointer"
                    onClick={() => setCurrentTab('profile')}
                  />
                  <div className="text-left hidden lg:block cursor-pointer" onClick={() => setCurrentTab('profile')}>
                    <div className="text-xs font-semibold text-slate-100 flex items-center space-x-1">
                      <span>{user.name}</span>
                      {user.role === 'ADMIN' && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded font-mono">ADMIN</span>
                      )}
                    </div>
                    <div className="text-[10px] text-cyan-300 font-mono font-semibold">
                      {formatCurrency(user.balanceUsd, user.currency)}
                    </div>
                  </div>
                  <button
                    id="btn-logout"
                    onClick={onLogout}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
                <button
                  id="btn-header-login"
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Log In
                </button>
                <button
                  id="btn-header-register"
                  onClick={() => onOpenAuth('register')}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 bg-slate-950/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {user ? (
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src={user.avatar} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">{user.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">${user.balanceUsd.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={onOpenDeposit}
                  className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded text-xs border border-emerald-500/30"
                >
                  Deposit
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-800 flex space-x-2">
              <button
                onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium"
              >
                Log In
              </button>
              <button
                onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                className="flex-1 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-semibold"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
