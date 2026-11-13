import type { PricingType, Product } from "./products";

const number = new Intl.NumberFormat("fa-IR");

export const faNumber = (value: number) => number.format(value);
export const toman = (value: number) => faNumber(value) + " تومان";

export const pricingLabels: Record<PricingType, string> = {
  "live-gold": "قیمت بر اساس نرخ روز",
  fixed: "قیمت ثابت",
};

export type PriceQuote =
  | { status: "sample"; amountToman: number }
  | { status: "pending" };

// This boundary can consume a verified server quote when a gold-rate provider is connected.
export function getPriceQuote(product: Product): PriceQuote {
  if (product.pricingType === "fixed" && product.fixedPriceToman !== undefined) {
    return { status: "sample", amountToman: product.fixedPriceToman };
  }
  return { status: "pending" };
}
