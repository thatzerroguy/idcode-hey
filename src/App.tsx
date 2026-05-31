import { useState } from 'react';
import { CardDesign, ProductType, VerificationFormData, VerificationResult } from './types';
import { getTemplatesForProduct } from './data/templates';
import CardPreview from './components/CardPreview';
import QRCodeImg from './components/QRCodeImg';
import { downloadCard, downloadQRCode } from './utils/export';
import { 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  Download, 
  Building, 
  FileCheck, 
  Calendar,
  Sparkles, 
  Fingerprint, 
  Smartphone, 
  Check, 
  BookOpen, 
  Briefcase, 
  Info,
  Layers,
  FileText,
  Clock,
  MapPin,
  FileIcon,
  Tag
} from 'lucide-react';

function generateRandomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid easily mistaken letters like I, O, 1, 0
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `IDCODE-${result}`;
}

const INITIAL_FORM: VerificationFormData = {
  companyName: '',
  cacNumber: '',
  eventName: '',
  eventReason: '',
  eventDate: '',
  eventTime: '',
  eventVenue: '',
  attendeeName: '',
  attendeeNIn: '',
  productName: '',
  manufacturerCac: '',
};

export default function App() {
  // Navigation State
  const [activeProduct, setActiveProduct] = useState<ProductType | null>(null);
  
  // Wizard Steps (0: Template selection, 1: Fill details, 2: Database lookup/validation, 3: Success & Download)
  const [step, setStep] = useState<number>(0);
  
  // Form State
  const [formData, setFormData] = useState<VerificationFormData>(INITIAL_FORM);
  const [selectedTemplate, setSelectedTemplate] = useState<CardDesign | null>(null);
  
  // Verification Results
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isSimulatingVerify, setIsSimulatingVerify] = useState<boolean>(false);
  const [verifyStatusMessage, setVerifyStatusMessage] = useState<string>('');
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);

  // Navigation handlers
  const handleSelectProduct = (type: ProductType) => {
    setActiveProduct(type);
    setSelectedTemplate(getTemplatesForProduct(type)[0]);
    setStep(0);
    setFormData(INITIAL_FORM);
    setVerificationResult(null);
    setVerifyLogs([]);
  };

  const handleBackToSuite = () => {
    setActiveProduct(null);
    setStep(0);
    setFormData(INITIAL_FORM);
    setVerificationResult(null);
    setVerifyLogs([]);
  };

  const updateField = (field: keyof VerificationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (): boolean => {
    if (!activeProduct) return false;

    if (step === 0) {
      return !!selectedTemplate;
    }

    if (step === 1) {
      if (activeProduct === 'identity') {
        return !!formData.companyName.trim();
      }
      if (activeProduct === 'access') {
        return (
          !!formData.eventName.trim() &&
          !!formData.eventReason.trim() &&
          !!formData.eventDate &&
          !!formData.eventVenue.trim() &&
          !!formData.attendeeName.trim()
        );
      }
      if (activeProduct === 'product') {
        return !!formData.productName.trim();
      }
    }

    if (step === 2) {
      if (activeProduct === 'identity') {
        return !!formData.cacNumber.trim();
      }
      if (activeProduct === 'access') {
        return formData.attendeeNIn.length === 11 && /^\d+$/.test(formData.attendeeNIn);
      }
      if (activeProduct === 'product') {
        return !!formData.manufacturerCac.trim();
      }
    }

    return true;
  };

  // Perform secure simulation with timing logs and output
  const handlePerformVerification = () => {
    if (!validateStep() || !activeProduct) return;

    setIsSimulatingVerify(true);
    setVerifyLogs([]);
    
    const logs: string[] = [];
    const addLog = (message: string) => {
      logs.push(`[${new Date().toLocaleTimeString()}] ${message}`);
      setVerifyLogs([...logs]);
    };

    if (activeProduct === 'identity') {
      addLog(`Connecting to Nigeria CAC (Corporate Affairs Commission) API node...`);
      
      setTimeout(() => {
        addLog(`Querying company listing index for database lookup...`);
      }, 800);

      setTimeout(() => {
        addLog(`Located corporate index record match for register: "${formData.companyName}"`);
      }, 1600);

      setTimeout(() => {
        addLog(`Validated CAC status code: ACTIVE compliance.`);
        addLog(`Securing transaction authorization parameters.`);
      }, 2400);

      setTimeout(() => {
        const key = generateRandomCode();
        setVerificationResult({
          verified: true,
          activationCode: key,
          timestamp: new Date().toISOString(),
          referenceNumber: `ID-${Math.floor(100000 + Math.random() * 900000)}`,
        });
        setIsSimulatingVerify(false);
        setStep(3);
      }, 3200);

    } else if (activeProduct === 'access') {
      addLog(`Initiating secure NIMC (National Identity Management Commission) database handshakes...`);
      
      setTimeout(() => {
        addLog(`Sending verified NIN identifier string payload for indexing...`);
      }, 800);

      setTimeout(() => {
        addLog(`Matched citizen bio-metric card record. Identity Confirmed: ${formData.attendeeName}`);
      }, 1600);

      setTimeout(() => {
        addLog(`Checking global threat metrics status index... Status: SECURE PASS`);
        addLog(`Validating event entry code allowance vectors.`);
      }, 2400);

      setTimeout(() => {
        const key = generateRandomCode();
        setVerificationResult({
          verified: true,
          activationCode: key,
          timestamp: new Date().toISOString(),
          referenceNumber: `AC-${Math.floor(100000 + Math.random() * 900000)}`,
        });
        setIsSimulatingVerify(false);
        setStep(3);
      }, 3200);

    } else if (activeProduct === 'product') {
      addLog(`Querying CAC regulatory indices for manufacturer compliance credentials...`);
      
      setTimeout(() => {
        addLog(`Cross-referencing item name: "${formData.productName}" status catalogs...`);
      }, 800);

      setTimeout(() => {
        addLog(`Matched registered manufacturing block: ${formData.manufacturerCac}`);
      }, 1600);

      setTimeout(() => {
        addLog(`Authentic supply trace verified.`);
        addLog(`Creating anti-counterfeit activation cryptography token.`);
      }, 2405);

      setTimeout(() => {
        const key = generateRandomCode();
        setVerificationResult({
          verified: true,
          activationCode: key,
          timestamp: new Date().toISOString(),
          referenceNumber: `PR-${Math.floor(100000 + Math.random() * 900000)}`,
        });
        setIsSimulatingVerify(false);
        setStep(3);
      }, 3200);
    }
  };

  // Triggers for downloading cards
  const handleDownloadCardImage = async () => {
    if (!activeProduct || !selectedTemplate || !verificationResult) return;
    const cleanName = activeProduct === 'identity' ? formData.companyName : activeProduct === 'access' ? formData.eventName : formData.productName;
    const prefix = activeProduct.toUpperCase();
    await downloadCard(
      activeProduct,
      selectedTemplate,
      formData,
      verificationResult.activationCode,
      `${prefix}_Card_${cleanName.replace(/\s+/g, '_')}.png`
    );
  };

  const handleDownloadQRImage = async () => {
    if (!verificationResult) return;
    await downloadQRCode(
      verificationResult.activationCode,
      `IDCODE_QR_${verificationResult.activationCode}.png`
    );
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 transition-colors duration-200" style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1.1px, transparent 1.1px)', backgroundSize: '16px 16px' }}>
      
      {/* Visual Elegant Soft Top Header */}
      <header id="main-header" className="bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-96 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-emerald-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-mono font-black text-sm tracking-tighter">ID</span>
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-sm block leading-none text-slate-50 uppercase">IDCODE NIGERIA</span>
              <span className="text-[9px] font-mono tracking-widest text-[#10B981] font-bold uppercase leading-none mt-0.5 block">Verification Suite</span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-5 text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span className="hover:text-emerald-400 cursor-pointer transition">Products</span>
            <span className="text-slate-800">•</span>
            <span className="hover:text-emerald-400 cursor-pointer transition">Company</span>
            <span className="text-slate-800">•</span>
            <span className="hover:text-emerald-400 cursor-pointer transition">Developers</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider hidden md:inline-block">
              ✓ Portal Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Dynamic Workspace Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        
        {!activeProduct ? (
          /* PRODUCT SELECTIONS SECTION BLOCK - HOME SCREEN */
          <div id="suite-home-section" className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-[#0F5338] border border-emerald-500/20 text-[10px] font-bold tracking-widest font-mono uppercase rounded inline-block">
                Digital Trust Solutions
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                Your IDCODE Suite
              </h1>
              <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed max-w-xl mx-auto">
                Empowering Nigerian enterprises with instant secure identifier cards, real-time access permissioning controls, and robust tamper-proof product label authentications. Start generating now.
              </p>
            </div>

            {/* Replicated Cards Layout started precisely from codes details in the image */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 max-w-6xl mx-auto">
              
              {/* Card 1: Identity Code */}
              <div id="product-card-identity" className="flex flex-col bg-white rounded-lg border border-slate-300/80 hover:border-slate-400 shadow-[1px_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[3px_3px_0px_rgba(15,23,42,0.08)] transition-all duration-200 overflow-hidden">
                <div className="p-5 flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-600 font-bold block">Secure Enterprise Gateway</span>
                    <h2 className="text-base font-black tracking-tight text-slate-900">IDENTITY VERIFICATION CODE</h2>
                    <p className="text-xs text-slate-500 leading-normal">
                      A secure and intelligent verification system embedded into ID cards, enabling instant verification of individuals and company members.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <ul className="space-y-1.5 text-[10.5px] text-slate-600">
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-black text-xs">·</span>
                        <span>Unique encrypted verification IDCODE per representative.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-black text-xs">·</span>
                        <span>Direct integration with NIMC databases for real-time validation.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-black text-xs">·</span>
                        <span>Corporate registration validation through CAC indices.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-black text-xs">·</span>
                        <span>Reduces employee identity fraud across organizational platforms.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Elegant Image preview mockup aligned with requested layout */}
                  <div className="bg-slate-50 rounded p-3 flex items-center justify-center border border-slate-200 min-h-[100px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                        <Building size={16} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold text-slate-800 uppercase font-mono">IDENTITY VERIFICATION</p>
                        <p className="text-[8.5px] font-mono text-slate-400">CAC verified card holder</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200/60">
                  <button
                    onClick={() => handleSelectProduct('identity')}
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-[10.5px] font-bold rounded tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all duration-150 hover:scale-[1.01] cursor-pointer"
                  >
                    <span>⚙ GENERATE IDENTITY CODE</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Access Verification Code */}
              <div id="product-card-access" className="flex flex-col bg-white rounded-lg border border-slate-300/80 hover:border-slate-400 shadow-[1px_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[3px_3px_0px_rgba(15,23,42,0.08)] transition-all duration-200 overflow-hidden">
                <div className="p-5 flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-indigo-600 font-bold block">Event Access Permit</span>
                    <h2 className="text-base font-black tracking-tight text-slate-900">ACCESS VERIFICATION CODE</h2>
                    <p className="text-xs text-slate-500 leading-normal">
                      Total control for user access in events, workshops and schedule structures. Secure individual invitation cards with validation checklists.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <ul className="space-y-1.5 text-[10.5px] text-slate-600">
                      <li className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-black text-xs">·</span>
                        <span>Unique entrance access permission per guest or visitor.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-black text-xs">·</span>
                        <span>Real-time access scans monitoring at target venue gates.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-black text-xs">·</span>
                        <span>Multi-location ticket and gate validation metrics.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-indigo-500 font-black text-xs">·</span>
                        <span>Secure database protection checks with attendee NIN status.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded p-3 flex items-center justify-center border border-slate-200 min-h-[100px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                        <Fingerprint size={16} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold text-slate-800 uppercase font-mono">ACCESS PASS CARD</p>
                        <p className="text-[8.5px] font-mono text-slate-400">NIN authenticated entry</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200/60">
                  <button
                    onClick={() => handleSelectProduct('access')}
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-[10.5px] font-bold rounded tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all duration-150 hover:scale-[1.01] cursor-pointer"
                  >
                    <span>⚙ GENERATE ACCESS CODE</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Product Verification Code */}
              <div id="product-card-product" className="flex flex-col bg-white rounded-lg border border-slate-300/80 hover:border-slate-400 shadow-[1px_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[3px_3px_0px_rgba(15,23,42,0.08)] transition-all duration-200 overflow-hidden">
                <div className="p-5 flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-amber-600 font-bold block">Authenticity & Traceability</span>
                    <h2 className="text-base font-black tracking-tight text-slate-900">PRODUCT VERIFICATION CODE</h2>
                    <p className="text-xs text-slate-500 leading-normal">
                      Increase product authority, stop counterfeits, and build instant Nigerian consumer trust with secure QR print codes.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3">
                    <ul className="space-y-1.5 text-[10.5px] text-slate-600">
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-black text-xs">·</span>
                        <span>Secure tamper-proof product label verification layout.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-black text-xs">·</span>
                        <span>Consumer scanning via standard smartphones in retail stores.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-black text-xs">·</span>
                        <span>Duplicate scans block detection to fight duplicates.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-black text-xs">·</span>
                        <span>Manufacturer registration index compliance via CAC check.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded p-3 flex items-center justify-center border border-slate-200 min-h-[100px]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                        <Smartphone size={16} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold text-slate-800 uppercase font-mono">SECURE PRODUCT LABEL</p>
                        <p className="text-[8.5px] font-mono text-slate-400">Track and trace authentication</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200/60">
                  <button
                    onClick={() => handleSelectProduct('product')}
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-[10.5px] font-bold rounded tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all duration-150 hover:scale-[1.01] cursor-pointer"
                  >
                    <span>⚙ GENERATE PRODUCT CODE</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* WORKSPACE STEP-BY-STEP GENERATION WIZARD SCREEN */
          <div id="generation-workspace-container" className="space-y-5">
            
            {/* Top Workspace Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-300 gap-3">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleBackToSuite}
                  className="p-1.5 bg-white border border-slate-300 rounded text-slate-700 hover:bg-slate-50 transition shadow-sm cursor-pointer"
                  title="Back to Suite Selector"
                >
                  <ArrowLeft size={14} />
                </button>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] bg-slate-200 text-slate-800 border border-slate-300 font-mono tracking-widest font-extrabold py-0.5 px-1.5 rounded uppercase">
                      {activeProduct} Mode
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight uppercase mt-0.5">
                    {activeProduct === 'identity' ? 'Identity Code Portal' : activeProduct === 'access' ? 'Access Pass Permit' : 'Product Authenticity Seal'}
                  </h1>
                </div>
              </div>

              {/* Steps Progress Indicator (Wizard) */}
              <div className="flex items-center text-[10px] uppercase font-mono text-slate-400 font-bold gap-1 sm:gap-2 bg-white px-3 py-1.5 rounded border border-slate-300 shadow-sm max-w-full overflow-x-auto">
                <div className={`flex items-center gap-1 ${step >= 0 ? 'text-slate-900 font-bold' : ''}`}>
                  <span className={`w-4 h-4 rounded-sm text-[9px] flex items-center justify-center ${step > 0 ? 'bg-emerald-500 text-white' : step === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 border border-slate-200'}`}>
                    {step > 0 ? '✓' : '1'}
                  </span>
                  <span>Style</span>
                </div>
                <ChevronRight size={10} className="text-slate-300 shrink-0" />
                <div className={`flex items-center gap-1 ${step >= 1 ? 'text-slate-900 font-bold' : ''}`}>
                  <span className={`w-4 h-4 rounded-sm text-[9px] flex items-center justify-center ${step > 1 ? 'bg-emerald-500 text-white' : step === 1 ? 'bg-slate-900 text-white' : 'bg-slate-100 border border-slate-200'}`}>
                    {step > 1 ? '✓' : '2'}
                  </span>
                  <span>Details</span>
                </div>
                <ChevronRight size={10} className="text-slate-300 shrink-0" />
                <div className={`flex items-center gap-1 ${step >= 2 ? 'text-slate-900 font-bold' : ''}`}>
                  <span className={`w-4 h-4 rounded-sm text-[9px] flex items-center justify-center ${step > 2 ? 'bg-emerald-500 text-white' : step === 2 ? 'bg-slate-900 text-white' : 'bg-slate-100 border border-slate-200'}`}>
                    {step > 2 ? '✓' : '3'}
                  </span>
                  <span>Verify</span>
                </div>
                <ChevronRight size={10} className="text-slate-300 shrink-0" />
                <div className={`flex items-center gap-1 ${step >= 3 ? 'text-slate-900 font-bold' : ''}`}>
                  <span className={`w-4 h-4 rounded-sm text-[9px] flex items-center justify-center ${step === 3 ? 'bg-emerald-500 text-white' : 'bg-slate-100 border border-slate-200'}`}>
                    4
                  </span>
                  <span>Deploy</span>
                </div>
              </div>
            </div>

            {/* Split Grid columns: Left settings controllers, Right floating live interactive mockup view wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* LEFT PART: Form settings inputs step flow */}
              <div className="lg:col-span-6 bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                
                {/* Stage title header */}
                <div className="px-4 py-3 border-b border-slate-200 bg-slate-900 flex justify-between items-center text-[11px] font-mono tracking-wider font-extrabold text-slate-100 uppercase">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-emerald-400" />
                    {step === 0 && 'STAGE 1: Layout Selection'}
                    {step === 1 && 'STAGE 2: Card Information'}
                    {step === 2 && 'STAGE 3: Database Verification'}
                    {step === 3 && 'STAGE 4: Activated Security Key'}
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    {step + 1} / 4
                  </span>
                </div>

                {/* Body inputs depending on step */}
                <div className="p-4 sm:p-5 flex-1 space-y-4">
                  
                  {/* STEP 0: CARD DESIGN TEMPLATES */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Select Visual Card Template Style</h3>
                        <p className="text-[10.5px] text-slate-400 leading-normal">
                          Choose the visual styling paradigm for your generated verification card. Live interactive rendering on the right updates instantly.
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        {getTemplatesForProduct(activeProduct).map((tmpl) => (
                          <button
                            key={tmpl.id}
                            onClick={() => setSelectedTemplate(tmpl)}
                            className={`w-full p-3 rounded border text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${selectedTemplate?.id === tmpl.id ? 'border-emerald-600 bg-emerald-500/5 ring-1 ring-emerald-500/30' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-4 h-4 rounded-sm bg-gradient-to-tr ${tmpl.themeClass} border border-white/20`} />
                              <div>
                                <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">{tmpl.name}</h4>
                                <span className="text-[8.5px] uppercase font-mono tracking-wider text-slate-400 block mt-0.5">Pattern Layout: {tmpl.patternType}</span>
                              </div>
                            </div>
                            {selectedTemplate?.id === tmpl.id && (
                              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Info on QR state */}
                      <div className="p-3 bg-amber-50 rounded border border-amber-200/60 flex gap-2.5 text-[10px] text-amber-800">
                        <Info size={14} className="shrink-0 mt-0.5 text-amber-600" />
                        <div className="space-y-0.5">
                          <p className="font-bold uppercase tracking-wider text-[9.5px]">QR Code Awaiting Key Activation</p>
                          <p className="text-[10px] text-amber-700 leading-relaxed">
                            At this stage, the generated QR Code matrix is empty and locked. Completing registration details and registry verification is required to generate the cryptographically unique IDCODE key.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 1: FILL FORM INFORMATION DETAILS */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">Enter Authenticating Details</h3>
                        <p className="text-[10.5px] text-slate-400 leading-normal">
                          These parameters will be plotted, validated, and embedded directly onto the final printed card layout design dynamically.
                        </p>
                      </div>

                      <div className="space-y-3.5 pt-1">
                        {/* A. Identity Info */}
                        {activeProduct === 'identity' && (
                          <div className="space-y-1">
                            <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Company / Business Name</label>
                            <div className="relative">
                              <Building size={14} className="absolute left-3.5 top-2.5 text-slate-400" />
                              <input
                                type="text"
                                placeholder="e.g. Chevron Nigeria Limited"
                                value={formData.companyName}
                                onChange={(e) => updateField('companyName', e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 bg-slate-50/50 border border-slate-350 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                              />
                            </div>
                            <span className="text-[9px] text-slate-400 block leading-normal mt-1">
                              Must exactly match company listings registered in the Nigeria CAC database directory.
                            </span>
                          </div>
                        )}

                        {/* B. Access pass info */}
                        {activeProduct === 'access' && (
                          <div className="space-y-3">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Attendee Full Name</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Tobi Adewale"
                                  value={formData.attendeeName}
                                  onChange={(e) => updateField('attendeeName', e.target.value)}
                                  className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-350 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Event / Exhibition Name</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Tech Summit Lagos 2026"
                                  value={formData.eventName}
                                  onChange={(e) => updateField('eventName', e.target.value)}
                                  className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-350 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Reason for Access Code Generation</label>
                              <input
                                type="text"
                                placeholder="e.g. VIP Speaker All-Access Permit Pass"
                                value={formData.eventReason}
                                onChange={(e) => updateField('eventReason', e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-350 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Event Date</label>
                                <input
                                  type="date"
                                  value={formData.eventDate}
                                  onChange={(e) => updateField('eventDate', e.target.value)}
                                  className="w-full px-2 py-1 bg-slate-50/50 border border-slate-350 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Event Time</label>
                                <input
                                  type="text"
                                  value={formData.eventTime}
                                  placeholder="e.g. 09:00 AM WAT"
                                  onChange={(e) => updateField('eventTime', e.target.value)}
                                  className="w-full px-2.5 py-1.5 bg-slate-50/50 border border-slate-350 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Event Venue & Address</label>
                              <div className="relative">
                                <MapPin size={13} className="absolute left-3 top-2.5 text-slate-400" />
                                <input
                                  type="text"
                                  placeholder="e.g. Eko Convention Center, Victoria Island, Lagos"
                                  value={formData.eventVenue}
                                  onChange={(e) => updateField('eventVenue', e.target.value)}
                                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50/50 border border-slate-350 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                                />
                              </div>
                            </div>

                          </div>
                        )}

                        {/* C. Product Info */}
                        {activeProduct === 'product' && (
                          <div className="space-y-1">
                            <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Product Name / Identifier</label>
                            <div className="relative">
                              <Tag size={14} className="absolute left-3.5 top-2.5 text-slate-400" />
                              <input
                                type="text"
                                placeholder="e.g. Agro-Organic Pure Peanut Oil 1L"
                                value={formData.productName}
                                onChange={(e) => updateField('productName', e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 bg-slate-50/50 border border-slate-355 rounded text-[11px] font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                              />
                            </div>
                            <span className="text-[9px] text-slate-400 block leading-normal mt-1">
                              Provide the descriptive name of the retail product which will have the holographic authenticity stamp codes printed on its container labels.
                            </span>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                  {/* STEP 2: VERIFICATION INPUT FOR DATABASES (CAC/NIN) */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1">
                          {activeProduct === 'identity' && 'Company Registry Verification'}
                          {activeProduct === 'access' && 'National Identity Database Validation'}
                          {activeProduct === 'product' && 'Factory Registry Verification'}
                        </h3>
                        <p className="text-[10.5px] text-slate-400 leading-normal">
                          To satisfy regulatory compliance, verify registration details securely against the national lookup registry index before code deployment keys are cryptographically generated.
                        </p>
                      </div>

                      {/* Simulation Running Container */}
                      {isSimulatingVerify ? (
                        <div className="p-4 border border-slate-800 rounded bg-slate-950 text-slate-200 font-mono text-[10px] space-y-3 shadow-inner">
                          <div className="flex items-center gap-2.5">
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-dashed border-emerald-400 animate-spin shrink-0" />
                            <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9.5px] animate-pulse">Running Secure Registry Audit...</span>
                          </div>
                          
                          <div className="space-y-1 max-h-[140px] overflow-y-auto border-t border-slate-850 pt-2.5 text-[9px] text-slate-400">
                            {verifyLogs.map((log, index) => (
                              <div key={index} className="leading-relaxed">
                                {log}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3.5 pt-1">
                          {/* Identity CAC number lookup */}
                          {activeProduct === 'identity' && (
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Company CAC Number</label>
                              <div className="relative">
                                <FileText size={14} className="absolute left-3.5 top-2.5 text-slate-400" />
                                <input
                                  type="text"
                                  placeholder="e.g. RC-4920482 or BN-1234567"
                                  value={formData.cacNumber}
                                  onChange={(e) => updateField('cacNumber', e.target.value)}
                                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50/50 border border-slate-355 rounded text-[11px] font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono uppercase"
                                />
                              </div>
                              <span className="text-[9px] text-slate-400 block leading-normal mt-1">
                                Enter your company's official CAC (Corporate Affairs Commission) identification registration number.
                              </span>
                            </div>
                          )}

                          {/* Access NIN verification input */}
                          {activeProduct === 'access' && (
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Attendee NIN (National ID Number)</label>
                              <div className="relative">
                                <Fingerprint size={14} className="absolute left-3.5 top-2.5 text-slate-400" />
                                <input
                                  type="text"
                                  maxLength={11}
                                  placeholder="e.g. 11 digit NIN key"
                                  value={formData.attendeeNIn}
                                  onChange={(e) => updateField('attendeeNIn', e.target.value.replace(/\D/g, ''))} // Numeric only
                                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50/50 border border-slate-355 rounded text-[11px] font-bold tracking-widest focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 text-center font-mono"
                                />
                              </div>
                              <span className="text-[9px] text-slate-400 block leading-normal mt-1 text-center">
                                National Identification Number is required to instantly verify attendee biological matches on database lists with strict compliance protocol.
                              </span>
                            </div>
                          )}

                          {/* Product Manufacturer CAC checks */}
                          {activeProduct === 'product' && (
                            <div className="space-y-1">
                              <label className="text-[9.5px] font-black text-slate-600 uppercase tracking-widest block mb-1">Manufacturer CAC Registration Number</label>
                              <div className="relative">
                                <FileCheck size={14} className="absolute left-3.5 top-2.5 text-slate-400" />
                                <input
                                  type="text"
                                  placeholder="e.g. RC-8910283"
                                  value={formData.manufacturerCac}
                                  onChange={(e) => updateField('manufacturerCac', e.target.value)}
                                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50/50 border border-slate-355 rounded text-[11px] font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono uppercase"
                                />
                              </div>
                              <span className="text-[9px] text-slate-400 block leading-normal mt-1">
                                Enter the regulated manufacturer or packaging factory registration CAC tag parameters.
                              </span>
                            </div>
                          )}

                          {/* Perform interactive lookup trigger */}
                          <button
                            onClick={handlePerformVerification}
                            disabled={!validateStep()}
                            className={`w-full py-2.5 px-3 font-bold rounded text-[10.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm ${validateStep() ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-105 text-slate-400 border border-slate-200 cursor-not-allowed'}`}
                          >
                            <ShieldCheck size={14} />
                            <span>Run Registry Audit & Database Check</span>
                          </button>
                        </div>
                      )}

                    </div>
                  )}

                  {/* STEP 3: SUCCESS & DEPLOY ACTIVATION */}
                  {step === 3 && verificationResult && (
                    <div className="space-y-5">
                      
                      {/* Success banner */}
                      <div className="text-center space-y-1.5 p-4 bg-emerald-50/30 rounded border border-emerald-200">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                          <Check size={20} className="stroke-[3]" />
                        </div>
                        <h3 className="text-xs font-black text-[#0D5237] uppercase tracking-wider block">Verification Verified & Code Activated!</h3>
                        <p className="text-[10px] text-[#156B4A] leading-relaxed max-w-[320px] mx-auto">
                          A unique secure database index matching key has been cryptographically deployed under IDCODE registry regulations.
                        </p>
                      </div>

                      <div className="bg-slate-55 p-3 rounded border border-slate-200 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                          <span className="text-slate-400 uppercase tracking-tight">System Name:</span>
                          <span className="text-slate-900 uppercase truncate max-w-[190px]">
                            {activeProduct === 'identity' ? formData.companyName : activeProduct === 'access' ? formData.eventName : formData.productName}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold border-t border-slate-200/60 pt-2">
                          <span className="text-slate-400 uppercase tracking-tight">Reference ID:</span>
                          <span className="text-slate-900">{verificationResult.referenceNumber}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold border-t border-slate-200/60 pt-2">
                          <span className="text-slate-400 uppercase tracking-tight">Timestamp:</span>
                          <span className="text-slate-500 text-[10px]">{new Date(verificationResult.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col border-t border-slate-200/60 pt-2.5 text-center gap-1.5">
                          <span className="text-[9px] text-slate-400 font-black uppercase font-mono tracking-widest">Activated Security Token Key (QR Payload):</span>
                          <span className="text-base font-mono font-extrabold text-slate-900 tracking-widest bg-emerald-50 border border-emerald-500/20 py-1 px-3.5 rounded inline-block self-center shadow-sm">
                            {verificationResult.activationCode}
                          </span>
                        </div>
                      </div>

                      {/* Download Buttons Section */}
                      <div className="space-y-2 pt-1">
                        <button
                          onClick={handleDownloadCardImage}
                          className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-900 text-slate-50 text-[11px] font-bold rounded tracking-wider flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                        >
                          <Download size={13} />
                          <span>DOWNLOAD CARD GRAPHIC (PNG)</span>
                        </button>

                        <button
                          onClick={handleDownloadQRImage}
                          className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-[11px] font-bold rounded tracking-wider flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                        >
                          <Download size={13} className="text-emerald-500" />
                          <span>DOWNLOAD STANDALONE QR CODE ONLY</span>
                        </button>
                      </div>

                      <div className="text-center pt-1.5">
                        <button
                          onClick={handleBackToSuite}
                          className="text-slate-500 hover:text-slate-800 text-[10px] font-bold uppercase tracking-widest font-mono underline transition"
                        >
                          Restart Workspace Flow
                        </button>
                      </div>

                    </div>
                  )}

                </div>

                {/* Footer buttons control wizard navigation */}
                {step < 3 && (
                  <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex justify-between items-center rounded-b-lg">
                    <button
                      onClick={() => setStep(prev => Math.max(0, prev - 1))}
                      disabled={step === 0}
                      className={`py-1.5 px-3 text-[11px] font-bold rounded border transition ${step === 0 ? 'bg-white text-slate-300 border-slate-100 cursor-not-allowed' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50 cursor-pointer'}`}
                    >
                      Previous
                    </button>

                    {step < 2 ? (
                      <button
                        onClick={() => setStep(prev => prev + 1)}
                        disabled={!validateStep()}
                        className={`py-1.5 px-4 text-[11px] font-bold rounded text-white transition cursor-pointer ${validateStep() ? 'bg-slate-900 hover:bg-slate-800 shadow-sm' : 'bg-slate-200 text-white cursor-not-allowed'}`}
                      >
                        Next
                      </button>
                    ) : null}
                  </div>
                )}

              </div>

              {/* RIGHT PART: Beautiful visual live float preview panel */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-100/60 border border-slate-300 rounded-lg min-h-[510px] relative overflow-hidden shadow-sm">
                {/* Visual grid light pattern underneath card */}
                <div className="absolute inset-0 opacity-[0.3] pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <span className="absolute top-3 left-4 text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">
                  ✓ Live Design Preview Workspace
                </span>

                <div className="relative z-10 scale-95 md:scale-100 hover:scale-[1.01] transition-transform duration-300">
                  {selectedTemplate && (
                    <CardPreview
                      type={activeProduct}
                      design={selectedTemplate}
                      formData={formData}
                      verification={verificationResult}
                    />
                  )}
                </div>

                <div className="mt-3.5 text-center z-10">
                  <span className="text-[9px] text-slate-400 font-bold uppercase font-mono tracking-widest block">Currently Viewing Template</span>
                  <span className="text-[10px] font-bold text-slate-600 mt-1 inline-block bg-white/80 backdrop-blur-[1px] px-2.5 py-0.5 rounded border border-slate-200">
                    {selectedTemplate?.name}
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Humble Footer compliant with design conventions */}
      <footer id="global-footer" className="bg-slate-950 border-t border-slate-900 text-slate-500 py-6 text-[10px] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-tight">© 2026 IDCODE NIGERIA Verification Suite.</span>
            <span className="block text-[9.5px] text-slate-600 mt-0.5">Authorized database verification, authentic QR activation and credential design portal.</span>
          </div>
          <div className="flex gap-4 font-bold uppercase tracking-wider text-slate-500 font-mono">
            <span className="hover:text-emerald-400 transition cursor-pointer">Privacy Policy</span>
            <span className="text-slate-850">|</span>
            <span className="hover:text-emerald-400 transition cursor-pointer">Terms & Licenses</span>
            <span className="text-slate-850">|</span>
            <span className="hover:text-emerald-400 transition cursor-pointer">System Check</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
