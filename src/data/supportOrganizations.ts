import { Organization } from '../types/support';

// Emergency Numbers
export const emergencyNumbers = {
  global: {
    police: "112", // International Emergency Number
    ambulance: "112",
    fire: "112"
  },
  usa: {
    all: "911" // United States Emergency Number
  },
  india: {
    police: "100",
    ambulance: "108",
    fire: "101",
    women: "1091",
    mental_health: "1800-599-0019" // Kiran Mental Health Helpline
  }
};

export const globalOrganizations: Organization[] = [
  {
    name: "World Health Organization - Mental Health",
    website: "https://www.who.int/mental_health",
    description: "Global mental health resources and guidance",
    type: "Global",
    country: "Global",
    contact: {
      email: "mnh@who.int",
      phone: "+41 22 791 21 11",
      helpline: "112" // International Emergency Number
    }
  },
  {
    name: "Mind",
    website: "https://www.mind.org.uk",
    description: "Mental health support and advocacy",
    type: "International",
    country: "UK",
    contact: {
      email: "contact@mind.org.uk",
      phone: "+44 300 123 3393",
      helpline: "999" // UK Emergency Number
    }
  },
  {
    name: "NAMI",
    website: "https://www.nami.org",
    description: "Mental illness support and education",
    type: "International",
    country: "USA",
    contact: {
      email: "info@nami.org",
      phone: "1-800-950-6264",
      helpline: "911" // US Emergency Number
    }
  },
  {
    name: "Befrienders Worldwide",
    website: "https://www.befrienders.org",
    description: "International suicide prevention network",
    type: "Global",
    country: "Global",
    contact: {
      email: "info@befrienders.org",
      helpline: "112" // International Emergency Number
    }
  }
];

export const indianOrganizations: Organization[] = [
  // National Organizations
  {
    name: "NIMHANS",
    website: "https://nimhans.ac.in",
    description: "National Institute of Mental Health and Neurosciences - Premier mental health institution",
    type: "National",
    country: "India",
    location: "Bangalore",
    contact: {
      email: "info@nimhans.ac.in",
      phone: "080-26995001",
      helpline: "080-46110007"
    }
  },
  {
    name: "Kiran Mental Health Helpline",
    website: "https://nimhans.ac.in",
    description: "24/7 toll-free mental health rehabilitation helpline",
    type: "National",
    country: "India",
    contact: {
      helpline: "1800-599-0019"
    }
  },

  // Kerala Organizations
  {
    name: "DISHA",
    website: "https://www.spb.kerala.gov.in/disha",
    description: "24/7 helpline for mental health support and counseling in Kerala",
    type: "Regional",
    country: "India",
    location: "Kerala",
    contact: {
      helpline: "1056",
      phone: "0471-2552056"
    }
  },
  {
    name: "Institute of Mental Health and Neurosciences (IMHANS)",
    website: "https://imhans.org",
    description: "Mental health care and rehabilitation services in Kerala",
    type: "Regional",
    country: "India",
    location: "Kozhikode",
    contact: {
      phone: "0495-2359352",
      email: "imhans@kerala.gov.in"
    }
  },
  {
    name: "Thanal",
    website: "http://thanal.org",
    description: "Suicide prevention and mental health support in Kerala",
    type: "Regional",
    country: "India",
    location: "Thiruvananthapuram",
    contact: {
      helpline: "0484-2361161"
    }
  },

  // Tamil Nadu Organizations
  {
    name: "SNEHA",
    website: "https://snehaindia.org",
    description: "Suicide prevention and emotional support helpline",
    type: "Regional",
    country: "India",
    location: "Chennai",
    contact: {
      helpline: "044-24640050",
      email: "help@snehaindia.org"
    }
  },
  {
    name: "MS Chellamuthu Trust",
    website: "https://mschellamuthutrust.org",
    description: "Mental health care and rehabilitation services",
    type: "Regional",
    country: "India",
    location: "Madurai",
    contact: {
      phone: "0452-2334343",
      email: "info@mschellamuthutrust.org"
    }
  },
  {
    name: "Banyan",
    website: "https://thebanyan.org",
    description: "Mental health care for homeless women",
    type: "Regional",
    country: "India",
    location: "Chennai",
    contact: {
      phone: "044-26530504",
      email: "contact@thebanyan.org"
    }
  },

  // Telangana Organizations
  {
    name: "Roshni",
    website: "http://www.roshnihelp.org",
    description: "Suicide prevention and emotional support",
    type: "Regional",
    country: "India",
    location: "Hyderabad",
    contact: {
      helpline: "040-66202000",
      email: "roshnihelp@gmail.com"
    }
  },
  {
    name: "Institute of Mental Health",
    website: "https://imh.telangana.gov.in",
    description: "Government mental health institution",
    type: "Regional",
    country: "India",
    location: "Hyderabad",
    contact: {
      phone: "040-27661832",
      helpline: "040-27661833"
    }
  },
  {
    name: "Pause for Perspective",
    website: "https://pauseforperspective.org",
    description: "Mental health counseling and therapy services",
    type: "Regional",
    country: "India",
    location: "Hyderabad",
    contact: {
      phone: "040-40144288",
      email: "contact@pauseforperspective.org"
    }
  },

  // Karnataka Organizations
  {
    name: "Sahai Helpline",
    website: "http://sahaihelpline.org",
    description: "Suicide prevention and mental health support",
    type: "Regional",
    country: "India",
    location: "Bangalore",
    contact: {
      helpline: "080-25497777",
      email: "sahaihelpline@gmail.com"
    }
  },
  {
    name: "Medico Pastoral Association",
    website: "https://mpabangalore.org",
    description: "Mental health counseling and rehabilitation",
    type: "Regional",
    country: "India",
    location: "Bangalore",
    contact: {
      phone: "080-25530044",
      email: "contact@mpabangalore.org"
    }
  },
  {
    name: "Spandana",
    website: "https://spandanabangalore.in",
    description: "Psychiatric rehabilitation center",
    type: "Regional",
    country: "India",
    location: "Bangalore",
    contact: {
      phone: "080-23113886",
      email: "spandana.rehab@gmail.com"
    }
  },

  // Additional National Organizations
  {
    name: "Vandrevala Foundation",
    website: "https://www.vandrevalafoundation.com",
    description: "24/7 mental health support and crisis intervention",
    type: "National",
    country: "India",
    contact: {
      email: "help@vandrevalafoundation.com",
      helpline: "1860-2662-345"
    }
  },
  {
    name: "AASRA",
    website: "http://www.aasra.info",
    description: "24/7 helpline for emotional support and suicide prevention",
    type: "National",
    country: "India",
    location: "Mumbai",
    contact: {
      email: "aasrahelpline@yahoo.com",
      helpline: "91-9820466726"
    }
  }
];

export const getOrganizationsByCountry = (country: string): Organization[] => {
  if (country.toLowerCase() === 'india') {
    return indianOrganizations;
  }
  if (country.toLowerCase() === 'global') {
    return globalOrganizations.filter(org => org.type === 'Global');
  }
  return globalOrganizations.filter(org => org.country.toLowerCase() === country.toLowerCase());
};

export const getOrganizationsByRegion = (region: string): Organization[] => {
  return indianOrganizations.filter(org => 
    org.location?.toLowerCase() === region.toLowerCase()
  );
};

export const getAllOrganizations = (): Organization[] => {
  return [...globalOrganizations, ...indianOrganizations];
};

export const getEmergencyNumbers = (country: string): any => {
  return emergencyNumbers[country.toLowerCase()] || emergencyNumbers.global;
};