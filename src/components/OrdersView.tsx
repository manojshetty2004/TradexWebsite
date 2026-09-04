import React, { useState } from 'react';
import { Order, NavTab, UserProfile } from '../types';
import { ListOrdered, CheckCircle2, Clock, XCircle, Trash2, Filter } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface OrdersViewProps {
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  setCurrentTab: (tab: NavTab) => void;
  user?: UserProfile | null;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onCancelOrder,
  setCurrentTab,
  user
}) => {
  const [activeTab, setActiveTab] = useState<'OPEN' | 'FILLED' | 'CANCELLED'>('OPEN');
  const [filterSymbol, setFilterSymbol] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesTab = o.status === activeTab;
    const matchesSymbol = filterSymbol ? o.symbol.toLowerCase().includes(filterSymbol.toLowerCase()) : true;
    return matchesTab && matchesSymbol;
  });

  return (
    <div id="orders-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center space-x-2">
            <ListOrdered className="w-6 h-6 text-cyan-400" />
            <span>Order Book Execution & History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review active limit orders, stop losses, and complete trade history.</p>
        </div>

        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter by symbol (e.g. BTC)..."
          value={filterSymbol}
          onChange={(e) => setFilterSymbol(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-full md:w-64"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('OPEN')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'OPEN' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Active Open Orders ({orders.filter(o => o.status === 'OPEN').length})
        </button>
        <button
          onClick={() => setActiveTab('FILLED')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'FILLED' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Trade History ({orders.filter(o => o.status === 'FILLED').length})
        </button>
        <button
          onClick={() => setActiveTab('CANCELLED')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'CANCELLED' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Cancelled ({orders.filter(o => o.status === 'CANCELLED').length})
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Asset</th>
                <th className="py-3.5 px-4">Side</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Leverage</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                {activeTab === 'OPEN' && <th className="py-3.5 px-4 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-500 font-medium">
                    No orders found in "{activeTab}" status.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors font-mono">
                    <td className="py-3.5 px-4 text-slate-400">{order.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-100">{order.symbol}</td>
                    <td className="py-3.5 px-4 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        order.side === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {order.side}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-sans text-[11px]">{order.type}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-200">{formatCurrency(order.price, user?.currency || 'INR')}</td>
                    <td className="py-3.5 px-4 text-slate-300">{order.amount}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-100">{formatCurrency(order.total, user?.currency || 'INR')}</td>
                    <td className="py-3.5 px-4 text-cyan-400">{order.leverage}x</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[10px] font-sans">{order.date}</td>
                    <td className="py-3.5 px-4 font-sans">
                      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.status === 'FILLED' ? 'bg-emerald-500/20 text-emerald-400' :
                        order.status === 'OPEN' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {order.status === 'FILLED' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {order.status === 'OPEN' && <Clock className="w-3 h-3 mr-1 animate-spin" />}
                        <span>{order.status}</span>
                      </span>
                    </td>
                    {activeTab === 'OPEN' && (
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onCancelOrder(order.id)}
                          className="px-2.5 py-1 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Cancel Order
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
