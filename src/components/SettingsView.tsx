import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Settings, ShieldCheck, Key, Bell, Sliders, CheckCircle2, Lock, Cpu } from 'lucide-react';

interface SettingsViewProps {
  user: UserProfile | null;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [currency, setCurrency] = useState(user?.currency || 'USD');
  const [aiRisk, setAiRisk] = useState(user?.aiRiskPreference || 'Moderate');
  const [twoFactor, setTwoFactor] = useState(user?.twoFactorEnabled ?? true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // API Key management state
  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Python Algo Bot', key: 'aitc_live_98a7s6d5f4g3h2j1...', created: '2026-06-12' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  if (!user) return <div className="p-12 text-center text-slate-400">Please log in to manage settings.</div>;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      currency,
      aiRiskPreference: aiRisk,
      twoFactorEnabled: twoFactor
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCreateApiKey = () => {
    if (!newKeyName.trim()) return;
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: `aitc_live_${Math.random().toString(36).substring(2, 18)}...`,
      created: new Date().toISOString().substring(0, 10)
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const handleRevokeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div id="settings-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white flex items-center space-x-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          <span>Platform Preferences & Security</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">Configure trading engine parameters, API bot keys, and account security.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* General Preferences */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-base text-white flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>General Account Preferences</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Base Currency Display</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="INR">INR (₹ Indian Rupee)</option>
                <option value="USD">USD ($ US Dollar)</option>
                <option value="EUR">EUR (€ Euro)</option>
                <option value="GBP">GBP (£ British Pound)</option>
                <option value="JPY">JPY (¥ Japanese Yen)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">AI Signal Risk Sensitivity</label>
              <select
                value={aiRisk}
                onChange={(e: any) => setAiRisk(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="Conservative">Conservative (Tighter Stop Loss, 90%+ Confidence)</option>
                <option value="Moderate">Moderate (Standard Risk/Reward 1:2.5)</option>
                <option value="Aggressive">Aggressive (High Momentum, High Volatility)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & 2FA */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-base text-white flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Authentication & Security</span>
          </h3>

          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <div className="text-xs font-semibold text-slate-200">Two-Factor Authentication (2FA)</div>
              <div className="text-[11px] text-slate-400">Require TOTP code for all login and withdrawal actions.</div>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactor(!twoFactor)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                twoFactor ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {twoFactor ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          Save Changes
        </button>
      </form>

      {/* API Keys Management */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white flex items-center space-x-2">
          <Key className="w-4 h-4 text-cyan-400" />
          <span>Algorithmic API Bot Keys</span>
        </h3>
        <p className="text-xs text-slate-400">Create programmatic API keys to connect Python or REST trading scripts directly to your account.</p>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Key Description (e.g., Grid Bot 1)"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="button"
            onClick={handleCreateApiKey}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Generate Key
          </button>
        </div>

        <div className="space-y-2 pt-2">
          {apiKeys.map(k => (
            <div key={k.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-slate-200">{k.name}</div>
                <div className="font-mono text-slate-500 text-[11px]">{k.key}</div>
              </div>
              <button
                onClick={() => handleRevokeApiKey(k.id)}
                className="text-rose-400 hover:underline font-semibold text-[11px]"
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
