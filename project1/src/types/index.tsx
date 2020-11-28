// API Header
export interface HeaderType {
  Accept: string;
  "Content-Type": string;
  Authorization?: string;
}

// Login Form Data
export interface UserLoginData {
  email: string;
  password: string;
  rememberUser?: boolean;
};

// Recruiter Data
export interface RecruiterData {
  name: string;
  logo_url?: string;
  description?: string;
  is_multinational: string | boolean;
  is_public_sector: string | boolean;
  average_offer_package_per_annum?: number;
  website?: string;
};