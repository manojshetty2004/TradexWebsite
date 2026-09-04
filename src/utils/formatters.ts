export const CURRENCY_MAP: Record<string, { symbol: string; rate: number; locale: string; name: string }> = {
  INR: { symbol: '₹', rate: 85.0, locale: 'en-IN', name: 'Indian Rupee (INR ₹)' },
  USD: { symbol: '$', rate: 1.0, locale: 'en-US', name: 'US Dollar (USD $)' },
  EUR: { symbol: '€', rate: 0.92, locale: 'de-DE', name: 'Euro (EUR €)' },
  GBP: { symbol: '£', rate: 0.78, locale: 'en-GB', name: 'British Pound (GBP £)' },
  JPY: { symbol: '¥', rate: 152.0, locale: 'ja-JP', name: 'Japanese Yen (JPY ¥)' },
};

export function formatCurrency(
  amountUsd: number,
  currency: string = 'INR',
  compact: boolean = false
): string {
  const info = CURRENCY_MAP[currency] || CURRENCY_MAP.INR;
  const converted = amountUsd * info.rate;

  if (compact) {
    if (currency === 'INR') {
      if (Math.abs(converted) >= 10000000) {
        return `${info.symbol}${(converted / 10000000).toFixed(2)} Cr`;
      }
      if (Math.abs(converted) >= 100000) {
        return `${info.symbol}${(converted / 100000).toFixed(2)} Lakh`;
      }
    }
    if (Math.abs(converted) >= 1000000000) {
      return `${info.symbol}${(converted / 1000000000).toFixed(2)}B`;
    }
    if (Math.abs(converted) >= 1000000) {
      return `${info.symbol}${(converted / 1000000).toFixed(2)}M`;
    }
    if (Math.abs(converted) >= 10000) {
      return `${info.symbol}${(converted / 1000).toFixed(1)}k`;
    }
  }

  const decimals = Math.abs(converted) < 1 ? (Math.abs(converted) < 0.01 ? 4 : 2) : 2;

  try {
    return new Intl.NumberFormat(info.locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: decimals,
      minimumFractionDigits: Math.abs(converted) < 1 ? 2 : 2,
    }).format(converted);
  } catch {
    return `${info.symbol}${converted.toLocaleString(info.locale || 'en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
