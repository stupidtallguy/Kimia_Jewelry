import type { Category } from "@/lib/products";
import { editorialProduct } from "./photography";

const campaigns = {
  women: {
    headline: ["زیبایی،", "به زبان تو"],
    subtitle: "جزئیاتی ظریف برای لحظه‌هایی که به یاد می‌مانند.",
    hero: 7879,
    inset: 7815,
    categories: [
      ["necklace", 7795, "آویزهایی برای همراهی با خطِ یقه."],
      ["ring", 7777, "حلقه‌هایی که به‌تنهایی یا در کنار هم جلوه می‌کنند."],
      ["earrings", 7797, "فرم‌هایی که با حرکت چهره جان می‌گیرند."],
      ["bracelet", 7875, "خطی از نور در امتداد مچ."],
    ] satisfies [Category, number, string][],
    storyHeading: "زیبایی در جزئیات معنا پیدا می‌کند.",
    story: [7816, 7790, 7798],
    runwayHeading: "هر قطعه، حال‌وهوایی تازه",
    runway: [7871, 7792, 7876, 7881, 7782, 7878],
    closing: "انتخاب تو، امضای استایل توست.",
    closingPhoto: 7812,
  },
  men: {
    headline: ["قدرت،", "در جزئیات است."],
    subtitle: "فرم‌های متمایز، بافت‌های عمیق و جزئیاتی که از نزدیک دیده می‌شوند.",
    hero: 7807,
    inset: 7804,
    categories: [
      ["bracelet", 7808, "از بافت تیره تا حلقه‌های صیقلی."],
      ["set", 7806, "دو قطعه با یک زبان مشترک."],
      ["ring", 7810, "حجم، سطح و خطوط تکرارشونده."],
      ["necklace", 7880, "زنجیرهایی با ریتم و فرم مشخص."],
    ] satisfies [Category, number, string][],
    storyHeading: "فرم، بافت و وزنِ نگاه",
    story: [7804, 7808, 7806],
    runwayHeading: "خطوطی که دیده می‌شوند",
    runway: [7806, 7810, 7807, 7880, 7787, 7874],
    closing: "استایل تو، امضای توست.",
    closingPhoto: 7810,
  },
};

export function collectionCampaign(gender: keyof typeof campaigns) {
  const campaign = campaigns[gender];
  return {
    ...campaign,
    hero: editorialProduct(campaign.hero),
    inset: editorialProduct(campaign.inset),
    categories: campaign.categories.map(([category, id, description]) => ({
      category, image: editorialProduct(id).images[0], description,
    })),
    story: campaign.story.map(editorialProduct),
    runway: campaign.runway.map(editorialProduct),
    closingPhoto: editorialProduct(campaign.closingPhoto),
  };
}
