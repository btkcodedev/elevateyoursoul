export interface Contact {
  email?: string;
  phone?: string;
  helpline?: string;
}

export interface Organization {
  name: string;
  website: string;
  description: string;
  type: 'Global' | 'International' | 'National' | 'Regional';
  country: string;
  location?: string;
  contact: Contact;
}

export interface Location {
  city: string;
  country: string;
  formatted: string;
}