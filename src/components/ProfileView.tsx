import React from 'react';
import { UserProfile, NavTab } from '../types';
import { User, ShieldCheck, Award, Clock, Activity, CheckCircle2, DollarSign, ArrowUpRight } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile | null;
  setCurrentTab: (tab: NavTab) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setCurrentTab }) => {
  if (!user) return <div className="p-12 text-center text-slate-400">Please log in to view profile.</div>;

  const securityLogs = [
    { event: 'Web Terminal Session Initiated', ip: '192.168.1.104', location: 'San Francisco, CA', date: '2026-08-03 09:02' },
    { event: 'API Bot Key Authenticated', ip: '34.102.18.91', location: 'Cloud Run Service', date: '2026-08-02 22:15' },
    { event: '2FA Verification Passed', ip: '192.168.1.104', location: 'San Francisco, CA', date: '2026-08-01 14:00' }
  ];

  return (
    <div id="profile-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-slate-100">
      
      {/* User Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="flex items-center space-x-5">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-2xl ring-4 ring-cyan-500/30 object-cover shadow-xl"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">{user.name}</h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{user.kycLevel}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">{user.email}</p>
            <div className="text-[11px] text-cyan-400 font-mono mt-1">ID: {user.id}</div>
          </div>
        </div>

        <button
          onClick={() => setCurrentTab('settings')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          Edit Preferences
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Historical Win Rate</div>
          <div className="text-2xl font-black font-mono text-cyan-400">{user.winRate}%</div>
          <div className="text-[11px] text-slate-500">Based on {user.totalTradesCount} trades</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Lifetime Realized Profit</div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            +${user.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400/80">Net return rate +29%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Account Status</div>
          <div className="text-2xl font-black font-mono text-white">VIP Trader</div>
          <div className="text-[11px] text-slate-400">Sub-millisecond Routing active</div>
        </div>
      </div>

      {/* Security Audit Trail */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Recent Security & Login Audit Log</span>
        </h3>

        <div className="space-y-2">
          {securityLogs.map((log, idx) => (
            <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
              <div>
                <div className="font-semibold text-slate-200">{log.event}</div>
                <div className="text-[10px] text-slate-500 font-mono">IP: {log.ip} ({log.location})</div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">{log.date}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
