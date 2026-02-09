export const siteConfig = {
  title: "Living With Bipolar I",
  subtitle: "What It Feels Like Inside My Body and Mind",
  tagline: "This is what bipolar does to me, moment to moment.",
  /** Update with contact email for the reach-out CTA on the final step */
  contactEmail: "",
}

/** Final step of the journey — closing and reach out */
export const closingStep = {
  label: "THE END",
  headline: "This is the end of my story.",
  subline: "If this resonated — reach out, or pass it on to someone who needs to understand.",
  ctaPrimary: "Reach out",
  ctaShare: "Share this with someone",
  crisisHeading: "If someone is in crisis",
  crisisNote: "988 Lifeline and NAMI offer free, confidential support.",
}

export const summaryQuote =
  "My bipolar struggle isn't about lack of effort or character — it's about a nervous system that swings between overload and depletion, in a world that often responds with judgment instead of regulation."

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
  fullStoryLink: "My journey",
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
  "Relationally sensitive — I care deeply how things land.",
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
    "Feeling like a burden when I reach out",
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

/** Mania: symptoms explained in my words, with personal analogies. Add or edit as needed. */
export const maniaSymptomExplanations = [
  {
    title: "Impulse control",
    explanation:
      "Sometimes it's like I'm in a car sliding on ice and my foot is mashing the brake pedal but I can't stop. Sometimes you cross the intersection on ice and hit a car. For me that looks like losing control over an impulse and hurting someone in the process — saying or doing something I regret.",
  },
  {
    title: "Racing thoughts",
    explanation:
      "Ideas flow like water. I make connections faster than I can finish a sentence. It's hard to land on one thing; everything feels urgent and connected. I'll add more when I'm ready.",
  },
  {
    title: "Sleep and rest",
    explanation:
      "I don't feel like I need to sleep, or I can't. I stay up late or all night — scrolling, building, planning. The body is wired and tired at the same time. I'll add more when I'm ready.",
  },
]

/** Depression: symptoms explained in my words, with personal analogies. Add or edit as needed. */
export const depressionSymptomExplanations = [
  {
    title: "Impulse and withdrawal",
    explanation:
      "When I'm low I can't initiate — even things I care about. It's like wanting to move but being stuck. Sometimes I say or do nothing when I want to connect, and I regret that too. I'll add more when I'm ready.",
  },
  {
    title: "Loneliness and shame",
    explanation:
      "I feel profoundly alone even when I'm around people. Shame amplifies everything. I'll add more when I'm ready.",
  },
  {
    title: "Exhaustion",
    explanation:
      "I'm exhausted even after sleep. Motivation drops. Small tasks feel impossible. I'll add more when I'm ready.",
  },
]

export const strengths = [
  "Strong self-reflection",
  "Ability to notice patterns over time",
  "Creative intelligence and systems thinking",
  "Deep empathy and moral seriousness",
  "Willingness to seek understanding",
  "Capacity for high output when regulated",
  "Insight into my own early warning signs",
]

export const strengthsNote =
  "These are the same traits that, under stress, flip into symptoms."

/** Personal journey narrative for the Story page — edit these with your details */
export const storyJourney = {
  title: "My journey",
  subtitle: "Growing up with bipolar — from childhood to now.",
  sections: [
    {
      id: "childhood",
      label: "Childhood",
      title: "When I was a kid",
      body: [
        "I didn’t have words for what I felt. The highs and lows were just how life was. Looking back, a lot of what I went through makes sense through the lens of bipolar — the restlessness, the mood swings, the sensitivity. I’ll add more here when I’m ready.",
      ],
    },
    {
      id: "diagnosis",
      label: "Diagnosis",
      title: "The time I was diagnosed",
      body: [
        "Getting a name for what I’d been living with changed everything and nothing. It explained so much; it also meant learning to live with something that doesn’t go away. I’ll fill in the details of when and how it happened.",
      ],
    },
    {
      id: "first-attempt",
      label: "First attempt",
      title: "The first time I tried to take my life",
      body: [
        "This is one of the hardest parts of my story to share. I’ll write more when I can. If you’re in a dark place, please reach out — 988 Lifeline, NAMI, or someone you trust.",
      ],
    },
    {
      id: "high-school",
      label: "High school",
      title: "Drugs, the wrong crowd, and “friends” with everyone",
      body: [
        "In high school I struggled with substances and kept ending up in the wrong crowd. I was “friends” with almost everyone at school — but real, deep friendships were rare. I felt like I was performing connection instead of having it. I’ll add more of this part of the story later.",
      ],
    },
    {
      id: "college",
      label: "College",
      title: "Three jobs, a 3.8 GPA, and mania",
      body: [
        "Senior year of college I was working three jobs and still pulled a 3.8 GPA. It sounds like a win — and in some ways it was — but I was in mania for most of that year. I didn’t know it then. I thought I was finally “handling it.” I’ll expand on this when I’m ready.",
      ],
    },
  ],
}
