import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeImgProps {
  value: string;
  size?: number;
  className?: string;
  isEmpty?: boolean;
}

export default function QRCodeImg({ value, size = 180, className = '', isEmpty = false }: QRCodeImgProps) {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    // If isEmpty is true, we want to generate a special elegant empty QR pattern
    // or we render a real QR with placeholder text, but overlay standard styling.
    const textToEncode = isEmpty ? 'IDCODE-PENDING-ACTIVATION' : value || 'IDCODE-PENDING';
    
    QRCode.toDataURL(textToEncode, {
      width: size,
      margin: 1,
      color: {
        dark: isEmpty ? '#94A3B8' : '#0F172A', // Slate 400 when empty, Slate 900 when active
        light: '#FFFFFF',
      },
    })
      .then(setSrc)
      .catch((err) => {
        console.error('Failed to generate QR Code:', err);
      });
  }, [value, size, isEmpty]);

  if (isEmpty) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-white p-2 rounded-xl border-2 border-dashed border-slate-300 shadow-sm overflow-hidden ${className}`} style={{ width: size, height: size }}>
        {src && (
          <img
            src={src}
            alt="Awaiting Activation Code"
            className="opacity-30 blur-[0.5px] scale-95 select-none pointer-events-none"
            width={size - 24}
            height={size - 24}
          />
        )}
        <div className="absolute inset-0 bg-slate-50/50 flex flex-col items-center justify-center p-3 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase font-semibold">QR Inactive</span>
          <span className="text-[8px] text-slate-400 mt-0.5 max-w-[120px]">Verifies upon details registration</span>
        </div>
      </div>
    );
  }

  if (!src) {
    return (
      <div 
        className={`animate-pulse bg-slate-100 rounded ${className}`} 
        style={{ width: size, height: size }} 
      />
    );
  }

  return (
    <div className={`relative bg-white p-2 rounded-xl border border-slate-200/80 shadow-md ${className}`} style={{ width: size, height: size }}>
      <img
        src={src}
        alt="Verified IDCODE QR"
        width={size - 16}
        height={size - 16}
        className="block select-none pointer-events-none"
      />
      {/* Tiny IDCODE logo in the middle of active QR codes */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <span className="px-1 py-0.5 bg-slate-900 border border-emerald-400 rounded text-[6px] font-semibold text-emerald-400 font-mono scale-90 tracking-tighter uppercase whitespace-nowrap">
          IDCODE ACTIVE
        </span>
      </div>
    </div>
  );
}
