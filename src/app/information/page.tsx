import { ActionLink, Eyebrow } from "@/components/visual";

export const metadata = { title: "شرایط خرید و حریم خصوصی", description: "راهنمای قیمت‌ها و نحوهٔ نگهداری سبد خرید در نسخهٔ نمایشی کیمیا." };

export default function InformationPage() {
  return (
    <article className="shell prose-page">
      <Eyebrow>راهنمای فروشگاه</Eyebrow>
      <h1>شرایط خرید و حریم خصوصی</h1>
      <h2>فروشگاه نمایشی</h2>
      <p>قیمت‌های ثابت نمونه‌اند و بهای قطعه‌های وابسته به نرخ روز باید پیش از خرید تأیید شود. ثبت سفارش و پرداخت در این نسخه غیرفعال است.</p>
      <h2>اطلاعات سبد خرید</h2>
      <p>شناسهٔ قطعه‌ها و تعداد آن‌ها در مرورگر همین دستگاه ذخیره می‌شود. برای پاک کردن این اطلاعات می‌توانید قطعه‌ها را از سبد بردارید یا داده‌های سایت را از تنظیمات مرورگر حذف کنید.</p>
      <ActionLink href="/shop">بازگشت به فروشگاه</ActionLink>
    </article>
  );
}
