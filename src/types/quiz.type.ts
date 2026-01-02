import { QuizCreateREQ } from "@/services/quiz/request/quiz.request";

export type Quiz = {
  _id: string;
  title: string; // e.g. "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 - Mã đề 1105"
  time: number; // 50 (minutes)
  maxAttempt: number | null; // optional
  questionsNo: number; // total number of questions
  expiredAt: Date | null;
  isShowAnswer: boolean;
  createdAt: string;
  updatedAt: string;

  questions: Question[];
};

export type Question = {
  id: string; // e.g. "Q1"
  groupId?: string; // for questions sharing a reading passage
  content: string; // the actual question text
  passage?: string; // optional reading passage text
  type: "multiple_choice" | "fill_blank" | "arrangement" | "matching";
  isGroupQ: boolean; // true if part of a passage group

  answerList: AnswerOption[]; // the options (A, B, C, D)
  answerKey: number; // correct option index or indices
  explanation?: string;
};

export type AnswerOption = {
  key: number; // 1, 2, 3, 4 — or match A,B,C,D
  option: string; // e.g. "whose"
};

export const mockQuiz: QuizCreateREQ = {
  title: "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 – Mã đề 1102",
  time: 50,
  maxAttempt: null,
  questionsNo: 40,
  expiredAt: null,
  isShowAnswer: true,
  questions: [
    // ========== Passage 1: Project farming (Q1–Q8) ==========
    {
      id: "Q1",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      passage: `When several farmers merge plots into a single “project farm”, they use digital tools to make that teamwork far more effective. GPS mapping, drones, and in-field sensors build a live, shared picture of soil types, weather shifts, and plant growth. Because everyone works on the same data, the team can settle seeding dates, determine when to spray, and track machinery in real time. What once depended on guesswork is now driven by verifiable information.
          With GPS technology, farmers can accurately map out their fields and create customised planting plans. Seeding machines change their rate on the fly, drones spray pests on targeted zones, and smart spreaders apply  fertiliser only where data shows a neeBecause inputs go exactly where they help, fields yield more while chemical runoff falls. Trials report considerable savings on seed, fuel, and sprays – benefits the partners split at the season’s end.
          Water management is just as precise. Specialised equipment tracks moisture every hour, and forecast apps predict rain, wind, or heatwaves. Automated pumps deliver measured water amounts to thirsty zones and stop when a storm is coming, slashing waste and energy bills. The result is steadier yields in dry years, fewer nutrients washed away, and a smaller water footprint for the whole partnership. Smart irrigation also helps limit weed growth, reducing herbicide use.
          The journey from field to market is equally digital. Cloud platforms record harvest weights, storage temperatures, and shipment times the moment they change, while blockchain records freeze each entry so customers can rely on it. Analytic tools browse the records to indicate weak points in the procedure, forecast prices, and suggest better planting plans for the next season to project partners. This makes project farming both profitable and sustainable.`,
      content: "The word settle in paragraph 1 mostly means_______.",
      answerList: [
        { key: 0, option: "exchange" },
        { key: 1, option: "announce" },
        { key: 2, option: "expect" },
        { key: 3, option: "decide" },
      ],
      answerKey: 3,
    },
    {
      id: "Q2",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content:
        "Which of the following is NOT mentioned in paragraph 1 as information displayed on a live, shared picture?",
      answerList: [
        { key: 0, option: "weather shifts" },
        { key: 1, option: "soil types" },
        { key: 2, option: "plant growth" },
        { key: 3, option: "drones" },
      ],
      answerKey: 3,
    },
    {
      id: "Q3",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content: "The word their in paragraph 2 refers to_______.",
      answerList: [
        { key: 0, option: "fields" },
        { key: 1, option: "planting plans" },
        { key: 2, option: "farmers" },
        { key: 3, option: "Seeding machines" },
      ],
      answerKey: 2,
    },
    {
      id: "Q4",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content:
        "Which of the following best paraphrases the underlined sentence in paragraph 2?",
      answerList: [
        {
          key: 0,
          option:
            "As resources are directed to the areas that need them, harvests increase and pollution from excess chemicals declines.",
        },
        {
          key: 1,
          option:
            "When chemicals are placed only where they are needed, productivity increases yet more overdue chemicals are released.",
        },
        {
          key: 2,
          option:
            "Precise application of fertilisers and sprays to required areas raises crop output but in turn increases chemical wastage.",
        },
        {
          key: 3,
          option:
            "There is an increase in chemical wastage and crop output though fewer resources are used for the indicated land area.",
        },
      ],
      answerKey: 0,
    },
    {
      id: "Q5",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content:
        "The word slashing in paragraph 3 is OPPOSITE in meaning to_______.",
      answerList: [
        { key: 0, option: "disposing" },
        { key: 1, option: "converting" },
        { key: 2, option: "increasing" },
        { key: 3, option: "reducing" },
      ],
      answerKey: 2,
    },
    {
      id: "Q6",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content: "Which of the following is TRUE according to paragraph 4?",
      answerList: [
        {
          key: 0,
          option:
            "Buyers have little reliable information on harvest weights and storage temperatures.",
        },
        {
          key: 1,
          option:
            "Farmers regard cloud platforms the best tools to improve the quality of their crops.",
        },
        {
          key: 2,
          option:
            "Project partners are unable to forecast prices of crops in the following season.",
        },
        {
          key: 3,
          option:
            "Analytic tools offer suggestions for better planting plans for the following season.",
        },
      ],
      answerKey: 3,
    },
    {
      id: "Q7",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content:
        "Which paragraph mentions approaches to different weather patterns?",
      answerList: [
        { key: 0, option: "Paragraph 2" },
        { key: 1, option: "Paragraph 3" },
        { key: 2, option: "Paragraph 4" },
        { key: 3, option: "Paragraph 1" },
      ],
      answerKey: 1,
    },
    {
      id: "Q8",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content: "Which paragraph mentions real-time tracking of produce?",
      answerList: [
        { key: 0, option: "Paragraph 2" },
        { key: 1, option: "Paragraph 1" },
        { key: 2, option: "Paragraph 4" },
        { key: 3, option: "Paragraph 3" },
      ],
      answerKey: 2,
    },

    // ========== Piece of news: DIFF 2025 (Q9–Q14) ==========
    {
      id: "Q9",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      passage: `Da Nang International Fireworks Festival (DIFF) 2025. With ten teams worldwide, DIFF 2025 features the largest (9)____ of participating teams in its history, and is predicted to be the most thrilling (10)____ so far. Z121 Vina Pyrotech, a company (11)____ by Vietnam Ministry of National Defence, is a newcomer this year. With thirty years of experience in fireworks, Z121 Vina Pyrotech is expected to deliver a breathtaking performance. It is among the (12)____ candidates to win the championship. From May 31st to July 12th, DIFF 2025 promises a series of spectacular fireworks displays, (13)____ is hoped to bring spectators a world-class entertainment experience. Over the past twelve years, the festival has helped the city (14)____ the reputation as “The City of Fireworks”.`,
      content:
        "DIFF 2025 features the largest (9)_______ of participating teams in its history.",
      answerList: [
        { key: 0, option: "volume" },
        { key: 1, option: "amount" },
        { key: 2, option: "number" },
        { key: 3, option: "level" },
      ],
      answerKey: 2,
    },
    {
      id: "Q10",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "DIFF 2025 is predicted to be the most thrilling (10)_______ so far.",
      answerList: [
        { key: 0, option: "competition" },
        { key: 1, option: "competitive" },
        { key: 2, option: "compete" },
        { key: 3, option: "competitively" },
      ],
      answerKey: 0,
    },
    {
      id: "Q11",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Z121 Vina Pyrotech, a company (11)_______ by Vietnam Ministry of National Defence, is a newcomer this year.",
      answerList: [
        { key: 0, option: "managed" },
        { key: 1, option: "managing" },
        { key: 2, option: "has managed" },
        { key: 3, option: "is managing" },
      ],
      answerKey: 0,
    },
    {
      id: "Q12",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "It is among the (12)_______ candidates to win the championship.",
      answerList: [
        { key: 0, option: "top" },
        { key: 1, option: "quick" },
        { key: 2, option: "high" },
        { key: 3, option: "smart" },
      ],
      answerKey: 0,
    },
    {
      id: "Q13",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "From May 31st to July 12ᵗʰ, DIFF 2025 promises a series of spectacular fireworks displays, (13)_______ is hoped to bring spectators a world-class entertainment experience.",
      answerList: [
        { key: 0, option: "who" },
        { key: 1, option: "which" },
        { key: 2, option: "when" },
        { key: 3, option: "why" },
      ],
      answerKey: 1,
    },
    {
      id: "Q14",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Over the past twelve years, the Da Nang International Fireworks Festival has helped the city (14)_______ the reputation as “The City of Fireworks”.",
      answerList: [
        { key: 0, option: "build up" },
        { key: 1, option: "go up" },
        { key: 2, option: "come up" },
        { key: 3, option: "look up" },
      ],
      answerKey: 0,
    },

    // ========== Sentence / dialogue arrangement (Q15–Q19) ==========
    {
      id: "Q15",
      isGroupQ: false,
      type: "arrangement",
      passage: `I had to burn the midnight oil to make engaging lesson plans, expecting to capture my students’ attention.
The reality, however, was not what I had expected when I completely failed to keep the class under control despite shouting loudly.
This valuable experience was indeed memorable and made me more confident in my career of choice.
Working as an intern at a local high school encouraged me to pursue a teaching career, a demanding yet rewarding one.
e. Instead of giving up, I reflected on what I had done and made improvements in the following lessons.`,
      content:
        "Choose the correct order of sentences a–e for a coherent text about a teaching internship.",
      answerList: [
        { key: 0, option: "c – b – e – a – d" },
        { key: 1, option: "c – a – e – d – b" },
        { key: 2, option: "d – a – b – e – c" },
        { key: 3, option: "d – b – e – c – a" },
      ],
      answerKey: 2,
    },
    {
      id: "Q16",
      isGroupQ: false,
      type: "arrangement",
      passage: `David: I used to, but now I use social media and news apps.
Lisa: Same here! It’s more convenient, but I think traditional newspapers have their own charm.
Lisa: Do you still read newspapers?
Lisa: I believe each type has its own value that we can make full use of.
e. David: You’re right. They fill us with nostalgia that’s hard to replace.`,
      content:
        "Choose the correct order of the conversation between Lisa and David.",
      answerList: [
        { key: 0, option: "d – a – c – e – b" },
        { key: 1, option: "c – a – b – e – d" },
        { key: 2, option: "d – e – b – a – c" },
        { key: 3, option: "c – e – d – a – b" },
      ],
      answerKey: 1,
    },
    {
      id: "Q17",
      isGroupQ: false,
      type: "arrangement",
      passage: `Tom: Then, text me when you’re home.
Tom: It’s getting late. Would you like me to give you a lift home?
Mary: Thanks, but I’m going to walk to the supermarket and then take a bus home`,
      content: "Choose the correct order of dialogue between Tom and Mary.",
      answerList: [
        { key: 0, option: "a – b – c" },
        { key: 1, option: "b – a – c" },
        { key: 2, option: "b – c – a" },
        { key: 3, option: "a – c – b" },
      ],
      answerKey: 2,
    },
    {
      id: "Q18",
      isGroupQ: false,
      type: "arrangement",
      passage: `Dear Ms Smith,
This has been pre-approved, but you need to have this letter and your identification card produced
at the nearest branch to apply.
The offer is exclusive and expires on December 31st.
Your application will be processed, and your card will be issued within 48 hours for immediate use.
It is our honour to offer you credit facilities of $6000, affordable with the monthly instalment of $99.
e. Should you require further details, please call 0123888888, or visit any of our branches.
Yours sincerely,
ABC Bank`,
      content:
        "Choose the correct order of the email from ABC Bank to Ms Smith.",
      answerList: [
        { key: 0, option: "b – d – a – c – e" },
        { key: 1, option: "a – c – d – b – e" },
        { key: 2, option: "d – a – c – b – e" },
        { key: 3, option: "c – a – d – b – e" },
      ],
      answerKey: 2,
    },
    {
      id: "Q19",
      isGroupQ: false,
      type: "arrangement",
      passage: `The developments demonstrate a clear modernisation of the city of Paragon, transforming it from a primarily residential locality into a more diverse and economically vibrant area.
This shift was further evidenced by the industrialisation of the surrounding agricultural land, with the appearance of some plants and factories.
Residential areas were noticeably transformed, with the replacement of established terraced housing with new dwellings and the relocation of the original park.
Simultaneously, a significant expansion of commercial infrastructure took place, most prominently
with the construction of a large supermarket and an accompanying car park where housing once stood.
e. Between 2000 and 2015, the outskirts of Paragon city underwent a dramatic reshaping, indicating a move towards urban regeneration and increased commercial activity.`,
      content:
        "Choose the correct order of sentences describing the transformation of Paragon city.",
      answerList: [
        { key: 0, option: "e – d – b – a – c" },
        { key: 1, option: "e – b – a – c – d" },
        { key: 2, option: "e – c – a – d – b" },
        { key: 3, option: "e – c – d – b – a" },
      ],
      answerKey: 3,
    },

    // ========== Passage 2: Greenwashing (Q20–Q29) ==========
    {
      id: "Q20",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      passage: `We seem to be entering a boom era for greenwashing – the tactic of covering routine pollution in eco-friendly language. [I] Picture running a high-emitting corporation: meaningful decarbonisation would demand painful negotiations, huge capital outlays, and a full redesign of the business model. Hiring an expert agency to splash “carbon-neutral” or “net-zero” across products is far easier, buying time while emissions remain untouched.
      Consumers meet this sleight of hand everywhere. Airlines sell “carbon-neutral” flights, filling stations boast about “net-zero” fuel, and breakfast bacon is re-labelled as planet-safe. Advertising spin is old, yet today it is manipulated to conceal ongoing environmental damage. Social media influencers and glossy sustainability reports amplify these claims, broadcasting the narrative far beyond traditional marketing channels.
      The term greenwashing emerged in the 1980s, an era of oil spills and growing climate science, but the practice has exploded only recently. [II] Intensifying public anxiety over global heating and ecosystem collapse has placed companies under sharp scrutiny; many boards therefore choose eye-catching PR over the tougher route of restructuring supply chains, energy sources, and product lines. Regulators on both sides of the Atlantic are struggling to police false eco-claims, yet enforcement still lags behind corporate ingenuity. Investors, eager to protect shortterm returns, frequently applaud these surface-level initiatives, reinforcing the cycle. [III] No sector illustrates the issue better than oil and gas. Having realised that denying climate science now backfires, the industry has swapped denial for “green” paint. Press releases trumpet potential renewable ventures while drilling plans expand unabated.
      Why does this matter? Greenwashing and climate denial share a core objective: to postpone the deep emission cuts claimed by scientists as urgent this decade. [IV] Whereas denial disputes the crisis, greenwashing misleads the public into believing problems are solved, thereby eroding consumer advocacy of genuine environmental actions and stalling regulatory reforms. In effect, it acts as a soothing lullaby, guiding society ever closer to ecological breakdown while fostering a false sense of progress. Exposing the facade – and insisting on verifiable, measurable carbon reductions – is essential if rhetoric is to give way to real action.`,
      content:
        "According to paragraph 1, having products claimed as eco-friendly rather than conducting meaningful decarbonisation will_______.",
      answerList: [
        {
          key: 0,
          option:
            "bring about a full redesign of the business model of a company",
        },
        {
          key: 1,
          option: "lead to delays without solving the current emission problem",
        },
        {
          key: 2,
          option:
            "cause physical injuries to those involved in the negotiation",
        },
        {
          key: 3,
          option: "involve spending a huge amount of money paying the agency",
        },
      ],
      answerKey: 1,
    },
    {
      id: "Q21",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "The word manipulated in paragraph 2 mostly means_______.",
      answerList: [
        { key: 0, option: "randomly deployed" },
        { key: 1, option: "legally regulated" },
        { key: 2, option: "purposely adjusted" },
        { key: 3, option: "hastily produced" },
      ],
      answerKey: 2,
    },
    {
      id: "Q22",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "Which of the following best summarises paragraph 2?",
      answerList: [
        {
          key: 0,
          option:
            "The stories about greenwashing reach a much wider audience due to the joint effort of social media and traditional marketing channels.",
        },
        {
          key: 1,
          option:
            "Commercials for everyday products ... are prevalent on unconventional marketing channels.",
        },
        {
          key: 2,
          option:
            "Social media influencers and impressive reports have a role to play in the dissemination of deceptive environmental claims.",
        },
        {
          key: 3,
          option:
            "Sustainability buzzwords now fill every sector, with their reach being amplified by influencers and polished reports.",
        },
      ],
      answerKey: 3,
    },
    {
      id: "Q23",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "What causes corporate boards to adopt greenwashing?",
      answerList: [
        {
          key: 0,
          option: "Increasing public concern about environmental issues",
        },
        {
          key: 1,
          option: "Public pressure on corporations to opt for PR campaigns",
        },
        {
          key: 2,
          option:
            "Growing public interest in the development of climate science",
        },
        {
          key: 3,
          option: "Public belief that carbon reductions are unnecessary",
        },
      ],
      answerKey: 0,
    },
    {
      id: "Q24",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content:
        "What challenge do regulators face in monitoring greenwashing claims?",
      answerList: [
        {
          key: 0,
          option: "Enforcement that falls behind corporate creativity",
        },
        { key: 1, option: "Insufficient public support" },
        { key: 2, option: "A lack of clear terminology" },
        { key: 3, option: "Conflicting laws on both sides of the Atlantic" },
      ],
      answerKey: 0,
    },
    {
      id: "Q25",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "The phrase the practice in paragraph 3 refers to_______.",
      answerList: [
        { key: 0, option: "global heating" },
        { key: 1, option: "scrutiny" },
        { key: 2, option: "climate science" },
        { key: 3, option: "greenwashing" },
      ],
      answerKey: 3,
    },
    {
      id: "Q26",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content:
        "Which of the following best paraphrases the underlined sentence in paragraph 4?",
      answerList: [
        {
          key: 0,
          option:
            "For empty slogans to be realised into moves, revelations about greenwashing and practical measures to reduce carbon are required.",
        },
        {
          key: 1,
          option:
            "Greenwashing is, in fact, a fallacy and therefore should be replaced by feasible actions which are encouraged through public movements.",
        },
        {
          key: 2,
          option:
            "To make way for meaningful activities in reality, it is vital to expose the public to proper and specific measures to reduce emissions.",
        },
        {
          key: 3,
          option:
            "The real solution ... is to verify and measure carbon reductions rather than just raise public awareness through campaigns.",
        },
      ],
      answerKey: 0,
    },
    {
      id: "Q27",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "Which of the following can be inferred from the passage?",
      answerList: [
        {
          key: 0,
          option:
            "Regulators are effectively utilising the tools and resources...",
        },
        {
          key: 1,
          option:
            "Greenwashing brings corporations benefits in terms of finance and reputation without having to reform their core operations.",
        },
        {
          key: 2,
          option:
            "The shift from denying climate science ... genuine commitment to renewables.",
        },
        {
          key: 3,
          option:
            "Investors who value long-term environmental impact put pressure ...",
        },
      ],
      answerKey: 1,
    },
    {
      id: "Q28",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content:
        "Where in the passage does the following sentence best fit? 'Yet greenwashing is arguably more insidious.'",
      answerList: [
        { key: 0, option: "[IV]" },
        { key: 1, option: "[III]" },
        { key: 2, option: "[II]" },
        { key: 3, option: "[I]" },
      ],
      answerKey: 0,
    },
    {
      id: "Q29",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "Which of the following best summarises the passage?",
      answerList: [
        {
          key: 0,
          option:
            "Greenwashing is surging as firms cover ongoing pollution in eco-friendly rhetoric, distracting the public and postponing the deep emission cuts scientists deem urgent.",
        },
        {
          key: 1,
          option:
            "High-emitting sectors follow the trend of greenwashing, boasting about potential renewables while quietly damaging the environment.",
        },
        {
          key: 2,
          option: "Major emitters opt for denial rather than decarbonisation.",
        },
        {
          key: 3,
          option:
            "Greenwashing has merely drawn policymakers’ attention worldwide.",
        },
      ],
      answerKey: 0,
    },

    // ========== Leaflet: Money management (Q30–Q35) ==========
    {
      id: "Q30",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      passage: `Managing your finances properly is essential for a stable and secure life. (30)_______, many people struggle with budgeting and saving and give up their financial plans sooner or later, eventually leading (31)_______ verspending and financial stress. Here are some tips to well manage your pocket:
      • Invest some of your money if possible.
      • Have a bank account with an increasing amount of savings (32)_______ month by setting realistic financial goals.
      • Buy (33)_______ within your price range.
      • Track your spending carefully to avoid (34)_______ expenditure on unnecessary purchases.
      • Prioritise things that bring you lasting happiness and financial security to get your money’s (35)_______!`,
      content:
        "Managing your finances properly is essential for a stable and secure life. (30)________, many people struggle with budgeting and saving...",
      answerList: [
        { key: 0, option: "However" },
        { key: 1, option: "Otherwise" },
        { key: 2, option: "Though" },
        { key: 3, option: "While" },
      ],
      answerKey: 0,
    },
    {
      id: "Q31",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "...eventually leading (31)_______ overspending and financial stress.",
      answerList: [
        { key: 0, option: "on" },
        { key: 1, option: "at" },
        { key: 2, option: "in" },
        { key: 3, option: "to" },
      ],
      answerKey: 3,
    },
    {
      id: "Q32",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Have a bank account with an increasing amount of savings (32)_______ month...",
      answerList: [
        { key: 0, option: "many" },
        { key: 1, option: "some" },
        { key: 2, option: "much" },
        { key: 3, option: "each" },
      ],
      answerKey: 3,
    },
    {
      id: "Q33",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content: "Buy (33)_______ within your price range.",
      answerList: [
        { key: 0, option: "affordable products quality" },
        { key: 1, option: "products affordable quality" },
        { key: 2, option: "affordable quality products" },
        { key: 3, option: "products quality affordable" },
      ],
      answerKey: 2,
    },
    {
      id: "Q34",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Track your spending carefully to avoid (34)_______ expenditure on unnecessary purchases.",
      answerList: [
        { key: 0, option: "possessive" },
        { key: 1, option: "restrictive" },
        { key: 2, option: "objective" },
        { key: 3, option: "excessive" },
      ],
      answerKey: 3,
    },
    {
      id: "Q35",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Prioritise things that bring lasting happiness and security to get your money’s (35)_______!",
      answerList: [
        { key: 0, option: "worth" },
        { key: 1, option: "price" },
        { key: 2, option: "rate" },
        { key: 3, option: "cost" },
      ],
      answerKey: 0,
    },

    // ========== Passage 3: Holiday decision patterns (Q36–Q40) ==========
    {
      id: "Q36",
      groupId: "G5",
      isGroupQ: true,
      type: "fill_blank",
      passage: `The process of sorting through the various holidays on offer and determining which is the best for you is inevitably complex and individual personality traits will determine the eventual decision. Some people undertake a process of extensive problem solving, in which information is sought about a series of products, (36)_______. Other consumers with no patience to explore a variety of choices (37)_______, for the sake of their convenience rather than trying to guarantee that they buy the best possible product. This is known as limited problem solving.
      Many consumers engage in routinised response behaviour, in which choices change relatively little over time. (38)_______. Also, some holidaymakers who have been content with a particular company or destination in the past may opt for the same experience again.
      Finally, some consumers will buy on impulse. (39)_______. It is, in fact, a pattern of behaviour that is becoming increasingly prevalent – to the dismay of the operators, who then have less scope for forward planning and reduced opportunities to gain from investing deposits in the short term. (40)_______, where ‘distressed stock’ needs to be cleared at short notice and this can be stimulated by late availability offers particularly.`,
      content:
        "Some people undertake extensive problem solving, in which information is sought about a series of products, (36)_______.",
      answerList: [
        {
          key: 0,
          option:
            "each of which is evaluated and compared with similar products",
        },
        {
          key: 1,
          option:
            "every one of them undergoes evaluations and comparisons with similar products",
        },
        {
          key: 2,
          option:
            "when it is similarly evaluated and compared with other products",
        },
        {
          key: 3,
          option:
            "those with similarities to other products will be evaluated and compared carefully",
        },
      ],
      answerKey: 0,
    },
    {
      id: "Q37",
      groupId: "G5",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Other consumers with no patience to explore a variety of choices (37)________, for the sake of their convenience rather than trying to guarantee they buy the best product.",
      answerList: [
        {
          key: 0,
          option:
            "be deliberate to confine themselves to a small number of choices",
        },
        {
          key: 1,
          option: "being deliberately confined themselves to fewer choices",
        },
        {
          key: 2,
          option:
            "will deliberately confine themselves to a small number of choices",
        },
        {
          key: 3,
          option: "fewer choices are deliberately confined to themselves",
        },
      ],
      answerKey: 2,
    },
    {
      id: "Q38",
      groupId: "G5",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Many consumers engage in routinised response behaviour... (38)_______.",
      answerList: [
        {
          key: 0,
          option:
            "Common brands, by contrast, are a pattern among loyal consumers",
        },
        {
          key: 1,
          option:
            "This is a common pattern among brand-loyal consumers, for example",
        },
        {
          key: 2,
          option:
            "By contrast, a consumer-loyal pattern is seen among common brands",
        },
        {
          key: 3,
          option:
            "This is a common example of brands with loyalty to a consumer pattern",
        },
      ],
      answerKey: 1,
    },
    {
      id: "Q39",
      groupId: "G5",
      isGroupQ: true,
      type: "fill_blank",
      content: "Finally, some consumers will buy on impulse. (39)_______.",
      answerList: [
        {
          key: 0,
          option:
            "The products cost little, which means they are better known and more favoured by typical holiday purchasers",
        },
        {
          key: 1,
          option:
            "While this is more typical of products costing little, it is by no means unknown among holiday purchasers",
        },
        {
          key: 2,
          option:
            "It doesn’t matter whether products are unknown, it is typical of purchasers to have holidays costing little",
        },
        {
          key: 3,
          option:
            "In the meantime, holidays costing little are known to be products typically favoured by many purchasers",
        },
      ],
      answerKey: 1,
    },
    {
      id: "Q40",
      groupId: "G5",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "…operators have less scope for forward planning and reduced opportunities to gain from investing deposits. (40)________, where ‘distressed stock’ needs to be cleared at short notice…",
      answerList: [
        {
          key: 0,
          option:
            "Though such trait of impulse purchasing proves to be valuable",
        },
        {
          key: 1,
          option:
            "So valuable is such purchasing trait that it proves to be impulsive",
        },
        {
          key: 2,
          option:
            "Such trait is so impulsive that it proves to be valuable to purchasers",
        },
        {
          key: 3,
          option:
            "Such impulse purchasing proves to be a valuable trait, though",
        },
      ],
      answerKey: 3,
    },
  ],
};
