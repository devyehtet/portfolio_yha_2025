export type FeaturedBrand = {
  category: string;
  focus: string;
  name: string;
  summary: string;
};

export type BrandWordmark = {
  accent: "emerald" | "indigo" | "sky" | "slate";
  cardDisplayName?: string;
  displayName: string;
  logoSrc?: string;
  name: string;
  size: "lg" | "md" | "sm";
};

export const brandWordmarks: BrandWordmark[] = [
  {
    name: "Samsung",
    displayName: "SAMSUNG",
    logoSrc: "/logos/samsung.svg",
    size: "lg",
    accent: "sky",
  },
  {
    name: "Tuborg",
    cardDisplayName: "Tuborg",
    displayName: "TUBORG",
    size: "md",
    accent: "emerald",
  },
  {
    name: "Vivo",
    displayName: "vivo",
    logoSrc: "/logos/vivo.svg",
    size: "md",
    accent: "indigo",
  },
  {
    name: "CB Bank",
    cardDisplayName: "CB Bank",
    displayName: "CB BANK",
    size: "md",
    accent: "slate",
  },
  {
    name: "Wave Money",
    cardDisplayName: "Wave\nMoney",
    displayName: "WAVE MONEY",
    size: "lg",
    accent: "sky",
  },
  {
    name: "L'Oreal Paris",
    cardDisplayName: "L'Oreal\nParis",
    displayName: "L'OREAL PARIS",
    size: "lg",
    accent: "slate",
  },
  {
    name: "Foodpanda",
    cardDisplayName: "foodpanda",
    displayName: "foodpanda",
    size: "md",
    accent: "indigo",
  },
  {
    name: "Visa",
    cardDisplayName: "VISA",
    displayName: "VISA",
    size: "sm",
    accent: "sky",
  },
  {
    name: "Yoma Bank",
    cardDisplayName: "Yoma Bank",
    displayName: "YOMA BANK",
    size: "md",
    accent: "slate",
  },
  {
    name: "Premier Coffee",
    displayName: "PREMIER COFFEE",
    logoSrc: "/logos/premier-coffee.svg",
    size: "lg",
    accent: "emerald",
  },
  {
    name: "Best-T",
    cardDisplayName: "Best-T",
    displayName: "BEST-T",
    size: "sm",
    accent: "sky",
  },
  {
    name: "Shine",
    cardDisplayName: "Shine",
    displayName: "SHINE",
    size: "sm",
    accent: "indigo",
  },
];

export const featuredBrands: FeaturedBrand[] = [
  {
    name: "MCIX Thailand Agency",
    category: "Regional Agency Leadership",
    summary:
      "Digital strategy, media execution, and performance optimization across SEA-focused campaigns and teams.",
    focus: "Cross-market strategy and media leadership",
  },
  {
    name: "Homology",
    category: "Operations and Performance",
    summary:
      "Campaign delivery systems, team operations, and performance workflows shaped for stronger client outcomes.",
    focus: "Operational rigor and team management",
  },
  {
    name: "Passion Point Media Ltd",
    category: "Media Planning and Buying",
    summary:
      "Hands-on media planning, budget control, and multi-platform advertising execution for client growth.",
    focus: "Paid media strategy and execution",
  },
  {
    name: "City Mart Holding Ltd",
    category: "In-House Brand Growth",
    summary:
      "Digital marketing support focused on retail visibility, audience engagement, and traffic growth.",
    focus: "Retail marketing and customer demand",
  },
];

export const featuredBrandTicker = [
  ...brandWordmarks,
  ...brandWordmarks,
].map((brand) => brand.name);
