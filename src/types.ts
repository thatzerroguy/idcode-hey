export type ProductType = 'identity' | 'access' | 'product';

export interface CardDesign {
  id: string;
  name: string;
  themeClass: string;
  headerBg: string;
  bodyBg: string;
  textColor: string;
  subtitleColor: string;
  accentColor: string;
  borderClass: string;
  badgeStyle: string;
  patternType: 'guilloche' | 'grid' | 'geometric' | 'dots' | 'minimal';
}

export interface VerificationFormData {
  // Identity
  companyName: string;
  cacNumber: string;
  
  // Access
  eventName: string;
  eventReason: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  attendeeName: string;
  attendeeNIn: string;

  // Product
  productName: string;
  manufacturerCac: string;
}

export interface VerificationResult {
  verified: boolean;
  activationCode: string;
  timestamp: string;
  referenceNumber: string;
}
