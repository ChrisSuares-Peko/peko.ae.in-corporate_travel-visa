export const COUNTRIES = [
  'India', 'United Arab Emirates', 'United States', 'United Kingdom',
  'Singapore', 'Australia', 'Canada', 'Germany', 'France', 'Thailand',
  'Malaysia', 'Japan', 'South Korea', 'New Zealand', 'Netherlands',
  'Italy', 'Spain', 'Switzerland', 'Sweden', 'Norway',
  'Denmark', 'Finland', 'Belgium', 'Austria', 'Portugal',
  'China', 'Hong Kong', 'Taiwan', 'Indonesia', 'Philippines',
  'Vietnam', 'Brazil', 'Mexico', 'Argentina', 'South Africa',
  'Nigeria', 'Kenya', 'Egypt', 'Saudi Arabia', 'Qatar',
  'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Pakistan',
  'Bangladesh', 'Sri Lanka', 'Nepal', 'Myanmar', 'Turkey',
]

export const DESTINATION_COUNTRIES = [
  'United States', 'United Kingdom', 'Singapore', 'United Arab Emirates',
  'Australia', 'Canada', 'Germany', 'France', 'Thailand', 'Malaysia',
  'Japan', 'South Korea', 'New Zealand', 'Netherlands', 'Italy',
  'Spain', 'Switzerland', 'Turkey', 'Indonesia', 'Vietnam',
]

export const VISA_OPTIONS = [
  {
    id: 'v1',
    name: '30 Day Tourist eVisa',
    duration: '30 Days',
    entryType: 'Single Entry',
    processingTime: '3–5 Business Days',
    format: 'eVisa',
    govFee: 4500,
    serviceFee: 1800,
    platformFee: 700,
    info: 'Ideal for short leisure trips. Entry must be made within 60 days of visa issue. Valid for 30 days of stay.',
    documents: [
      'Valid Passport (min. 6 months validity)',
      'Passport-size photo (white background)',
      'Bank statement (last 3 months)',
      'Return flight ticket',
      'Confirmed hotel booking',
    ],
  },
  {
    id: 'v2',
    name: '90 Day Tourist eVisa',
    duration: '90 Days',
    entryType: 'Single Entry',
    processingTime: '3–5 Business Days',
    format: 'eVisa',
    govFee: 6800,
    serviceFee: 1800,
    platformFee: 700,
    info: 'For extended stays. Entry must be made within 90 days of issue. Valid for 90 days of continuous stay.',
    documents: [
      'Valid Passport (min. 6 months validity)',
      'Passport-size photo (white background)',
      'Bank statement (last 6 months)',
      'Return flight ticket',
      'Confirmed hotel booking',
      'Travel insurance (min. USD 50,000 coverage)',
    ],
  },
  {
    id: 'v3',
    name: '30 Day Tourist Visa (Multiple Entry)',
    duration: '30 Days / Visit',
    entryType: 'Multiple Entry',
    processingTime: '5–7 Business Days',
    format: 'Stamp Visa',
    govFee: 7200,
    serviceFee: 2200,
    platformFee: 700,
    info: 'Perfect for frequent travellers. Allows multiple entries over 6 months with 30 days stay per visit.',
    documents: [
      'Valid Passport (min. 6 months validity)',
      'Passport-size photo (white background)',
      'Bank statement (last 6 months)',
      'Return flight ticket',
      'Invitation letter (for business visits)',
    ],
  },
  {
    id: 'v4',
    name: '90 Day Tourist Visa (Multiple Entry)',
    duration: '90 Days / Visit',
    entryType: 'Multiple Entry',
    processingTime: '5–7 Business Days',
    format: 'Stamp Visa',
    govFee: 11500,
    serviceFee: 2200,
    platformFee: 700,
    info: 'Maximum flexibility with extended multi-entry access. Valid for 12 months with 90-day stays per visit.',
    documents: [
      'Valid Passport (min. 6 months validity)',
      'Passport-size photo (white background)',
      'Bank statement (last 6 months)',
      'Income proof or employer letter',
      'Return flight ticket',
      'Invitation letter (for business visits)',
      'Travel insurance (min. USD 50,000 coverage)',
    ],
  },
]

