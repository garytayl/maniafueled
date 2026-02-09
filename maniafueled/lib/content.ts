export const siteConfig = {
  title: "Living With Bipolar I",
  subtitle: "What It Feels Like Inside My Body and Mind",
  tagline: "This is what bipolar does to me, moment to moment.",
  /** Update with your email for the reach-out CTA on the final step */
  contactEmail: "",
}

/** Final step of the journey — closing and reach out */
export const closingStep = {
  label: "THE END",
  headline: "You've reached the end of this story.",
  subline: "If this resonated — reach out, or pass it on to someone who needs to understand.",
  ctaPrimary: "Reach out",
  ctaShare: "Share this with someone",
  crisisHeading: "If you or someone you know is in crisis",
  crisisNote: "988 Lifeline and NAMI offer free, confidential support.",
}

export const summaryQuote =
  "Your bipolar struggle isn't about lack of effort or character — it's about a nervous system that swings between overload and depletion, in a world that often responds with judgment instead of regulation."

/** Path choice — split MANIA | DEPRESSIVE */
export const pathChoice = {
  prompt: "Choose a path to explore",
  mania: {
    label: "MANIA",
    description: "The elevated side — energy, clarity, and the cost.",
  },
  depressive: {
    label: "DEPRESSIVE",
    description: "The low side — depletion, pain, and what runs through it.",
  },
  baselineLink: "Or explore my baseline first",
}

/** Copy for the "wave" section — highs and lows, striving toward baseline */
export const waveSection = {
  label: "THE WAVE",
  headline: "I'm striving toward my baseline",
  subline: "Lesser highs, lesser lows — the wave doesn't disappear, but I'm learning to live with a calmer one.",
  /** Interactive thought mimic — click a state to feel the pace of thoughts */
  thoughtPrompt: "Click a state to feel the pace of my thoughts",
  maniaLabel: "Mania",
  baselineLabel: "Baseline",
  depressiveLabel: "Depressive",
}

/** Short thoughts that cycle in each state (stream-of-consciousness style) */
export const waveThoughts = {
  mania: [
    "I can do everything",
    "This is the idea that changes everything",
    "Why is everyone so slow",
    "I don't need to sleep",
    "I'll build it tonight",
    "Everything connects",
    "Buy it now",
    "They don't get it yet",
    "One more project",
    "I finally see it",
    "Why did I ever doubt",
    "This is going to be huge",
    "I need to tell them",
    "Just one more hour",
    "Everything makes sense",
  ],
  baseline: [
    "I'll take it one thing at a time",
    "Coffee first, then the list",
    "Maybe a short walk later",
    "I'm okay today",
    "Nothing urgent",
    "Steady",
    "I can rest tonight",
    "One step is enough",
    "Today was alright",
    "I'll reply tomorrow",
    "No need to rush",
    "I'm present",
  ],
  depressive: [
    "I can't do this",
    "Why bother",
    "Everyone is better off without me",
    "I'm so tired",
    "I've already failed",
    "There's no point",
    "I don't deserve help",
    "I'll just stay here",
    "Nothing will change",
    "I'm a burden",
    "I can't get up",
    "What's wrong with me",
    "I don't want to talk",
    "It's always like this",
    "I'm so alone",
  ],
}

export const baselineStatements = [
  "Thoughtful, analytical, reflective.",
  "Relationally sensitive — you care deeply how things land.",
  "Creative and systems-oriented.",
  "Spiritually seeking and meaning-oriented.",
  "Capable of routine for short stretches when conditions are right.",
  "Functional with support and structure.",
]

export const maniaSymptoms = {
  cognitive: [
    "Racing ideas — ideas flowing like water",
    "Grandiosity around success, business, future — hyper successful certainty",
    "Making lots of connections very quickly",
    "Difficulty finishing thoughts or sentences",
    "Forgetting items / task-switching — multiple trips in and out of the house",
    "Inflated sense of clarity — this all finally makes sense",
  ],
  emotional: [
    "Euphoria or strong relief after dark periods",
    "Reduced shame or self-consciousness",
    "Irritation when slowed, questioned, or controlled",
    "Feeling driven rather than choosing to act",
  ],
  behavioral: [
    "Working intensely for long stretches — coding, systems, projects",
    "Overcommitting or wanting to get everything done now",
    "Increased spending urges — e.g., expensive GPU",
    "Increased sexual stimulation / porn use",
    "Singing or talking out loud without caring who hears",
    "Staying up very late or all night without sleep",
    "Strong urge for accelerators — substances, intensity, pressure",
  ],
  physiological: [
    "Reduced sleep need or inability to sleep",
    "Wired-but-tired feeling",
    "Restlessness",
    "Appetite shifts",
  ],
}

