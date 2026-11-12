export const whyAviStats = [
  { value: '4+', label: 'Production Projects Shipped' },
  { value: '0%', label: 'Platform Cut On Your Invoice' },
  { value: '<48h', label: 'Typical Scoping Turnaround' },
  { value: '10+', label: 'Years Engineering Experience' },
];

export const whyAviDifferentiators = [
  {
    icon: 'zap',
    title: 'Ships fast, ships right',
    description:
      'Production-ready code in days, not months — SaaS platforms, AI tools, and service systems still running in production today.',
  },
  {
    icon: 'code',
    title: 'Full-stack depth, not breadth',
    description:
      'Frontend, backend, infrastructure, and AI, all under one engineer. No hand-offs, no translation loss between specialists.',
  },
  {
    icon: 'shield',
    title: 'No platform risk',
    description:
      'Direct contracts, direct IP ownership. No escrow disputes, no freelancer disappearing after the deposit clears.',
  },
  {
    icon: 'clock',
    title: 'Async-first, always available',
    description:
      'Daily progress updates and async check-ins give you clear visibility into exactly where your project stands.',
  },
  {
    icon: 'users',
    title: 'Full ownership mindset',
    description:
      'Builds treated like production systems from day one — tested, documented, and maintained, not throwaway prototypes.',
  },
  {
    icon: 'star',
    title: 'You talk to the engineer',
    description:
      'No account manager, no sales rep, no coordinator in the loop. You talk directly to the person writing the code.',
  },
] as const;

export interface PlatformComparison {
  marker: 'green' | 'blue' | 'amber' | 'neutral';
  title: string;
  tagline: string;
  problems: string[];
  workingWithAvi: string[];
}

export const whyAviComparisons: PlatformComparison[] = [
  {
    marker: 'green',
    title: 'Avi vs Upwork',
    tagline: 'The race-to-the-bottom marketplace',
    problems: [
      'Up to 20% platform fee taken from every invoice',
      'Dozens of proposals from unvetted developers to sort through',
      'No accountability once the contract ends',
      'Time-zone gaps and slow back-and-forth communication',
      'Hidden fees on both sides of the contract',
    ],
    workingWithAvi: [
      '0% markup — you pay only for the work',
      'Direct Slack or email access, every time',
      'Long-term accountability, not a one-and-done gig',
      'Async communication with daily updates',
      'Fixed or milestone pricing, no surprises',
    ],
  },
  {
    marker: 'green',
    title: 'Avi vs Fiverr',
    tagline: 'Gig-economy quality at gig-economy depth',
    problems: [
      'Sellers optimized for 5-star reviews, not outcomes',
      'No real system design or architecture planning',
      'Repeated back-and-forth just to clarify requirements',
      "Copy-paste solutions that don't fit your product",
      "Code that doesn't scale past the first version",
    ],
    workingWithAvi: [
      'System design and architecture from day one',
      'Clean, documented, production-grade code',
      'Requirements discovered and documented up front',
      'You own 100% of the code, no license surprises',
      'Scalability considered from the first commit',
    ],
  },
  {
    marker: 'blue',
    title: 'Avi vs Toptal',
    tagline: 'Elite talent, at elite price tags and timelines',
    problems: [
      'Premium fees that price out startups',
      'Weeks-long vetting and matching process',
      'Rotating talent pool — no guaranteed continuity',
      'Built for enterprise engagements, not scrappy teams',
      "Contracts signed before you've seen any work",
    ],
    workingWithAvi: [
      'Senior-level engineering without the enterprise price',
      'Work starts within days, not weeks',
      'You always work with Avi directly — no rotation',
      'Startup pace, startup communication style',
      'Flexible engagement — weekly, milestone, or retainer',
    ],
  },
  {
    marker: 'amber',
    title: 'Avi vs Freelancer.com',
    tagline: 'Bidding wars and unpredictable quality',
    problems: [
      'Race-to-the-bottom bidding wars',
      'Hard to verify real experience behind a profile',
      'Disputes and refunds are slow and painful',
      'Milestone releases held up by platform policy',
      'Developers juggling ten projects at once',
    ],
    workingWithAvi: [
      'One focused engagement at a time',
      'A verifiable track record of shipped production systems',
      'Direct payment, no platform holding your funds',
      'Milestones tied to working demos, not promises',
      'Dedicated bandwidth for your project',
    ],
  },
  {
    marker: 'neutral',
    title: 'Avi vs GitHub (Developer Search)',
    tagline: 'Finding someone on GitHub is a cold-start problem',
    problems: [
      'No visibility into availability or pricing',
      "Open-source contributions aren't commercial delivery experience",
      'No contracting or payment structure in place',
      'Side-project energy, not production accountability',
      'No one to hold accountable if things go sideways',
    ],
    workingWithAvi: [
      'Clear pricing and engagement models up front',
      'Real production experience across AI, SaaS, and service platforms',
      'A defined process from scoping to delivery',
      'Products built for real users, not demos',
      'End-to-end contractual accountability',
    ],
  },
];

export const whyAviHonestTake = [
  "Let's be direct: working with Avi beats the average Upwork or Fiverr freelancer — not just on structure, experience, and accountability, but because the race-to-the-bottom dynamics of those platforms are the real problem.",
  'On Upwork, a single job post can attract dozens of proposals within hours, many from developers underbidding each other to win the contract — which usually means someone, somewhere, is cutting corners to make the math work.',
  'Fiverr optimizes for 5-star reviews over outcomes, which pushes sellers toward fast, templated delivery rather than code built to last.',
  "Toptal is genuinely elite — but it's priced and paced for enterprise budgets. Avi works at startup speed, with startup-friendly pricing.",
  "Freelancer.com and GitHub searches are cold outreach — you're betting on a profile. Avi has a track record of production systems across AI platforms, service management tools, and performance-tuned websites that are live today.",
];

export const whyAviClosingStatement =
  'Avi charges fairly, delivers reliably, and doesn’t disappear after the contract closes.';
