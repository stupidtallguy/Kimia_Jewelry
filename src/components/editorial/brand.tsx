import { ActionLink, Eyebrow, Photo } from "../visual";
import { editorialProduct } from "./photography";

export function BrandManifesto() {
  return (
    <section id="manifesto" className="manifesto" aria-labelledby="manifesto-title">
      <div className="shell manifesto-layout">
        <div className="manifesto-copy">
          <Eyebrow>نگاه کیمیا</Eyebrow>
          <h2 id="manifesto-title" className="campaign-display" data-reveal="lines">
            <span><span>زیبایی در</span></span>
            <span><span>جزئیات</span></span>
            <span><span>معنا پیدا می‌کند.</span></span>
          </h2>
        </div>
        <div className="manifesto-image photo" data-reveal="curtain">
          <Photo image={{ ...editorialProduct(7810).images[0], position: "50% 70%" }} sizes="(max-width: 700px) 68vw, 31vw" />
        </div>
        <div className="manifesto-inset photo" data-reveal="side">
          <Photo image={{ ...editorialProduct(7787).images[0], position: "50% 45%" }} sizes="(max-width: 700px) 29vw, 19vw" />
        </div>
        <p className="manifesto-note">انحنای یک حلقه، خطی از نور روی مچ، یا آویزی که با هر حرکت شکل تازه‌ای پیدا می‌کند. گاهی یک جزئیات کوچک، تمام حال‌وهوای یک استایل را عوض می‌کند.</p>
      </div>
    </section>
  );
}

export function FinalBrandCTA() {
  return (
    <section className="editorial-finale" aria-labelledby="finale-title">
      <div className="finale-orbit" aria-hidden="true" />
      <div className="shell finale-layout">
        <div className="finale-image photo" data-reveal="curtain">
          <Photo image={editorialProduct(7786).images[0]} sizes="(max-width: 700px) 72vw, 37vw" />
        </div>
        <div className="finale-copy">
          <Eyebrow>کیمیا</Eyebrow>
          <h2 className="campaign-display" id="finale-title" data-reveal="lines">
            <span><span>درخشش تو،</span></span>
            <span><span>امضای توست.</span></span>
          </h2>
          <p>قطعه‌ای پیدا کن که هر بار پوشیدنش، حس خودت را داشته باشد.</p>
          <ActionLink href="/shop" variant="gold">کشف مجموعه</ActionLink>
        </div>
        <div className="finale-inset photo" data-reveal="side">
          <Photo image={editorialProduct(7881).images[0]} sizes="(max-width: 700px) 31vw, 15vw" />
        </div>
        <span className="editorial-spark finale-spark" aria-hidden="true" />
      </div>
    </section>
  );
}
