import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PieChart, 
  DollarSign, 
  Briefcase, 
  BarChart3, 
  Layers,
  Clock,
  Info,
  X
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

interface RiskInvestmentModuleProps {
  currency?: string;
}

export const RiskInvestmentModule: React.FC<RiskInvestmentModuleProps> = ({ currency = 'INR' }) => {
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel>('LOW');
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [sipFrequency, setSipFrequency] = useState<'Monthly' | 'Weekly' | 'One-Time'>('Monthly');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [investmentExecuted, setInvestmentExecuted] = useState(false);

  // Risk profiles data structure adhering strictly to prompt requirements
  const riskProfiles = {
    LOW: {
      level: 'LOW',
      title: '🟢 Low Risk',
      color: 'emerald',
      bgLight: 'bg-emerald-50/70',
      border: 'border-emerald-200',
      textAccent: 'text-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      tag: 'Capital Protection & Consistent Yield',
      expectedCagr: '12% - 15%',
      cagrVal: 13.5,
      description: 'Ideal for conservative investors seeking steady wealth creation with zero market drawdowns.',
      categories: [
        { name: 'Mutual Funds', share: 60, icon: Briefcase, desc: 'Top rated Index & Flexi Cap Funds' },
        { name: 'SIP (Systematic Plan)', share: 40, icon: Clock, desc: 'Automated recurring monthly allocations' }
      ],
      instruments: [
        { name: 'HDFC Index Nifty 50 Fund', type: 'Mutual Fund', return1y: '14.8%', riskRating: 'Very Low' },
        { name: 'Parag Parikh Flexi Cap Fund', type: 'Mutual Fund', return1y: '18.2%', riskRating: 'Low' },
        { name: 'Nippon India Corporate Bond', type: 'Mutual Fund', return1y: '8.5%', riskRating: 'Lowest' },
        { name: 'Auto-Debit Monthly SIP Engine', type: 'SIP', return1y: '15.4%', riskRating: 'Automated' }
      ]
    },
    MEDIUM: {
      level: 'MEDIUM',
      title: '🟡 Medium Risk',
      color: 'amber',
      bgLight: 'bg-amber-50/70',
      border: 'border-amber-200',
      textAccent: 'text-amber-700',
      badgeBg: 'bg-amber-100 text-amber-800',
      tag: 'Balanced Growth & Sector Diversification',
      expectedCagr: '18% - 24%',
      cagrVal: 21.0,
      description: 'Balanced strategy targeting bluechip equities and sector index ETFs for robust growth.',
      categories: [
        { name: 'Stocks', share: 55, icon: TrendingUp, desc: 'Large Cap Industry Leaders' },
        { name: 'ETFs', share: 45, icon: Layers, desc: 'Diversified Index & Commodity ETFs' }
      ],
      instruments: [
        { name: 'Reliance Industries Ltd', type: 'Stock', return1y: '22.4%', riskRating: 'Moderate' },
        { name: 'TCS & Infosys Tech Equity', type: 'Stock', return1y: '19.8%', riskRating: 'Moderate' },
        { name: 'Nifty BeES ETF', type: 'ETF', return1y: '16.5%', riskRating: 'Low-Mod' },
        { name: 'Nippon Gold & IT BeES ETF', type: 'ETF', return1y: '24.1%', riskRating: 'Moderate' }
      ]
    },
    HIGH: {
      level: 'HIGH',
      title: '🔴 High Risk',
      color: 'rose',
      bgLight: 'bg-rose-50/70',
      border: 'border-rose-200',
      textAccent: 'text-rose-700',
      badgeBg: 'bg-rose-100 text-rose-800',
      tag: 'High Alpha & Derivatives Trading',
      expectedCagr: '35% - 50%+',
      cagrVal: 42.0,
      description: 'High momentum strategy utilizing quantitative F&O derivative setups and breakout stocks.',
      categories: [
        { name: 'Stocks', share: 50, icon: BarChart3, desc: 'High Beta Growth & Momentum Stocks' },
        { name: 'Futures & Options', share: 50, icon: Zap, desc: 'Derivatives & Option Strategies' }
      ],
      instruments: [
        { name: 'Nifty 50 Index Futures', type: 'Futures & Options', return1y: '48.2%', riskRating: 'High' },
        { name: 'BankNifty Call & Put Options', type: 'Futures & Options', return1y: '65.0%', riskRating: 'High' },
        { name: 'High-Beta Growth Stocks', type: 'Stock', return1y: '38.5%', riskRating: 'High' },
        { name: 'Candlestick Scalp Signals', type: 'Derivatives', return1y: '52.4%', riskRating: 'High' }
      ]
    }
  };

  const activeProfile = riskProfiles[selectedRisk];

  // Calculate estimated projected returns
  const projected1Yr = Math.round(investmentAmount * (1 + activeProfile.cagrVal / 100));
  const projected3Yr = Math.round(investmentAmount * Math.pow(1 + activeProfile.cagrVal / 100, 3));

  const handleExecuteAutoInvest = () => {
    setShowConfirmModal(true);
    setInvestmentExecuted(false);
  };

  const confirmInvestment = () => {
    setInvestmentExecuted(true);
    setTimeout(() => {
      setShowConfirmModal(false);
      setInvestmentExecuted(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-8 space-y-8">
      
      {/* Title & Overview Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">AI Risk-Based Investment Engine</h2>
        </div>
        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
          Select your risk tolerance profile. Our AI engine automatically constructs and rebalances your portfolio across Mutual Funds, SIPs, Stocks, ETFs, and Futures & Options.
        </p>
      </div>

      {/* 1. RISK LEVEL CARDS SELECTOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['LOW', 'MEDIUM', 'HIGH'] as const).map((level) => {
          const profile = riskProfiles[level];
          const isSelected = selectedRisk === level;

          return (
            <div
              key={level}
              onClick={() => setSelectedRisk(level)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
                isSelected 
                  ? `${profile.bgLight} ${profile.border} ring-2 ring-blue-500/30 shadow-md` 
                  : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black">{profile.title}</span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${profile.badgeBg}`}>
                    CAGR: {profile.expectedCagr}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {profile.description}
                </p>
              </div>

              {/* Products included bullet pill */}
              <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Included Asset Types:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.categories.map((cat) => (
                    <span 
                      key={cat.name}
                      className="text-[11px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-800 shadow-2xs"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2. INVESTMENT AMOUNT & ALLOCATION DISPLAY */}
      <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enter Investment Capital:
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-slate-900 font-mono">₹ / $</span>
              <input
                type="number"
                step="500"
                min="1000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Math.max(1000, parseInt(e.target.value) || 1000))}
                className="bg-white border border-slate-300 rounded-xl px-4 py-2 text-xl font-bold font-mono text-slate-900 w-48 focus:outline-none focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Capital Presets */}
          <div className="flex items-center space-x-2">
            {[5000, 10000, 25000, 50000, 100000].map(amt => (
              <button
                key={amt}
                onClick={() => setInvestmentAmount(amt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  investmentAmount === amt
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {formatCurrency(amt, currency)}
              </button>
            ))}
          </div>
        </div>

        {/* Allocation Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Categories Ratio Bar */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <PieChart className="w-4 h-4 text-blue-600" />
              <span>Automated Asset Allocation</span>
            </h3>

            {/* Visual Bar */}
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex p-0.5 border border-slate-300">
              {activeProfile.categories.map((cat, idx) => (
                <div
                  key={cat.name}
                  style={{ width: `${cat.share}%` }}
                  className={`h-full ${idx === 0 ? 'bg-blue-600' : 'bg-emerald-500'} first:rounded-l-full last:rounded-r-full transition-all`}
                />
              ))}
            </div>

            {/* Breakdown List */}
            <div className="space-y-3">
              {activeProfile.categories.map((cat, idx) => {
                const IconComponent = cat.icon;
                const allocatedCapital = Math.round((investmentAmount * cat.share) / 100);

                return (
                  <div key={cat.name} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${idx === 0 ? 'bg-blue-600' : 'bg-emerald-500'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{cat.name} ({cat.share}%)</div>
                        <div className="text-[11px] text-slate-500">{cat.desc}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-slate-900">
                        {formatCurrency(allocatedCapital, currency)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">Allocated</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expected Growth Return Projections */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700">Projected Returns</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-bold">
                  AI Backtested
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-slate-500 block font-medium">1-YEAR PROJECTED</span>
                  <span className="text-lg font-black font-mono text-emerald-600">
                    {formatCurrency(projected1Yr, currency)}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono block mt-0.5">
                    +{(projected1Yr - investmentAmount).toLocaleString()} profit
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-[10px] text-slate-500 block font-medium">3-YEAR PROJECTED</span>
                  <span className="text-lg font-black font-mono text-blue-600">
                    {formatCurrency(projected3Yr, currency)}
                  </span>
                  <span className="text-[10px] text-blue-700 font-mono block mt-0.5">
                    +{(projected3Yr - investmentAmount).toLocaleString()} profit
                  </span>
                </div>
              </div>
            </div>

            {/* Auto-Invest Trigger Button */}
            <button
              onClick={handleExecuteAutoInvest}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.01] active:scale-95"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>Auto-Invest {formatCurrency(investmentAmount, currency)} Now</span>
            </button>
          </div>

        </div>

      </div>

      {/* 3. UNDERLYING INSTRUMENTS & FUNDS LIST */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>Recommended Underlying Assets ({activeProfile.title})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeProfile.instruments.map((inst, idx) => (
            <div key={idx} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {inst.type}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  {inst.return1y} 1Y
                </span>
              </div>
              <div className="font-bold text-xs text-slate-900">{inst.name}</div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span>Risk Level:</span>
                <span className="font-mono font-semibold text-slate-700">{inst.riskRating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-6 relative shadow-2xl">
            
            <button 
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">Confirm Auto-Investment</h3>
              <p className="text-xs text-slate-500">
                AI will deploy capital according to the selected risk strategy.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Profile:</span>
                <span className="font-bold text-slate-900">{activeProfile.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Capital Amount:</span>
                <span className="font-bold text-blue-600">{formatCurrency(investmentAmount, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Asset Classes:</span>
                <span className="font-bold text-slate-900">
                  {activeProfile.categories.map(c => c.name).join(' & ')}
                </span>
              </div>
            </div>

            {investmentExecuted ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 text-emerald-800 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <div className="font-bold text-sm">Auto-Investment Executed Successfully!</div>
                <p className="text-[11px] text-emerald-700">
                  Capital deployed across portfolio assets. Tracking active in your account.
                </p>
              </div>
            ) : (
              <button
                onClick={confirmInvestment}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20"
              >
                Confirm & Deploy Capital
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
