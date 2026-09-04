import React, { useState } from 'react';
import { 
  Download, 
  ShieldCheck, 
  X, 
  CheckCircle2,
  TrendingUp,
  Cpu,
  Smartphone,
  Layers,
  Sparkles,
  User,
  Github,
  Linkedin,
  Code2,
  Brain
} from 'lucide-react';
import { Asset, UserProfile } from '../types';
import akshithImage from '../assets/images/akshith_profile_photo_1786270679797.jpg';
import manojSImage from '../assets/images/manoj_s_profile_photo_1781868891671.png';
import manojGowdaImage from '../assets/images/manoj_gowda_profile_photo.jpeg';
import harshavardhanImage from '../assets/images/harshavardhan_profile_photo.jpeg';

interface SinglePageWebsiteProps {
  assets: Asset[];
  signals: any[];
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

interface Creator {
  id: string;
  name: string;
  role: string;
  roleColor: string;
  gradient: string;
  initials: string;
  desc: string;
  imageUrl?: string;
}

const CREATORS: Creator[] = [
  {
    id: 'akshith',
    name: 'Akshith S',
    role: 'AI/ML Developer',
    roleColor: 'text-emerald-600',
    gradient: 'from-emerald-600 to-teal-500',
    initials: 'AS',
    desc: 'Specialized in risk-assessment models and quantitative signal engines.',
    imageUrl: akshithImage
  },
  {
    id: 'harshavardhan',
    name: 'Harshavardhan S',
    role: 'Full Stack Developer',
    roleColor: 'text-blue-600',
    gradient: 'from-blue-600 to-cyan-500',
    initials: 'HS',
    desc: 'Focused on high-performance mobile infrastructure and secure data flows.',
    imageUrl: harshavardhanImage
  },
  {
    id: 'manoj-s',
    name: 'Manoj S',
    role: 'Developer/Designer',
    roleColor: 'text-purple-600',
    gradient: 'from-purple-600 to-pink-500',
    initials: 'MS',
    desc: 'Crafts intuitive, accessible, humanized user interfaces for traders.',
    imageUrl: manojSImage
  },
  {
    id: 'manoj-gowda',
    name: 'ManojGowda',
    role: 'Developer/Designer',
    roleColor: 'text-amber-600',
    gradient: 'from-amber-500 to-orange-500',
    initials: 'MG',
    desc: 'Builds reactive trading visuals and frontend interaction models.',
    imageUrl: manojGowdaImage
  }
];

export const SinglePageWebsite: React.FC<SinglePageWebsiteProps> = ({ assets }) => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [avatarErrorMap, setAvatarErrorMap] = useState<Record<string, boolean>>({});

