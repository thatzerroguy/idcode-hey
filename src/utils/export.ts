import QRCode from 'qrcode';
import { CardDesign, ProductType, VerificationFormData } from '../types';

/**
 * Downloads a high-resolution 512x512 standalone QR code of the activation key.
 */
export async function downloadQRCode(code: string, filename: string = 'idcode-qr.png'): Promise<void> {
  try {
    const dataUrl = await QRCode.toDataURL(code, {
      width: 512,
      margin: 1,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to download QR code:', error);
    alert('Failed to generate high-resolution QR code image.');
  }
}

/**
 * Renders a full premium verified IDCard / AccessCard / ProductLabel to a high-res (640x960 px) canvas and exports it as a PNG file.
 */
export async function downloadCard(
  type: ProductType,
  design: CardDesign,
  formData: VerificationFormData,
  activationCode: string,
  filename: string = 'idcode-verified-card.png'
): Promise<void> {
  const width = 640;
  const height = 960;
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    alert('Canvas generation not supported in this browser.');
    return;
  }

  // Set background fill colors
  let hGradientStart = '#1E293B';
  let hGradientEnd = '#0F172A';
  let bodyBgColor = '#F8FAFC';
  let tColor = '#0F172A';
  let subtitleColor = '#64748B';
  const accentColor = design.accentColor;

  if (design.id.includes('emerald')) {
    hGradientStart = '#065F46';
    hGradientEnd = '#047857';
    bodyBgColor = '#F4FAF7';
  } else if (design.id.includes('midnight')) {
    hGradientStart = '#0F172A';
    hGradientEnd = '#1E293B';
    bodyBgColor = '#111827';
    tColor = '#F8FAFC';
    subtitleColor = '#22D3EE';
  } else if (design.id.includes('royal')) {
    hGradientStart = '#581C87';
    hGradientEnd = '#6B21A8';
    bodyBgColor = '#FAF5FF';
    subtitleColor = '#7E22CE';
  } else if (design.id.includes('summit')) {
    hGradientStart = '#0F5132';
    hGradientEnd = '#198754';
    bodyBgColor = '#F5FAF5';
    subtitleColor = '#157347';
  } else if (design.id.includes('red')) {
    hGradientStart = '#991B1B';
    hGradientEnd = '#DC2626';
    bodyBgColor = '#FEF2F2';
    subtitleColor = '#B91C1C';
  } else if (design.id.includes('cosmic')) {
    hGradientStart = '#1E1B4B';
    hGradientEnd = '#312E81';
    bodyBgColor = '#1e1b4b';
    tColor = '#EEF2FF';
    subtitleColor = '#818CF8';
  } else if (design.id.includes('seal')) {
    hGradientStart = '#14532D';
    hGradientEnd = '#166534';
    bodyBgColor = '#FFFDF5';
    subtitleColor = '#15803D';
  } else if (design.id.includes('modern')) {
    hGradientStart = '#1E3A8A';
    hGradientEnd = '#1D4ED8';
    bodyBgColor = '#EDF4FF';
    subtitleColor = '#2563EB';
  } else if (design.id.includes('nature')) {
    hGradientStart = '#365314';
    hGradientEnd = '#4D7C0F';
    bodyBgColor = '#F7FAF3';
    subtitleColor = '#4D7C0F';
  }

  // Draw background body color
  ctx.fillStyle = bodyBgColor;
  ctx.fillRect(0, 0, width, height);

  // Draw border outline
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, width - 14, height - 14);

  // Draw header banner gradient
  const bannerHeight = 220;
  const gradient = ctx.createLinearGradient(0, 0, width, bannerHeight);
  gradient.addColorStop(0, hGradientStart);
  gradient.addColorStop(1, hGradientEnd);
  ctx.fillStyle = gradient;
  ctx.fillRect(14, 14, width - 28, bannerHeight);

  // Draw background pattern indicator
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = -100; i < width + 100; i += 40) {
    ctx.moveTo(i, 0);
    ctx.quadraticCurveTo(i + 150, bannerHeight / 2, i + 300, bannerHeight);
  }
  ctx.stroke();

  // Draw Header Labels
  ctx.fillStyle = 'rgba(226, 232, 240, 0.8)';
  ctx.font = 'bold 20px monospace';
  ctx.letterSpacing = '5px';
  ctx.fillText('IDCODE NIGERIA', 40, 60);

  // Verified Seal
  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(430, 40, 170, 36, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✓ VERIFIED CARD', 515, 63);

  // Load QR code to paint onto Canvas
  const qrDataUrl = await QRCode.toDataURL(activationCode, {
    width: 280,
    margin: 1,
    color: {
      dark: '#0F172A',
      light: '#FFFFFF',
    },
  });

  const qrImg = new Image();
  await new Promise<void>((resolve, reject) => {
    qrImg.onload = () => resolve();
    qrImg.onerror = () => reject();
    qrImg.src = qrDataUrl;
  });

  // Render specific layout based on product type
  if (type === 'identity') {
    // Top Info
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText((formData.companyName || 'REPRESENTATIVE COMPANY').toUpperCase(), 40, 130);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`CAC REG: ${formData.cacNumber || 'RC-1234567'}`, 40, 165);

    // Profile Photo Avatar Holder
    const avatarY = 360;
    ctx.beginPath();
    ctx.arc(width / 2, avatarY, 80, 0, Math.PI * 2);
    ctx.fillStyle = '#E2E8F0';
    ctx.fill();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    // Silhouette inside avatar icon
    ctx.fillStyle = '#94A3B8';
    ctx.beginPath();
    ctx.arc(width / 2, avatarY - 20, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width / 2, avatarY + 160, 110, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Info Content Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('IDENTIFIED STAFF MEMBER', width / 2, 500);

    ctx.fillStyle = tColor;
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('AUTHORIZED PERSONNEL', width / 2, 535);

    ctx.fillStyle = subtitleColor;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('CAC SECURE SYSTEM COMPLIANT', width / 2, 570);

    // Draw QR code below
    ctx.drawImage(qrImg, (width - 240) / 2, 630, 240, 240);

    // Unique Code Print
    ctx.fillStyle = '#0F172A';
    ctx.fillRect((width - 320) / 2, 890, 320, 44);
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 18px monospace';
    ctx.letterSpacing = '3px';
    ctx.textAlign = 'center';
    ctx.fillText(activationCode, width / 2, 918);

  } else if (type === 'access') {
    // Access Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText((formData.eventName || 'CONFERENCE EVENT EXHIBITION').toUpperCase(), 40, 130);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`REASON: ${formData.eventReason || 'General Access Privilege'}`, 40, 165);

    // Large Box with detailed data points (Date, Venue)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 260, 560, 220, 15);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = tColor;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('SECURE PERMIT ACCESS METRICS:', 60, 305);

    ctx.fillStyle = subtitleColor;
    ctx.font = 'Medium 15px sans-serif';
    ctx.fillText('EVENT DATE:  ' + (formData.eventDate || '2026-06-01'), 60, 350);
    ctx.fillText('START TIME:  ' + (formData.eventTime || '09:00 AM'), 60, 390);
    ctx.fillText('VENUE LOCATION: ' + (formData.eventVenue || 'Conference Standard Center'), 60, 430);

    // Attendee Labels
    ctx.textAlign = 'center';
    ctx.fillStyle = tColor;
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText((formData.attendeeName || 'RECIPIENT VISITOR NAME').toUpperCase(), width / 2, 540);

    ctx.fillStyle = subtitleColor;
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`NIN VERIFIED: ****${(formData.attendeeNIn || '1234').slice(-4)}`, width / 2, 575);

    // QR & Ticket notch segment
    ctx.drawImage(qrImg, (width - 200) / 2, 640, 200, 200);

    ctx.fillStyle = '#0F172A';
    ctx.fillRect((width - 320) / 2, 875, 320, 44);
    ctx.fillStyle = '#6366F1';
    ctx.font = 'bold 18px monospace';
    ctx.letterSpacing = '2px';
    ctx.textAlign = 'center';
    ctx.fillText(activationCode, width / 2, 903);

  } else if (type === 'product') {
    // Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText((formData.productName || 'CERTIFIED GENUINE ITEM').toUpperCase(), 40, 130);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`MFR REG: ${formData.manufacturerCac || 'CAC-1940182'}`, 40, 165);

    // Holographic Circular Label Draw
    const circleY = 360;
    ctx.fillStyle = '#FFFDF5';
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(width / 2, circleY, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw inner gold stars / checkmark representing gold verification badge
    ctx.fillStyle = '#D97706';
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★', width / 2, circleY + 15);

    ctx.fillStyle = tColor;
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText((formData.productName || 'AUTHENTIC PRODUCT').toUpperCase(), width / 2, 500);

    ctx.fillStyle = subtitleColor;
    ctx.font = 'medium 15px sans-serif';
    ctx.fillText('COE CERTIFICATE OF GENUINENESS', width / 2, 535);
    ctx.fillText('TEMPER PROOF SECURE PACKAGING', width / 2, 565);

    // Draw QR code below
    ctx.drawImage(qrImg, (width - 240) / 2, 620, 240, 240);

    ctx.fillStyle = '#0F172A';
    ctx.fillRect((width - 320) / 2, 890, 320, 44);
    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 18px monospace';
    ctx.letterSpacing = '3px';
    ctx.textAlign = 'center';
    ctx.fillText(activationCode, width / 2, 918);
  }

  // Trigger file download
  const cardUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = cardUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
