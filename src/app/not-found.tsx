import { ActionLink } from "@/components/visual";

export default function NotFound() {
  return (
    <section className="shell empty-state standalone-empty">
      <h1>صفحه پیدا نشد</h1>
      <p>برای پیدا کردن قطعه‌های کیمیا به فروشگاه بروید.</p>
      <ActionLink href="/shop" variant="solid">رفتن به فروشگاه</ActionLink>
    </section>
  );
}
