import Link from "next/link";
import { Brand } from "./visual";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>گالری زیورآلات کیمیا</p>
        </div>
        <div>
          <h2>مجموعه‌ها</h2>
          <Link href="/shop">همهٔ زیورآلات</Link>
          <Link href="/women">زنانه</Link>
          <Link href="/men">مردانه</Link>
        </div>
        <div>
          <h2>راهنما</h2>
          <Link href="/about">دربارهٔ کیمیا</Link>
          <Link href="/#pricing">شیوهٔ قیمت‌گذاری</Link>
          <Link href="/information">شرایط خرید و حریم خصوصی</Link>
        </div>
        <div>
          <h2>ارتباط با کیمیا</h2>
          <p>اطلاعات تماس در دست تکمیل است.</p>
          <p>شبکه‌های اجتماعی هنوز معرفی نشده‌اند.</p>
        </div>
      </div>
      <div className="shell footer-bottom"><span>کیمیا</span><span>نسخهٔ نمایشی فروشگاه</span></div>
    </footer>
  );
}
