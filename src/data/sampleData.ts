export const sampleLessons = [
  {
    id: 1,
    title: "What is Product Management?",
    description: "Understanding the core role and responsibilities of a Product Manager in modern organizations.",
    duration: "5 min",
    difficulty: "Beginner" as const,
    completed: true,
    content: `Product Management is the strategic function that guides every step of a product's lifecycle. As a Product Manager, you're the bridge between business, technology, and user experience.

Key Responsibilities:
• Define product vision and strategy
• Gather and prioritize requirements
• Collaborate with engineering and design
• Analyze market needs and user feedback
• Make data-driven product decisions

Think of yourself as the "CEO of the product" - you own the what and why, while engineering owns the how.

The PM Mindset:
- Customer obsession
- Data-driven decision making
- Strategic thinking
- Strong communication
- Problem-solving focus

Remember: Great products solve real problems for real people.`
  },
  {
    id: 2,
    title: "User Stories & Requirements",
    description: "Learn to write effective user stories and manage product requirements that drive development.",
    duration: "5 min",
    difficulty: "Beginner" as const,
    completed: true,
    content: `User stories are the foundation of product requirements. They capture what users need and why they need it.

Format: "As a [user type], I want [goal], so that [benefit]"

Example:
"As a busy professional, I want to quickly log my daily tasks, so that I can track my productivity without disrupting my workflow."

Components of Good User Stories:
• WHO: Clear user persona
• WHAT: Specific functionality
• WHY: Business value/user benefit

Acceptance Criteria:
Define "done" with specific, testable conditions.

INVEST Principles:
- Independent
- Negotiable  
- Valuable
- Estimable
- Small
- Testable

Pro Tip: Focus on outcomes, not outputs. What problem are we solving?`
  },
  {
    id: 3,
    title: "Product Metrics & KPIs",
    description: "Master the art of measuring product success with the right metrics and key performance indicators.",
    duration: "5 min",
    difficulty: "Intermediate" as const,
    completed: false,
    content: `Measuring product success requires the right metrics. Don't just track everything - focus on what matters.

Key Metric Categories:

1. Acquisition Metrics
• User signups, conversion rates
• Cost per acquisition (CAC)
• Traffic sources effectiveness

2. Engagement Metrics  
• Daily/Monthly Active Users (DAU/MAU)
• Session duration, frequency
• Feature adoption rates

3. Retention Metrics
• Churn rate, cohort analysis
• Customer lifetime value (CLV)
• Net Promoter Score (NPS)

4. Business Metrics
• Revenue per user, growth rate
• Market share, competitive metrics

The North Star Framework:
Choose ONE metric that best captures your product's value to users.

Remember: Correlation ≠ Causation. Always dig deeper into the "why" behind your numbers.`
  },
  {
    id: 4,
    title: "Prioritization Frameworks",
    description: "Learn proven frameworks to prioritize features and make strategic product decisions.",
    duration: "5 min",
    difficulty: "Intermediate" as const,
    completed: false,
    content: `Prioritization is a PM's superpower. You can't build everything, so what should you build first?

Popular Frameworks:

1. RICE Scoring
• Reach: How many users affected?
• Impact: How much will it help?
• Confidence: How sure are you?
• Effort: Development time needed?

Score = (Reach × Impact × Confidence) / Effort

2. MoSCoW Method
• Must Have: Critical features
• Should Have: Important but not critical
• Could Have: Nice to have
• Won't Have: Not now

3. Kano Model
• Basic: Expected features
• Performance: Linear satisfaction
• Excitement: Delight features

4. Value vs. Effort Matrix
Plot features on 2x2 grid:
• High Value, Low Effort = Quick Wins
• High Value, High Effort = Major Projects
• Low Value, Low Effort = Fill-ins
• Low Value, High Effort = Avoid

Pro Tip: Involve stakeholders in prioritization. Make the trade-offs visible.`
  }
];

