// Constants
import { RESOLUTIONS } from "@/constants/resolutions";

export type TimeSeriesData = { value: number; date: string }[];

// https://finnhub.io/docs/api/quote
export type PriceOverview = {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  dp: number;
  d: number;
};

// https://finnhub.io/docs/api/company-profile2
export type CompanyDetails = {
  name: string;
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  finnhubIndustry: string;
  logo: string;
};

// https://finnhub.io/docs/api/symbol-search
export type SymbolSearchResult = { symbol: string; description: string };

export type Resolution = (typeof RESOLUTIONS)[number];
