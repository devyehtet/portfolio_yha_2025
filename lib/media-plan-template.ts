export type MediaPlanBlock = {
  description: string;
  fields: string[];
  title: string;
};

export type MediaPlanDemoMetric = {
  label: string;
  note: string;
  value: string;
};

export type MediaPlanDemoRow = {
  audience: string;
  budget: string;
  channel: string;
  flight: string;
  objective: string;
  phase: string;
  target: string;
};

export const mediaPlanHighlights = [
  {
    label: "Built For",
    value: "Launch planning, monthly reviews, client approvals, and workshops.",
  },
  {
    label: "Format",
    value: "Structured for Google Sheets with channel role, KPI, timing, and budget clarity.",
  },
  {
    label: "Workflow",
    value: "Visitors request access first, then the template is shared manually after review.",
  },
];

export const mediaPlanWorkflow = [
  "Start with one business goal and one primary KPI before deciding channels.",
  "Clarify audience, offer, and message angle before making budget assumptions.",
  "Give each channel a clear role so spend is not duplicated.",
  "Define reporting cadence and optimization triggers before launch.",
];

export const mediaPlanBlocks: MediaPlanBlock[] = [
  {
    title: "Business Objective",
    description:
      "Anchor the sheet around the commercial goal, the offer, and the KPI that matters most.",
    fields: ["Campaign name", "Planning period", "Primary objective", "North-star KPI"],
  },
  {
    title: "Audience and Market Context",
    description:
      "Make the target audience, market conditions, and demand insight visible before channel planning.",
    fields: ["Audience segments", "Geography", "Pain points", "Seasonal note"],
  },
  {
    title: "Channel and Budget Mix",
    description:
      "Assign a clear role, budget range, and pacing expectation to every channel in the plan.",
    fields: ["Channel role", "Budget split", "Flighting", "Guardrails"],
  },
  {
    title: "Creative and Landing Support",
    description:
      "Keep the message angle, creative formats, and landing-page notes in the same planning flow.",
    fields: ["Message hook", "Formats", "Test ideas", "Landing note"],
  },
];

export const mediaPlanDemoMetrics: MediaPlanDemoMetric[] = [
  {
    label: "Planned Reach",
    value: "5.4M",
    note: "Estimated primary reach from paid media",
  },
  {
    label: "Traffic Goal",
    value: "92K",
    note: "Qualified landing-page sessions",
  },
  {
    label: "Target CPA",
    value: "$11.50",
    note: "Blended acquisition target",
  },
  {
    label: "Media Budget",
    value: "$12K",
    note: "Paid media plus landing support",
  },
];

export const mediaPlanDemoRows: MediaPlanDemoRow[] = [
  {
    phase: "Awareness",
    channel: "Meta Ads",
    objective: "Reach new audiences and test message hooks",
    audience: "Urban buyers, lookalikes, retargeting pools",
    budget: "$4,200",
    flight: "Weeks 1-4",
    target: "2.8M reach at efficient CPM",
  },
  {
    phase: "Awareness",
    channel: "TikTok",
    objective: "Discover winning creative angles quickly",
    audience: "Video-first audiences in key cities",
    budget: "$1,800",
    flight: "Weeks 1-3",
    target: "1.2M views and strong CTR",
  },
  {
    phase: "Consideration",
    channel: "Google Search",
    objective: "Capture branded and category intent",
    audience: "High-intent category searchers",
    budget: "$3,600",
    flight: "Weeks 2-8",
    target: "High CTR and efficient CVR",
  },
  {
    phase: "Conversion",
    channel: "Landing Page + CRO",
    objective: "Improve conversion flow for paid traffic",
    audience: "Visitors from Meta, TikTok, and Google",
    budget: "$1,200",
    flight: "Weeks 1-8",
    target: "Higher CVR and lower CPA",
  },
];
