import type { Metadata } from "next";
import "@fontsource-variable/estedad";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-store";

export const metadata: Metadata = {
  title: { default: "کیمیا | گالری زیورآلات", template: "%s | کیمیا" },
  description: "گالری زیورآلات کیمیا؛ مجموعه‌های زنانه و مردانه و روایت جزئیات هر قطعه.",
  openGraph: { locale: "fa_IR", type: "website", siteName: "کیمیا" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <a className="skip-link" href="#main">رفتن به محتوای اصلی</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
