export const siteConfig = {
  title: "Living With Bipolar I",
  subtitle: "What It Feels Like Inside My Body and Mind",
  tagline: "This is what bipolar does to me, moment to moment.",
  /** Update with contact email for the reach-out CTA on the final step */
  contactEmail: "",
}

/** Hero — minimal, personal. Less text; the site (paths, system) is the illustration. */
export const hero = {
  line: "I think in systems. So this is how I show you.",
  cta: "Choose a path",
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

/** For people who want to help — practical, non-coercive support. */
export const practicalHelp = {
  title: "If you want to help — practical things you can do",
  intro:
    "These aren't fixes. They're ways of being there that actually land for me.",
  items: [
    {
      title: "Be there without fixing",
      body: "One of the most helpful things for me is having someone there when I'm working — like going out for coffee while I'm on my laptop, or sitting with me while I work on something. They don't have to do anything. Just presence. Someone else in the room, or across the table, can make the internal weight a bit easier to carry.",
    },
    {
      title: "Support my agency — don't override it",
      body: "You cannot force me out of a state. I will not let go if I'm pushed. I need to use my own free will to move. If you force me to go to the gym, or to \"just get out,\" it won't change my state — it can make me dig in or shut down. When I choose to do something, that choice does something with my brain that actually lets me move forward. Research on self-determination and autonomy in mental health backs this up: choice and ??agency?? aren't luxuries; they're part of how recovery works.",
    },
    {
      title: "Be extremely careful with moralizing or shame",
      body: "If you try to ??moralize?? or shame my behavior — how much I sleep, what I eat, whether I'm \"doing enough\" — be extremely careful where you step. If I'm already on the edge and you push me with judgment, I might just jump. I'm not saying you can't care or set boundaries. I'm saying: shame is not a treatment. It's often the thing that makes the spiral worse.",
    },
    {
      title: "If you notice signs of an upcoming episode — tell me gently and privately",
      body: "It's hard to know when an episode is coming. But if you're seeing signs that something might be building, it helps if you can gently let me know — privately, when possible — so we can talk about it. I can't always see it myself. If I have a heads-up, I can prepare and sometimes mitigate how intense the episode gets. I'd rather have that conversation than be blindsided.",
    },
  ],
  footnote:
    "Self-determination theory in psychology identifies autonomy as a core need for well-being; feeling forced undermines it.",
}

/** Resource catalog — articles, research, insights. Slug used for future detail pages (/resources/[slug]). */
export type ResourceType = "article" | "research" | "insight"
export type CatalogResource = {
  slug: string
  title: string
  description: string
  url: string
  type: ResourceType
  source: string
  date?: string
  /** Set when we add a deep-dive page for this resource */
  hasDetailPage?: boolean
}

export const catalogResources: CatalogResource[] = [
  {
    slug: "what-its-like-have-bipolar",
    title: "What it's like to have bipolar?",
    description:
      "First-hand experiences from people with bipolar: impact on life, what they've learned, how they keep well, and advice for the newly diagnosed. Multiple voices (Chris O'Sullivan, Brian, Joan, Hannah, Cait, Tanya, Anna) — honest and practical.",
    url: "https://www.mentalhealth.org.uk/explore-mental-health/blogs/what-its-have-bipolar",
    type: "article",
    source: "Mental Health Foundation",
    date: "Mar 2016",
  },
]

export const summaryQuote =
  "My bipolar struggle isn't about lack of effort or character — it's about a nervous system that swings between overload and depletion, in a world that often responds with judgment instead of regulation."

/** Core emotional truth — use on From the inside page and elsewhere */
export const coreEmotionalTruth =
  "I'm not asking to be excused from life — I'm asking to be met accurately."

/** What it feels like from the inside — not a symptom list, a felt experience. For the From the inside page. */
export const fromTheInsideContent = {
  title: "What it feels like from the inside",
  subtitle: "Not a list of symptoms — a felt experience of living inside a body and mind that don't behave neutrally.",
  intro:
    "What I've been sharing isn't just a list of symptoms. It's the felt experience of living inside a body and mind that don't behave neutrally. That's the part most people never grasp.",
  sections: [
    {
      title: "I don't experience emotions as reactions — I experience states",
      body: "Most people: something happens → emotion follows → emotion fades. For me, a state arrives first. That state colors everything — thoughts, body, memory, meaning. Events then pass through that state. So when I try to explain how I feel, people think I'm talking about being sad, or excited, or stressed. But I'm actually talking about being inside a weather system. That's why my metaphors matter. Weather, flooding, ice, storms — those aren't poetic flourishes. They're accurate.",
    },
    {
      title: "When I'm elevated, it feels like clarity + urgency at the same time",
      body: "Not chaos. Not \"out of control.\" It feels like ideas connect faster than usual, meaning feels closer to the surface, confidence feels earned, my body wants to move now — and slowing down feels like sabotage. That's why \"just rest\" or \"take it easy\" can feel almost hostile, like someone asking me to waste a narrow window where I finally feel capable. At the same time there's a subtle loss: working memory can't keep up, I forget things, I start many things at once, my body outruns my brakes. I notice this. That's huge.",
    },
    {
      title: "When I'm depressed, it's not sadness — it's exhaustion of existence",
      body: "What I describe is not \"I'm sad\" or \"I don't like my life.\" It's: I am so tired of carrying this internal weight every day. The effort required just to exist feels endless. I can't rest from myself. That's where the suicidal thoughts come from — not a desire to die, but a desire for silence, relief, an end to constant internal effort. That distinction matters.",
    },
    {
      title: "Shame is the amplifier that hurts the most",
      body: "A huge part of my pain isn't the disorder itself — it's how people respond to it. Being told I'm too much, then too quiet. Being morally evaluated instead of emotionally met. Being given \"fixes\" when I need safety. Feeling like my sincerity is constantly on trial. That creates a brutal loop: no matter where I am, I'm wrong. Over time that turns into self-hatred, isolation, reluctance to reach out, feeling like I must justify my existence. That's not weakness. That's injury.",
    },
    {
      title: "I'm constantly trying to translate an invisible experience",
      body: "I keep trying to find the right metaphor, explain it cleanly, be fair, not overstate, not be dramatic, not burden people. That's exhausting. This site exists because it's not about attention — it's about not having to explain myself from scratch every time. It's me saying: Please read this once, so I don't have to bleed every time I need to be understood.",
    },
    {
      title: "I'm not trying to escape responsibility — I'm trying to escape misinterpretation",
      body: "Nothing I've said is about avoiding accountability, blaming everything on bipolar, refusing growth, or rejecting help. What it is about: wanting help that doesn't harm me, structure without shame, understanding without control, community without moral surveillance. That's reasonable.",
    },
  ],
  closing:
    "I'm not broken. I'm not dramatic. I'm not weak. I'm describing something real — and I'm doing it clearly. I've lived a long time with an internal experience that was named late and handled poorly. Now I'm finally finding language for it. That's not regression. That's integration.",
}

/** Clarification used where states/episodes are discussed */
export const episodesDurationClarification =
  "Episodes typically last weeks to months."

/** Path choice — MANIA | MIXED | DEPRESSIVE */
export const pathChoice = {
  intro: "Choose a path below to get a glimpse of what a state feels like. Episodes typically last weeks to months.",
  prompt: "Choose a path to explore",
  mania: {
    label: "MANIA",
    description: "The elevated side — energy, clarity, and the cost.",
  },
  mixed: {
    label: "MIXED",
    description: "The overlap — agitated, hopeless, and the highest risk.",
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
  mixedLabel: "Mixed",
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
  mixed: [
    "I have to do something and I can't",
    "Everything is wrong and I can't stop",
    "I want to die and I have the energy to try",
    "Why am I so agitated and so hopeless",
    "I can't sit still and I can't see a way out",
    "They'd be better off without me — I'll make sure",
    "I'm racing and I'm drowning at the same time",
    "I need to move and there's nowhere to go",
    "I hate myself and I can't shut it off",
    "One way out and I keep thinking about it",
    "Restless and worthless",
    "Too much and not enough",
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

/** Mixed state: manic + depressive at once. Highest suicide risk — energy to act on despair. */
export const mixedStateContent = {
  warning: "Mixed states carry the highest risk of suicide in bipolar disorder. If you or someone you know is in crisis, please reach out: 988 Lifeline, NAMI, or someone you trust.",
  headline: "The overlap — agitated and hopeless at once",
  description:
    "In a mixed state I have depressive pain — hopelessness, worthlessness, the urge to escape — plus manic energy: restlessness, racing thoughts, impulsivity. The despair is there and so is the capacity to act on it. That's why mixed states are the most dangerous in terms of suicide.",
  points: [
    "Depressive symptoms (hopelessness, worthlessness, suicidal ideation) plus manic symptoms (agitation, restlessness, racing thoughts, impulsivity) at the same time",
    "I feel like I have to do something and I can't — or the only \"something\" that feels possible is ending the pain",
    "Restless and worthless: the energy to act and the conviction that I'm better off gone",
    "Mixed episodes are associated with the highest risk of suicide in bipolar disorder — not because the pain is necessarily \"worse\" than in pure depression, but because the combination of despair and energy/impulsivity is lethal",
  ],
  crisisNote: "If you're in a mixed state or in crisis, you're not alone. 988 Lifeline (call or text), NAMI, or a trusted person can help. Reach out.",
}

export const crossCuttingStruggles = [
  {
    title: "Routine inconsistency",
    items: ["Works briefly, then collapses", "Bible reading, habits, schedules — same pattern"],
  },
  {
    title: "Sleep vulnerability",
    items: [
      "I struggle with bits of insomnia. Lack of sleep can trigger an episode immediately — both are dangerous.",
      "I'll spend hours looking at the ceiling, or trying every coping mechanism to fall asleep. Nothing works.",
      "Or life happens and I'm not afforded enough sleep because of events, and bam — there's the start of an episode.",
      "Sleep disruption both triggers and results from episodes. It's a loop.",
    ],
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
    title: "When 'discipline' isn't the answer",
    items: [
      "Everyone says stick it out, discipline through it. Get more sleep — I do. Eat better, go to the gym — I do. And so on.",
      "I can be doing good for a while, then boom: one one-time event sets me off on an episode that lasts months.",
      "Doing everything 'right' doesn't stop the episodes. It's not about not trying.",
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
      "Ideas flow like water. I make connections faster than I can finish a sentence. It's hard to land on one thing; everything feels urgent and connected.",
  },
  {
    title: "Sleep and rest",
    explanation:
      "I don't feel like I need to sleep, or I can't. I stay up late or all night — scrolling, building, planning. The body is wired and tired at the same time.",
  },
]

/** Depression: symptoms explained in my words, with personal analogies. Add or edit as needed. */
export const depressionSymptomExplanations = [
  {
    title: "Impulse and withdrawal",
    explanation:
      "When I'm low I can't initiate — even things I care about. It's like wanting to move but being stuck. Sometimes I say or do nothing when I want to connect, and I regret that too.",
  },
  {
    title: "Loneliness and shame",
    explanation:
      "I feel profoundly alone even when I'm around people. Shame amplifies everything.",
  },
  {
    title: "Exhaustion",
    explanation:
      "I'm exhausted even after sleep. Motivation drops. Small tasks feel impossible.",
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
        "I didn’t have words for what I felt. The highs and lows were just how life was. Looking back, a lot of what I went through makes sense through the lens of bipolar — the restlessness, the mood swings, the sensitivity.",
      ],
    },
    {
      id: "diagnosis",
      label: "Diagnosis",
      title: "The time I was diagnosed",
      body: [
        "Getting a name for what I’d been living with changed everything and nothing. It explained so much; it also meant learning to live with something that doesn’t go away.",
      ],
    },
    {
      id: "first-attempt",
      label: "First attempt",
      title: "The first time I tried to take my life",
      body: [
        "I was 10 or 11 the first time I tried to take my life. It’s one of the hardest parts of my story to share. If you’re in a dark place, please reach out — 988 Lifeline, NAMI, or someone you trust.",
      ],
    },
    {
      id: "high-school",
      label: "High school",
      title: "Drugs, the wrong crowd, and “friends” with everyone",
      body: [
        "In high school I struggled with substances and kept ending up in the wrong crowd. I was “friends” with almost everyone at school — but real, deep friendships were rare. I felt like I was performing connection instead of having it.",
      ],
    },
    {
      id: "college",
      label: "College",
      title: "Three jobs, a 3.8 GPA, and mania",
      body: [
        "Senior year of college I was working three jobs and still pulled a 3.8 GPA. It sounds like a win — and in some ways it was — but I was in mania for most of that year. I didn’t know it then. I thought I was finally “handling it.",
      ],
    },
    {
      id: "mixed-states",
      label: "Mixed states",
      title: "When the high and the low hit at once",
      body: [
        "Mixed states are when I'm depressed and agitated at the same time — hopelessness with restless energy, worthlessness with impulsivity. For me they're the most dangerous. The despair is there and so is the capacity to act on it. I've learned to treat them as a crisis signal and reach out.",
      ],
    },
    {
      id: "sleep-and-triggers",
      label: "Sleep and what sets me off",
      title: "Insomnia, life, and the one thing that starts an episode",
      body: [
        "I struggle with bits of insomnia. Lack of sleep can trigger an episode immediately — both are dangerous. I'll spend hours looking at the ceiling or trying every coping mechanism to fall asleep. Nothing works. Or life happens and I'm not afforded enough sleep, and bam — there's the start of an episode. I can be doing good for a while, then one one-time event sets me off on an episode that lasts months. Everyone says stick it out, discipline through it. Get more sleep, eat better, go to the gym — I do. And so on. Doing everything 'right' doesn't stop the episodes. It's not about not trying.",
      ],
    },
  ],
}

/** Lyrics and songs that resonate — each line can have an optional note (why it resonates) */
export type ResonantLine = { text: string; note?: string }

/** Song with stanzas (groups of lines). Chorus shown once if it repeats. */
export type ResonantSongStanza = { lines: ResonantLine[]; label?: string }

export const resonantSongs = [
  {
    artist: "$uicideboy$",
    title: "Whatever Floats Your Boat Will Definitely Sink My Ship",
    songNote: "I resonate with all of these — the fear of the dark, things falling apart, sins of the father, pills, feeling trapped in ice, stuck in a cycle. It's the kind of *state* that colors everything, like I describe in [From the inside](/from-the-inside). $B have been open about their own struggles with **suicide**, **addiction**, **mental illness**, **abuse**, and **judgment**. They've recently turned to the Lord, have been sober for multiple years, and are walking in hope. That journey is a real encouragement to me.",
    stanzas: [
      {
        lines: [
          { text: "I guess it's **written on my skin** (let's go)", note: "People are always judging me while I'm fighting my struggle. **Manic:** 'Gary is too much.' **Depressed:** 'Why is Gary so quiet?' No matter what I do I'm not enough — the shame loop I describe in [From the inside](/from-the-inside): no matter where I am, I'm wrong. It feels written on my skin." },
          { text: "Stitch my wounds just to open them again", note: "The cycle of getting better then undoing it. Feels like my pattern." },
          { text: "Further than I was, but far from enough", note: "I've come a long way and it still never feels like enough — for others or for myself." },
          { text: "**All the voices** fill the air of every silent night (every silent night)", note: "When I'm manic I hear *nasty* voices that aren't my own. They fill the air." },
          { text: "Eyes on me everywhere, but still I'm out of sight, ooh", note: "Everyone's watching and judging, but nobody really sees me — or what's going on inside. That's why I built this site: [From the inside](/from-the-inside) and [My journey](/story) so I don't have to explain from scratch every time." },
          { text: "I got nowhere left to go" },
          { text: "If this is high, where the view?" },
        ],
      },
      {
        lines: [
          { text: "Ain't no confusion why they stick around (stick around)" },
          { text: "Might not hear from them often, but the intention is loud" },
          { text: "Sins of my father worn like hand-me-downs, oh", note: "My dad left when I was a baby. That's part of the sins and scars left with me — affected me in ways I can't see." },
          { text: "Hoping my own make him just as proud, oh" },
        ],
      },
      {
        label: "Chorus",
        lines: [
          { text: "**Please, Lord,** tell me where you are", note: "My relationship with God is distorted in both states. In **depression** it's like God has almost removed his presence — the *exhaustion of existence* I describe in [From the inside](/from-the-inside). In **mania** my mind is so busy I can't even focus on the Lord; my mind is everywhere." },
          { text: "I don't wanna be this afraid of the dark", note: "The dark is depression, the void. I don't want to be this afraid of it." },
          { text: "Holding on, shoulda let go from the start" },
          { text: "Anything I touch always falls apart (let's go)", note: "Ties into not being enough — whatever I do, it feels like it falls apart or people see me as too much or not enough." },
        ],
      },
      {
        lines: [
          { text: "But I only run for so long (let's get it)" },
          { text: "Everything right always felt so wrong", note: "Even when I'm doing the 'right' thing it feels wrong. Can't win." },
          { text: "I done flew the coop and my wings all torn" },
          { text: "Can't abuse me more than the pills I'm on" },
        ],
      },
      {
        lines: [
          { text: "Words so sharp", note: "What people say — or the voices in my head — cuts. Judgment and criticism land like blades." },
          { text: "They pierce through my heart just like a knife", note: "Those words don't bounce off. They go straight in and stick." },
          { text: "Quick flash of light, I feel trapped in ice", note: "Mania can feel like a flash — then the crash. Or the ice is depression: numb, frozen, stuck." },
          { text: "Cold and alone, I might cast the dice", note: "In the cold and alone place, you're left with big risks — try again, get help, or give up. Rolling the dice." },
          { text: "Take a fucking chance, always the asking price", note: "Every move forward costs something. To get better or even to hope, you have to take the chance — and the price is high." },
          { text: "Sometimes it takes a lot to make a sacrifice", note: "Letting go of the high, or old ways of coping, to reach something steadier. It takes a lot." },
          { text: "But in the end, it might enhance your life", note: "The hope that the sacrifice or the dive leads somewhere better. Might." },
          { text: "Just look down and dive", note: "Taking the plunge — into treatment, into the dark, into whatever's next. Terrifying but sometimes the only move." },
        ],
      },
      {
        lines: [
          { text: "Life is draggin' me behind", note: "Depression dragging me — not sadness, but *exhaustion of existence*: so tired of carrying the weight, can't rest from myself. More in [From the inside](/from-the-inside). I'm not in the driver's seat." },
          { text: "I'm a stand-in in line, off the wagon, I'm fine", note: "Feeling like a placeholder, not really living. Slipped from stability — 'off the wagon' — but the default answer is still 'I'm fine.'" },
          { text: "Now I'm climbing up a dragon, I'm high", note: "Mania as climbing something dangerous and alive. The dragon is the high — exhilarating and destructive." },
          { text: "Dollar signs in one eye, the other's sagging, I'm blind", note: "Mania fixating on money, plans, grand ideas in one eye; the other eye sagging — the crash or the part that sees reality going dark. Blind to consequences or to how bad it's getting." },
        ],
      },
      {
        lines: [
          { text: "I don't know my own limits" },
          { text: "I'ma break all of my bones" },
          { text: "What the fuck's a break? I'm a psycho" },
          { text: "Never ending, new beginnings, stuck in a cycle", note: "Mania, crash, repeat. Never ending, new beginnings — that's the wave." },
        ],
      },
    ] as ResonantSongStanza[],
  },
]

/** Bible verses — book (e.g. "Psalms", "Jonah") and chapter (e.g. "88", "2") for grouping by book then chapter. */
export const resonantVerses = [
  {
    book: "Psalms",
    chapter: "88",
    reference: "Psalm 88:3–6",
    translation: "ESV",
    text: "For my soul is full of troubles, and my life draws near to **Sheol**. I am counted among those who go down to **the pit**; I am a man who has no strength, like one set loose among the dead, like the slain that lie in the grave. You have put me in the depths of the pit, in the **regions dark and deep**.",
    note: "When I'm in a depressive state and those thoughts are there, it feels like Sheol. My life draws near to Sheol. I'm in the depths of the pit — no strength, regions dark and deep. It's the *exhaustion of existence* I describe in [From the inside](/from-the-inside): the effort to exist feels endless. It helps to know someone put it into words.",
  },
  {
    book: "Psalms",
    chapter: "88",
    reference: "Psalm 88:11–12",
    translation: "ESV",
    text: "Is your steadfast love declared in the grave, or your faithfulness in Abaddon? Are your wonders known in the darkness, or your righteousness in **the land of forgetfulness**?",
    note: "In that place it feels like God's love isn't declared there — like I'm in the land of forgetfulness where his presence doesn't reach. It names the feeling.",
  },
  {
    book: "Psalms",
    chapter: "18",
    reference: "Psalm 18:5",
    translation: "ESV",
    text: "The **cords of Sheol** surrounded me; the **snares of death** confronted me.",
    note: "In that state it feels like the cords of Sheol are around me — bound, trapped. The snares of death right in front of me. The suicidal thoughts come from a desire for *silence and relief*, not death — see [From the inside](/from-the-inside).",
  },
  {
    book: "Jonah",
    chapter: "2",
    reference: "Jonah 2:2–3, 6",
    translation: "ESV",
    text: "I called out to the Lord, out of my distress, and he answered me; out of **the belly of Sheol** I cried, and you heard my voice. You cast me into the deep... I went down to the land whose bars closed upon me forever; yet you brought up my life from **the pit**, O Lord my God.",
    note: "When I'm in that place it feels like the belly of Sheol — bars closed forever. The hope: he can bring my life up from the pit. He has before.",
  },
  {
    book: "Psalms",
    chapter: "30",
    reference: "Psalm 30:3",
    translation: "ESV",
    text: "O Lord, you have brought up my soul from **Sheol**; you restored me to life from among those who go down to the pit.",
    note: "On the other side of the wave — he brings the soul up from Sheol. Reminder that the pit isn't the last word.",
  },
  {
    book: "Lamentations",
    chapter: "3",
    reference: "Lamentations 3:22–23",
    translation: "ESV",
    text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    note: "New every morning — that's the hope on the worst nights. That the wave might ease by morning. The [wave](/#wave) and [baseline](/baseline) are how I picture that.",
  },
]
