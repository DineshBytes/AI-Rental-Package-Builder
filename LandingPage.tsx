import React from 'react';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Clock, Zap, Cpu, CheckCircle2, Shield, Headphones, Kanban } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStartBuilder: () => void;
  onViewPrd: () => void;
}

export default function LandingPage({ onStartBuilder, onViewPrd }: LandingPageProps) {
  return (
    <div id="landing-root" className="space-y-20 pb-20 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" /> AI-POWERED EXPERIENCE
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-[1.15]">
          AI Rental Package <span className="text-blue-600">Builder</span>
        </h1>
        
        <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-sans font-medium">
          Describe your event or requirement and get the perfect rental device package instantly. 
          Optimized for efficiency and precision of corporate operations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            id="hero-build-btn"
            onClick={onStartBuilder}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer"
          >
            Build My Rental Setup <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            id="hero-prd-btn"
            onClick={onViewPrd}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 transition-all cursor-pointer"
          >
            Review Project Report
          </button>
        </div>
      </section>

      {/* 2. CLI TERMINAL & STATS HIGHLIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch px-4">
        {/* CLI Emulator */}
        <div className="lg:col-span-8 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl p-6 flex flex-col justify-between space-y-6 overflow-hidden relative">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs font-mono text-zinc-500 ml-2">one-point-solutions-cli</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded">v1.2.0</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <p className="text-md sm:text-lg font-mono text-white font-medium leading-relaxed">
                "I need 10 workstations for a 3-day hackathon in Seattle."
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
                  M3 MacBook Pro x10
                </span>
                <span className="text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
                  27" 5K Displays x10
                </span>
                <span className="text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded">
                  Ergo Chairs x10
                </span>
              </div>

              {/* Suggestions tip */}
              <div className="bg-blue-950/40 border-l-4 border-blue-550 p-3 rounded-r-lg space-y-1">
                <p className="text-[10px] font-mono font-bold text-blue-400">AI Suggestion</p>
                <p className="text-[11px] font-mono text-slate-300 leading-relaxed">
                  Adding high-speed networking hub for 50+ concurrent connections.
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=450" 
                alt="Modern workstation setup"
                className="w-full h-48 object-cover brightness-90 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Column Stats cards */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-center flex-1 shadow-sm hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-slate-900">0.4s</p>
            <p className="text-xs font-semibold text-slate-400 mt-1">Average Build Time</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-center flex-1 shadow-sm hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-slate-900">100%</p>
            <p className="text-xs font-semibold text-slate-400 mt-1">Inventory Guarantee</p>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRY TEAM DECK */}
      <section className="border-y border-slate-100 py-10 text-center space-y-4">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">POWERING INDUSTRY LEADERS</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm font-extrabold text-slate-400 font-mono">
          <span className="hover:text-slate-600 transition-colors cursor-default">⚡ STARK</span>
          <span className="hover:text-slate-600 transition-colors cursor-default">🌍 ATLAS</span>
          <span className="hover:text-slate-600 transition-colors cursor-default">⚙️ NEXUS</span>
          <span className="hover:text-slate-600 transition-colors cursor-default">⚡ VOLT</span>
          <span className="hover:text-slate-600 transition-colors cursor-default">🛡️ AEGIS</span>
        </div>
      </section>

      {/* 4. WORKFLOW DECK */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-center px-4">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-bold text-blue-600 tracking-wider uppercase font-mono">INTELLIGENT PIPELINE</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Simple Workflow, <br/>Advanced Intelligence.
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Describe Requirements</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Input your event details, attendee count, and technical specifications in natural language.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">AI Synthesis</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Our engine analyzes inventory levels and device compatibility to curate the perfect stack.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Instant Deployment</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Review the quote, confirm the rental, and receive your devices pre-configured and ready.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=700" 
            alt="Server logistics analytics"
            className="w-full h-[360px] object-cover brightness-95"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* 5. ENTERPRISE PERFORMANCE FEATURES BENTO */}
      <section className="space-y-10 max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Enterprise-Grade Performance</h2>
          <p className="text-xs text-slate-400 font-semibold font-mono uppercase">Built for the demands of high-stakes corporate environments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Warehouse */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:border-slate-300 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center">
                <Kanban className="w-5 h-5" />
              </div>
              <h3 className="text-md font-bold text-slate-900">Global Inventory Access</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Real-time tracking across 12 global hubs. If it's in our warehouse, it's available for your project in under 24 hours.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden h-40">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" 
                alt="Warehouse corridors aisle blue"
                className="w-full h-full object-cover brightness-90 hover:scale-[1.03] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Card 2: Secured blue */}
          <div className="md:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-md font-bold">Secured & Configured</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                All devices undergo enterprise-level data sanitization and come pre-loaded with your required software stack.
              </p>
            </div>
            
            {/* Shield decoration */}
            <div className="absolute right-[-20px] bottom-[-20px] text-white/5 pointer-events-none">
              <Shield className="w-48 h-48" />
            </div>

            <div className="pt-8 relative z-10">
              <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-white/20 border border-white/20 px-3 py-1 rounded-full">
                DoD 5220.22-M Compliant
              </span>
            </div>
          </div>

          {/* Smaller deck card 1 */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-slate-300 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">24/7 Support</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Dedicated technical lead assigned for every major rental package to manage dispatch, setups and updates.</p>
            </div>
          </div>

          {/* Smaller deck card 2 */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:border-slate-300 transition-colors flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Live Analytics Suite</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Monitor device hardware metrics, bandwidth usage, and active rentals status in real-time during live operations.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200/60 p-8 py-10 text-center space-y-6 max-w-4xl mx-auto shadow-sm relative overflow-hidden">
        <div className="absolute left-6 top-6 text-slate-200 pointer-events-none">
          <Terminal className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">Ready to scale your next event?</h2>
          <p className="text-xs text-slate-500 font-medium">
            Join 500+ global enterprises who trust One Point Solutions for their specialized staging environment hardware deployment.
          </p>
        </div>

        <div className="relative z-10 pt-2">
          <button
            onClick={onStartBuilder}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/15 cursor-pointer inline-flex items-center gap-2"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
}
