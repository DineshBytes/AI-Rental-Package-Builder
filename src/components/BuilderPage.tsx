import React, { useState, useEffect } from 'react';
import { Sparkles, Share2, Download, Plus, Minus, Trash2, ShieldCheck, CheckCircle2, MessageSquare, X, Info, FileText, Send, Phone } from 'lucide-react';
import { Device, RecommendedItem, RentalPackage, Quotation, ClientDetails } from '../types';
import { INVENTORY, formatCurrency } from '../data/inventory';

interface BuilderPageProps {
  onAddRequestToAdmin: (reqBody: { customerName: string; companyName: string; deviceModel: string; totalCost: number }) => void;
  currency: 'USD' | 'INR';
}

export default function BuilderPage({ onAddRequestToAdmin, currency }: BuilderPageProps) {
  // Input states
  const [useCase, setUseCase] = useState('I need 10 workstations for a 3-day hackathon in Seattle.');
  const [eventType, setEventType] = useState('Hackathon');
  const [budgetRange, setBudgetRange] = useState('$500 - $1k');
  const [duration, setDuration] = useState(3);
  
  // Generating states
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Generated result configurations
  const [setupTitle, setSetupTitle] = useState('Based on a 3-day Corporate Hackathon scenario.');
  const [suitabilityScore, setSuitabilityScore] = useState(98);
  const [bestFor, setBestFor] = useState('High-stakes collaborative development environments. Engineered custom high-density networking to prevent bandwidth exhaustion issues and bundled ergonomic task seating.');
  const [recommendedItems, setRecommendedItems] = useState<RecommendedItem[]>([
    {
      device: INVENTORY.find(d => d.id === 'macbook-pro-m3')!,
      quantity: 10
    },
    {
      device: INVENTORY.find(d => d.id === 'workstation-display')!,
      quantity: 10
    },
    {
      device: INVENTORY.find(d => d.id === 'ergo-chair')!,
      quantity: 10
    },
    {
      device: INVENTORY.find(d => d.id === 'networking-hub')!,
      quantity: 1
    }
  ]);

  // Recommendation History state with high-fidelity realistic templates
  const [history, setHistory] = useState<{
    id: string;
    useCase: string;
    eventType: string;
    budgetRange: string;
    duration: number;
    setupTitle: string;
    suitabilityScore: number;
    bestFor: string;
    recommendedItems: RecommendedItem[];
  }[]>([
    {
      id: 'hist-1',
      useCase: 'Typical 100-person high-efficiency hackathon, focused heavily on workstation compile speed, zero lag displays, routers, and posture support.',
      eventType: 'Hackathon',
      budgetRange: '$1.5k+',
      duration: 3,
      setupTitle: 'Based on a 3-day Hackathon scenario.',
      suitabilityScore: 98,
      bestFor: 'High-stakes collaborative development environments. Engineered custom high-density networking to prevent bandwidth exhaustion issues and bundled ergonomic task seating.',
      recommendedItems: [
        { device: INVENTORY.find(d => d.id === 'macbook-pro-m3')!, quantity: 15 },
        { device: INVENTORY.find(d => d.id === 'workstation-display')!, quantity: 15 },
        { device: INVENTORY.find(d => d.id === 'ergo-chair')!, quantity: 15 },
        { device: INVENTORY.find(d => d.id === 'networking-hub')!, quantity: 2 }
      ]
    },
    {
      id: 'hist-2',
      useCase: 'Wedding streaming event live broadcast and video coverage with smart soft illumination and multi zoom angle mirrorless lenses.',
      eventType: 'Creative Studio',
      budgetRange: '$500 - $1k',
      duration: 2,
      setupTitle: 'Based on a 2-day wedding streaming setup.',
      suitabilityScore: 97,
      bestFor: 'Pristine Live Streaming & Broadcast configuration. Curated with multi-camera angles, high-CRI led fill lighting grids, and professional wireless collar microphones to deliver an interruption-free stream.',
      recommendedItems: [
        { device: INVENTORY.find(d => d.id === 'sony-a7r4')!, quantity: 2 },
        { device: INVENTORY.find(d => d.id === 'studio-lights')!, quantity: 2 },
        { device: INVENTORY.find(d => d.id === 'wireless-lapel-mic')!, quantity: 2 },
        { device: INVENTORY.find(d => d.id === 'pa-audio-system')!, quantity: 1 }
      ]
    },
    {
      id: 'hist-3',
      useCase: 'Corporate Seminar presentation for 50 keynote attendees requiring lapel microphones and crisp slide laser wall projection.',
      eventType: 'Corporate Conference',
      budgetRange: '$500 - $1k',
      duration: 1,
      setupTitle: 'Based on a 1-day Corporate Conference scenario.',
      suitabilityScore: 96,
      bestFor: 'Full-scale Seminar presentation suite. Configured with a solar-cutting 4K short-throw projector, room-filling sound columns, and dedicated presentation laptops to guarantee zero slides failure.',
      recommendedItems: [
        { device: INVENTORY.find(d => d.id === 'laser-projector-4k')!, quantity: 1 },
        { device: INVENTORY.find(d => d.id === 'pa-audio-system')!, quantity: 2 },
        { device: INVENTORY.find(d => d.id === 'wireless-lapel-mic')!, quantity: 2 },
        { device: INVENTORY.find(d => d.id === 'macbook-pro-m3')!, quantity: 1 }
      ]
    },
    {
      id: 'hist-4',
      useCase: 'Esports Gaming Tournament arena setup requiring ultra speed computing speeds and curved display frameworks.',
      eventType: 'Creative Studio',
      budgetRange: '$1k - $5k',
      duration: 3,
      setupTitle: 'Based on a 3-day esports arena setup.',
      suitabilityScore: 99,
      bestFor: 'Premium Gaming Arena package configured for concurrent esports competitors. Includes high-refresh curved visuals, GPU-accelerated computing fleets, and dynamic low-latency enterprise networking.',
      recommendedItems: [
        { device: INVENTORY.find(d => d.id === 'gaming-laptop')!, quantity: 10 },
        { device: INVENTORY.find(d => d.id === 'gaming-monitor')!, quantity: 10 },
        { device: INVENTORY.find(d => d.id === 'networking-hub')!, quantity: 1 },
        { device: INVENTORY.find(d => d.id === 'ergo-chair')!, quantity: 10 }
      ]
    }
  ]);

  const handleLoadHistory = (item: typeof history[0]) => {
    setUseCase(item.useCase);
    setEventType(item.eventType);
    setBudgetRange(item.budgetRange);
    setDuration(item.duration);
    setSetupTitle(item.setupTitle);
    setSuitabilityScore(item.suitabilityScore);
    setBestFor(item.bestFor);
    setRecommendedItems(item.recommendedItems);
    setActionNotification(`Restored ${item.eventType} from recommendation history.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Alert/Notification notification states
  const [actionNotification, setActionNotification] = useState('');

  // Dropdown manual insertion states
  const [showAddManualDropdown, setShowAddManualDropdown] = useState(false);

  // Chatbot state
  const [showBotChat, setShowBotChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    { sender: 'bot', text: 'Hi! I am your One Point Solutions AI Assistant. Query me for custom device matches, stock level verifications, or changes to this rental package!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Quotation Modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [clientCompany, setClientCompany] = useState('Quantum Dynamics Inc.');
  const [clientRepresentative, setClientRepresentative] = useState('Sarah Jenkins, Ops Lead');
  const [clientEmail, setClientEmail] = useState('s.jenkins@quantumdyn.io');

  // Compute live total price dynamically based on device rates and event durations
  const computedSubtotal = recommendedItems.reduce((acc, curr) => {
    return acc + (curr.device.unitPricePerDay * curr.quantity * duration);
  }, 0);
  const computedSupportFee = Math.round(computedSubtotal * 0.05 * 100) / 100; // 5% support fee
  const computedTax = Math.round(computedSubtotal * 0.09 * 100) / 100; // 9% tax rate
  const computedGrandTotal = computedSubtotal + computedSupportFee + computedTax;

  // Handle generative AI requests to backend endpoint
  const handleGeneratePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/rental/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: useCase,
          eventType,
          budget: budgetRange,
          duration
        })
      });

      if (!response.ok) {
        throw new Error('API server reported error during synthesis query.');
      }

      const data = await response.json();
      
      // Map recommended IDs back to our full inventory specifications
      const mappedItems: RecommendedItem[] = [];
      
      if (data.recommendedItems && Array.isArray(data.recommendedItems)) {
        data.recommendedItems.forEach((rec: any) => {
          const matchedDevice = INVENTORY.find(d => d.id === rec.id);
          if (matchedDevice) {
            mappedItems.push({
              device: {
                ...matchedDevice,
                // apply AI specific reason tag returned
                aiRecommendationTag: rec.reasonTag || matchedDevice.aiRecommendationTag
              },
              quantity: rec.quantity || 1
            });
          }
        });
      }

      if (mappedItems.length > 0) {
        setRecommendedItems(mappedItems);
        setSuitabilityScore(data.suitabilityScore || 95);
        setBestFor(data.bestForExplanation || 'Tailored solutions config analyzed by One Point Solutions AI.');
        setSetupTitle(`Based on a ${duration}-day ${eventType} scenario.`);
        
        // Save to recommendation history dynamically
        const newHist = {
          id: `hist-${Date.now()}`,
          useCase,
          eventType,
          budgetRange,
          duration,
          setupTitle: `Based on a ${duration}-day ${eventType} scenario.`,
          suitabilityScore: data.suitabilityScore || 95,
          bestFor: data.bestForExplanation || 'Tailored solutions config analyzed by One Point Solutions AI.',
          recommendedItems: mappedItems
        };
        setHistory(prev => [newHist, ...prev]);
        
        setActionNotification('AI successfully synthesized new optimal hardware bundle!');
      } else {
        throw new Error('Could not match generated recommendations to our catalog databases.');
      }

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Transient error during rental package synthesis.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Modify quantities
  const handleUpdateQuantity = (deviceId: string, delta: number) => {
    setRecommendedItems(prev => {
      return prev.map(item => {
        if (item.device.id === deviceId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  // Remove elements
  const handleRemoveItem = (deviceId: string) => {
    setRecommendedItems(prev => prev.filter(item => item.device.id !== deviceId));
    setActionNotification('Item removed from configuration.');
  };

  // Insert catalog electronics manually
  const handleAddManualItem = (device: Device) => {
    const exists = recommendedItems.find(item => item.device.id === device.id);
    if (exists) {
      handleUpdateQuantity(device.id, 1);
    } else {
      setRecommendedItems(prev => [...prev, { device, quantity: 1 }]);
    }
    setShowAddManualDropdown(false);
    setActionNotification(`Added ${device.name} to recommendations.`);
  };

  // Chat message submission
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    // Simulate intelligent answers representing natural conversation
    setTimeout(() => {
      let replyText = "I have adjusted your constraints. Can I compile the PDF Quote for you?";
      const lower = userMsg.toLowerCase();
      
      if (lower.includes('projector') || lower.includes('camera')) {
        replyText = "Sure! Adding a 4K Laser Projector and high-resolution Sony tracking cameras to your rental grid immediately.";
        const projector = INVENTORY.find(i => i.id === 'laser-projector-4k')!;
        handleAddManualItem(projector);
      } else if (lower.includes('macbook') || lower.includes('laptop')) {
        replyText = "Understood. I have optimized the Workstation fleets counts to match your prompt scale.";
        handleUpdateQuantity('macbook-pro-m3', 5);
      } else if (lower.includes('discount') || lower.includes('budget')) {
        replyText = "We offer standard 12% discount rates for rental agreements exceeding 7 days!";
      } else {
        replyText = "Absolutely! I can update quantities or recommend additional redundancy gears. Type what event demands you are addressing next.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: replyText }]);
    }, 1000);
  };

  // Dispatch details to Admin Center to simulate live integration
  const handleCheckoutSubmit = () => {
    const devicesListString = recommendedItems.map(item => `${item.device.name} x${item.quantity}`).join(', ');
    onAddRequestToAdmin({
      customerName: clientRepresentative.split(',')[0],
      companyName: clientCompany,
      deviceModel: devicesListString || 'Custom Package Setup',
      totalCost: computedGrandTotal
    });
    
    setActionNotification('Checkout requisition submitted to administrative dispatch pipeline!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Formulate WhatsApp share link on client dynamically
  const getWhatsAppShareUrl = () => {
    const baseText = `One Point Solutions Rental Quote Review
Quote ID: #OPS-2026-0892
Client Name: ${clientRepresentative} (${clientCompany})
Duration: ${duration} Days
Grand Total Net: ${formatCurrency(computedGrandTotal, currency)}

Items Summarized:
${recommendedItems.map(item => `* - ${item.device.name} (Qty: ${item.quantity}) - ${formatCurrency(item.device.unitPricePerDay, currency)}/day`).join('\n')}

Review lease details here: ${window.location.origin}`;
    
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(baseText)}`;
  };

  return (
    <div id="builder-root" className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative">
      
      {/* Dynamic Floating Action Alerts banner */}
      {actionNotification && (
        <div id="action-toast" className="xl:col-span-12 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            {actionNotification}
          </span>
          <button onClick={() => setActionNotification('')} className="text-emerald-500 hover:text-emerald-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* LEFT FORM CONFIG (col-span-4) */}
      <section className="xl:col-span-4 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">CONFIGURATION</span>
            <h2 className="text-lg font-extrabold text-slate-900 mt-1">AI Package Builder</h2>
          </div>

          <form onSubmit={handleGeneratePackage} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="builder-usecase-textarea" className="text-xs font-semibold text-slate-500">Describe your use case</label>
              <textarea
                id="builder-usecase-textarea"
                rows={4}
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                placeholder="e.g. 'Corporate presentation for 50 people in a bright hotel hall'"
                className="w-full text-xs p-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-sans font-medium transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="builder-event-type" className="text-xs font-semibold text-slate-500">Event Type</label>
              <select
                id="builder-event-type"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full text-xs p-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl focus:outline-none transition-all font-semibold text-slate-700"
              >
                <option value="Corporate Conference">Corporate Conference</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Creative Studio">Creative Studio</option>
                <option value="General Office">General Office</option>
                <option value="Development Sprint">Development Sprint</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="builder-budget" className="text-xs font-semibold text-slate-500">Budget Range</label>
                <select
                  id="builder-budget"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full text-xs p-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl focus:outline-none transition-all font-semibold text-slate-700"
                >
                  {currency === 'INR' ? (
                    <>
                      <option value="$100 - $500">₹8,400 - ₹42,000</option>
                      <option value="$500 - $1k">₹42,000 - ₹84,000</option>
                      <option value="$1k - $5k">₹84,000 - ₹4,20,000</option>
                      <option value="$5k+">₹4,20,000+</option>
                    </>
                  ) : (
                    <>
                      <option value="$100 - $500">$100 - $500</option>
                      <option value="$500 - $1k">$500 - $1k</option>
                      <option value="$1k - $5k">$1k - $5k</option>
                      <option value="$5k+">$5k+</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="builder-duration" className="text-xs font-semibold text-slate-500">Duration</label>
                <select
                  id="builder-duration"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full text-xs p-3 border border-slate-200 bg-slate-50 hover:bg-slate-100 focus:bg-white rounded-xl focus:outline-none transition-all font-semibold text-slate-700"
                >
                  <option value="1">1 Day</option>
                  <option value="3">3 Days</option>
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                </select>
              </div>
            </div>

            <button
              id="generator-trigger-btn"
              type="submit"
              disabled={isGenerating}
              className={`w-full py-3 text-xs font-bold text-white rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10'
              }`}
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" /> 
              {isGenerating ? 'Generating Optimal Package...' : 'Generate Package'}
            </button>
          </form>

          {errorMessage && (
            <p className="text-[11px] font-mono font-bold text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">
              Error: {errorMessage}
            </p>
          )}

          {/* AI Note block matched to screen layout */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider font-mono">AI Technical Alert</span>
              <p className="text-[11px] text-blue-900 leading-relaxed font-sans font-semibold">
                Higher ambient light environments require visual projectors with at least 5000+ ANSI lumens for optimal visibility.
              </p>
            </div>
          </div>

          {/* Recommendation History Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 no-print mt-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">RECOMMENDATION HISTORY</span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">Restore Past Setups</h3>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {history.map((hist) => (
                <button
                  type="button"
                  key={hist.id}
                  onClick={() => handleLoadHistory(hist)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-slate-50/50 transition-all block space-y-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
                      {hist.eventType}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold font-mono">
                      {hist.duration} Days
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-semibold line-clamp-2 leading-snug">
                    {hist.useCase}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1 pt-1.5 border-t border-slate-100/50">
                    <span>Score: <strong className="text-slate-700 font-semibold">{hist.suitabilityScore}%</strong></span>
                    <span className="text-blue-600 font-bold">Restore →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CENTER GRID OF RECOMMENDATION ITEMS (col-span-5) */}
      <section className="xl:col-span-5 space-y-6">
        <div id="recommended-setup-pane" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Recommended Setup</h2>
              <p className="text-xs text-slate-500 font-semibold font-mono mt-0.5">{setupTitle}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActionNotification('Link created! Share with corporate administrators.')}
                className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-xl transition-all"
                title="Share Setup"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  setShowQuoteModal(true);
                  setActionNotification('Reviewing formal Quote #OPS-2026-0892.');
                }}
                className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-xl transition-all"
                title="Quotation Preview"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3.5 max-h-[700px] overflow-y-auto pr-1">
            {isGenerating ? (
              <div className="bg-blue-50/55 border border-blue-100 rounded-2xl p-8 text-center space-y-4 animate-pulse">
                <div className="relative w-12 h-12 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping" />
                  <div className="relative w-12 h-12 rounded-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent animate-spin flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">Generating optimal rental setup…</p>
                  <p className="text-[11px] text-slate-400 font-mono">Querying Gemini-3.5-Flash & checking warehouse stocks...</p>
                </div>
                
                {/* Heuristics step parsing indicators */}
                <div className="flex flex-col gap-1.5 max-w-xs mx-auto text-left font-mono text-[9px] text-slate-500 bg-white p-3 border border-slate-200/60 rounded-xl">
                  <p className="flex items-center gap-1.5 font-bold text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Parsing event context descriptors...
                  </p>
                  <p className="flex items-center gap-1.5 font-bold text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    Locating inventory stock constraints...
                  </p>
                  <p className="flex items-center gap-1.5 font-bold text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    Synthesizing itemized rental prices...
                  </p>
                </div>
              </div>
            ) : recommendedItems.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-2">
                <Trash2 className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No Items Configured</p>
                <p className="text-xs text-slate-400">Add catalog items or write a custom use-case to populate recommendations!</p>
              </div>
            ) : (
              recommendedItems.map((item) => (
                <div 
                  key={item.device.id} 
                  id={`device-card-${item.device.id}`}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:border-slate-300 transition-all grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  <img 
                    src={item.device.imageUrl} 
                    alt={item.device.name}
                    className="sm:col-span-3 w-full h-20 object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="sm:col-span-6 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        QTY: {item.quantity.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs font-bold font-mono text-blue-600">
                        {formatCurrency(item.device.unitPricePerDay, currency)}/day
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 truncate">{item.device.name}</h3>
                    <p className="text-[10px] text-slate-400 truncate leading-none">{item.device.specs}</p>
                    
                    {/* Specialized AI recommendation note for this item */}
                    <div className="flex items-start gap-1 text-[10px] text-blue-700 bg-blue-50/80 rounded px-2 py-1 mt-1 font-medium leading-normal">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item.device.aiRecommendationTag}</span>
                    </div>
                  </div>
                  
                  {/* Item counter controllers */}
                  <div className="sm:col-span-3 flex items-center justify-end gap-1.5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <button 
                      onClick={() => handleUpdateQuantity(item.device.id, -1)}
                      className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold font-mono">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.device.id, 1)}
                      className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleRemoveItem(item.device.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg ml-1"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Manual Devices Trigger button */}
          <div className="relative pt-2">
            <button
              onClick={() => setShowAddManualDropdown(!showAddManualDropdown)}
              className="w-full py-3.5 border-2 border-dashed border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 transition-colors rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer bg-white"
            >
              <Plus className="w-4 h-4" /> Add manual item or ask AI for modifications
            </button>

            {showAddManualDropdown && (
              <div className="absolute left-0 right-0 bottom-full mb-2 bg-white rounded-2xl border border-slate-200 shadow-xl max-h-60 overflow-y-auto p-2 z-30">
                <p className="text-[10px] font-extrabold text-slate-400 font-mono p-2 border-b border-slate-100">SELECT HARDWARE PORTFOLIO ITEM</p>
                {INVENTORY.map(dev => (
                  <button
                    key={dev.id}
                    onClick={() => handleAddManualItem(dev)}
                    className="w-full text-left p-2 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center justify-between"
                  >
                    <div>
                      <p className="text-slate-800">{dev.name}</p>
                      <p className="text-[10px] text-slate-400">{dev.specs}</p>
                    </div>
                    <span className="text-blue-600 font-mono font-bold shrink-0 ml-2">
                      {formatCurrency(dev.unitPricePerDay, currency)}/d
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RIGHT RECOMMENDATION SCORE & TOTAL ESTIMATES (col-span-3) */}
      <section className="xl:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">AI Recommendation</span>
          
          {/* Estimated Total Card */}
          <div className="bg-blue-600 text-white rounded-2xl p-5 shadow-lg shadow-blue-500/10 space-y-1 relative overflow-hidden">
            <p className="text-[10px] text-blue-200 uppercase tracking-widest font-mono font-bold leading-none">ESTIMATED TOTAL</p>
            <p className="text-3xl font-extrabold font-mono tracking-tight pt-1">
              {formatCurrency(computedGrandTotal, currency)}
            </p>
            <p className="text-[11px] text-blue-100 leading-normal pt-1.5 border-t border-white/20 mt-2">
              Full {duration}-day duration including support setup
            </p>
          </div>

          {/* Suitability Score progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-600">Suitability Score</span>
              <span className="font-bold text-blue-600 font-mono">{suitabilityScore}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${suitabilityScore}%` }}
              />
            </div>
          </div>

          {/* Best For descriptive note */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">BEST FOR</span>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-medium">
              {bestFor}
            </p>
          </div>

          {/* Inventory checklist */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">INVENTORY STATUS</span>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-[11px] text-slate-600 font-semibold font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                All items in stock
              </li>
              <li className="flex items-center gap-2 text-[11px] text-slate-600 font-semibold font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                Same-day delivery available
              </li>
            </ul>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-4">
            <button
              onClick={() => setShowQuoteModal(true)}
              className="w-full py-3 border border-slate-200 hover:border-blue-500 hover:text-blue-600 font-bold text-slate-700 text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Review Lease Terms
            </button>
            <button
              id="checkout-trigger-btn"
              onClick={handleCheckoutSubmit}
              className="w-full py-3 bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </section>

      {/* FLOATING CHATBOT WIDE SYSTEM */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowBotChat(!showBotChat)}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all cursor-pointer border-2 border-white"
          title="Ask Rental AI assistant"
        >
          {showBotChat ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        </button>

        {showBotChat && (
          <div className="absolute right-0 bottom-14 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col max-h-96 z-50 overflow-hidden transform animate-scale-up">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-300" />
                <span className="text-xs font-extrabold">One Point Solutions AI Assistant</span>
              </div>
              <button onClick={() => setShowBotChat(false)} className="hover:text-blue-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Messages Pane */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 max-h-60 bg-slate-50 min-h-40">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p className={`p-2.5 rounded-xl text-xs max-w-[85%] font-sans font-medium leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 shadow-sm'
                  }`}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendChatMessage} className="p-2 border-t border-slate-100 flex gap-1.5 bg-white">
              <input
                type="text"
                placeholder="Ask me to insert a display..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-sans font-semibold text-slate-700"
              />
              <button 
                type="submit" 
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* HIGH FIDELITY QUOTATION PREVIEW MODAL (col-span-12 overlay) */}
      {showQuoteModal && (
        <div id="quotation-modal-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div id="quotation-modal-sheet" className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col transform transition-transform animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between no-print">
              <span className="text-xs font-bold text-slate-500 tracking-wider font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Quotation Preview
              </span>
              <button 
                onClick={() => setShowQuoteModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Invoice Sheet */}
            <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-1 font-mono text-slate-800">
              
              {/* Top Meta info */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-dashed border-slate-200 pb-6">
                <div className="space-y-1">
                  <h3 className="text-md font-extrabold text-blue-600 tracking-tight">One Point Solutions</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Technical Minimalism & High-Fidelity Electronics Rental</p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    123 Innovation Way, Tech District, SF 94105 <br />
                    licensing@onepointsolutions.io
                  </p>
                </div>

                <div className="space-y-1 text-left md:text-right">
                  <span className="inline-block text-[11px] bg-blue-150 border border-blue-450 text-blue-700 px-3 py-1 font-extrabold rounded-lg mb-1.5">
                    QUOTE #OPS-2026-0892
                  </span>
                  <p className="text-[10px] text-slate-400">Issued: May 30, 2026</p>
                  <p className="text-[10px] text-slate-400">Valid until: June 15, 2026</p>
                </div>
              </div>

              {/* Client & Dates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                <div className="bg-slate-50/60 rounded-xl border border-slate-200 p-4 space-y-2">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">CLIENT DETAILS</p>
                  <div className="space-y-1 text-xs font-semibold">
                    <input 
                      type="text" 
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:outline-none focus:border-blue-500 w-full font-bold"
                    />
                    <input 
                      type="text" 
                      value={clientRepresentative}
                      onChange={(e) => setClientRepresentative(e.target.value)}
                      className="bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:outline-none focus:border-blue-500 w-full text-slate-600 mt-1"
                    />
                    <input 
                      type="text" 
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="bg-transparent border-b border-dashed border-slate-300 hover:border-slate-500 focus:outline-none focus:border-blue-500 w-full text-slate-400 mt-1 text-[11px]"
                    />
                  </div>
                </div>

                <div className="bg-slate-50/60 rounded-xl border border-slate-200 p-4 space-y-2">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">RENTAL DURATION</p>
                  <div className="space-y-1 text-xs font-semibold">
                    <p className="font-bold text-slate-800">{duration} Days duration contract</p>
                    <p className="text-slate-600">Start Date: June 01, 2026</p>
                    <p className="text-slate-400 text-[11px]">End Date: June {duration.toString().padStart(2, '0')}, 2026</p>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="space-y-3">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">ITEMIZED HARDWARE SETUP</p>
                
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase">
                        <th className="px-4 py-2.5">ITEM DESCRIPTION</th>
                        <th className="px-4 py-2.5 text-center">QTY</th>
                        <th className="px-4 py-2.5 text-right">UNIT / DAY</th>
                        <th className="px-4 py-2.5 text-right">SUBTOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] divide-y divide-slate-250">
                      {recommendedItems.map((item) => {
                        const lineSub = item.device.unitPricePerDay * item.quantity * duration;
                        return (
                          <tr key={item.device.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3">
                              <p className="font-bold text-slate-800">{item.device.name}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{item.device.specs}</p>
                            </td>
                            <td className="px-4 py-3 text-center font-bold text-slate-600">{item.quantity.toString().padStart(2, '0')}</td>
                            <td className="px-4 py-3 text-right text-slate-500 font-mono">
                              {formatCurrency(item.device.unitPricePerDay, currency)}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-slate-800 font-mono">
                              {formatCurrency(lineSub, currency)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summarized Invoice Tally */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-slate-200 pt-6">
                <div className="md:col-span-6 text-[10px] text-slate-400 font-medium leading-relaxed">
                  * Dynamic support configuration generated based on specified attendee volumes and constraints. All returns undergo enterprise level military standard cleaning protocols. Valid under core commercial terms of One Point Solutions logistics network.
                </div>
                
                <div className="md:col-span-6 space-y-1.5 text-xs text-right font-mono ml-auto w-full max-w-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(computedSubtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>AI Support Fee (5%):</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(computedSupportFee, currency)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>GST / Sales Tax (9%):</span>
                    <span className="font-semibold text-slate-800">{formatCurrency(computedTax, currency)}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 border-t border-dashed border-slate-200 pt-2 text-sm font-extrabold">
                    <span>GRAND TOTAL:</span>
                    <span className="text-blue-600">{formatCurrency(computedGrandTotal, currency)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer Controls */}
            <div className="bg-slate-50 px-6 py-4.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 z-10 no-print">
              <div className="text-[10px] text-slate-400 font-medium font-sans">
                Quote issued electronically. Direct physical validation backed and guaranteed.
              </div>
              
              <div className="flex items-center gap-3">
                <a
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setActionNotification('Redirecting to WhatsApp with pre-formulated text summary.')}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm font-sans"
                >
                  <Phone className="w-4 h-4 text-emerald-500" /> Share on WhatsApp
                </a>
                
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setActionNotification('Triggered browser document formatting for Quote #OPS-2026-0892. Save as PDF.');
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 font-sans"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
