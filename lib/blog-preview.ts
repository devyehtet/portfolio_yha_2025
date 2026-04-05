export type BlogPreview = {
  category: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  roleFocus: string;
  slug: string;
  title: string;
};

export const blogPreviews: BlogPreview[] = [
  {
    slug: "myanmar-digital-marketing-strategy-playbook",
    title: "Myanmar Digital Marketing Strategy Playbook for Growth-Focused Brands",
    category: "Strategy",
    roleFocus: "Consulting",
    publishedAt: "2026-04-03",
    readTime: "8 min read",
    excerpt:
      "A practical framework for Myanmar brands that want stronger traffic, sharper messaging, and better conversion from organic and paid channels.",
    description:
      "Learn how a Myanmar digital marketing consultant can build a measurable strategy across SEO, paid media, content, and conversion planning.",
  },
  {
    slug: "freelance-digital-media-buying-myanmar-brands",
    title: "Freelance Digital Media Buying for Myanmar Brands: How to Scale Without Waste",
    category: "Media Buying",
    roleFocus: "Freelance Media Buying",
    publishedAt: "2026-04-03",
    readTime: "7 min read",
    excerpt:
      "What brands should expect from a freelance media buyer, from campaign structure and audience testing to reporting discipline and budget control.",
    description:
      "A tactical guide to freelance digital media buying for Myanmar brands across Meta, Google Ads, budget planning, and performance reporting.",
  },
  {
    slug: "digital-marketing-training-myanmar-teams",
    title: "Digital Marketing Training in Myanmar: What Teams Actually Need to Learn",
    category: "Training",
    roleFocus: "Trainer",
    publishedAt: "2026-04-03",
    readTime: "6 min read",
    excerpt:
      "A training roadmap for Myanmar teams that need practical skills in campaign setup, analytics, creative testing, and performance reporting.",
    description:
      "See how Myanmar digital marketing training can help in-house teams improve execution, media buying discipline, and reporting confidence.",
  },
];