  const handleDownloadApp = () => {
    setShowDownloadModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-900 relative overflow-hidden flex flex-col justify-between">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-emerald-100/60 via-slate-100/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div>
        {/* Header Navigation */}
        <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-md shadow-emerald-600/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-slate-900 tracking-tight leading-none">
                  AI Investment App
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Android APK Release</span>
              </div>
            </div>

            {/* Top Quick Action */}
            <button
              onClick={handleDownloadApp}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download APK</span>
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-12 pb-16 px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            {/* Minimal Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Android App • Version 3.8.4</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Invest Smarter. <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Let AI Do the Work.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              An AI-powered investment app that helps you choose an investment strategy based on your risk profile.
            </p>

            {/* Download Action Area */}
            <div className="pt-2 flex flex-col items-center justify-center space-y-3">
              <button
                onClick={handleDownloadApp}
                className="group relative px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg flex items-center justify-center space-x-3 shadow-xl shadow-emerald-600/25 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-y-0.5" />
                <span>↓ Download APK</span>
              </button>

              <p className="text-xs text-slate-500 font-medium flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                <span>Android App • Simple Setup • Choose Your Risk</span>
              </p>
            </div>

            {/* Subtle Trading / AI Candlestick Visual Graphic */}
            <div className="pt-8 max-w-2xl mx-auto">
              <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden">
                
                {/* Header bar of graphic */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">AI Strategy Engine</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">Auto-Optimized</span>
                  </div>
                </div>

                {/* Minimal Candlestick SVG Chart */}
                <div className="pt-6 pb-2">
                  <svg className="w-full h-32 text-emerald-600" viewBox="0 0 500 120" fill="none">
                    {/* Background Grid Lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="#f1f5f9" strokeDasharray="4 4" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeDasharray="4 4" />

                    {/* Candlesticks */}
                    {/* Candle 1 */}
                    <line x1="30" y1="50" x2="30" y2="95" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="25" y="60" width="10" height="25" fill="#10b981" rx="1" />

                    {/* Candle 2 */}
                    <line x1="70" y1="40" x2="70" y2="85" stroke="#f43f5e" strokeWidth="1.5" />
                    <rect x="65" y="50" width="10" height="20" fill="#f43f5e" rx="1" />

                    {/* Candle 3 */}
                    <line x1="110" y1="35" x2="110" y2="75" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="105" y="42" width="10" height="22" fill="#10b981" rx="1" />

                    {/* Candle 4 */}
                    <line x1="150" y1="20" x2="150" y2="65" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="145" y="28" width="10" height="28" fill="#10b981" rx="1" />

                    {/* Candle 5 */}
                    <line x1="190" y1="30" x2="190" y2="70" stroke="#f43f5e" strokeWidth="1.5" />
                    <rect x="185" y="40" width="10" height="18" fill="#f43f5e" rx="1" />

                    {/* Candle 6 */}
                    <line x1="230" y1="15" x2="230" y2="55" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="225" y="22" width="10" height="24" fill="#10b981" rx="1" />

                    {/* Candle 7 */}
                    <line x1="270" y1="10" x2="270" y2="45" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="265" y="15" width="10" height="20" fill="#10b981" rx="1" />

                    {/* Candle 8 */}
                    <line x1="310" y1="25" x2="310" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
                    <rect x="305" y="30" width="10" height="18" fill="#f43f5e" rx="1" />

                    {/* Candle 9 */}
                    <line x1="350" y1="8" x2="350" y2="40" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="345" y="12" width="10" height="22" fill="#10b981" rx="1" />

                    {/* Candle 10 */}
                    <line x1="390" y1="5" x2="390" y2="35" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="385" y="8" width="10" height="20" fill="#10b981" rx="1" />

                    {/* Candle 11 */}
                    <line x1="430" y1="2" x2="430" y2="28" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="425" y="5" width="10" height="18" fill="#10b981" rx="1" />

                    {/* Candle 12 */}
                    <line x1="470" y1="1" x2="470" y2="20" stroke="#10b981" strokeWidth="1.5" />
                    <rect x="465" y="3" width="10" height="14" fill="#10b981" rx="1" />

                    {/* Glowing Trend Line Overlay */}
                    <path
                      d="M 30 72 Q 110 50 150 40 T 270 25 T 390 15 T 470 10"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Risk-balanced algorithm execution</span>
                  </span>
                  <span className="text-emerald-700 font-mono font-bold">+18.4% Strategy Allocation</span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Risk Levels Section */}
        <section className="py-16 px-4 sm:px-6 border-t border-slate-200/80 bg-white">
          <div className="max-w-5xl mx-auto space-y-10">
            
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Choose Your Risk. Invest Your Way.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                Select your comfortable risk profile and the AI adjusts asset allocation accordingly.
              </p>
            </div>

            {/* 3 Simple Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Low Risk */}
              <div className="p-6 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 transition-all space-y-4 shadow-sm hover:shadow-md relative group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h3 className="font-bold text-lg text-slate-900">Low Risk</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Conservative
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Focuses on capital preservation and steady wealth growth over time.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Asset Coverage:</div>
                  <ul className="space-y-2 text-sm text-slate-800">
                    <li className="flex items-center space-x-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Mutual Funds</span>
                    </li>
                    <li className="flex items-center space-x-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>SIP (Systematic Investment Plans)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Medium Risk */}
              <div className="p-6 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 transition-all space-y-4 shadow-sm hover:shadow-md relative group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <h3 className="font-bold text-lg text-slate-900">Medium Risk</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Balanced
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  A balanced approach combining stability with equity market upside.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Asset Coverage:</div>
                  <ul className="space-y-2 text-sm text-slate-800">
                    <li className="flex items-center space-x-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Stocks</span>
                    </li>
                    <li className="flex items-center space-x-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>ETFs (Exchange Traded Funds)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* High Risk */}
              <div className="p-6 rounded-2xl bg-white border border-rose-200 hover:border-rose-400 transition-all space-y-4 shadow-sm hover:shadow-md relative group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <h3 className="font-bold text-lg text-slate-900">High Risk</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    Aggressive
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Aims for maximum growth opportunity using dynamic trading channels.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Asset Coverage:</div>
                  <ul className="space-y-2 text-sm text-slate-800">
                    <li className="flex items-center space-x-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Stocks</span>
                    </li>
                    <li className="flex items-center space-x-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Futures & Options</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* About Section & Meet the Creators */}
        <section className="py-16 px-4 sm:px-6 border-t border-slate-200/80 bg-slate-50/60">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* About the App */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">About the App</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                AI Investment App is designed to make investing simpler. Choose your preferred risk level and let the application help manage your investment strategy.
              </p>
            </div>

            {/* Meet the Creators */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900">Meet the Creators</h3>
                <p className="text-slate-500 text-xs">The engineering and design team behind AI Investment App</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CREATORS.map((creator) => {
                  const hasImage = creator.imageUrl && !avatarErrorMap[creator.id];
                  return (
                    <div 
                      key={creator.id} 
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md flex flex-col items-center text-center space-y-3 transition-all group"
                    >
                      <div className="w-16 h-16 rounded-full relative flex items-center justify-center shrink-0">
                        {hasImage ? (
                          <img
                            src={creator.imageUrl}
                            alt={creator.name}
                            referrerPolicy="no-referrer"
                            onError={() => setAvatarErrorMap(prev => ({ ...prev, [creator.id]: true }))}
                            className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-white ring-2 ring-slate-100 group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${creator.gradient} flex items-center justify-center font-bold text-white text-base shadow-sm border-2 border-white ring-2 ring-slate-100`}>
                            {creator.initials}
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{creator.name}</h4>
                        <p className={`text-xs font-bold ${creator.roleColor}`}>{creator.role}</p>
                      </div>

                      <p className="text-xs text-slate-500 leading-normal">
                        {creator.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 space-y-5 relative shadow-2xl">
            
            <button 
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">AI Investment App</h3>
                <p className="text-xs text-emerald-600 font-semibold">Android app</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-center">
              <h4 className="font-bold text-emerald-800">Coming Soon!</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                The AI Investment App will be available to download soon. Stay tuned!
              </p>
            </div>

            <button
              onClick={() => setShowDownloadModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-xs py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="font-semibold text-slate-700">
            AI Investment App © 2026
          </div>
          <div className="text-slate-500">
            Built with AI & Technology
          </div>
        </div>
      </footer>

    </div>
  );
};
