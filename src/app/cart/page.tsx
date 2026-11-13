import { CartContents } from "@/components/cart-ui";
import { Eyebrow } from "@/components/visual";

export const metadata = { title: "سبد خرید", description: "مرور قطعه‌های انتخاب‌شده و وضعیت قیمت آن‌ها.", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="shell transaction-page">
      <div className="page-heading"><Eyebrow>انتخاب‌های شما</Eyebrow><h1>سبد خرید</h1></div>
      <CartContents />
    </div>
  );
}
