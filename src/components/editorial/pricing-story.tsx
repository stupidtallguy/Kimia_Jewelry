import { ActionLink, Eyebrow, Photo } from "../visual";
import { editorialProduct } from "./photography";

export function PricingStory() {
  return (
    <section id="pricing" className="pricing-story" aria-labelledby="pricing-title">
      <div className="shell pricing-intro">
        <Eyebrow>شیوهٔ قیمت‌گذاری</Eyebrow>
        <h2 id="pricing-title" className="campaign-display">دو راه برای درخشیدن</h2>
      </div>
      <div className="pricing-spread">
        <article className="pricing-editorial pricing-gold">
          <div className="pricing-plate photo" data-reveal="curtain">
            <Photo image={editorialProduct(7798).images[0]} sizes="(max-width: 700px) 68vw, 32vw" />
          </div>
          <div className="pricing-editorial-copy">
            <h3>طلای ۱۸ عیار</h3>
            <p>اصالت و ارزش، با قیمت‌گذاری بر اساس نرخ روز</p>
            <small>این رده برای طلای ۱۸ عیار در نظر گرفته شده است. عیار و قیمت هر قطعه پس از بررسی تأیید می‌شود.</small>
            <ActionLink href="/shop?pricing=live-gold" variant="text">قطعه‌های وابسته به نرخ روز</ActionLink>
          </div>
        </article>
        <article className="pricing-editorial pricing-fixed">
          <div className="pricing-plate photo" data-reveal="side">
            <Photo image={editorialProduct(7873).images[0]} sizes="(max-width: 700px) 70vw, 32vw" />
          </div>
          <div className="pricing-editorial-copy">
            <h3>جواهرات خاص</h3>
            <p>انتخاب‌هایی با قیمت ثابت و شفاف</p>
            <small>مبلغ‌های فعلی نمونه‌اند و برای نمایش روند خرید در این گالری استفاده می‌شوند.</small>
            <ActionLink href="/shop?pricing=fixed" variant="text">زیورآلات با قیمت ثابت</ActionLink>
          </div>
        </article>
      </div>
    </section>
  );
}
