export const categories = {
  ring: "انگشتر",
  bracelet: "دستبند",
  necklace: "گردنبند",
  earrings: "گوشواره",
  set: "ست زیورآلات",
} as const;

export const genders = { women: "زنانه", men: "مردانه", unisex: "مشترک" } as const;

export type Gender = keyof typeof genders;
export type Category = keyof typeof categories;
export type PricingType = "live-gold" | "fixed";

export interface ProductImage {
  src: string;
  alt: string;
  position?: string;
}

export interface Product {
  id: string;
  slug: string;
  nameFa: string;
  descriptionFa: string;
  gender: Gender;
  category: Category;
  pricingType: PricingType;
  fixedPriceToman?: number;
  goldWeightGrams?: number;
  goldPurity?: string;
  images: ProductImage[];
  featured?: boolean;
  available?: boolean;
}

function sample(
  photo: number,
  slug: string,
  nameFa: string,
  gender: Gender,
  category: Category,
  descriptionFa: string,
  alt: string,
  options: { fixed?: number; featured?: boolean; position?: string } = {},
): Product {
  return {
    id: String(photo),
    slug,
    nameFa,
    descriptionFa,
    gender,
    category,
    pricingType: options.fixed === undefined ? "live-gold" : "fixed",
    fixedPriceToman: options.fixed,
    featured: options.featured,
    images: [{
      src: "/images/products/img-" + photo + ".webp",
      alt,
      position: options.position,
    }],
  };
}

