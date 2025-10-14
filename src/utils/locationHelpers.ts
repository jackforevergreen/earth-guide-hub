// Conversion constants
const MILES_TO_KM = 1.60934;
const KM_TO_MILES = 0.621371;

// Distance conversion functions
export const milesToKm = (miles: number): number => {
  return miles * MILES_TO_KM;
};

export const kmToMiles = (km: number): number => {
  return km * KM_TO_MILES;
};

// Format distance with appropriate unit
export const formatDistance = (distance: number, unit: "miles" | "km"): string => {
  const rounded = Math.round(distance);
  return `${rounded} ${unit}`;
};

// Currency map for symbol display
export const getCurrencySymbol = (currency: string): string => {
  const symbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    DKK: "kr",
    GBP: "£",
    CAD: "$",
    AUD: "$",
    NZD: "$",
    SEK: "kr",
    NOK: "kr",
    CHF: "CHF",
    PLN: "zł",
    CZK: "Kč",
    HUF: "Ft",
    RON: "lei",
    BGN: "лв",
    HRK: "kn",
    RSD: "дин",
    BAM: "KM",
    // Add more as needed
  };

  return symbols[currency] || currency;
};

// Format currency amount with proper symbol placement
export const formatCurrencyAmount = (amount: number, currency: string): string => {
  const symbol = getCurrencySymbol(currency);
  const formatted = amount.toFixed(0);

  // Nordic currencies typically place the symbol after the amount
  if (["DKK", "SEK", "NOK"].includes(currency)) {
    return `${formatted} ${symbol}`;
  }

  // Euro can be before or after depending on country, but we'll use before
  return `${symbol}${formatted}`;
};

// Get the appropriate distance placeholder based on unit system
export const getDistancePlaceholder = (unitSystem: "metric" | "imperial"): number => {
  return unitSystem === "metric" ? 200 : 300; // 200 km or 300 miles
};

// Location interface matching locations.json structure
export interface Location {
  name: string;
  abbreviation: string;
  type: "country" | "state";
  unitSystem: "metric" | "imperial";
  stateEGridValue: number;
  averageMonthlyElectricityBill: number;
  averageMonthlyWaterBill: number;
  averageMonthlyGasBill: number;
  averageMonthlyPropaneBill: number;
  currency: string;
  notes?: string;
}
