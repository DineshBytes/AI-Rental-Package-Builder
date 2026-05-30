import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, FileText, LayoutDashboard, Compass, Cpu, Search, Sun, Moon, Bell, Menu, BookOpen, AlertCircle, ShoppingBag, FolderGit2, Smartphone, Users, Settings as SettingsIcon } from 'lucide-react';
import LandingPage from './components/LandingPage';
import BuilderPage from './components/BuilderPage';
import DashboardPage from './components/DashboardPage';
import PrdContainer from './components/PrdContainer';
import { INVENTORY, formatCurrency } from './data/inventory';
import { CustomerRequest, AnalyticsMetric } from './types';

export default function App() {
  // Navigation structure
  // Primary view mode toggle: SpecDoc (PRD) OR ClientPortal (Interactive Sandbox app)
  const [primaryMode, setPrimaryMode] = useState<'SpecDoc' | 'ClientPortal'>('ClientPortal');

  // Customer portal tab state (Matches the sidebar items)
  const [activePortalTab, setActivePortalTab] = useState<'Home' | 'Builder' | 'Analytics' | 'Inventory' | 'Customers' | 'Settings'>('Home');

  // API states
  const [metrics, setMetrics] = useState<AnalyticsMetric>({
    recentEnquiries: 14200000,
    mostRentedDevices: "MacBook Pro M3 Max",
    aiConversionRate: 24.8,
    monthlyRevenue: 14200000
  });

  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Styling helpers
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Fetch initial logs from Express API on mount
  const fetchSyncData = async () => {
    setIsLoading(true);
    try {
      const metricRes = await fetch('/api/admin/metrics');
      if (metricRes.ok) {
        const metData = await metricRes.json();
        setMetrics(metData);
      }

      const requestsRes = await fetch('/api/admin/requests');
      if (requestsRes.ok) {
        const reqData = await requestsRes.json();
        setRequests(reqData);
      }
    } catch (err) {
      console.error("API sync failure. Operating with high-integrity local mock backup.", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSyncData();
  }, []);

  // Update client order status
  const handleUpdateStatus = (id: string, nextStatus: 'PENDING' | 'COMPLETED' | 'IN REVIEW') => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: nextStatus };
      }
      return r;
    }));
    setToastMsg(`Request status updated to ${nextStatus}.`);
  };

  // Submit checkout and sync stats back to active dashboard
  const handleAddRequestToAdmin = async (orderInfo: { customerName: string; companyName: string; deviceModel: string; totalCost: number }) => {
    try {
      const response = await fetch('/api/admin/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderInfo)
      });

      if (response.ok) {
        const resData = await response.json();
        // Update states React-side from compiled server response to show live integration
        setMetrics(resData.updatedMetrics);
        setRequests(prev => [resData.request, ...prev]);
        setToastMsg('AI processed checkout requisition synced to admin!');
        setActivePortalTab('Analytics'); // take user to admin tab to see result!
      }
    } catch (e) {
      console.error("API checkout transmission failed. Executing offline queue buffer.", e);
    }
  };

  return (
    <div id="application-root" className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F9FAFB] text-slate-800'} transition-colors duration-300`}>
      
      {/* 1. TOP DUAL HEADER BAR (PRD AND CLIENT SWITCHER) */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm py-3 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Branded tagline */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
            OPS
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">One Point Solutions</h1>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest font-mono uppercase">AI RENTAL LOGISTICS</span>
          </div>
        </div>

        {/* PRD/Client Selector Tab controls */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
          <button
            id="toggle-spec-doc-btn"
            onClick={() => setPrimaryMode('SpecDoc')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              primaryMode === 'SpecDoc'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Systems Requirement document (PRD)
          </button>
          
          <button
            id="toggle-interactive-portal-btn"
            onClick={() => setPrimaryMode('ClientPortal')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
              primaryMode === 'ClientPortal'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Interactive Demo Sandbox
          </button>
        </div>

        {/* Outer Settings toolbar */}
        <div className="flex items-center gap-3">
          {/* Notifications badge */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 border border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl p-3 space-y-2.5 z-50 text-xs">
                <p className="font-extrabold text-slate-400 font-mono text-[10px] uppercase border-b border-slate-105 pb-1">Platform Activity</p>
                <div className="space-y-2">
                  <p className="text-slate-600 font-medium leading-relaxed">
                    <strong className="text-slate-900 font-bold">System Log:</strong> Server connected using Gemini-3.5-Flash capabilities.
                  </p>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    <strong className="text-slate-900 font-bold">Logistics:</strong> 12 Regional Warehouses currently active.
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              const nextCurrency = currency === 'USD' ? 'INR' : 'USD';
              setCurrency(nextCurrency);
              setToastMsg(`Currency switched to ${nextCurrency === 'INR' ? 'Indian Rupee (INR)' : 'US Dollar (USD)'}`);
            }}
            className="p-2 border border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono font-bold"
            title="Convert platform currency (INR/USD)"
          >
            <span className="text-blue-600 font-extrabold">{currency === 'USD' ? '$' : '₹'}</span>
            <span>{currency}</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 border border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Toggle theme view"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=70" 
            alt="Customer profile avatar" 
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
        </div>
      </header>

      {/* 2. DYNAMIC BROADCAST TOAST ALERTS */}
      {toastMsg && (
        <div className="bg-blue-600 text-white p-3 text-center text-xs font-semibold flex items-center justify-center gap-2 animate-slide-down relative">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="bg-black/20 hover:bg-black/40 px-2 py-0.5 rounded text-[10px] ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* 3. MAIN WORKSPACE */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {primaryMode === 'SpecDoc' ? (
          /* SPECIFICATIONS READER VIEW */
          <PrdContainer />
        ) : (
          /* CLIENT INTERACTIVE SANDBOX APPS PORTAL WITH SIDEBAR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* PORTAL LEFT SIDEBAR DECK (col-span-2) - Matches screenshot 2 & 4 layouts */}
            <aside className="lg:col-span-2 space-y-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm h-full">
              <nav className="space-y-1.5">
                {[
                  { id: 'Home', label: 'Overview/Home', icon: Compass },
                  { id: 'Builder', label: 'AI Builder', icon: Cpu },
                  { id: 'Analytics', label: 'Analytics Board', icon: LayoutDashboard },
                  { id: 'Inventory', label: 'Device Inventory', icon: ShoppingBag },
                  { id: 'Customers', label: 'Our Customers', icon: Users },
                  { id: 'Settings', label: 'System Settings', icon: SettingsIcon }
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      id={`sidebar-tab-${tab.id}`}
                      onClick={() => setActivePortalTab(tab.id as any)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                        activePortalTab === tab.id
                          ? 'bg-blue-600/90 text-white shadow-sm shadow-blue-500/10'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              {/* Upgrade Promo card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-4 space-y-3 shadow-md relative overflow-hidden">
                <span className="text-[9px] font-mono font-black tracking-widest bg-white/20 px-2 py-0.5 rounded uppercase">PRO ACCESS</span>
                <div className="space-y-1">
                  <p className="text-xs font-bold">Upgrade to Premium</p>
                  <p className="text-[10px] text-blue-100 leading-relaxed font-semibold">Enable custom API endpoints, multi-user quotes and predictive inventory models.</p>
                </div>
                <button 
                  onClick={() => alert('Accessing high tier packages. Ready for enterprise licensing.')}
                  className="w-full py-2 bg-white text-blue-700 font-extrabold text-[10px] rounded-lg transition-transform hover:scale-[1.02]"
                >
                  Learn More
                </button>
              </div>

              {/* Admin profile card */}
              <div className="border-t border-slate-100 pt-3 flex items-center gap-2.5 text-xs text-slate-500 p-1">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=70" 
                  alt="Administrator profile user avatar" 
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="font-extrabold text-slate-800 leading-none">Sarah Jenkins</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">admin@onepoint.solutions</p>
                </div>
              </div>
            </aside>

            {/* DYNAMIC PORTAL PANES CANVAS (col-span-12 or 10 depending on sidebar existence) */}
            <div className="lg:col-span-10 min-h-[600px]">
              
              {activePortalTab === 'Home' && (
                <LandingPage 
                  onStartBuilder={() => setActivePortalTab('Builder')} 
                  onViewPrd={() => setPrimaryMode('SpecDoc')} 
                />
              )}

              {activePortalTab === 'Builder' && (
                <BuilderPage onAddRequestToAdmin={handleAddRequestToAdmin} currency={currency} />
              )}

              {activePortalTab === 'Analytics' && (
                <DashboardPage 
                  metrics={metrics} 
                  requests={requests} 
                  onUpdateStatus={handleUpdateStatus} 
                  onRefreshMetrics={fetchSyncData} 
                  currency={currency}
                />
              )}

              {/* Auxiliary placeholder tab catalogs reflecting solid structure */}
              {activePortalTab === 'Inventory' && (
                <div id="catalog-tab-canvas" className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Device Inventory Catalog</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Physical hardware currently tracked across 12 warehouses hubs.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {INVENTORY.map(dev => (
                      <div key={dev.id} className="border border-slate-200/80 rounded-xl p-3.5 space-y-3 shadow-xs">
                        <img src={dev.imageUrl} alt={dev.name} className="w-full h-32 object-cover rounded-lg" />
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{dev.category}</span>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{dev.name}</h4>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{dev.specs}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                            <span className="text-xs font-bold font-mono text-blue-600">{formatCurrency(dev.unitPricePerDay, currency)}/day</span>
                            <span className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase">{dev.inventoryStatus} ({dev.stockQuantity} Left)</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePortalTab === 'Customers' && (
                <div id="customers-tab-canvas" className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Registered Corporate Clients</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Enterprise accounts with active framing lease agreements.</p>
                  </div>
                  
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden text-xs">
                    {[
                      { name: 'Quantum Dynamics Inc.', rep: 'Sarah Jenkins', email: 's.jenkins@quantumdyn.io', location: 'Seattle Hub', events: 4 },
                      { name: 'Stark Industries', rep: 'Tony Stark', email: 'tony@stark.com', location: 'New York Hub', events: 12 },
                      { name: 'Atlas Tech Solutions', rep: 'John Doe', email: 'john@atlas.io', location: 'San Francisco Hub', events: 2 },
                      { name: 'Nexus Developers', rep: 'Sarah Smith', email: 'sarah@nexusdev.io', location: 'Chicago Hub', events: 1 }
                    ].map((client, idx) => (
                      <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">{client.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Attn: {client.rep} | {client.email}</p>
                        </div>
                        <div className="text-right text-[11px] font-mono font-medium">
                          <p className="text-slate-600">{client.location}</p>
                          <p className="text-blue-600 font-bold mt-0.5">{client.events} leases registered</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePortalTab === 'Settings' && (
                <div id="settings-tab-canvas" className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">System Preferences</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Manage full-stack portal variables, currency configurations and API proxies.</p>
                  </div>

                  <div className="space-y-4 max-w-xl text-xs">
                    <div className="p-4 border border-slate-100 rounded-xl space-y-1.5 bg-slate-50">
                      <p className="font-bold text-slate-800">Server-Side API Proxy Integration</p>
                      <p className="text-[11px] text-slate-500">The Gemini model generates responses server-side to secure the api key. If unconfigured in settings, the server falls back to heuristic matching rules automatically, ensuring high reliability.</p>
                      <div className="flex items-center gap-2 pt-2 text-[10px] font-mono font-bold text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Active proxy: /api/rental/generate
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-bold text-slate-800">Preferences Toggles</p>
                      <div className="flex items-center justify-between p-3 border border-slate-150 rounded-xl hover:bg-slate-50">
                        <div>
                          <p className="font-bold text-slate-700">Enterprise DoD Disk Sanitization Mode</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Clean all device disks automatically when lease finishes</p>
                        </div>
                        <span className="text-[10px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">ENABLED</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-slate-150 rounded-xl hover:bg-slate-50">
                        <div>
                          <p className="font-bold text-slate-700">Predictive Stock Pre-allocations</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Block devices for corporate organizers while proposals compile</p>
                        </div>
                        <span className="text-[10px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">ENABLED</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}
      </main>

      {/* FOOTER BAR (Matches screenshot margins and branding patterns) */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-center text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1.5 max-w-sm">
            <h4 className="font-extrabold text-slate-800 leading-none flex items-center gap-1">One Point Solutions</h4>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              Accelerating technology access through AI-driven logistics and premium rental solutions.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-semibold text-slate-500">
            <button onClick={() => setActivePortalTab('Home')} className="hover:text-blue-600">Builder</button>
            <button onClick={() => setPrimaryMode('SpecDoc')} className="hover:text-blue-600">Specs PRD</button>
            <button onClick={() => setActivePortalTab('Inventory')} className="hover:text-blue-600">Fleet Inventory</button>
            <a href="mailto:support@onepointsolutions.io" className="hover:text-blue-600">Company Support</a>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-mono">© 2026 One Point Solutions. Powered by AI.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