// Photography and names illustrate the catalog. Material, weight, purity and stock are unverified.
export const products: Product[] = [
  sample(7790, "baran-necklace", "گردنبند باران", "women", "necklace", "آویزی به شکل قطره که روی زنجیری ظریف می‌نشیند. خطی نرم و روشن برای همراهی با یقه‌های ساده.", "گردنبند با آویز قطره‌ای روی پارچهٔ روشن", { featured: true, position: "50% 66%" }),
  sample(7804, "sayeh-bracelet", "دستبند سایه", "men", "bracelet", "بافت تیره در کنار جزئیات طلایی، تضادی آرام می‌سازد. فرمی ساده که جزئیاتش را از نزدیک نشان می‌دهد.", "دستبند بافتهٔ مشکی با بست طلایی روی زمینهٔ سنگی", { fixed: 1850000, featured: true, position: "50% 65%" }),
  sample(7816, "halo-ring", "انگشتر هاله", "women", "ring", "دو خطِ ظریف در کنار هم؛ یکی ساده، دیگری با ردیفی از درخشش. فرمی که با تغییر زاویه، چهره‌ای تازه پیدا می‌کند.", "انگشتر دوخطی روی پایه‌ای سنگی در میان پارچهٔ کرم", { featured: true, position: "50% 59%" }),
  sample(7808, "madar-bracelet", "دستبند مدار", "men", "bracelet", "حلقه‌های درشت و یک سطح صاف در مرکز؛ فرمی هندسی که روی مچ به‌خوبی دیده می‌شود.", "دستبند زنجیری طلایی با پلاک مستطیل روی مچ", { featured: true }),
  sample(7777, "roshan-ring", "انگشتر روشن", "women", "ring", "حلقه‌ای باریک با ردیفی از نقاط روشن، مناسب ترکیب با حلقه‌های ساده.", "حلقهٔ باریک با ردیف نگین روی پایهٔ گرد", { fixed: 1480000 }),
  sample(7782, "ribbon-bracelet", "دستبند روبان", "women", "bracelet", "ردیفی پیوسته از جزئیات براق که در امتداد مچ خم می‌شود.", "دستبند نگین‌دار به شکل موج روی زمینهٔ شنی", { fixed: 2250000 }),
  sample(7786, "sadaf-ring", "انگشتر صدف", "women", "ring", "سطح صیقلی حلقه در کنار ردیف کوتاهی از نگین‌ها.", "انگشتر طلایی و نگین‌دار درون صدف روی پارچهٔ زیتونی"),
  sample(7787, "kaman-bracelet", "دستبند کمان", "unisex", "bracelet", "یک کمان صیقلی با دو انتهای باز و خطی پیوسته.", "دستبند باز طلایی روی سطح روشن"),
  sample(7792, "ayneh-necklace", "گردنبند آینه", "women", "necklace", "آویز هندسی با ردیف‌هایی که نگاه را به مرکز هدایت می‌کنند.", "گردنبند نقره‌ای‌رنگ با آویز هندسی روی سطح سرامیکی", { fixed: 2350000 }),
  sample(7795, "shabdar-necklace", "گردنبند شبدر", "women", "necklace", "آویز چهارپر روی زنجیری ظریف، با گوشه‌هایی نرم و گرد.", "آویز سفید چهارپر و زنجیر طلایی کنار سنگ"),
  sample(7797, "taban-earrings", "گوشواره تابان", "women", "earrings", "آویزهای مستطیل با جزئیات روشن و فرم باریک.", "جفت گوشوارهٔ آویز مستطیلی روی پایه‌های فلزی", { fixed: 1920000 }),
  sample(7798, "do-par-earrings", "گوشواره دوپر", "women", "earrings", "حلقه‌هایی با دو سطح متفاوت که در نور جلوهٔ خود را نشان می‌دهند.", "دو گوشوارهٔ حلقه‌ای طلایی روی پارچهٔ ساتن"),
  sample(7806, "zanjir-set", "ست زنجیر", "men", "set", "گردنبند و دستبند زنجیری با حلقه‌هایی به‌هم‌پیوسته و مشخص.", "گردنبند و دستبند زنجیری طلایی روی زمینهٔ مشکی"),
  sample(7807, "rad-bracelet", "دستبند راد", "men", "bracelet", "بندی تیره که در ترکیب با خطوط براق جلوه پیدا می‌کند.", "نمای دست با دستبندهای تیره و طلایی", { fixed: 1650000 }),
  sample(7810, "peyvand-ring", "انگشتر پیوند", "unisex", "ring", "حلقه‌ای پهن با نقش تکرارشوندهٔ اتصال‌ها.", "انگشتر پهن طلایی روی سنگ در نور آفتاب"),
  sample(7812, "hamraah-set", "ست دستبند همراه", "women", "set", "دو خط زنجیری با بافت‌های متفاوت که در کنار هم قرار می‌گیرند.", "دو دستبند زنجیری طلایی روی مچ کنار پارچهٔ بژ"),
  sample(7815, "mah-ring", "انگشتر ماه", "women", "ring", "نگینی روشن در مرکز و خطی باریک در امتداد حلقه.", "انگشتر با نگین گرد روی چین‌های پارچهٔ روشن", { fixed: 2720000 }),
  sample(7871, "nava-set", "ست دستبند نوا", "women", "set", "ترکیبی از بست‌های کشیده و حلقه‌های زنجیری، برای پوشیدن کنار هم.", "نمای نزدیک از دستبندهای طلایی روی مچ", { fixed: 3780000 }),
  sample(7872, "negar-bracelet", "دستبند نگار", "unisex", "bracelet", "سطحی با خطوط ریز و نشانه‌های تکرارشونده در سراسر دستبند.", "دستبند طلایی با شیارهای موازی روی زمینهٔ سفید"),
  sample(7873, "ava-earrings", "گوشواره آوا", "women", "earrings", "حلقه‌های کوچک با نقشی ساده روی سطح بیرونی.", "جفت گوشوارهٔ حلقه‌ای طلایی با نقش روی بدنه", { fixed: 1680000 }),
  sample(7874, "mehvar-bracelet", "دستبند محور", "unisex", "bracelet", "خطی باریک و یک اتصال کوچک که فرم دایره را قطع می‌کند.", "دستبند باریک طلایی در مقابل زمینهٔ آبی"),
  sample(7875, "bahar-bracelet", "دستبند بهار", "women", "bracelet", "نقش‌های چهارپر در فاصله‌های منظم روی زنجیر قرار گرفته‌اند.", "دستبند با آویزهای چهارپر کنار نقش صدف در شن"),
  sample(7876, "gosasteh-earrings", "گوشواره گره", "women", "earrings", "دو حلقهٔ کشیده در هر گوشواره که با حرکت، زاویهٔ تازه‌ای پیدا می‌کنند.", "گوشواره‌های طلایی با حلقه‌های کشیده روی سنگ", { fixed: 2180000 }),
  sample(7877, "gol-ring", "انگشتر گل", "women", "ring", "نقش چهارپر با لبه‌های ریز و حلقه‌ای ساده.", "انگشتر طلایی با نقش گل چهارپر روی زمینهٔ سفید", { fixed: 1760000 }),
  sample(7878, "naqsh-ring", "انگشتر نقش", "women", "ring", "حلقه‌ای پهن با دو ردیف نقش گل و بافتی ریز در حاشیه.", "انگشتر پهن طلایی با نقش گل و حاشیهٔ بافت‌دار"),
  sample(7879, "setareh-necklace", "گردنبند ستاره", "women", "necklace", "نقش‌های کوچک چهارپر در امتداد زنجیری ظریف قرار گرفته‌اند.", "گردنبند طلایی با چند آویز چهارپر روی گردن"),
  sample(7880, "mowj-necklace", "گردنبند موج", "unisex", "necklace", "حلقه‌های کشیده، ریتمی منظم در امتداد گردنبند می‌سازند.", "گردنبند زنجیری طلایی روی صفحات موج‌دار آبی", { fixed: 2890000 }),
  sample(7881, "abresham-necklace", "گردنبند ابریشم", "women", "necklace", "زنجیری نرم با سطحی تخت که نور را در امتداد خود می‌گیرد.", "زنجیر تخت طلایی روی پارچهٔ ساتن بژ"),
];

export const showcaseProducts = products.filter((product) => product.featured);
export const heroProduct = products.find((product) => product.slug === "halo-ring")!;

export function inCollection(product: Product, gender: "women" | "men") {
  return product.gender === gender || product.gender === "unisex";
}

export function productHref(product: Product) {
  return "/products/" + product.slug;
}