// Content-specific quizzes keyed by lesson title (used with curriculum-generated lessons)
export const lessonQuizzesByTitle: Record<string, Array<{ id: number; question: string; options: string[]; correctAnswer: number; explanation?: string }>> = {
  'Feature Opportunity Validation': [
    { id: 10101, question: 'What is the primary goal of opportunity validation?', options: ['Confirm a problem is worth solving for users and business','Define a detailed technical solution','Create a high-fidelity prototype','Estimate exact revenue impact to the dollar'], correctAnswer: 0 },
    { id: 10102, question: 'Which statement format helps clarify the problem?', options: ['"Add a new feature for everyone"','"[User] struggles with [problem] because [root cause]"','"We need to improve NPS fast"','"Competitors have this feature"'], correctAnswer: 1 },
    { id: 10103, question: 'What are lightweight validation methods mentioned?', options: ['Fake door and concierge MVP','Massive rewrite and big-bang launch','Only surveys with 10,000 users','Executive review'], correctAnswer: 0 },
    { id: 10104, question: 'Strategic fit means the opportunity…', options: ['Matches company strategy and goals','Is easy to implement','Has the nicest UI','Uses the latest framework'], correctAnswer: 0 },
    { id: 10105, question: 'A leading indicator is best described as…', options: ['An early signal you can move in weeks','Revenue reported at quarter end','A vanity metric','An engineer’s estimate'], correctAnswer: 0 }
  ],
  'Refine User Value': [
    { id: 10201, question: 'What tool focuses on value from the user’s perspective?', options: ['User stories','Burndown charts','Server logs','CSS frameworks'], correctAnswer: 0 },
    { id: 10202, question: 'The “5 Whys” technique helps you:', options: ['Reach root causes behind symptoms','Create pixel-perfect UI','Generate marketing slogans','Choose a database'], correctAnswer: 0 },
    { id: 10203, question: 'Personas should include which elements?', options: ['Goals, motivations, frustrations','Only job title','Favorite color','Office location only'], correctAnswer: 0 },
    { id: 10204, question: 'Low‑fidelity prototypes are used to:', options: ['Quickly test flows and concepts','Finalize the visual design','Stress test infrastructure','Replace research entirely'], correctAnswer: 0 },
    { id: 10205, question: 'A good user story format is:', options: ['As a [user], I want [action], so that [benefit]','We should build [feature] because devs like it','As a PM, I want fewer bugs','Implement [API] ASAP'], correctAnswer: 0 }
  ],
  'Refine Business Value': [
    { id: 10301, question: 'Business value should connect to:', options: ['Company goals like revenue or retention','Aesthetic preferences','Latest tech trends','Personal OKRs only'], correctAnswer: 0 },
    { id: 10302, question: 'Which describes leading vs lagging metrics?', options: ['Leading are early signals; lagging show ultimate results','Leading are yearly; lagging are daily','Leading are qualitative; lagging are always qualitative','They are interchangeable'], correctAnswer: 0 },
    { id: 10303, question: 'A simple impact model should:', options: ['Make assumptions explicit and estimate outcomes','Guarantee exact revenue','Replace experimentation','Ignore costs'], correctAnswer: 0 },
    { id: 10304, question: 'Cost/benefit analysis helps you:', options: ['Judge ROI vs effort and risk','Pick the trendiest idea','Avoid stakeholder input','Finalize UI animations'], correctAnswer: 0 },
    { id: 10305, question: 'A clear business case includes:', options: ['Metrics and expected impact','Only wireframes','Executive quotes','Debug logs'], correctAnswer: 0 }
  ],
  'Validate & Communicate Opportunity': [
    { id: 10401, question: 'Which three criteria define a strong opportunity?', options: ['Strategic fit, user value, business value','Coolness, novelty, speed','Budget, deadline, team size','Tech, design, marketing'], correctAnswer: 0 },
    { id: 10402, question: 'Which doc should contain goals, personas, and scope?', options: ['PRD','System architecture spec','Annual report','Test plan only'], correctAnswer: 0 },
    { id: 10403, question: 'A “fake door” test measures:', options: ['User interest prior to building','Server response times','Design fidelity','Legal compliance'], correctAnswer: 0 },
    { id: 10404, question: 'Effective stakeholder alignment requires:', options: ['Tailoring the message to stakeholder perspectives','Sharing all raw data only','Skipping technical feasibility','Avoiding the “why”'], correctAnswer: 0 },
    { id: 10405, question: 'A good problem statement is:', options: ['Specific user, problem, and root cause','A feature wishlist','A budget approval form','A competitive slogan'], correctAnswer: 0 }
  ],
  'Constrained Divergence': [
    { id: 10501, question: 'Constrained divergence aims to:', options: ['Explore broadly within defined limits','Ship without reviews','Finalize visuals first','Skip research'], correctAnswer: 0 },
    { id: 10502, question: 'Which is a recommended technique?', options: ['Crazy Eights','Waterfall handoff','Production refactor','Code freeze'], correctAnswer: 0 },
    { id: 10503, question: 'Votes should be anchored to:', options: ['Success metric','Team hierarchy','Design trend','Personal taste'], correctAnswer: 0 },
    { id: 10504, question: 'Outcome of the session is:', options: ['1–2 testable concepts with flows and signals','A full production build','A marketing campaign','A hiring plan'], correctAnswer: 0 },
    { id: 10505, question: 'Timeboxes help you:', options: ['Beat perfectionism','Increase scope','Avoid decisions','Skip documentation'], correctAnswer: 0 }
  ],
  'Iterative Convergence': [
    { id: 10601, question: 'The goal of convergence is to:', options: ['Narrow to a validated solution','Generate endless ideas','Freeze scope','Avoid user tests'], correctAnswer: 0 },
    { id: 10602, question: 'Low‑fi prototypes are used to:', options: ['Test concepts cheaply','Final polish','Load test servers','Replace metrics'], correctAnswer: 0 },
    { id: 10603, question: 'A healthy loop is:', options: ['Refine → test → refine','Design → ship → forget','Spec → build only','Research once only'], correctAnswer: 0 },
    { id: 10604, question: 'Increase fidelity after:', options: ['Validating core flow','Team approval','Budget approval','Scheduling a review'], correctAnswer: 0 },
    { id: 10605, question: 'Deliverable of convergence is:', options: ['Validated user flow with risks noted','Production code','Marketing brief only','Hiring plan'], correctAnswer: 0 }
  ],
  'Design Approval & Building Alignment': [
    { id: 10701, question: 'Start your alignment narrative with:', options: ['The user problem and business opportunity','Code diffs','Budget lines','Font choices'], correctAnswer: 0 },
    { id: 10702, question: 'Presenting a day‑in‑the‑life is useful to:', options: ['Show the "aha" value moment','Demonstrate CI/CD','Prove uptime','Replace testing'], correctAnswer: 0 },
    { id: 10703, question: 'Formal sign‑off should include:', options: ['Approvers, criteria, and change control','Only a calendar invite','A Slack thread','A marketing draft'], correctAnswer: 0 },
    { id: 10704, question: 'Engineering cares primarily about:', options: ['Edge cases and feasibility details','Executive quotes','Press coverage','CSS frameworks'], correctAnswer: 0 },
    { id: 10705, question: 'Feedback should be:', options: ['Collaborative and grounded in data','Avoided to save time','Only positive','Anonymous only'], correctAnswer: 0 }
  ],
  'The Feature Development Playbook': [
    { id: 10801, question: 'Which is a required quality gate before done?', options: ['Instrumentation and docs','Team pizza party','A/B test always','Zero lines of code changed'], correctAnswer: 0 },
    { id: 10802, question: 'Thin slices should be:', options: ['User‑visible value behind a flag','Backend only','Design‑only','A full release only'], correctAnswer: 0 },
    { id: 10803, question: 'Execution cadence recommends:', options: ['Daily progress demos and fast blocker surfacing','Weekly silent updates','Async only','No demos'], correctAnswer: 0 },
    { id: 10804, question: 'A staged rollout is used for:', options: ['Controlled launch with guardrails and rollback','Instant 100% launch','Marketing only','Design review only'], correctAnswer: 0 },
    { id: 10805, question: 'An anti‑pattern is:', options: ['All‑or‑nothing releases','Thin slicing','Event planning before code','Transparent change logs'], correctAnswer: 0 }
  ]
};

