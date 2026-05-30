import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, FileText, Download, Calendar, CircleDot, AlertCircle, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';
import { CustomerRequest, AnalyticsMetric } from '../types';

interface DashboardPageProps {
  metrics: AnalyticsMetric;
  requests: CustomerRequest[];
  onUpdateStatus: (id: string, nextStatus: 'PENDING' | 'COMPLETED' | 'IN REVIEW') => void;
  onRefreshMetrics: () => void;
  currency: 'USD' | 'INR';
}

// Complex Forecasting dataset mapping actual transaction volumes against AI predictions
const VOLUMES_HOURLY_DATA = [
  { name: 'Mon', Actual: 45, Predicted: 48 },
  { name: 'Tue', Actual: 58, Predicted: 55 },
  { name: 'Wed', Actual: 62, Predicted: 68 },
  { name: 'Thu', Actual: 75, Predicted: 72 },
  { name: 'Fri', Actual: 98, Predicted: 94 },
  { name: 'Sat', Actual: 110, Predicted: 118 },
  { name: 'Sun', Actual: 125, Predicted: 130 }
];

export default function DashboardPage({ metrics, requests, onUpdateStatus, onRefreshMetrics, currency }: DashboardPageProps) {
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleDownloadReport = () => {
    setDownloadingReport(true);
    setTimeout(() => {
      setDownloadingReport(false);
      alert('Corporate CSV Performance metrics compiled on client. Initiating export downstream!');
    }, 1500);
  };

  // Convert number to Crore formatted rupee string matching "₹1.42Cr" or dynamic dollars
  const formatCroreValue = (value: number) => {
    // 1 Crore = 10,000,000. 14,200,000 is 1.42 Crore
    const crValue = value / 10000000;
    return `₹${crValue.toFixed(2)}Cr`;
  };

  const formatDollarValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatAsPrimaryCurrency = (amountInINR: number) => {
    if (currency === 'INR') {
      return formatCroreValue(amountInINR);
    } else {
      return formatDollarValue(Math.round(amountInINR / 84));
    }
  };

  const formatAsSecondaryCurrency = (amountInINR: number) => {
    if (currency === 'INR') {
      return `Equates to roughly ${formatDollarValue(Math.round(amountInINR / 84))}`;
    } else {
      return `Equates to roughly ${formatCroreValue(amountInINR)}`;
    }
  };

  return (
    <div id="dashboard-root" className="space-y-6 text-slate-800">
      
      {/* Overview Headings */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">Platform Overview</h2>
          <p className="text-xs text-slate-500 font-medium">Your AI-driven rental performance for the last 30 days.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onRefreshMetrics}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
            title="Reload Sync Stats"
          >
            <RefreshCw className="w-4 h-4" /> Sync DB
          </button>
          
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500">
            <Calendar className="w-4 h-4 text-slate-400" /> Oct 2023
          </div>
          
          <button
            onClick={handleDownloadReport}
            className={`px-4 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              downloadingReport ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10'
            }`}
          >
            <Download className="w-4 h-4" /> {downloadingReport ? 'Compiling Report...' : 'Download Report'}
          </button>
        </div>
      </div>

      {/* 4 KPI METRICS BLOCKS GRID (Matches image 4 layout precisely) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        {/* Metric 1 - Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 font-mono tracking-wider uppercase">Recent Enquiries</span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-mono shrink-0">+12%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold font-mono tracking-tight text-slate-900">
              {formatAsPrimaryCurrency(metrics.recentEnquiries)}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">{formatAsSecondaryCurrency(metrics.recentEnquiries)}</p>
          </div>
        </div>

        {/* Metric 2 - Most Rented */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 font-mono tracking-wider uppercase">Most Rented Devices</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full font-mono shrink-0 uppercase tracking-widest font-extrabold text-[9px]">High Demand</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold font-mono tracking-tight text-slate-900">
              {formatAsPrimaryCurrency(metrics.recentEnquiries)}
            </p>
            <p className="text-[10px] text-slate-400 font-medium truncate">{metrics.mostRentedDevices}</p>
          </div>
        </div>

        {/* Metric 3 - AI Conversion Rate (active/highlighted card style) */}
        <div className="bg-white rounded-2xl border-2 border-blue-600/90 p-5 shadow-sm space-y-2 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <span className="text-[10px] font-extrabold text-slate-400 font-mono tracking-wider uppercase">AI Conv. Rate</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-5 text-indigo-700 bg-blue-50/80 px-2.5 py-0.5 rounded-full font-mono shrink-0 uppercase tracking-widest font-extrabold text-[9px] flex items-center gap-1.5 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping-slow" /> AI Active
            </span>
          </div>
          <div className="space-y-1 relative z-10">
            <p className="text-2xl font-bold font-mono tracking-tight text-slate-900">
              {metrics.aiConversionRate}%
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Converted via natural language setups</p>
          </div>
          {/* Subtle blue gradient highlight in the background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 to-indigo-50/10 pointer-events-none" />
        </div>

        {/* Metric 4 - Monthly Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-2 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-extrabold text-slate-400 font-mono tracking-wider uppercase">Monthly Revenue</span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-mono shrink-0">+5.4%</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold font-mono tracking-tight text-slate-900">
              {formatAsPrimaryCurrency(metrics.monthlyRevenue)}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">{formatAsSecondaryCurrency(metrics.monthlyRevenue)}</p>
          </div>
        </div>

      </div>

      {/* RENTAL TRENDS AND AI FORECAST CHART PANEL */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">Rental Trends & AI Forecast</h3>
            <p className="text-[11px] text-slate-400">Comparison of actual vs. predicted rental volume throughput.</p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold font-mono text-slate-400">
            <span className="flex items-center gap-1"><CircleDot className="w-3.5 h-3.5 text-blue-600" /> ACTUAL</span>
            <span className="flex items-center gap-1"><CircleDot className="w-3.5 h-3.5 text-slate-300" /> PREDICTED</span>
          </div>
        </div>

        {/* Recharts element */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="105%" height="100%" className="-ml-6">
            <AreaChart data={VOLUMES_HOURLY_DATA}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={10} 
                fontFamily="Courier New" 
                tickLine={false} 
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={10} 
                fontFamily="Courier New" 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ fontSize: '11px', fontFamily: 'Inter', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white' }} 
              />
              <Area 
                type="monotone" 
                name="Actual Rental Counts (Mon-Sun)"
                dataKey="Actual" 
                stroke="#2563eb" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#actualGrad)" 
              />
              <Area 
                type="monotone" 
                name="AI Predicted Curve"
                dataKey="Predicted" 
                stroke="#94a3b8" 
                strokeDasharray="4 4"
                strokeWidth={1.5}
                fillOpacity={1} 
                fill="url(#predictedGrad)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* NEW CUSTOMER REQUESTS LOGS QUEUE (Matches Image 4 grid precisely) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Customer Requests Log</h3>
          <button onClick={() => alert('Viewing all requests archives.')} className="text-[11px] font-bold text-blue-600 hover:text-blue-700 shrink-0">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                <th className="px-4 py-3">CUSTOMER</th>
                <th className="px-4 py-3">DEVICE MODEL</th>
                <th className="px-4 py-3 font-mono">REQUEST DATE</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-xs font-sans font-medium divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {req.customerName.split(' ').map(n => n[0]).join('')}
                    </span>
                    <div>
                      <p className="font-bold text-slate-800 leading-none">{req.customerName}</p>
                      <p className="text-[10px] text-slate-400 leading-none mt-1">{req.companyName}</p>
                    </div>
                  </td>
                  
                  <td className="px-4 py-3.5 text-slate-700 font-semibold truncate max-w-xs" title={req.deviceModel}>
                    {req.deviceModel}
                  </td>
                  
                  <td className="px-4 py-3.5 text-slate-400 font-mono font-medium">{req.requestDate}</td>
                  
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full font-mono uppercase tracking-wider border shrink-0 ${
                      req.status === 'COMPLETED'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : req.status === 'PENDING'
                        ? 'bg-blue-50 border-blue-200 text-blue-700 animate-pulse'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        req.status === 'COMPLETED' ? 'bg-emerald-500' : req.status === 'PENDING' ? 'bg-blue-500' : 'bg-amber-500'
                      }`} />
                      {req.status}
                    </span>
                  </td>

                  {/* Actions Dropdown buttons */}
                  <td className="px-4 py-3.5 text-right relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === req.id ? null : req.id)}
                      className="p-1 px-2 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg shrink-0 font-bold font-mono transition-colors text-sm"
                    >
                      ⋮
                    </button>
                    
                    {activeMenuId === req.id && (
                      <div className="absolute right-4 top-10 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-30 flex flex-col font-sans">
                        <p className="text-[9px] font-extrabold text-slate-400 font-mono text-left px-2 py-1 border-b border-slate-100 uppercase">Shift Status</p>
                        <button
                          onClick={() => {
                            onUpdateStatus(req.id, 'PENDING');
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left p-1.5 hover:bg-slate-50 rounded-lg text-xs font-semibold text-blue-600 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-blue-500" /> Mark PENDING
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(req.id, 'COMPLETED');
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left p-1.5 hover:bg-slate-50 rounded-lg text-xs font-semibold text-emerald-600 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Mark COMPLETED
                        </button>
                        <button
                          onClick={() => {
                            onUpdateStatus(req.id, 'IN REVIEW');
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left p-1.5 hover:bg-slate-50 rounded-lg text-xs font-semibold text-amber-600 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-500" /> Mark IN REVIEW
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
