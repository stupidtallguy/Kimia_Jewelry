import type { ProductImage } from "./products";

type Collection = {
  title: string;
  description: string;
  image: ProductImage;
};

export const collections: Record<"women" | "men", Collection> = {
  women: {
    title: "دنیای زنانه",
    description: "از ظرافتِ یک حلقه تا درخششِ یک آویز؛ قطعه‌هایی برای هر روز و لحظه‌های خاص.",
    image: {
      src: "/images/products/img-7879.webp",
      alt: "نمای نزدیک گردنبند طلایی با آویزهای چهارپر",
      position: "50% 55%",
    },
  },
  men: {
    title: "دنیای مردانه",
    description: "فرم‌های صریح، بافت‌های عمیق و جزئیاتی که از نزدیک دیده می‌شوند.",
    image: {
      src: "/images/products/img-7807.webp",
      alt: "نمای نزدیک دستبندهای مردانه روی مچ",
      position: "50% 48%",
    },
  },
};
