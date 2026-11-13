import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { ActionLink, Eyebrow, Photo } from "@/components/visual";
import { CampaignClosing, CampaignHero } from "@/components/editorial/collection-sections";
import { InteriorMotion } from "@/components/editorial/interior-motion";
import { editorialProduct } from "@/components/editorial/photography";
import { faNumber } from "@/lib/pricing";
import "@/app/interior.css";

export const metadata = { title: "دربارهٔ کیمیا", description: "فلسفهٔ کیمیا، از انتخاب زیور تا درک جزئیات و قیمت هر قطعه." };

const journey = [
  { title: "کشف مجموعه‌ها", text: "از مجموعه‌های زنانه و مردانه شروع کن یا نوع زیور را در فروشگاه فیلتر کن.", href: "/shop" },
  { title: "نگاه از نزدیک", text: "عکس، فرم و توضیحات هر قطعه را در صفحهٔ محصول بررسی کن.", href: "/products/halo-ring" },
  { title: "بررسی قیمت", text: "شیوهٔ قیمت‌گذاری و وضعیت تأیید را پیش از انتخاب ببین.", href: "#pricing" },
  { title: "انتخاب قطعه‌ها", text: "قطعه‌های دلخواهت را به سبد اضافه کن و تعدادشان را مرور کن.", href: "/cart" },
  { title: "پیش‌نمایش خرید", text: "خلاصهٔ سبد را در پیش‌نمایش خرید ببین. این مرحله در نسخهٔ فعلی نمایشی است.", href: "/checkout" },
];

const pricing = [
  { title: "بر اساس نرخ روز طلا", text: "این قطعه‌ها تا زمان بررسی با وضعیت «در انتظار تأیید قیمت» نمایش داده می‌شوند. مبلغشان پس از تأیید مشخص می‌شود.", image: 7798, href: "/shop?pricing=live-gold" },
  { title: "قیمت ثابت", text: "قیمت نمونه به تومان در صفحهٔ محصول مشخص است و همین مبلغ در جمع نمونهٔ سبد محاسبه می‌شود.", image: 7876, href: "/shop?pricing=fixed" },
];

export default function AboutPage() {
  return (
    <InteriorMotion theme="about">
      <CampaignHero label="دربارهٔ کیمیا" headline={["کیمیا، نگاهی متفاوت", "به زیبایی"]}
        subtitle="زیبایی گاهی در یک جزئیات کوچک پنهان است؛ در فرمی که انتخاب می‌کنی و در درخششی که به استایل تو معنا می‌دهد."
        image={editorialProduct(7786).images[0]} href="#philosophy" action="نگاه کیمیا" />

      <section className="shell v3-philosophy" id="philosophy">
        <div className="v3-philosophy-photo photo"><Photo image={editorialProduct(7810).images[0]} sizes="(max-width: 700px) 90vw, 45vw" /></div>
        <div className="v3-philosophy-copy">
          <Eyebrow>فلسفهٔ کیمیا</Eyebrow>
          <h2>زیبایی، فراتر از ظاهر</h2>
          <p>در انتخاب این گالری، فرم و بافت همان‌قدر مهم‌اند که درخشش. قوس یک حلقه یا نظم پیوندهای یک زنجیر می‌تواند دلیل انتخاب یک قطعه باشد.</p>
          <p>تصویرهای نزدیک کمک می‌کنند این تفاوت‌ها را ببینی و زیوری را انتخاب کنی که با شیوهٔ لباس پوشیدن و سلیقهٔ خودت هماهنگ است.</p>
        </div>
      </section>

      <section className="v3-journey">
        <div className="shell">
          <Eyebrow>از دیدن تا انتخاب</Eyebrow>
          <h2>تجربهٔ کیمیا</h2>
          <ol>
            {journey.map(({ title, text, href }, index) => (
              <li key={title}><Link href={href}>
                <span className="v3-step-number" aria-hidden="true">{faNumber(index + 1).padStart(2, "۰")}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <ArrowUpLeft size={21} aria-hidden="true" />
              </Link></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v3-pricing" id="pricing">
        <div className="shell">
          <Eyebrow>شیوهٔ قیمت‌گذاری</Eyebrow>
          <h2>شفافیت، بخشی از تجربهٔ خرید است.</h2>
          <div className="v3-pricing-grid">
            {pricing.map((item) => (
              <article className="v3-pricing-card" key={item.title}>
                <div className="v3-pricing-image photo"><Photo image={editorialProduct(item.image).images[0]} sizes="(max-width: 700px) 90vw, 42vw" /></div>
                <div className="v3-pricing-copy">
                  <h3>{item.title}</h3><p>{item.text}</p>
                  <ActionLink href={item.href} variant="text">دیدن قطعه‌ها</ActionLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CampaignClosing title="کیمیا، برای درخششی که به تو تعلق دارد." image={editorialProduct(7881).images[0]} href="/shop" action="کشف مجموعه" />
    </InteriorMotion>
  );
}
