import Link from "next/link";
import { ArrowDown, ArrowUpLeft } from "lucide-react";
import { productHref } from "@/lib/products";
import { ActionLink, Eyebrow, Photo } from "./visual";
import { editorialProduct } from "./editorial/photography";

export function EditorialHero() {
  const ring = editorialProduct(7777);
  const wave = editorialProduct(7880);
  const ribbon = editorialProduct(7782);

  return (
    <section className="hero-chapter" aria-labelledby="hero-title">
      <div className="editorial-hero">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-copy">
          <Eyebrow>گالری زیورآلات کیمیا</Eyebrow>
          <h1 id="hero-title">
            <span>کیمیا، فراتر از</span>
            <em>یک درخشش</em>
          </h1>
          <p className="hero-subtitle">جواهراتی برای امضای استایل تو</p>
          <ActionLink href="#showcase" variant="gold">کشف مجموعه</ActionLink>
        </div>
        <div className="hero-photos">
          <div className="hero-shot hero-shot-main">
            <Link className="hero-shot-link photo" href={productHref(ring)}>
              <Photo image={{ ...ring.images[0], position: "50% 54%" }} sizes="(max-width: 700px) 68vw, (min-width: 961px) 80vw, 48vw" preload />
              <span className="hero-photo-label">{ring.nameFa}<ArrowUpLeft size={15} aria-hidden="true" /></span>
            </Link>
          </div>
          <div className="hero-shot hero-shot-wave photo">
            <Photo image={wave.images[0]} sizes="(max-width: 700px) 29vw, 16vw" loading="eager" />
          </div>
          <div className="hero-shot hero-shot-ribbon photo">
            <Photo image={{ ...ribbon.images[0], position: "52% 67%" }} sizes="(max-width: 700px) 26vw, 14vw" loading="eager" />
          </div>
          <span className="editorial-spark hero-spark" aria-hidden="true" />
        </div>
        <Link href="#manifesto" className="editorial-scroll">
          <span className="scroll-circle"><ArrowDown size={17} strokeWidth={1.5} aria-hidden="true" /></span>
          ادامهٔ روایت
        </Link>
        <div className="hero-curtain" aria-hidden="true" />
      </div>
    </section>
  );
}
