"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories, genders, type Category, type PricingType, type Product } from "@/lib/products";
import { faNumber, getPriceQuote, pricingLabels } from "@/lib/pricing";
import { ProductGrid } from "./visual";

const initialFilters = { query: "", gender: "", category: "", pricing: "", sort: "" };
type Filters = typeof initialFilters;

function searchKey(value: string) {
  return value.toLocaleLowerCase("fa-IR")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function FilterControls({ filters, onChange, focusSearch, showGender }: {
  filters: Filters;
  onChange: (name: keyof Filters, value: string) => void;
  focusSearch: boolean;
  showGender: boolean;
}) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(Boolean(filters.pricing || filters.category));
  const filtersId = useId();

  useEffect(() => {
    if (focusSearch) searchInput.current?.focus();
  }, [focusSearch]);

  return (
    <div className="filter-controls" role="search" aria-label="جست‌وجو و فیلتر زیورآلات">
      <div className="filter-top">
        <label className="search-field">
          <Search size={19} aria-hidden="true" />
          <input ref={searchInput} type="search" placeholder="جست‌وجوی نام یا نوع زیورآلات" aria-label="جست‌وجوی زیورآلات" value={filters.query} onChange={(event) => onChange("query", event.target.value)} />
        </label>
        <button className="filter-toggle" type="button" aria-controls={filtersId} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <SlidersHorizontal size={17} aria-hidden="true" /> فیلترها
        </button>
      </div>
      <div className="filter-selects" id={filtersId} data-expanded={expanded}>
        {showGender && (
          <label>مجموعه
            <select value={filters.gender} onChange={(event) => onChange("gender", event.target.value)}>
              <option value="">همهٔ مجموعه‌ها</option>
              {Object.entries(genders).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        )}
        <label>نوع زیور
          <select value={filters.category} onChange={(event) => onChange("category", event.target.value)}>
            <option value="">همهٔ انواع</option>
            {Object.entries(categories).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>قیمت‌گذاری
          <select value={filters.pricing} onChange={(event) => onChange("pricing", event.target.value)}>
            <option value="">همهٔ شیوه‌ها</option>
            {Object.entries(pricingLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>ترتیب نمایش
          <select value={filters.sort} onChange={(event) => onChange("sort", event.target.value)}>
            <option value="">پیشنهاد کیمیا</option>
            <option value="asc">ارزان‌ترین</option>
            <option value="desc">گران‌ترین</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export function Catalog({ products, focusSearch = false, showGender = true, initialPricing, initialCategory }: {
  products: Product[];
  focusSearch?: boolean;
  showGender?: boolean;
  initialPricing?: PricingType;
  initialCategory?: Category;
}) {
  const [filters, setFilters] = useState({ ...initialFilters, category: initialCategory ?? "", pricing: initialPricing ?? "" });
  const query = searchKey(filters.query);
  const matches = products.filter((product) => {
    const searchable = searchKey([product.nameFa, categories[product.category], genders[product.gender], product.descriptionFa].join(" "));
    return query.split(" ").every((word) => searchable.includes(word))
      && (!filters.gender || product.gender === filters.gender || (filters.gender !== "unisex" && product.gender === "unisex"))
      && (!filters.category || product.category === filters.category)
      && (!filters.pricing || product.pricingType === filters.pricing);
  });
  if (filters.sort) {
    matches.sort((left, right) => {
      const a = getPriceQuote(left);
      const b = getPriceQuote(right);
      if (a.status === "pending") return b.status === "pending" ? 0 : 1;
      if (b.status === "pending") return -1;
      return filters.sort === "asc" ? a.amountToman - b.amountToman : b.amountToman - a.amountToman;
    });
  }
  const filtered = Object.values(filters).some(Boolean);

  return (
    <div className="shell catalog">
      <FilterControls filters={filters} onChange={(name, value) => setFilters((current) => ({ ...current, [name]: value }))} focusSearch={focusSearch} showGender={showGender} />
      <div className="catalog-results">
        <p role="status">{faNumber(matches.length)} قطعه</p>
        {filtered && <button className="reset-button" onClick={() => setFilters(initialFilters)}>پاک کردن فیلترها</button>}
      </div>
      {matches.length
        ? <ProductGrid products={matches} />
        : <div className="empty-state"><Search size={30} strokeWidth={1.3} aria-hidden="true" /><h2>قطعه‌ای پیدا نشد</h2><p>عبارت دیگری جست‌وجو کنید یا فیلترها را تغییر دهید.</p></div>}
    </div>
  );
}
