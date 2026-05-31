import { CardDesign, ProductType, VerificationFormData, VerificationResult } from '../types';
import QRCodeImg from './QRCodeImg';
import { ShieldCheck, Calendar, Clock, MapPin, Ticket, Award, Boxes, ShieldAlert } from 'lucide-react';

interface CardPreviewProps {
  type: ProductType;
  design: CardDesign;
  formData: VerificationFormData;
  verification: VerificationResult | null;
  className?: string;
  isInteractive?: boolean;
}

export default function CardPreview({
  type,
  design,
  formData,
  verification,
  className = '',
  isInteractive = false,
}: CardPreviewProps) {
  const isVerified = verification?.verified ?? false;
  const activationCode = verification?.activationCode ?? 'IDCODE-XXXXXX';

  // Render decorative background patterns based on selection
  const renderPattern = () => {
    switch (design.patternType) {
      case 'guilloche':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none select-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100,100 Q100,0 300,100 T700,100 T1100,100" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M-100,130 Q100,30 300,130 T700,130 T1100,130" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M-100,70 Q100,-30 300,70 T700,70 T1100,70" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M-100,160 Q100,60 300,160 T700,160 T1100,160" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'grid':
        return (
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
        );
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none select-none bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:12px_12px]" />
        );
      case 'geometric':
        return (
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden">
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border-8 border-current" />
            <div className="absolute top-1/2 right-4 w-32 h-32 rotate-45 border-4 border-current" />
            <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full border-2 border-dashed border-current" />
          </div>
        );
      case 'minimal':
      default:
        return (
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none bg-gradient-to-tr from-slate-500 via-transparent to-slate-500" />
        );
    }
  };

  if (type === 'identity') {
    const company = formData.companyName || 'REPRESENTATIVE COMPANY';
    const cac = formData.cacNumber ? `CAC: ${formData.cacNumber}` : 'CAC: PENDING VERIFICATION';

    return (
      <div
        id="identity-card-element"
        className={`w-full max-w-[340px] md:w-[320px] h-[480px] rounded-2xl overflow-hidden shadow-xl border flex flex-col relative transition-all duration-300 ${design.bodyBg} ${design.borderClass} ${className}`}
        style={{ color: design.textColor }}
      >
        {/* Dynamic Theme Ribbon Top */}
        <div className={`h-[110px] bg-gradient-to-br ${design.themeClass} relative p-4 flex flex-col justify-between overflow-hidden shadow-inner`}>
          <div className="absolute inset-0 bg-black/10" />
          {renderPattern()}
          
          <div className="flex justify-between items-start z-10 w-full">
            <span className="text-[10px] font-mono tracking-widest text-[#E2E8F0] font-bold">IDCODE NIGERIA</span>
            {isVerified ? (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[8px] font-semibold tracking-wide uppercase">
                <ShieldCheck size={10} className="text-emerald-400" /> SECURE CODE
              </span>
            ) : (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[8px] font-semibold tracking-wide uppercase">
                <ShieldAlert size={10} className="text-amber-400" /> UNVERIFIED
              </span>
            )}
          </div>

          <div className="z-10 mt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100 truncate max-w-[200px]" title={company}>
              {company}
            </h3>
            <p className="text-[9px] text-slate-300 font-mono tracking-normal">{cac}</p>
          </div>
          
          {/* Subtle holographic security seal */}
          <div className="absolute right-3 bottom-2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/20 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400/40 via-purple-400/40 to-yellow-400/40 animate-spin-slow opacity-80" style={{ animationDuration: '8s' }} />
            <Award size={14} className="absolute text-white/70" />
          </div>
        </div>

        {/* Card Main Body */}
        <div className="flex-1 p-5 flex flex-col justify-between items-center text-center relative z-10">
          {renderPattern()}

          {/* Avatar Picture View */}
          <div className="relative group">
            <div className={`w-20 h-20 rounded-full border-2 ${design.borderClass} bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-md overflow-hidden`}>
              <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 text-white border border-slate-700 flex items-center justify-center text-[10px] shadow-sm">
              🧑
            </div>
          </div>

          {/* Details */}
          <div className="my-1">
            <span className="text-[9px] tracking-widest text-slate-400 font-bold uppercase block -mb-0.5">ISSUED TO PERSONNEL</span>
            <h4 className="text-sm font-semibold tracking-tight leading-snug">
              AUTHORIZED BEARER
            </h4>
            <span className="text-[10px] font-mono font-medium block mt-1 px-2.5 py-0.5 rounded-full border inline-block max-w-full truncate" style={{ borderColor: design.accentColor, color: design.subtitleColor }}>
              {isVerified ? 'VERIFIED BUSINESS STAFF' : 'AWAITING VERIFICATION'}
            </span>
          </div>

          {/* QRCode & Code */}
          <div className="flex flex-col items-center">
            <QRCodeImg value={activationCode} size={110} isEmpty={!isVerified} />
            <div className="mt-2 text-center">
              <span className="text-[9px] font-semibold text-slate-400 font-mono tracking-wider block">ACTIVATION CODE</span>
              <span className="text-xs font-mono font-bold tracking-widest bg-slate-900 text-slate-100 px-3 py-1 rounded border border-slate-800 mt-0.5 inline-block">
                {activationCode}
              </span>
            </div>
          </div>
        </div>

        {/* Subtle footer accent color line */}
        <div className={`h-2 bg-gradient-to-r ${design.themeClass}`} />
      </div>
    );
  }

  if (type === 'access') {
    const event = formData.eventName || 'ANNUAL GALA / EVENT';
    const reason = formData.eventReason || 'General Access Entry';
    const attendee = formData.attendeeName || 'RECIPIENT NAME';
    const hasNIN = formData.attendeeNIn ? `NIN: ****${formData.attendeeNIn.slice(-4)}` : 'NIN: UNVERIFIED';

    return (
      <div
        id="access-card-element"
        className={`w-full max-w-[340px] md:w-[325px] h-[480px] rounded-2xl overflow-hidden shadow-xl border flex flex-col relative transition-all duration-300 ${design.bodyBg} ${design.borderClass} ${className}`}
        style={{ color: design.textColor }}
      >
        {/* Top Banner Access style */}
        <div className={`h-[105px] bg-gradient-to-b ${design.themeClass} relative p-4 flex flex-col justify-between overflow-hidden`}>
          <div className="absolute inset-0 bg-[#000000]/15" />
          {renderPattern()}

          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex items-center gap-1.5">
              <Ticket size={14} className="text-white/80" />
              <span className="text-[9px] font-mono tracking-widest text-[#F1F5F9] font-bold">ACCESS GATEWAY</span>
            </div>
            {isVerified ? (
              <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 text-[8px] font-bold tracking-wider uppercase">
                ACTIVE PASS
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[8px] font-bold tracking-wider uppercase">
                PENDING NIN
              </span>
            )}
          </div>

          <div className="z-10 mt-1">
            <span className="text-[8px] tracking-wider uppercase text-slate-300 font-medium font-mono block mb-0.5">EVENT PASS</span>
            <h3 className="text-xs font-bold uppercase tracking-wide text-white truncate max-w-[210px]" title={event}>
              {event}
            </h3>
          </div>
          
          <div className="absolute right-3 bottom-2 opacity-15">
            <Ticket size={54} className="text-white" />
          </div>
        </div>

        {/* Body content */}
        <div className="flex-1 p-4 flex flex-col justify-between relative z-10">
          {renderPattern()}

          {/* Event Details Content Layout */}
          <div className="bg-slate-900/5 dark:bg-slate-100/5 p-3 rounded-lg border border-slate-300/30 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar size={12} className="shrink-0 text-slate-400" />
              <div className="truncate">
                <span className="text-[8px] font-mono text-slate-400 block -mb-0.5">DATE</span>
                <span className="font-semibold">{formData.eventDate || 'YYYY-MM-DD'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-slate-200/40 pt-1.5">
              <div className="flex items-center gap-1.5">
                <Clock size={11} className="shrink-0 text-slate-400" />
                <div className="truncate">
                  <span className="text-[8px] font-mono text-slate-400 block -mb-0.5">TIME</span>
                  <span className="font-medium text-[11px]">{formData.eventTime || '00:00 AM/PM'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 border-l border-slate-200/40 pl-2">
                <MapPin size={11} className="shrink-0 text-slate-400" />
                <div className="truncate">
                  <span className="text-[8px] font-mono text-slate-400 block -mb-0.5">VENUE</span>
                  <span className="font-medium text-[11px] truncate block" title={formData.eventVenue || 'To Be Specified'}>
                    {formData.eventVenue || 'Venue Standard'}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/40 pt-1.5">
              <span className="text-[8px] font-mono text-slate-400 block -mb-0.5">REASON FOR ADMISSION</span>
              <p className="font-medium text-[10px] leading-tight text-slate-500 italic">
                "{reason}"
              </p>
            </div>
          </div>

          {/* Attendee Info block */}
          <div className="text-center">
            <span className="text-[8px] tracking-wider text-slate-400 font-bold uppercase block -mb-0.5">BEARER DETAILS</span>
            <h4 className="text-sm font-semibold tracking-tight truncate max-w-full px-2" title={attendee}>
              {attendee}
            </h4>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${design.badgeStyle}`}>
                {hasNIN}
              </span>
              {isVerified && (
                <span className="flex items-center text-[8px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

          {/* QR Code Segment */}
          <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-3">
            <div className="text-left">
              <span className="text-[8px] font-semibold text-slate-400 font-mono tracking-wider block">PASS CODE</span>
              <span className="text-xs font-mono font-bold tracking-wider bg-slate-900 text-slate-100 px-2.5 py-1 rounded inline-block border border-slate-800">
                {activationCode}
              </span>
              <span className="text-[8px] text-slate-500 block mt-1 leading-normal max-w-[130px]">
                Redeem code at entry gate to unlock smart pass.
              </span>
            </div>
            <QRCodeImg value={activationCode} size={90} isEmpty={!isVerified} />
          </div>
        </div>

        {/* Access ticket notch layout */}
        <div className="absolute top-[105px] -left-2.5 w-5 h-5 rounded-full border-r border-slate-300 bg-[#FAF9F6] pointer-events-none" style={{ borderColor: design.accentColor }} />
        <div className="absolute top-[105px] -right-2.5 w-5 h-5 rounded-full border-l border-slate-300 bg-[#FAF9F6] pointer-events-none" style={{ borderColor: design.accentColor }} />
      </div>
    );
  }

  if (type === 'product') {
    const productName = formData.productName || 'AUTHENTIC PRODUCT';
    const manufacturer = formData.manufacturerCac ? `MFR CAC: ${formData.manufacturerCac}` : 'CAC: UNVERIFIED';

    return (
      <div
        id="product-card-element"
        className={`w-full max-w-[340px] md:w-[320px] h-[480px] rounded-2xl overflow-hidden shadow-xl border flex flex-col relative transition-all duration-300 ${design.bodyBg} ${design.borderClass} ${className}`}
        style={{ color: design.textColor }}
      >
        {/* Top Product Seal header */}
        <div className={`h-[100px] bg-gradient-to-r ${design.themeClass} relative p-4 flex flex-col justify-between overflow-hidden shadow-sm`}>
          <div className="absolute inset-0 bg-black/10" />
          {renderPattern()}

          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex items-center gap-1.5">
              <Boxes size={14} className="text-amber-300" />
              <span className="text-[9px] font-mono tracking-widest text-[#E2E8F0] font-bold">SECURE LABEL</span>
            </div>
            {isVerified ? (
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[8px] font-extrabold uppercase shadow-sm">
                AUTHENTIC
              </span>
            ) : (
              <span className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-400/30 text-[8px] font-extrabold uppercase">
                AWAITING AUTH
              </span>
            )}
          </div>

          <div className="z-10 mt-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-100 truncate max-w-[210px]" title={productName}>
              {productName}
            </h3>
            <p className="text-[9px] text-slate-300 font-mono tracking-tight">{manufacturer}</p>
          </div>
        </div>

        {/* Body content */}
        <div className="flex-1 p-5 flex flex-col justify-between items-center text-center relative z-10">
          {renderPattern()}

          {/* Secure product badge representation */}
          <div className="border border-yellow-400/40 bg-zinc-50 border-3 border-double rounded-full p-2.5 shadow-inner">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-100 to-amber-200 flex items-center justify-center border-2 border-amber-300/40`}>
              {isVerified ? (
                <ShieldCheck size={28} className="text-emerald-700 animate-pulse" />
              ) : (
                <ShieldAlert size={28} className="text-amber-700" />
              )}
            </div>
          </div>

          {/* Product Authenticity Certification terms */}
          <div className="max-w-[260px]">
            <span className="text-[8px] font-bold tracking-widest text-slate-400 uppercase block mb-0.5">CERTIFIED SECURE SPECIFICATION</span>
            <p className="text-[10px] text-slate-600 leading-snug">
              Scan this certified code with any smartphone to confirm product origin. Counterfeits and duplicate items are blocked in real-time.
            </p>
          </div>

          {/* Hologram lines / Barcode */}
          <div className="w-full flex flex-col items-center">
            {/* Real QR */}
            <QRCodeImg value={activationCode} size={110} isEmpty={!isVerified} />
            
            {/* Barcode line mock */}
            <div className="w-44 h-5 mt-1 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_5px)]" />

            <div className="mt-2 text-center">
              <span className="text-[8px] font-semibold text-slate-400 font-mono tracking-wider block">SCRATCH & VERIFY KEY</span>
              <span className="text-xs font-mono font-bold tracking-widest bg-slate-900 text-slate-100 px-3 py-0.5 rounded inline-block border border-slate-800">
                {activationCode}
              </span>
            </div>
          </div>
        </div>

        {/* Seal footer */}
        <div className="h-4 bg-slate-900 flex items-center justify-center px-4 font-mono text-[7px] text-slate-500 font-medium">
          IDCODE NIGERIA • ALL RIGHTS RESERVED
        </div>
      </div>
    );
  }

  return null;
}
