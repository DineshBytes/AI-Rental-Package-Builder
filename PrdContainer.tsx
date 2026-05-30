import React, { useState } from 'react';
import { PRD_DATA } from '../data/prdData';
import { SIMPLE_PRD_DATA } from '../data/simplePrdData';
import { BookOpen, Search, Copy, Check, Terminal, Database, ShieldAlert, Cpu } from 'lucide-react';

export default function PrdContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<string>('project-title');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [docMode, setDocMode] = useState<'academic' | 'simple'>('simple');

  const activeDataSource = docMode === 'simple' ? SIMPLE_PRD_DATA : PRD_DATA;

  const filteredSections = activeDataSource.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="prd-document-root" className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-120px)] text-slate-800">
      {/* List Sidebar */}
      <div className="lg:col-span-1 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-4 sticky top-24 self-start max-h-[calc(100vh-140px)] overflow-y-auto shadow-sm">
        <div className="mb-4">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" /> Technical Modules
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search specifications..."
              id="prd-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <nav className="space-y-1">
          {filteredSections.map((sec) => (
            <button
              key={sec.id}
              id={`prd-nav-item-${sec.id}`}
              onClick={() => {
                setActiveSection(sec.id);
                const el = document.getElementById(`prd-section-${sec.id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-start gap-2.5 ${
                activeSection === sec.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 ${
                activeSection === sec.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
              }`}>
                {sec.sectionNumber}
              </span>
              <div className="truncate">
                <p className="font-semibold">{sec.title}</p>
                <p className={`text-[10px] truncate ${activeSection === sec.id ? 'text-white/70' : 'text-slate-400'}`}>
                  {sec.subtitle}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Reader Pane */}
      <div className="lg:col-span-3 space-y-8 pb-16">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-400/20 px-2.5 py-1 rounded-full">
                SOFTWARE REQUIREMENT SPECIFICATION (SRS)
              </span>
              <h1 className="text-xl font-bold tracking-tight mt-2 font-mono">
                {docMode === 'simple' ? 'One Point Solutions Simplified PRD' : 'One Point Solutions Technical PRD'}
              </h1>
              <p className="text-slate-300 text-xs mt-1">
                {docMode === 'simple' ? 'Plain-English Summary & Core Explanations' : 'Investor-Ready & Academic Internship Submission Document'}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-mono">
              <Cpu className="w-5 h-5 text-blue-400 animate-pulse" />
              <div>
                <p className="text-[10px] text-slate-400 leading-none">AI ENGINE</p>
                <p className="text-blue-300 leading-none mt-1">Gemini 3.5 Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Complexity Level Selector Toggle */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-900">Explanation Language Mode</h3>
              <p className="text-[10px] text-slate-400 font-bold leading-normal">Choose between plain-English summaries or detailed technical specifications.</p>
            </div>
          </div>
          
          <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200/60 max-w-xs w-full sm:w-auto">
            <button
              onClick={() => setDocMode('simple')}
              className={`flex-1 sm:flex-initial text-center px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                docMode === 'simple'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Plain English (Simple)
            </button>
            <button
              onClick={() => setDocMode('academic')}
              className={`flex-1 sm:flex-initial text-center px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                docMode === 'academic'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Detailed Technical PRD
            </button>
          </div>
        </div>

        {filteredSections.map((sec) => (
          <div
            key={sec.id}
            id={`prd-section-${sec.id}`}
            onMouseEnter={() => setActiveSection(sec.id)}
            className={`bg-white rounded-2xl border transition-all duration-300 p-6 lg:p-8 relative ${
              activeSection === sec.id
                ? 'border-blue-500/40 shadow-md shadow-blue-500/[0.02]'
                : 'border-slate-200/60 hover:border-slate-300'
            }`}
          >
            {/* Header tag */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-mono text-sm font-bold flex items-center justify-center">
                  {sec.sectionNumber}
                </span>
                <div>
                  <h2 className="text-md font-bold text-slate-900 tracking-tight">{sec.title}</h2>
                  <p className="text-xs text-slate-500 font-medium">{sec.subtitle}</p>
                </div>
              </div>
              <button
                id={`prd-copy-btn-${sec.id}`}
                onClick={() => handleCopy(sec.content, sec.id)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                title="Copy Section Content"
              >
                {copiedId === sec.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Structured Parsing with custom layouts for technical tables & codes */}
            <div className="prose prose-slate max-w-none text-xs leading-relaxed space-y-4">
              {sec.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                // Render code blocks nicely
                if (trimmed.startsWith('```')) {
                  const lines = trimmed.split('\n');
                  const language = lines[0].replace('```', '') || 'code';
                  const code = lines.slice(1, -1).join('\n');
                  return (
                    <div key={idx} className="my-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <div className="bg-slate-900 text-slate-400 px-4 py-2 flex items-center justify-between text-[10px] font-mono border-b border-slate-800">
                        <span className="flex items-center gap-1.5 font-bold uppercase">
                          <Terminal className="w-3.5 h-3.5 text-blue-500" /> {language} specification
                        </span>
                        <button
                          onClick={() => handleCopy(code, `${sec.id}-code-${idx}`)}
                          className="hover:text-white flex items-center gap-1"
                        >
                          {copiedId === `${sec.id}-code-${idx}` ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          Copy
                        </button>
                      </div>
                      <pre className="p-4 bg-slate-950 text-slate-200 overflow-x-auto text-[11px] leading-relaxed font-mono font-medium">
                        <code>{code}</code>
                      </pre>
                    </div>
                  );
                }

                // Render lists
                if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-2 mt-2">
                      {trimmed.split('\n').map((li, lIdx) => (
                        <li key={lIdx} className="text-slate-600 font-medium font-sans">
                          {li.replace(/^[\s*-]+/, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Headings inside the content
                if (trimmed.startsWith('## ')) {
                  return (
                    <h3 key={idx} className="text-sm font-bold text-slate-900 tracking-tight mt-6 mb-2 border-l-4 border-blue-500 pl-3">
                      {trimmed.replace('## ', '')}
                    </h3>
                  );
                }
                if (trimmed.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-md font-extrabold text-slate-900 tracking-tight mt-4 mb-2">
                      {trimmed.replace('# ', '')}
                    </h2>
                  );
                }

                // standard paragraphs
                return (
                  <p key={idx} className="text-slate-600 font-medium font-sans" dangerouslySetInnerHTML={{
                    __html: trimmed
                      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
                      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px]">$1</code>')
                  }} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
