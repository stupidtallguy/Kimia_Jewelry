"use client";

import { useState } from "react";
import { Scan, ZoomIn } from "lucide-react";
import { Photo } from "./visual";
import type { ProductImage } from "@/lib/products";
import { faNumber } from "@/lib/pricing";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(false);
  return (
    <section className="detail-gallery" aria-label="تصاویر محصول">
      <div className="detail-photo photo" data-zoom={zoom}>
        <Photo image={images[selected]} sizes="(max-width: 750px) 94vw, 52vw" preload={selected === 0} />
      </div>
      <div className="gallery-tools">
        {images.length > 1 && images.map((image, index) => (
          <button className="gallery-thumb photo" type="button" key={image.src} aria-label={"تصویر " + faNumber(index + 1)} aria-pressed={index === selected} onClick={() => { setSelected(index); setZoom(false); }}>
            <Photo image={{ ...image, alt: "" }} sizes="64px" />
          </button>
        ))}
        <button className="gallery-zoom" type="button" aria-pressed={zoom} onClick={() => setZoom(!zoom)}>
          {zoom ? <Scan size={17} aria-hidden="true" /> : <ZoomIn size={17} aria-hidden="true" />}
          {zoom ? "نمای کامل" : "نمای نزدیک"}
        </button>
      </div>
    </section>
  );
}
