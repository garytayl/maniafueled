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

/** Lyrics and songs that resonate — each line can have an optional note (why it resonates) */
export type ResonantLine = { text: string; note?: string }

export const resonantSongs = [
  {
    artist: "Suicideboys",
    title: "Whatever Floats Your Boat will Definitely Sink my Ship",
    songNote: "I resonate with all of these — the fear of the dark, things falling apart, sins of the father, pills, feeling trapped in ice, stuck in a cycle.",
    lines: [
      { text: "I guess it's written on my skin (let's go)" },
      { text: "Stitch my wounds just to open them again", note: "The cycle of getting better then undoing it. Feels like my pattern." },
      { text: "Further than I was, but far from enough" },
      { text: "All the voices fill the air of every silent night (every silent night)" },
      { text: "Eyes on me everywhere, but still I'm out of sight, ooh" },
      { text: "I got nowhere left to go" },
      { text: "If this is high, where the view?" },
      { text: "Ain't no confusion why they stick around (stick around)" },
      { text: "Might not hear from them often, but the intention is loud" },
      { text: "Sins of my father worn like hand-me-downs, oh", note: "Carrying what was passed down. Bipolar, shame, the weight of it." },
      { text: "Hoping my own make him just as proud, oh" },
      { text: "Please, Lord, tell me where you are" },
      { text: "I don't wanna be this afraid of the dark", note: "The dark is depression, the void. I don't want to be this afraid of it." },
      { text: "Holding on, shoulda let go from the start" },
      { text: "Anything I touch always falls apart (let's go)" },
      { text: "But I only run for so long (let's get it)" },
      { text: "Everything right always felt so wrong" },
      { text: "I done flew the coop and my wings all torn" },
      { text: "Can't abuse me more than the pills I'm on" },
      { text: "Words so sharp" },
      { text: "They pierce through my heart just like a knife" },
      { text: "Quick flash of light, I feel trapped in ice" },
      { text: "Cold and alone, I might cast the dice" },
      { text: "Take a fucking chance, always the asking price" },
      { text: "Sometimes it takes a lot to make a sacrifice" },
      { text: "But in the end, it might enhance your life" },
      { text: "Just look down and dive" },
      { text: "Life is draggin' me behind" },
      { text: "I'm a stand-in in line, off the wagon, I'm fine" },
      { text: "Now I'm climbing up a dragon, I'm high" },
      { text: "Dollar signs in one eye, the other's sagging, I'm blind" },
      { text: "Please, Lord, tell me where you are" },
      { text: "I don't wanna be this afraid of the dark" },
      { text: "Holding on, shoulda let go from the start" },
      { text: "Anything I touch always falls apart" },
      { text: "I don't know my own limits" },
      { text: "I'ma break all of my bones" },
      { text: "What the fuck's a break? I'm a psycho" },
      { text: "Never ending, new beginnings, stuck in a cycle", note: "Mania, crash, repeat. Never ending, new beginnings — that's the wave." },
    ] as ResonantLine[],
  },
]

/** Bible verses that resonate — add reference, text, and why it resonates */
export const resonantVerses = [
  {
    reference: "Psalm 88",
    text: "I am overwhelmed with troubles and my life draws near to death. I am counted among those who go down to the pit; I am like one without strength. You have put me in the lowest pit, in the darkest depths.",
    note: "When I'm in the pit it feels like this — no strength, darkest depths. It helps to know someone put it into words.",
  },
  {
    reference: "Lamentations 3:22–23",
    text: "Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    note: "New every morning — that’s the hope on the worst nights. That the wave might ease by morning.",
  },
  // Add more verses as you like — same shape: reference, text, note
]
