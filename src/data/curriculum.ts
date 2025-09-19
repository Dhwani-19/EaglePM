export interface CurriculumTrack {
  id: number;
  title: string;
  modules: Array<{
    id: number;
    title: string;
    lessons: string[];
  }>;
}

export interface FlattenedLessonItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  content: string;
  trackId: number;
  trackTitle: string;
  moduleId: number;
  moduleTitle: string;
  lessonNumber: number;
}

export const curriculum: CurriculumTrack[] = [
  {
    id: 1,
    title: 'Product Management Foundations',
    modules: [
      {
        id: 1,
        title: 'Introduction to PM Foundations',
        lessons: [
          'Feature Opportunity Validation',
          'Refine User Value',
          'Refine Business Value',
          'Validate & Communicate Opportunity',
        ],
      },
      {
        id: 2,
        title: 'Feature Design',
        lessons: [
          'Constrained Divergence',
          'Iterative Convergence',
          'Design Approval & Building Alignment',
        ],
      },
      {
        id: 3,
        title: 'Feature Development',
        lessons: [
          'The Feature Development Playbook',
          'Mapping Your Team',
          'Preparing for Development',
          'Managing Execution',
          'Risk Management',
        ],
      },
      {
        id: 4,
        title: 'Feature Launch & Iteration',
        lessons: [
          'Feature Launch Coordination',
          'Feature Performance',
          'Post Launch Communication',
        ],
      },
      {
        id: 5,
        title: 'Feature Prioritisation',
        lessons: [
          'Prerequisites to Roadmap Prioritisation',
          'Building a List of Roadmap Ideas',
          'Prioritising Ideas on your Roadmap',
          'Roadmap Case Study',
          'Sprint Level Prioritisation',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Data for Product Managers',
    modules: [
      {
        id: 6,
        title: 'Altitude Maps',
        lessons: [
          'Building an Altitude Map',
          'Using the Altitude Map',
        ],
      },
      {
        id: 7,
        title: 'Instrumentation & Generating Data Insights',
        lessons: [
          'Taking Control with Instrumentation',
          'Generating Data Insights',
        ],
      },
      {
        id: 8,
        title: 'Key Analytical Tools',
        lessons: [
          'The 2 Key Analytical Tools',
          'Segmentation Analysis Deep Dive',
          'Relationship between Variables Deep Dive',
        ],
      },
      {
        id: 9,
        title: 'Communicating Persuasively',
        lessons: [
          'Communicating Persuasively with Data',
        ],
      },
      {
        id: 10,
        title: 'Leveraging Data',
        lessons: [
          'Leveraging your Data Resources',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Experimentation & A / B Testing',
    modules: [
      {
        id: 11,
        title: 'Strategic Experimentation',
        lessons: [
          'Why Experimentation is Critical',
          'Cultural Barriers to Experimentation',
          'Five Myths of Experimentation',
          'Strategic vs Ad Hoc Experimentation',
        ],
      },
      {
        id: 12,
        title: 'Identifying a Strategic Opportunity',
        lessons: [
          'Building a Strategic Foundation',
          'When to Use Experimentation',
          '3 Components of a Strategic Opportunity',
          'Understanding Your Strategy',
          'Defining Your Strategy',
          'Acquisition & Retention',
          'Monetisation & Defensibility',
        ],
      },
      {
        id: 13,
        title: 'Customer Problem',
        lessons: [
          'Defining a Customer Problem',
          'User Insight to Customer Problem',
          'Data Insight to Customer Problem',
          'Mistakes in Defining Customer Problems',
        ],
      },
      {
        id: 14,
        title: 'Business Outcome',
        lessons: [
          'Outcome Metrics',
          'Acquisition Outcome Metrics',
          'Retention Outcome Metrics',
          'Monetisation Outcome Metrics',
        ],
      },
      {
        id: 15,
        title: 'Prioritising & Communicating',
        lessons: [
          'Prioritising Your Strategic Opportunities',
          'Creating a Narrative',
          'Generating Solutions',
          'Good vs Great Solution Development',
          'Design Modifications',
          'User Psych',
        ],
      },
      {
        id: 16,
        title: 'Analysing Test Results',
        lessons: [
          'Test Launch',
          'Calling a Test Complete',
          'Evaluating Test Results',
          'Iterating',
          'Implementing Test Wins',
          'Measuring Value',
          'Communicating Results',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Mastery Skills for PMs',
    modules: [
      {
        id: 17,
        title: 'Mastering Product Strategy',
        lessons: [
          'Creating Strategic Foundations',
          'The 6 Dimensions of Product Strategy',
          'Target Audience',
          'Value Proposition',
          'Strategic Differentiation',
          'Channel Strategy',
          'Monetisation Strategy',
        ],
      },
      {
        id: 18,
        title: 'Mastering Vision Narratives',
        lessons: [
          'Creating & Using your Vision',
          'High Leverage Visions',
          'Vision Narratives, Not Statements',
          'Buy-In on your Vision',
        ],
      },
      {
        id: 19,
        title: 'Feedback Management Systems',
        lessons: [
          'Feedback Rivers',
          'Setting up Your Feedback River',
          'Feedback Systems of Record',
          'Using Feedback Management Systems',
        ],
      },
      {
        id: 20,
        title: 'Mastering Lever Dashboards',
        lessons: [
          'Setting up Your Lever Dashboard',
          'Lever Dashboard Rituals',
          'KPIs and Roadmaps',
        ],
      },
      {
        id: 21,
        title: 'Building 4D Roadmaps',
        lessons: [
          'The 4 Lenses',
          'Brainstorming Objectives & Initiatives',
          'Prioritising Objectives & Initiatives',
        ],
      },
      {
        id: 22,
        title: 'Creating OKR Loops',
        lessons: [
          'Developing Outcome Oriented OKRs',
          'Writing & Socialising High-Leverage OKRs',
          'OKR Reviews & Post Mortem',
          'Avoiding the Pitfalls of OKRs',
        ],
      },
      {
        id: 23,
        title: 'Empowering Product Specs',
        lessons: [
          'Writing the Specifications',
          'Empowering Context',
          'Empowering Implementation',
        ],
      },
      {
        id: 24,
        title: 'Decision Architecture',
        lessons: [
          'Decision Budget & Circles',
          'Determining Your Decision Budget',
          'Decision Making Circles',
          'Completing the Decision Loop',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Scaling Product Delivery',
    modules: [
      {
        id: 25,
        title: 'Product Conviction',
        lessons: [
          'Delivery Systems at Scale',
          'Customer Value Conviction',
          'Document Hypothesis',
          'Refine User Profile & Problem',
          'Build & Test Solution',
          'Refine Business Value',
        ],
      },
      {
        id: 26,
        title: 'Building Impact Conviction',
        lessons: [
          'Building a Lo-Fi Model',
          'Effort & Alignment',
          'Building Dynamic Delivery Plans',
        ],
      },
      {
        id: 27,
        title: 'Execution & Adaptation',
        lessons: [
          'Product Reviews',
          'Team Touch Points',
          'Launch Strategy',
          'Launch Preparation',
          'Post Launch Management',
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Growing Users for Your Product from PMF → Scale',
    modules: [
      {
        id: 28,
        title: 'Developing the PMF Narrative',
        lessons: [
          'Building an Initial Insight',
          'Problem to Solve',
          'Target Audience',
          'Value Proposition',
          'Competitive Advantage',
          'Growth Strategy',
          'Business Model & PMF Narrative Synthesis',
          'Finding PMF Program Snapshot',
        ],
      },
      {
        id: 29,
        title: 'Validating Riskiest Hypotheses',
        lessons: [
          'Risk Validation Techniques',
          'Risk Validation using Market Research & Expert Advice',
          'Leading Effective PMF Interviews',
          'Targeted Risk Validation Techniques',
        ],
      },
      {
        id: 30,
        title: 'Growing Users',
        lessons: [
          'Getting Traction',
          'Building the First Growth Loop',
          'Measuring & Evaluating Engagement',
          'Leveraging NPS Surveys',
          'Launch Strategy',
        ],
      },
    ],
  },
];

export const flattenCurriculum = (): FlattenedLessonItem[] => {
  const items: FlattenedLessonItem[] = [];
  let nextId = 1;

  const tailoredContent: Record<string, string> = {
    'Feature Opportunity Validation': `What it is:
Opportunity validation ensures you’re solving a real user problem that also advances the business. It guards against building features that feel smart but don’t move the needle.

How to do it well:
1) Problem signal: Gather 3+ independent data sources (qual + quant) that point to the same user pain. Examples: interviews, support tickets, funnel drop-offs, usage heatmaps.
2) User value: Write a crisp problem statement: “For [persona], when [context], they struggle to [job-to-be-done], causing [impact].” Validate with 5–8 target users.
3) Business value: Map the opportunity to a top-level metric (acquisition, activation, retention, revenue, or referral). Define a leading indicator you can move in 2–4 weeks.
4) Constraints: Identify risks (tech, legal, UX, ops). For each, note mitigation and a kill-switch decision.
5) Decision: Summarize in a one-page brief. Include the minimal scope to test value quickly.

Work example:
You see a 35% drop at onboarding step 2. Interviews reveal users don’t understand required permissions. Hypothesis: a 2-step tooltip lowers friction. Leading metric: step-2 completion rate; guardrail: time-to-first-value.

Checklist:
- Problem statement reviewed by design + data
- Leading indicator + guardrail defined
- Mitigations for top risks written
- Clear success threshold for go/no-go
`,

    'Constrained Divergence': `Why it matters:
PMs must explore multiple solutions without boiling the ocean. Constrained divergence gives you breadth with discipline.

Playbook (90 minutes):
• 10m Frame the brief: problem, users, constraints, success metric
• 25m Solo sketch: 3 distinct concepts per person (no group talk)
• 15m Gallery walk: silent dot-vote on promising ideas
• 20m Critique: discuss trade-offs vs success metric
• 20m Synthesize: combine top elements into 1–2 testable concepts

Principles:
- Diverge on solutions, converge on value
- Beat perfectionism with timeboxes
- Keep votes anchored to the metric, not opinions

Deliverable:
Two lightweight concepts with flows, edge cases, and success signals.
`,

    'The Feature Development Playbook': `Goal:
Ship predictably without sacrificing quality by running a transparent, risk-driven development loop.

Stages:
1) Specification ready: scope, UX states, acceptance criteria, instrumentation plan
2) Architectural sanity: tech lead signs off; risks + spikes queued
3) Thin-slice plan: slice by user-visible value; each slice shippable behind a flag
4) Execution cadence: daily progress demo; blockers surfaced within 24h
5) Quality gates: definition of done includes instrumentation + docs
6) Launch: staged rollout with guardrails and rollback
7) Post-launch: validate impact vs hypothesis and capture learnings

Anti-patterns and fixes:
- “All-or-nothing” releases → enforce thin slices
- Surprise scope creep → change log and re-approval
- Missing metrics → mandate event plans before coding
`,
    'Validate & Communicate Opportunity': `This lesson focuses on two core responsibilities of a Product Manager (PM): ensuring the work is valuable, and aligning others around it. It's not enough to have an idea; you must prove its worth and articulate it clearly.

Section 1: Validating the Opportunity
Validation confirms that a problem is worth solving and that solving it will create user and business value. Skipping this step is a common cause of product failure.

An opportunity is truly worth pursuing if it meets three criteria:
1) Strategic fit: aligns with company strategy and goals.
2) User value: solves a real, significant user problem with evidence.
3) Business value: creates tangible value (revenue, retention, expansion, differentiation).

How to validate:
- Define the problem clearly: "[Specific user] struggles with [problem] because of [root cause]."
- Conduct user research:
  • Interviews: ask open-ended questions, understand behavior and workarounds.
  • Surveys: quantify prevalence and severity; validate patterns at scale.
- Market and competitive analysis:
  • Market sizing (TAM): is the opportunity big enough?
  • Competitor review: alternatives, strengths/weaknesses, gaps from reviews (e.g., G2, Trustpilot).
- Test with lightweight experiments:
  • "Fake door" test: measure click-through/interest before building.
  • Concierge MVP: manually deliver the value with a handful of users to learn the journey.

Section 2: Communicating the Opportunity
After validation, communicate clearly to align and motivate the team and stakeholders.

Key tools & techniques:
- Product Requirements Document (PRD):
  • Opportunity/problem statement
  • Goals & success metrics (leading and lagging)
  • User personas & stories ("As a [user], I want [action], so that [benefit]")
  • Scope & requirements (what's in vs out)
- Product roadmap: audience-specific, strategic, not a project plan.
- Lead with the "why": explain user problem and business opportunity to create context.
- Stakeholder alignment: map stakeholders and tailor the message (engineering—feasibility; sales—impact on deals; marketing—positioning).

In summary:
PMs must validate rigorously and then communicate persuasively to build the right things. Use research and data to confirm the opportunity, then craft a compelling narrative so the team is aligned and empowered to execute.
`
,
    'Refine User Value': `This lesson focuses on moving from a general idea to a deeply understood user problem so you build something genuinely valuable.

How to refine user value:
- Create user personas: demographics, goals, motivations, frustrations; build empathy and focus.
- Craft user stories: "As a [user], I want [action], so that I can [benefit]" to express value over features.
- Deepen research with 5 Whys: repeatedly ask "why" to reach the root cause behind the symptom.
- Test with prototypes: sketches/wireframes → usability tests; observe behavior and gather feedback before coding.

Outcome:
Clarity on who the user is, what outcome they seek, and how your solution creates perceived value.
`,

    'Refine Business Value': `This lesson ensures the opportunity contributes to company strategy and can be quantified.

How to refine business value:
- Connect to company goals: map the work to top objectives (revenue, retention, expansion, differentiation).
- Define success metrics:
  • Leading indicators (early signals): sign-ups, activation, feature usage
  • Lagging indicators (ultimate results): revenue, churn, LTV
- Estimate impact: build a simple model with explicit assumptions to forecast value.
- Cost/benefit analysis: weigh expected impact against effort, risk, and opportunity cost to judge ROI.

Outcome:
A succinct business case with metrics and a sanity-checked expected impact.
`,

    'Iterative Convergence': `After generating options, narrow to the best solution through rapid, evidence-led iterations.

Principles and steps:
- Group and prioritize ideas: score by feasibility and impact.
- Create low-fidelity prototypes: wireframes/flows to test concepts cheaply.
- Usability testing: observe users, capture friction points and confusions.
- Refine → test → refine: converge with each cycle; increase fidelity only after core flow works.
- Move to high-fidelity once validated: ready for spec and sign-off.

Deliverable:
A validated user flow with risks called out and open questions documented.
`,

    'Design Approval & Building Alignment': `Great designs still need buy-in. This lesson covers winning alignment and formal approval.

Key strategies:
- Build a compelling narrative: lead with the user problem and business opportunity; connect design choices to outcomes.
- Present the "aha" moment: walk a day-in-the-life journey showcasing value.
- Communicate at the right altitude: execs—impact/risks; engineers—details/edge cases.
- Collaborate on feedback: invite critique; ground responses in data from research/tests.
- Formal sign-off: define approvers, criteria, and change control to prevent late churn.

Outcome:
Documented approval, clear scope, and shared understanding across stakeholders.
`,

    'Mapping Your Team': `Map roles, needs, and motivations to lead through influence.

What to map:
- Engineering: needs clear requirements, context, and autonomy; PM provides fast decisions and shields from noise.
- Design/Research: needs deep user understanding and problem framing; PM partners early and often.
- Business stakeholders (execs, sales, marketing, legal): need progress, value narrative, and voice in prioritization; PM manages expectations and cadence.

Outcome:
Rituals and communication plans tailored to each function to keep momentum.
`,

    'Preparing for Development': `Prepare thoroughly before code starts to ensure smooth execution.

Key steps:
- Finalize PRD: problem, scope, acceptance criteria, non-goals, success metrics.
- Technical handoff: present why/what; engineering discusses how, risks, spikes, and architecture.
- Create user stories/tickets: clear acceptance criteria; link designs and analytics plan.
- Estimate effort: collaborate to size work and set expectations.
- Define instrumentation: events and properties required to measure success post-launch.
`,

    'Managing Execution': `Orchestrate delivery while keeping value, scope, and quality intact.

Practices:
- Daily stand-ups: surface progress and blockers quickly.
- Unblockers: obtain decisions, clarifications, and approvals within 24h.
- Scope management: guard against creep; use change log and re-approval when needed.
- Regular check-ins: sync with tech/design leads; keep risks and dependencies visible.
- Demos: frequent showcases for transparency and feedback.
`,

    'Risk Management': `Identify, prioritize, and mitigate risks proactively.

Techniques:
- Risk inventory early: tech, UX, legal, data, ops, org.
- Categorize by impact × likelihood; focus on high/high.
- Mitigation plans: spikes, alternative approaches, contracts, buffers.
- Contingencies: rollback paths and kill criteria.
- Transparent tracking: share status and changes with stakeholders.
`,

    'Feature Launch Coordination': `Coordinate a reliable cross-functional release.

Activities:
- Launch plan: go/no-go checklist, owner matrix, timeline, rollback plan.
- Cross-functional readiness: marketing, support, sales trained and equipped (FAQ, assets).
- Day-of monitoring: staff the war room; track key metrics and issues; communicate clearly.
- Post-mortem: capture wins, gaps, and prioritized follow-ups.
`,

    'Feature Performance': `Measure whether the feature delivers on its promise.

Activities:
- Monitor metrics: leading adoption signals and lagging business outcomes.
- Analyze behavior: funnels, paths, heatmaps to see usage intent vs reality.
- Gather qualitative feedback: interviews, support tickets, in-app surveys to explain the "why".
- Identify trends and segments: find who benefits and where friction persists.
`,

    'Post Launch Communication': `Communicate results and next steps with clarity and candor.

Practices:
- Data-driven story: restate problem, show metrics, explain impact.
- Celebrate wins and acknowledge misses: emphasize learnings and decisions.
- Next plan: iterations, adjacent bets, or rollback with rationale.
`,

    'Prerequisites to Roadmap Prioritisation': `Establish foundations before prioritizing.

Prereqs:
- Clear product vision and strategy
- Defined business goals and success metrics
- Deep user and market understanding
- Healthy backlog of validated ideas
`,

    'Building a List of Roadmap Ideas': `Continuously source robust opportunities.

Sources:
- User research, surveys, usability tests
- Support and sales signals
- Internal team inputs
- Product analytics patterns
- Competitor intel
- Structured brainstorming (HMW, Crazy Eights)
`,

    'Prioritising Ideas on your Roadmap': `Rank opportunities using structured, transparent methods.

Frameworks:
- RICE (Reach, Impact, Confidence, Effort)
- MoSCoW (Must/Should/Could/Won't)
- Opportunity scoring (Importance × Satisfaction gaps)
`,

    'Roadmap Case Study': `Apply prioritization end-to-end on a realistic scenario: define problem, collect ideas, score (e.g., RICE), and produce a narrative roadmap that explains what and why.
`,

    'Sprint Level Prioritisation': `Translate roadmap into near-term execution.

Practices:
- Groom backlog: clear stories with acceptance criteria and estimates.
- Sprint planning: select highest-value work with team input.
- Handle unplanned work: define policy for bugs/urgent items.
`,

    'Building an Altitude Map': `Altitude Maps connect company goals to product and feature metrics.

Components:
- Altitude 1 (Business goals)
- Altitude 2 (Product metrics)
- Altitude 3 (Feature metrics)

How to build:
Start from goals → product metrics → granular feature metrics, then map relationships upward to show impact paths.
`,

    'Using the Altitude Map': `Use the map for prioritization, communication, troubleshooting, and experimentation.

Applications:
- Prioritize work that moves top-level goals
- Communicate impact clearly to stakeholders
- Drill down from an ailing KPI to root feature metrics
- Define correct experiment success metrics
`,

    'Taking Control with Instrumentation': `Deliberately design tracking so you can answer key questions after launch.

Concepts:
- Event-based tracking and properties/metadata
- Event naming conventions and governance
- PM defines the what; engineering implements the how
`,

    'Generating Data Insights': `Turn raw data into action.

Techniques:
- Start with a hypothesis or question
- Test with data; look for patterns and anomalies
- Combine quant (what) with qual (why)
- Craft a narrative that leads to a decision
`,

    'The 2 Key Analytical Tools': `Two fundamentals for PMs:
- Segmentation analysis: compare behavior/outcomes across user groups to reveal opportunities.
- Relationship between variables: identify correlations and potential drivers; use experiments to establish causation.
`,

    'Segmentation Analysis Deep Dive': `Run segmentation to uncover hidden trends.

Steps:
- Choose variables (demographic, behavioral, psychographic)
- Compare segments on key metrics
- Identify opportunities and at-risk groups
- Use analytics tools to iterate quickly
`,

    'Relationship between Variables Deep Dive': `Understand cause vs effect.

Steps:
- Define hypothesis (e.g., invites → retention)
- Check correlation carefully and avoid causal claims
- Validate via controlled experiments when stakes are high
`,

    'Communicating Persuasively with Data': `Present data to influence decision-making.

Principles:
- Tell a story with problem → evidence → call to action
- Tailor for audience (execs vs. engineering)
- Use visuals effectively; highlight the "so what"
- Be transparent about limitations and assumptions
`,

    'Leveraging your Data Resources': `Partner effectively with data teams and be self-sufficient where appropriate.

Practices:
- Understand roles (analyst, scientist, engineer)
- Ask for analyses framed as hypotheses/questions
- Provide product context and goals
- Build relationships and learn basic tools for quick answers
`
  };

  const generateLessonContent = (
    trackTitle: string,
    moduleTitle: string,
    lessonTitle: string,
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
    lessonNumber: number
  ): string => {
    if (tailoredContent[lessonTitle]) {
      return `Lesson ${lessonNumber}: ${lessonTitle}\nTrack: ${trackTitle}\nModule: ${moduleTitle}\nDifficulty: ${difficulty}\n\n${tailoredContent[lessonTitle]}`;
    }

    return (
      `Lesson ${lessonNumber}: ${lessonTitle}\n` +
      `Track: ${trackTitle}\n` +
      `Module: ${moduleTitle}\n` +
      `Difficulty: ${difficulty}\n\n` +
      `Overview:\n` +
      `- What you'll learn: how ${lessonTitle.toLowerCase()} fits into ${moduleTitle} and why it matters for Product Managers.\n` +
      `- Outcome: be able to apply this concept in a real product scenario.\n\n` +
      `Key Concepts:\n` +
      `- Core idea: ${lessonTitle}.\n` +
      `- Practices: actionable techniques to apply this concept.\n` +
      `- Anti-patterns: common mistakes to avoid.\n\n` +
      `Framework (Step-by-step):\n` +
      `1) Understand context and constraints.\n` +
      `2) Choose the right approach or tool.\n` +
      `3) Collaborate with design/engineering/stakeholders.\n` +
      `4) Validate with users/data; instrument the metrics.\n` +
      `5) Communicate decisions and capture learnings.\n\n` +
      `Example:\n` +
      `- Imagine you're working on ${lessonTitle.toLowerCase()} for a growth initiative.\n` +
      `- Apply the steps above and define success metrics (leading + lagging).\n\n` +
      `Checklist:\n` +
      `- Defined the problem clearly and aligned on success.\n` +
      `- Considered risks and trade-offs.\n` +
      `- Wrote crisp decision rationale.\n\n` +
      `Next Steps:\n` +
      `- Try a small real-world exercise in your product context.\n` +
      `- Share learnings with your team for feedback.`
    );
  };

  for (const track of curriculum) {
    for (const module of track.modules) {
      for (const [indexInModule, title] of module.lessons.entries()) {
        const difficulty: 'Beginner' | 'Intermediate' | 'Advanced' =
          track.id <= 2 ? 'Beginner' : track.id <= 4 ? 'Intermediate' : 'Advanced';
        items.push({
          id: nextId++,
          title,
          description: `${module.title} • ${track.title}`,
          duration: '5 min',
          difficulty,
          completed: false,
          content: generateLessonContent(track.title, module.title, title, difficulty, indexInModule + 1),
          trackId: track.id,
          trackTitle: track.title,
          moduleId: module.id,
          moduleTitle: module.title,
          lessonNumber: indexInModule + 1,
        });
      }
    }
  }
  return items;
};


