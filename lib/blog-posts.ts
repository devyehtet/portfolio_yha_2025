import { blogPreviews } from "./blog-preview";

export type BlogSection = {
  bullets?: string[];
  paragraphs: string[];
  title: string;
};

export type BlogPost = (typeof blogPreviews)[number] & {
  intro: string;
  seoPhrases: string[];
  sections: BlogSection[];
};

const postDetails: Record<
  string,
  Pick<BlogPost, "intro" | "sections" | "seoPhrases">
> = {
  "myanmar-digital-marketing-strategy-playbook": {
    intro:
      "Myanmar brands do not need a bigger list of channels. They need a sharper operating system for traffic, messaging, and conversion. The brands that grow consistently are usually the ones that connect business goals to channel execution instead of treating Facebook posts, Google Ads, SEO, and landing pages as separate jobs.",
    seoPhrases: [
      "Myanmar digital marketing",
      "digital marketing consultant Myanmar",
      "SEO and paid media strategy Myanmar",
    ],
    sections: [
      {
        title: "Start with business questions, not platform tactics",
        paragraphs: [
          "A strong Myanmar digital marketing strategy starts with the business model. Are you trying to generate leads, sell products directly, increase repeat purchase, or improve brand trust before a market expansion? Without that clarity, every channel starts competing for attention instead of contributing to one funnel.",
          "As a consultant, I usually map the journey from audience problem to conversion action. That makes it easier to decide whether SEO should capture intent, whether Meta should drive discovery, and whether remarketing should be used to recover interested visitors.",
        ],
        bullets: [
          "Define one primary conversion goal for each landing page.",
          "Separate awareness campaigns from lead-generation campaigns.",
          "Measure cost per qualified lead, not just clicks or reach.",
        ],
      },
      {
        title: "Build search demand around local commercial intent",
        paragraphs: [
          "SEO traffic becomes valuable when content is aligned with the terms people actually use before they inquire or buy. For Myanmar-focused businesses, that usually means blending service keywords, location phrases, and decision-stage topics such as pricing, process, platform choice, or case-study style educational content.",
          "A blog strategy can help here, but only if each article supports a commercial theme. For example, articles around Myanmar digital marketing, media buying, campaign management, and team training can all feed authority back into your services page through internal links and clear calls to action.",
        ],
      },
      {
        title: "Use paid media to validate what SEO should expand",
        paragraphs: [
          "Paid campaigns are not only for immediate leads. They are also a fast research loop. When Meta or Google Ads data shows that one offer, one audience, or one message consistently wins, that is a strong signal for what long-form SEO content should explore in more depth.",
          "This is especially useful for Myanmar brands that are testing different product angles or trying to understand whether they should speak to local buyers, diaspora audiences, or regional decision makers in Thailand and Singapore.",
        ],
        bullets: [
          "Turn winning ad hooks into blog post angles.",
          "Use search-term reports to plan future content clusters.",
          "Compare landing page conversion rate before scaling traffic.",
        ],
      },
      {
        title: "Create authority through clarity and consistency",
        paragraphs: [
          "If you want to be known for Myanmar digital marketing, your site should make three things obvious: what you do, who you help, and how you think. Publishing consistent articles around consulting, training, and freelance media buying helps build that narrative over time.",
          "The goal is not to publish random content. The goal is to publish useful opinions, frameworks, and tactical guidance that show your decision-making quality. That is what turns a portfolio site into a lead-generation asset.",
        ],
      },
    ],
  },
  "freelance-digital-media-buying-myanmar-brands": {
    intro:
      "Freelance digital media buying works best when it is treated like a performance function, not a task list. Myanmar brands often hire freelancers because they need speed, channel expertise, and budget discipline without committing to a large internal team. That only pays off if campaign structure, reporting, and creative testing are handled with rigor.",
    seoPhrases: [
      "freelance digital media buying Myanmar",
      "Myanmar media buyer",
      "Meta and Google Ads freelancer Myanmar",
    ],
    sections: [
      {
        title: "What a good freelance media buyer should own",
        paragraphs: [
          "A strong freelance media buyer should do more than launch ads. They should challenge budget allocation, improve audience logic, pressure-test creative assumptions, and keep reporting tied to business outcomes.",
          "That means the role usually covers campaign architecture, tracking checks, daily optimization, audience refresh planning, and weekly performance readouts with clear next actions.",
        ],
        bullets: [
          "Channel and budget planning",
          "Campaign setup and naming hygiene",
          "Creative test planning and learning summaries",
          "Performance reporting with actionable recommendations",
        ],
      },
      {
        title: "How Myanmar brands can avoid wasted spend",
        paragraphs: [
          "Wasted spend often comes from mixing too many goals in one campaign. If lead generation, reach, traffic, and remarketing all live inside the same budget without a clear hierarchy, the account becomes hard to optimize and even harder to explain.",
          "A better approach is to create simpler campaign systems with one purpose per campaign and one decision framework for scaling, pausing, or changing creative. This is where freelance specialists can add immediate value because they are forced to be selective.",
        ],
      },
      {
        title: "Why reporting matters as much as buying",
        paragraphs: [
          "Media buying without clear reporting creates dependence. The client sees spend, but not the logic. A better freelance setup includes dashboards or summary reports that explain what changed, what improved, and what is being tested next.",
          "That kind of communication is especially important when business owners want to understand if weak performance comes from targeting, offer quality, landing page friction, or market demand.",
        ],
      },
      {
        title: "When to bring in a consultant instead of only a buyer",
        paragraphs: [
          "If the business has traffic but weak conversion, or if multiple teams are involved in creative, CRM, website, and reporting, a consultant lens becomes just as important as a buyer lens. In those cases, the problem is rarely limited to campaign toggles.",
          "The most useful freelance media buying relationships usually combine execution with strategic advice so the account improves as a system, not only as a dashboard.",
        ],
      },
    ],
  },
  "digital-marketing-training-myanmar-teams": {
    intro:
      "Training only works when it changes how a team executes next week. Many digital marketing workshops sound impressive in the room but fail in practice because they do not connect theory to the tools, workflows, and decision points teams actually use every day.",
    seoPhrases: [
      "digital marketing training Myanmar",
      "Myanmar digital marketing trainer",
      "performance marketing workshop Myanmar",
    ],
    sections: [
      {
        title: "What in-house teams usually struggle with",
        paragraphs: [
          "Most teams do not need another generic overview of digital marketing channels. They need confidence in campaign setup, audience logic, creative testing, attribution basics, and performance reporting.",
          "Training is most effective when it addresses the exact points where execution breaks: poor briefing, unclear KPIs, weak campaign naming, inconsistent tracking, and reporting that only repeats numbers without interpretation.",
        ],
      },
      {
        title: "A useful training roadmap for Myanmar teams",
        paragraphs: [
          "A practical training program usually starts with fundamentals and then moves quickly into live examples. Teams need to see how a strategy becomes account structure, how content maps to funnel stages, and how reporting should shape the next budget decision.",
          "For Myanmar businesses, I would usually structure training around search intent, Meta campaign planning, Google Ads basics, creative testing frameworks, landing page conversion logic, and analytics interpretation.",
        ],
        bullets: [
          "Campaign objective selection",
          "Audience and keyword planning",
          "Creative testing frameworks",
          "Reporting interpretation for managers and founders",
        ],
      },
      {
        title: "Training should leave behind templates, not just slides",
        paragraphs: [
          "The real value of a trainer is not only presentation delivery. It is the operating system left behind after the session. That can include planning templates, reporting formats, QA checklists, and decision guides for daily optimization.",
          "Those tools help teams execute after the workshop, which is usually the moment when knowledge gaps become visible again.",
        ],
      },
      {
        title: "How training supports consulting and execution",
        paragraphs: [
          "Training, consulting, and freelance media buying do not need to compete. In many cases, they reinforce each other. Training builds team capability, consulting aligns the overall strategy, and freelance buying accelerates execution where specialist support is needed.",
          "If you want to be known in the market, publishing educational content around this combined model is a strong move. It demonstrates depth and makes your website useful even before a prospect reaches out.",
        ],
      },
    ],
  },
};

export const blogPosts: BlogPost[] = blogPreviews.map((preview) => ({
  ...preview,
  ...postDetails[preview.slug],
}));

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
