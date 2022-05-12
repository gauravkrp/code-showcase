// filter ENUMS
type Condition = 'GreaterThan' | 'GreaterThanOrEqualTo' | 'LessThan' | 'LessThanOrEqualTo';
type Query = 'QueryContains' | 'QueryExact';

export type SelectARRAY_Item = {
  value: string | number;
  label: string | number;
};

export enum Match {
  MatchAll = 'MatchAll',
  MatchAny = 'MatchAny',
}

interface FilterSearchCommon {
  id?: number[];
  logged_by_user?: string[];
  logged_from_date?: string;
  logged_till_date?: string;
  rule?: {
    match: Match;
    query?: Query;
  };
}

// platform User Login Form Data
export interface platformUserLoginData {
  // [key: string]: any;
  mobile_number: number;
  password: string;
  platform_code: string;
  rememberUser?: boolean;
}

// platform Onboard Form Data
export interface platformOnboardData {
  platform_name: string;
  platform_email: string;
  license: string;
  address: {
    address_line: string;
    city: string;
    state: string;
    country: string;
    postal: string;
    latitude?: number;
    longitude?: number;
  };
  super_admin_user: {
    name: string;
    mobile_number: number;
    password: string;
  }
}

export interface FilterExam extends FilterSearchCommon {
  name?: string[];
  alias?: string[];
  tags?: string[];
}

export interface PageProperties {
  sort?: {
    sorted?: boolean;
    unsorted?: boolean;
    empty?: boolean;
  };
  page_size?: number;
  page_number?: number;
  total_elements?: number;
  total_pages?: number;
  paged?: boolean;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface Filter_API_Response {
  page_content?: any[];
  page_properties?: PageProperties;
}

export type TypeObject = {
  [key: string]: any;
}