// Legacy/demo quizzes keyed by numeric sample lesson IDs – kept for compatibility
// Quiz questions organized by lesson - 10 questions per lesson
export const sampleQuizzes = {
  1: [ // Lesson 1: What is Product Management?
    {
      id: 1,
      question: "What is the primary role of a Product Manager?",
      options: [
        "To write code for the product",
        "To bridge business, technology, and user experience",
        "To manage the development team directly",
        "To handle customer support issues"
      ],
      correctAnswer: 1,
      explanation: "Product Managers serve as the strategic bridge between business objectives, technical capabilities, and user needs."
    },
    {
      id: 2,
      question: "Who owns the 'what' and 'why' of a product?",
      options: [
        "Engineering team",
        "Product Manager",
        "Design team",
        "Marketing team"
      ],
      correctAnswer: 1,
      explanation: "Product Managers own the 'what' and 'why', while engineering owns the 'how'."
    },
    {
      id: 3,
      question: "Which is NOT a key responsibility of a Product Manager?",
      options: [
        "Define product vision and strategy",
        "Write production code",
        "Gather and prioritize requirements",
        "Analyze market needs"
      ],
      correctAnswer: 1,
      explanation: "Product Managers don't typically write production code - that's the engineering team's responsibility."
    },
    {
      id: 4,
      question: "What mindset should a PM have regarding customers?",
      options: [
        "Customer satisfaction",
        "Customer obsession",
        "Customer awareness",
        "Customer compliance"
      ],
      correctAnswer: 1,
      explanation: "Great PMs have customer obsession - they deeply understand and prioritize customer needs."
    },
    {
      id: 5,
      question: "Product Managers are often referred to as:",
      options: [
        "CTO of the product",
        "CEO of the product",
        "Designer of the product",
        "Engineer of the product"
      ],
      correctAnswer: 1,
      explanation: "PMs are often called 'CEO of the product' because they have strategic ownership without direct authority."
    },
    {
      id: 6,
      question: "Which is a core PM principle?",
      options: [
        "Opinion-driven decisions",
        "Data-driven decision making",
        "Intuition-only decisions",
        "Authority-based decisions"
      ],
      correctAnswer: 1,
      explanation: "Great PMs make data-driven decisions backed by user research and metrics."
    },
    {
      id: 7,
      question: "What should great products do?",
      options: [
        "Use the latest technology",
        "Solve real problems for real people",
        "Have the most features",
        "Look visually appealing"
      ],
      correctAnswer: 1,
      explanation: "Great products solve real problems for real people - this is the fundamental principle of product management."
    },
    {
      id: 8,
      question: "Which skill is essential for Product Managers?",
      options: [
        "Advanced coding",
        "Strong communication",
        "Graphic design",
        "Financial accounting"
      ],
      correctAnswer: 1,
      explanation: "Strong communication is essential as PMs work with cross-functional teams and stakeholders."
    },
    {
      id: 9,
      question: "Product Managers collaborate primarily with:",
      options: [
        "Only the CEO",
        "Engineering and design teams",
        "Only customers",
        "Only marketing team"
      ],
      correctAnswer: 1,
      explanation: "PMs work closely with engineering and design teams to build products, along with other stakeholders."
    },
    {
      id: 10,
      question: "Strategic thinking in product management involves:",
      options: [
        "Daily task management",
        "Long-term vision and planning",
        "Code review processes",
        "Customer support tickets"
      ],
      correctAnswer: 1,
      explanation: "Strategic thinking involves long-term vision and planning to guide product decisions."
    }
  ],
  2: [ // Lesson 2: User Stories & Requirements
    {
      id: 11,
      question: "A well-written user story should include:",
      options: [
        "Only technical implementation details",
        "User type, goal, and benefit",
        "Just the feature description",
        "Only the acceptance criteria"
      ],
      correctAnswer: 1,
      explanation: "User stories follow the format 'As a [user type], I want [goal], so that [benefit]'."
    },
    {
      id: 12,
      question: "What does the 'I' in INVEST principles stand for?",
      options: [
        "Important",
        "Independent",
        "Immediate",
        "Innovative"
      ],
      correctAnswer: 1,
      explanation: "In INVEST, 'I' stands for Independent - stories should be self-contained."
    },
    {
      id: 13,
      question: "The WHO component of a user story refers to:",
      options: [
        "The development team",
        "Clear user persona",
        "The product manager",
        "The stakeholder"
      ],
      correctAnswer: 1,
      explanation: "WHO refers to the clear user persona or user type the story is written for."
    },
    {
      id: 14,
      question: "Acceptance criteria should be:",
      options: [
        "Vague and flexible",
        "Specific and testable",
        "Only technical",
        "Written by developers only"
      ],
      correctAnswer: 1,
      explanation: "Acceptance criteria should be specific and testable to clearly define 'done'."
    },
    {
      id: 15,
      question: "What should user stories focus on?",
      options: [
        "Outputs only",
        "Outcomes, not outputs",
        "Technical specifications",
        "Design details"
      ],
      correctAnswer: 1,
      explanation: "Focus on outcomes - what problem are we solving, not just what we're building."
    },
    {
      id: 16,
      question: "The 'V' in INVEST stands for:",
      options: [
        "Visible",
        "Valuable",
        "Verified",
        "Valid"
      ],
      correctAnswer: 1,
      explanation: "In INVEST, 'V' stands for Valuable - each story should provide business value."
    },
    {
      id: 17,
      question: "User stories capture:",
      options: [
        "How to build features",
        "What users need and why",
        "Technical architecture",
        "Design specifications"
      ],
      correctAnswer: 1,
      explanation: "User stories capture what users need and why they need it, not how to build it."
    },
    {
      id: 18,
      question: "The benefit part of a user story explains:",
      options: [
        "Technical requirements",
        "Business value/user benefit",
        "Implementation steps",
        "Testing procedures"
      ],
      correctAnswer: 1,
      explanation: "The benefit explains the business value or user benefit - why this story matters."
    },
    {
      id: 19,
      question: "Good user stories should be:",
      options: [
        "Large and comprehensive",
        "Small and manageable",
        "Technical and detailed",
        "Abstract and general"
      ],
      correctAnswer: 1,
      explanation: "The 'S' in INVEST stands for Small - stories should be small and manageable."
    },
    {
      id: 20,
      question: "Who typically writes user stories?",
      options: [
        "Only developers",
        "Product managers with team input",
        "Only designers",
        "Only stakeholders"
      ],
      correctAnswer: 1,
      explanation: "Product managers typically write user stories, often with input from the entire team."
    }
  ],
  3: [ // Lesson 3: Product Metrics & KPIs
    {
      id: 21,
      question: "What does DAU stand for in product metrics?",
      options: [
        "Daily Application Usage",
        "Data Analysis Unit",
        "Daily Active Users",
        "Direct Acquisition Users"
      ],
      correctAnswer: 2,
      explanation: "DAU stands for Daily Active Users, measuring unique users engaging daily with your product."
    },
    {
      id: 22,
      question: "CAC stands for:",
      options: [
        "Customer Acquisition Cost",
        "Customer Activity Count",
        "Content Access Control",
        "Customer Account Creation"
      ],
      correctAnswer: 0,
      explanation: "CAC stands for Customer Acquisition Cost - how much it costs to acquire a new customer."
    },
    {
      id: 23,
      question: "Which is an engagement metric?",
      options: [
        "Revenue per user",
        "Session duration",
        "Cost per acquisition",
        "Net Promoter Score"
      ],
      correctAnswer: 1,
      explanation: "Session duration measures how long users engage with your product."
    },
    {
      id: 24,
      question: "CLV stands for:",
      options: [
        "Customer Login Validation",
        "Customer Lifetime Value",
        "Customer Level Verification",
        "Customer Loss Volume"
      ],
      correctAnswer: 1,
      explanation: "CLV stands for Customer Lifetime Value - the total value a customer brings over their lifetime."
    },
    {
      id: 25,
      question: "The North Star Framework suggests:",
      options: [
        "Track everything possible",
        "Choose ONE key metric",
        "Focus only on revenue",
        "Ignore user metrics"
      ],
      correctAnswer: 1,
      explanation: "The North Star Framework suggests choosing ONE metric that best captures your product's value."
    },
    {
      id: 26,
      question: "NPS stands for:",
      options: [
        "New Product Score",
        "Net Promoter Score",
        "Number of Product Sales",
        "Network Performance Statistics"
      ],
      correctAnswer: 1,
      explanation: "NPS stands for Net Promoter Score, measuring customer satisfaction and loyalty."
    },
    {
      id: 27,
      question: "Churn rate measures:",
      options: [
        "New user acquisition",
        "Users who stop using the product",
        "Feature adoption",
        "Revenue growth"
      ],
      correctAnswer: 1,
      explanation: "Churn rate measures the percentage of users who stop using your product over time."
    },
    {
      id: 28,
      question: "What should you remember about correlation and causation?",
      options: [
        "They're the same thing",
        "Correlation equals causation",
        "Correlation does not equal causation",
        "Causation is less important"
      ],
      correctAnswer: 2,
      explanation: "Correlation ≠ Causation. Always dig deeper into the 'why' behind your numbers."
    },
    {
      id: 29,
      question: "Cohort analysis helps track:",
      options: [
        "Daily revenue",
        "User retention over time",
        "Feature requests",
        "Bug reports"
      ],
      correctAnswer: 1,
      explanation: "Cohort analysis tracks how user retention changes over time for different user groups."
    },
    {
      id: 30,
      question: "Feature adoption rates measure:",
      options: [
        "How fast features are built",
        "How many users use specific features",
        "How much features cost",
        "How bugs are fixed"
      ],
      correctAnswer: 1,
      explanation: "Feature adoption rates measure what percentage of users are using specific features."
    }
  ],
  4: [ // Lesson 4: Prioritization Frameworks
    {
      id: 31,
      question: "In the RICE prioritization framework, what does the 'E' represent?",
      options: [
        "Engagement",
        "Effort",
        "Execution",
        "Evaluation"
      ],
      correctAnswer: 1,
      explanation: "In RICE, 'E' stands for Effort - the amount of work required to implement the feature."
    },
    {
      id: 32,
      question: "The RICE score is calculated as:",
      options: [
        "(Reach + Impact + Confidence) / Effort",
        "(Reach × Impact × Confidence) / Effort",
        "Reach × Impact × Confidence × Effort",
        "(Reach × Impact) - (Confidence × Effort)"
      ],
      correctAnswer: 1,
      explanation: "RICE score = (Reach × Impact × Confidence) / Effort."
    },
    {
      id: 33,
      question: "In MoSCoW, what does 'Must Have' represent?",
      options: [
        "Nice to have features",
        "Critical features",
        "Future features",
        "Optional features"
      ],
      correctAnswer: 1,
      explanation: "Must Have features are critical and required for the product to function."
    },
    {
      id: 34,
      question: "In the Kano Model, 'Basic' features are:",
      options: [
        "Exciting new features",
        "Expected features",
        "Performance features",
        "Optional features"
      ],
      correctAnswer: 1,
      explanation: "Basic features are expected by users - their absence causes dissatisfaction."
    },
    {
      id: 35,
      question: "High Value, Low Effort features are called:",
      options: [
        "Major Projects",
        "Quick Wins",
        "Fill-ins",
        "Avoid"
      ],
      correctAnswer: 1,
      explanation: "High Value, Low Effort features are Quick Wins - prioritize these first."
    },
    {
      id: 36,
      question: "What should you avoid in the Value vs Effort matrix?",
      options: [
        "High Value, High Effort",
        "Low Value, High Effort",
        "High Value, Low Effort",
        "Low Value, Low Effort"
      ],
      correctAnswer: 1,
      explanation: "Avoid Low Value, High Effort features - they're not worth the investment."
    },
    {
      id: 37,
      question: "Excitement features in the Kano Model:",
      options: [
        "Are expected by users",
        "Delight users unexpectedly",
        "Cause dissatisfaction if missing",
        "Have linear satisfaction"
      ],
      correctAnswer: 1,
      explanation: "Excitement features delight users and provide unexpected value beyond basic expectations."
    },
    {
      id: 38,
      question: "In RICE, Confidence represents:",
      options: [
        "Team morale",
        "How sure you are about your estimates",
        "User satisfaction",
        "Technical feasibility"
      ],
      correctAnswer: 1,
      explanation: "Confidence represents how sure you are about your Reach and Impact estimates."
    },
    {
      id: 39,
      question: "Why involve stakeholders in prioritization?",
      options: [
        "To delegate responsibility",
        "To make trade-offs visible",
        "To avoid making decisions",
        "To slow down the process"
      ],
      correctAnswer: 1,
      explanation: "Involving stakeholders makes trade-offs visible and builds alignment on priorities."
    },
    {
      id: 40,
      question: "Performance features in Kano Model have:",
      options: [
        "No impact on satisfaction",
        "Linear satisfaction relationship",
        "Exponential satisfaction",
        "Negative satisfaction impact"
      ],
      correctAnswer: 1,
      explanation: "Performance features have a linear relationship - more is better, up to a point."
    }
  ]
};

export const sampleProgressData = {
  currentStreak: 7,
  longestStreak: 15,
  lessonsCompleted: 2,
  totalLessons: 4,
  quizScore: 85,
  badges: [
    {
      id: 'first-lesson',
      name: 'First Steps',
      description: 'Complete your first lesson',
      earned: true,
      icon: 'trophy'
    },
    {
      id: 'week-streak',
      name: 'Consistent Learner',
      description: '7-day learning streak',
      earned: true,
      icon: 'flame'
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      description: 'Score 90% on 5 quizzes',
      earned: false,
      icon: 'target'
    },
    {
      id: 'month-streak',
      name: 'Dedicated Student',
      description: '30-day learning streak',
      earned: false,
      icon: 'calendar'
    }
  ]
};