export const EMPLOYEES = [
  { id: 'E001', firstName: 'Rajesh', lastName: 'Kumar', dob: '1988-03-15', passport: 'P1234567', email: 'rajesh@acme.ae' },
  { id: 'E002', firstName: 'Priya', lastName: 'Sharma', dob: '1992-07-22', passport: 'P2345678', email: 'priya@acme.ae' },
  { id: 'E003', firstName: 'Amit', lastName: 'Patel', dob: '1985-11-08', passport: 'P3456789', email: 'amit@acme.ae' },
  { id: 'E004', firstName: 'Sneha', lastName: 'Reddy', dob: '1990-04-30', passport: 'P4567890', email: 'sneha@acme.ae' },
  { id: 'E005', firstName: 'Vikram', lastName: 'Singh', dob: '1983-09-14', passport: 'P5678901', email: 'vikram@acme.ae' },
]

export const ADDONS = [
  { id: 'a1', name: 'Visa Concierge', desc: 'Dedicated agent tracks your application', pricing: 'per_traveller', price: 150, tooltip: 'A dedicated Peko agent follows up with the consulate and keeps you updated daily.' },
  { id: 'a2', name: 'Premium Appointment', desc: 'Priority embassy appointment slot', pricing: 'per_traveller', price: 250, tooltip: 'Skip the queue with a guaranteed priority appointment at the embassy or consulate.' },
  { id: 'a3', name: 'Meet & Greet', desc: 'Our staff assists at embassy on submission day', pricing: 'flat', price: 200, tooltip: 'Our staff meets and assists your travellers at the embassy on the day of submission.' },
  { id: 'a4', name: 'Embassy Submission', desc: 'We submit documents on your behalf', pricing: 'per_traveller', price: 250, tooltip: 'Peko team physically submits all documents to the embassy or consulate on your behalf.' },
  { id: 'a5', name: 'Pickup & Delivery', desc: 'Passport collection and doorstep return', pricing: 'per_traveller', price: 250, tooltip: 'We pick up passports from your office and deliver them back after stamping.' },
  { id: 'a6', name: 'Visa Consultation', desc: '30-min expert call', pricing: 'flat', price: 250, tooltip: 'Book a 30-minute consultation with our visa expert to maximise approval chances.' },
  { id: 'a7', name: 'Application Kit', desc: 'Pre-filled application forms', pricing: 'flat', price: 50, tooltip: 'Receive a pre-filled kit of all required application forms for your specific visa type.' },
  { id: 'a8', name: 'Covering Letter', desc: 'Professional covering letter drafted', pricing: 'flat', price: 50, tooltip: 'A professionally drafted covering letter for stronger applications.' },
]

export const MOCK_APPLICATIONS = [
  { id: 'APP-2024-001', name: 'Rajesh Kumar', email: 'rajesh@acme.ae', travelDate: '15 Feb 2025', destination: 'United States', type: 'Business', format: 'eVisa', status: 'Under Review' },
  { id: 'APP-2024-002', name: 'Priya Sharma', email: 'priya@acme.ae', travelDate: '20 Mar 2025', destination: 'United Kingdom', type: 'Tourist', format: 'Stamp Visa', status: 'Pending Documents' },
  { id: 'APP-2024-003', name: 'Amit Patel', email: 'amit@acme.ae', travelDate: '05 Apr 2025', destination: 'Singapore', type: 'Business', format: 'eVisa', status: 'Approved' },
  { id: 'APP-2024-004', name: 'Sneha Reddy', email: 'sneha@acme.ae', travelDate: '12 May 2025', destination: 'Germany', type: 'Tourist', format: 'Stamp Visa', status: 'Processing' },
]
