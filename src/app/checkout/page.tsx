import { CartContents } from "@/components/cart-ui";
import { Eyebrow } from "@/components/visual";

export const metadata = { title: "پیش‌نمایش خرید", description: "پیش‌نمایش نمایشی سبد خرید کیمیا.", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="shell transaction-page">
      <div className="page-heading"><Eyebrow>نسخهٔ نمایشی</Eyebrow><h1>پیش‌نمایش خرید</h1></div>
      <CartContents checkout />
    </div>
  );
}