export const depressionSymptoms = {
  cognitive: [
    "Harsh self-judgment and shame — I hate myself, I'm never enough",
    "Hopeless future-thinking — why live in this house if floods keep coming",
    "Difficulty seeing progress even when it exists",
    "Rumination and replaying past mistakes",
    "Feeling like a burden if you reach out",
  ],
  emotional: [
    "Profound loneliness — even when around people",
    "Emotional pain that feels untranslatable",
    "Guilt over past actions during episodes",
    "Grief over not being understood",
    "Emotional numbness alternating with intense pain",
  ],
  behavioral: [
    "Withdrawal and isolation",
    "Difficulty initiating tasks — cleaning, routines, follow-through",
    "Inconsistent hygiene / chores during low periods",
    "Loss of gym routine despite loving it",
    "Scrolling for hours at night",
    "Avoidance of reaching out despite wanting connection",
  ],
  physiological: [
    "Insomnia — lying awake for hours",
    "Exhaustion even after sleep",
    "Low motivation",
    "Appetite inconsistency",
  ],
}

export const suicidalIdeationContent = {
  warning: "Contains discussion of suicidal ideation",
  points: [
    "Thoughts don't come from wanting to die",
    "They come from chronic exhaustion, shame, and unrelenting internal pain",
    "The ideation is about escape from suffering, not death itself",
  ],
}

export const crossCuttingStruggles = [
  {
    title: "Routine inconsistency",
    items: ["Works briefly, then collapses", "Bible reading, habits, schedules — same pattern"],
  },
  {
    title: "Sleep vulnerability",
    items: ["Sleep disruption both triggers and results from episodes"],
  },
  {
    title: "Money regulation",
    items: [
      "Difficulty budgeting and holding onto money",
      "Impulsive spending urges under stress or elevation",
      "Background scarcity anxiety from childhood",
    ],
  },
  {
    title: "Relational pain",
    items: [
      "Feeling too much when elevated, not enough when depressed",
      "Being misunderstood as lazy, dramatic, or irresponsible",
      "Deep sensitivity to invalidation or moralizing",
      "Feeling excluded socially, especially in church contexts",
    ],
  },
  {
    title: "Shame sensitivity",
    items: ["Shame is a core amplifier of symptoms", "Moral framing — should, discipline, irresponsible — hits especially hard"],
  },
  {
    title: "Meaning amplification",
    items: [
      "During elevation: symbols, numbers, patterns feel significant",
      "Increased spiritual or symbolic interpretation of experience",
    ],
  },
]

export const triggers = [
  "SLEEP DEPRIVATION",
  "FINANCIAL STRESS",
  "DEBT PRESSURE",
  "RELATIONAL INVALIDATION",
  "CONTROL",
  "MORALIZED FIX-IT RESPONSES",
  "ISOLATION",
  "SUDDEN CONNECTION",
  "SUBSTANCES",
  "UNSTRUCTURED TIME",
  "SHAME SPIRALS",
]

export const earlyWarningSigns = [
  "IDEA FLOODING",
  "MULTIPLE UNFINISHED TASKS",
  "FORGETTING BASICS",
  "STAYING UP SCROLLING",
  "PLANNING",
  "SUDDEN CONFIDENCE",
  "URGENCY TO FIX EVERYTHING",
]

export const strengths = [
  "Strong self-reflection",
  "Ability to notice patterns over time",
  "Creative intelligence and systems thinking",
  "Deep empathy and moral seriousness",
  "Willingness to seek understanding",
  "Capacity for high output when regulated",
  "Insight into your own early warning signs",
]

export const strengthsNote =
  "These are the same traits that, under stress, flip into symptoms."
