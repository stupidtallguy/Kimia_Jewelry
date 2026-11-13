"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Brand } from "./visual";
import { useCart } from "./cart-store";
import { faNumber } from "@/lib/pricing";

const links = [
  { href: "/shop", label: "فروشگاه" },
  { href: "/women", label: "زنانه" },
  { href: "/men", label: "مردانه" },
  { href: "/#collections", label: "کالکشن‌ها" },
  { href: "/about", label: "دربارهٔ کیمیا" },
];

function NavigationLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return links.map(({ href, label }) => (
    <Link key={href} href={href} onClick={onNavigate} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
  ));
}

function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-navigation" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        event.currentTarget.querySelector("button")?.focus();
      }
    }}>
      <button type="button" className="icon-button" aria-label={open ? "بستن منو" : "باز کردن منو"} aria-expanded={open} aria-controls="mobile-links" onClick={() => setOpen(!open)}>
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>
      <nav className="mobile-links" id="mobile-links" aria-label="ناوبری موبایل" hidden={!open}>
        <NavigationLinks pathname={pathname} onNavigate={() => setOpen(false)} />
      </nav>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = header.current;
    if (pathname !== "/" || !element) return;

    const update = () => element.toggleAttribute("data-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  return (
    <header className="site-header" ref={header} data-campaign={pathname === "/" ? "" : undefined}>
      <div className="header-inner">
        <MobileNavigation key={pathname} pathname={pathname} />
        <Brand />
        <nav className="desktop-nav" aria-label="ناوبری اصلی"><NavigationLinks pathname={pathname} /></nav>
        <div className="header-actions">
          <Link className="icon-button" href="/shop?search=1" aria-label="جست‌وجوی زیورآلات"><Search size={20} strokeWidth={1.55} aria-hidden="true" /></Link>
          <Link className="icon-button bag-button" href="/cart" aria-label={count ? "سبد خرید، " + faNumber(count) + " کالا" : "سبد خرید"}>
            <ShoppingBag size={21} strokeWidth={1.55} aria-hidden="true" />
            {count > 0 && <span className="bag-count" aria-hidden="true">{faNumber(count)}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
