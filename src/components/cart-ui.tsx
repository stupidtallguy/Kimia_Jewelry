"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, FlaskConical, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { categories, genders, productHref, type Product } from "@/lib/products";
import { faNumber, toman } from "@/lib/pricing";
import { maxQuantity, useCart, type CartEntry } from "./cart-store";
import { ActionLink, Photo, PriceDisplay } from "./visual";

export function AddToCart({ product }: { product: Product }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const quantity = items.find((item) => item.product.id === product.id)?.quantity ?? 0;
  const reachedLimit = quantity >= maxQuantity;
  const label = product.available === false ? "ناموجود" : reachedLimit ? "حداکثر تعداد در سبد" :
    product.pricingType === "live-gold" ? "افزودن به سبد برای بررسی قیمت" : "افزودن به سبد خرید";
  return (
    <>
      <button type="button" className="action action-solid add-button" disabled={product.available === false || reachedLimit} onClick={() => { add(product.id); setAdded(true); }}>
        <ShoppingBag size={19} aria-hidden="true" />{label}
      </button>
      <div role="status" className="added-status">
        {added && quantity > 0 && <><span>{faNumber(quantity)} عدد در سبد خرید</span><Link href="/cart">دیدن سبد <ArrowLeft size={15} aria-hidden="true" /></Link></>}
      </div>
    </>
  );
}

function CartItem({ item, editable }: { item: CartEntry; editable: boolean }) {
  const { setQuantity, remove } = useCart();
  const { product, quantity, quote } = item;
  return (
    <li className="cart-item">
      <Link href={productHref(product)} className="cart-thumbnail photo" aria-label={product.nameFa}>
        <Photo image={product.images[0]} sizes="100px" />
      </Link>
      <div className="cart-item-copy">
        <p className="product-meta">{categories[product.category]} {genders[product.gender]}</p>
        <h2><Link href={productHref(product)}>{product.nameFa}</Link></h2>
        <PriceDisplay product={product} />
        {editable ? (
          <div className="cart-item-controls">
            <div className="stepper" aria-label={"تعداد " + product.nameFa}>
              <button type="button" disabled={quantity >= maxQuantity} aria-label={"افزایش تعداد " + product.nameFa} onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={16} aria-hidden="true" /></button>
              <span aria-live="polite">{faNumber(quantity)}</span>
              <button type="button" disabled={quantity <= 1} aria-label={"کاهش تعداد " + product.nameFa} onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={16} aria-hidden="true" /></button>
            </div>
            <button type="button" className="remove-button" aria-label={"حذف " + product.nameFa} onClick={() => remove(product.id)}><Trash2 size={16} aria-hidden="true" /> حذف</button>
          </div>
        ) : <p className="checkout-quantity">تعداد: {faNumber(quantity)}</p>}
      </div>
      {quote.status === "sample" && <bdi className="cart-line-total" aria-label="جمع نمونهٔ این ردیف">{toman(quote.amountToman * quantity)}</bdi>}
    </li>
  );
}

export function CartContents({ checkout = false }: { checkout?: boolean }) {
  const { items, count, pendingCount, sampleSubtotal } = useCart();
  return (
    <>
      {checkout && <div className="demo-note"><FlaskConical size={22} strokeWidth={1.6} aria-hidden="true" /><div><strong>پیش‌نمایش خرید · نسخهٔ نمایشی</strong><p>ثبت سفارش، دریافت اطلاعات پرداخت و پرداخت در این نسخه غیرفعال است.</p></div></div>}
      {items.length ? (
        <div className="cart-layout">
          <ul className="cart-list" aria-label="قطعه‌های سبد">{items.map((item) => <CartItem key={item.product.id} item={item} editable={!checkout} />)}</ul>
          <aside className="cart-summary" aria-label="خلاصهٔ سبد">
            <h2>خلاصهٔ سبد</h2>
            <dl>
              <div><dt>تعداد قطعه‌ها</dt><dd>{faNumber(count)}</dd></div>
              {count > pendingCount && <div><dt>جمع قیمت‌های ثابتِ نمونه</dt><dd><bdi>{toman(sampleSubtotal)}</bdi></dd></div>}
              {pendingCount > 0 && <div><dt>در انتظار تأیید قیمت</dt><dd>{faNumber(pendingCount)} قطعه</dd></div>}
            </dl>
            {pendingCount > 0 && <p className="cart-pending">قطعه‌های در انتظار تأیید در جمع قیمت‌های ثابت لحاظ نشده‌اند. مبلغ نهایی پس از تأیید قیمت مشخص می‌شود.</p>}
            {checkout ? <ActionLink href="/cart">بازگشت به سبد</ActionLink> : <ActionLink href="/checkout" variant="solid">پیش‌نمایش خرید</ActionLink>}
          </aside>
        </div>
      ) : (
        <div className="empty-state cart-empty">
          <ShoppingBag size={34} strokeWidth={1.25} aria-hidden="true" />
          <h2>سبد خرید شما خالی است</h2>
          <p>قطعه‌ای از مجموعه‌های کیمیا به سبد اضافه کنید.</p>
          <ActionLink href="/shop" variant="solid">کشف زیورآلات</ActionLink>
        </div>
      )}
    </>
  );
}
