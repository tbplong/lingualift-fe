export type Quiz = {
  title: string; // e.g. "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 - Mã đề 1105"
  time: number; // 50 (minutes)
  maxAttempt: number | null; // optional
  questionsNo: number; // total number of questions
  expiredAt: Date | null;
  isShowAnswer: boolean;

  questions: Question[];
};

type Question = {
  id: string; // e.g. "Q1"
  groupId?: string; // for questions sharing a reading passage
  content: string; // the actual question text
  passage?: string; // optional reading passage text
  type: "multiple_choice" | "fill_blank" | "arrangement" | "matching";
  isGroupQ: boolean; // true if part of a passage group

  answerList: AnswerOption[]; // the options (A, B, C, D)
  answerKey: number | number[]; // correct option index or indices
  explanation?: string;
};

type AnswerOption = {
  key: number; // 1, 2, 3, 4 — or match A,B,C,D
  option: string; // e.g. "A. whose"
};

export const mockQuiz: Quiz = {
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

          With GPS technology, farmers can accurately map out their fields and create customised planting plans. Seeding machines change their rate on the fly, drones spray pests on targeted zones, and smart spreaders apply  fertiliser only where data shows a need. Because inputs go exactly where they help, fields yield more while chemical runoff falls. Trials report considerable savings on seed, fuel, and sprays – benefits the partners split at the season’s end.

          Water management is just as precise. Specialised equipment tracks moisture every hour, and forecast apps predict rain, wind, or heatwaves. Automated pumps deliver measured water amounts to thirsty zones and stop when a storm is coming, slashing waste and energy bills. The result is steadier yields in dry years, fewer nutrients washed away, and a smaller water footprint for the whole partnership. Smart irrigation also helps limit weed growth, reducing herbicide use.
          
          The journey from field to market is equally digital. Cloud platforms record harvest weights, storage temperatures, and shipment times the moment they change, while blockchain records freeze each entry so customers can rely on it. Analytic tools browse the records to indicate weak points in the procedure, forecast prices, and suggest better planting plans for the next season to project partners. This makes project farming both profitable and sustainable.`,
      content: "The word settle in paragraph 1 mostly means _______.",
      answerList: [
        { key: 0, option: "A. exchange" },
        { key: 1, option: "B. announce" },
        { key: 2, option: "C. expect" },
        { key: 3, option: "D. decide" },
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
        { key: 0, option: "A. weather shifts" },
        { key: 1, option: "B. soil types" },
        { key: 2, option: "C. plant growth" },
        { key: 3, option: "D. drones" },
      ],
      answerKey: 3,
    },
    {
      id: "Q3",
      groupId: "G1",
      isGroupQ: true,
      type: "multiple_choice",
      content: "The word their in paragraph 2 refers to _______.",
      answerList: [
        { key: 0, option: "A. fields" },
        { key: 1, option: "B. planting plans" },
        { key: 2, option: "C. farmers" },
        { key: 3, option: "D. Seeding machines" },
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
            "A. As resources are directed to the areas that need them, harvests increase and pollution from excess chemicals declines.",
        },
        {
          key: 1,
          option:
            "B. When chemicals are placed only where they are needed, productivity increases yet more overdue chemicals are released.",
        },
        {
          key: 2,
          option:
            "C. Precise application of fertilisers and sprays to required areas raises crop output but in turn increases chemical wastage.",
        },
        {
          key: 3,
          option:
            "D. There is an increase in chemical wastage and crop output though fewer resources are used for the indicated land area.",
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
        "The word slashing in paragraph 3 is OPPOSITE in meaning to _______.",
      answerList: [
        { key: 0, option: "A. disposing" },
        { key: 1, option: "B. converting" },
        { key: 2, option: "C. increasing" },
        { key: 3, option: "D. reducing" },
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
            "A. Buyers have little reliable information on harvest weights and storage temperatures.",
        },
        {
          key: 1,
          option:
            "B. Farmers regard cloud platforms the best tools to improve the quality of their crops.",
        },
        {
          key: 2,
          option:
            "C. Project partners are unable to forecast prices of crops in the following season.",
        },
        {
          key: 3,
          option:
            "D. Analytic tools offer suggestions for better planting plans for the following season.",
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
        { key: 0, option: "A. Paragraph 2" },
        { key: 1, option: "B. Paragraph 3" },
        { key: 2, option: "C. Paragraph 4" },
        { key: 3, option: "D. Paragraph 1" },
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
        { key: 0, option: "A. Paragraph 2" },
        { key: 1, option: "B. Paragraph 1" },
        { key: 2, option: "C. Paragraph 4" },
        { key: 3, option: "D. Paragraph 3" },
      ],
      answerKey: 2,
    },

    // ========== Piece of news: DIFF 2025 (Q9–Q14) ==========
    {
      id: "Q9",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      passage:
        `Da Nang International Fireworks Festival (DIFF) 2025. With ten teams worldwide, DIFF 2025 features the largest (9) ____ of participating teams in its history, ` +
        `and is predicted to be the most thrilling (10) ____ so far. Z121 Vina Pyrotech, a company (11) ____ by Vietnam Ministry of National Defence, is a newcomer this year. ` +
        `With thirty years of experience in fireworks, Z121 Vina Pyrotech is expected to deliver a breathtaking performance. It is among the (12) ____ candidates to win the championship. ` +
        `From May 31st to July 12th, DIFF 2025 promises a series of spectacular fireworks displays, (13) ____ is hoped to bring spectators a world-class entertainment experience. ` +
        `Over the past twelve years, the festival has helped the city (14) ____ the reputation as “The City of Fireworks”.`,
      content:
        "DIFF 2025 features the largest (9) _______ of participating teams in its history.",
      answerList: [
        { key: 0, option: "A. volume" },
        { key: 1, option: "B. amount" },
        { key: 2, option: "C. number" },
        { key: 3, option: "D. level" },
      ],
      answerKey: 2,
    },
    {
      id: "Q10",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "DIFF 2025 is predicted to be the most thrilling (10) _______ so far.",
      answerList: [
        { key: 0, option: "A. competition" },
        { key: 1, option: "B. competitive" },
        { key: 2, option: "C. compete" },
        { key: 3, option: "D. competitively" },
      ],
      answerKey: 0,
    },
    {
      id: "Q11",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Z121 Vina Pyrotech, a company (11) _______ by Vietnam Ministry of National Defence, is a newcomer this year.",
      answerList: [
        { key: 0, option: "A. managed" },
        { key: 1, option: "B. managing" },
        { key: 2, option: "C. has managed" },
        { key: 3, option: "D. is managing" },
      ],
      answerKey: 0,
    },
    {
      id: "Q12",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "It is among the (12) _______ candidates to win the championship.",
      answerList: [
        { key: 0, option: "A. top" },
        { key: 1, option: "B. quick" },
        { key: 2, option: "C. high" },
        { key: 3, option: "D. smart" },
      ],
      answerKey: 0,
    },
    {
      id: "Q13",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "From May 31st to July 12ᵗʰ, DIFF 2025 promises a series of spectacular fireworks displays, (13) _______ is hoped to bring spectators a world-class entertainment experience.",
      answerList: [
        { key: 0, option: "A. who" },
        { key: 1, option: "B. which" },
        { key: 2, option: "C. when" },
        { key: 3, option: "D. why" },
      ],
      answerKey: 1,
    },
    {
      id: "Q14",
      groupId: "G2",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Over the past twelve years, the Da Nang International Fireworks Festival has helped the city (14) _______ the reputation as “The City of Fireworks”.",
      answerList: [
        { key: 0, option: "A. build up" },
        { key: 1, option: "B. go up" },
        { key: 2, option: "C. come up" },
        { key: 3, option: "D. look up" },
      ],
      answerKey: 0,
    },

    // ========== Sentence / dialogue arrangement (Q15–Q19) ==========
    {
      id: "Q15",
      groupId: "G6",
      isGroupQ: true,
      type: "arrangement",
      passage: `a. I had to burn the midnight oil to make engaging lesson plans, expecting to capture my students’
attention.
b. The reality, however, was not what I had expected when I completely failed to keep the class under
control despite shouting loudly.
c. This valuable experience was indeed memorable and made me more confident in my career of
choice.
d. Working as an intern at a local high school encouraged me to pursue a teaching career, a
demanding yet rewarding one.
e. Instead of giving up, I reflected on what I had done and made improvements in the following
lessons.`,
      content:
        "Choose the correct order of sentences a–e for a coherent text about a teaching internship.",
      answerList: [
        { key: 0, option: "A. c – b – e – a – d" },
        { key: 1, option: "B. c – a – e – d – b" },
        { key: 2, option: "C. d – a – b – e – c" },
        { key: 3, option: "D. d – b – e – c – a" },
      ],
      answerKey: 2,
    },
    {
      id: "Q16",
      groupId: "G6",
      isGroupQ: true,
      type: "arrangement",
      content:
        "Choose the correct order of the conversation between Lisa and David.",
      answerList: [
        { key: 0, option: "A. d – a – c – e – b" },
        { key: 1, option: "B. c – a – b – e – d" },
        { key: 2, option: "C. d – e – b – a – c" },
        { key: 3, option: "D. c – e – d – a – b" },
      ],
      answerKey: 1,
    },
    {
      id: "Q17",
      groupId: "G6",
      isGroupQ: true,
      type: "arrangement",
      content: "Choose the correct order of dialogue between Tom and Mary.",
      answerList: [
        { key: 0, option: "A. a – b – c" },
        { key: 1, option: "B. b – a – c" },
        { key: 2, option: "C. b – c – a" },
        { key: 3, option: "D. a – c – b" },
      ],
      answerKey: 2,
    },
    {
      id: "Q18",
      groupId: "G6",
      isGroupQ: true,
      type: "arrangement",
      content:
        "Choose the correct order of the email from ABC Bank to Ms Smith.",
      answerList: [
        { key: 0, option: "A. b – d – a – c – e" },
        { key: 1, option: "B. a – c – d – b – e" },
        { key: 2, option: "C. d – a – c – b – e" },
        { key: 3, option: "D. c – a – d – b – e" },
      ],
      answerKey: 2,
    },
    {
      id: "Q19",
      groupId: "G6",
      isGroupQ: true,
      type: "arrangement",
      content:
        "Choose the correct order of sentences describing the transformation of Paragon city.",
      answerList: [
        { key: 0, option: "A. e – d – b – a – c" },
        { key: 1, option: "B. e – b – a – c – d" },
        { key: 2, option: "C. e – c – a – d – b" },
        { key: 3, option: "D. e – c – d – b – a" },
      ],
      answerKey: 3,
    },

    // ========== Passage 2: Greenwashing (Q20–Q29) ==========
    {
      id: "Q20",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      passage:
        `We seem to be entering a boom era for greenwashing – the tactic of covering routine pollution in eco-friendly ` +
        `language. ... Hiring an expert agency to splash “carbon-neutral” or “net-zero” across products is far easier, ` +
        `buying time while emissions remain untouched. ... Intensifying public anxiety ... has placed companies under sharp scrutiny; ` +
        `many boards therefore choose eye-catching PR over the tougher route of restructuring. ... Regulators ... are struggling ` +
        `to police false eco-claims, yet enforcement still lags behind corporate ingenuity. ... Whereas denial disputes the crisis, ` +
        `greenwashing misleads the public into believing problems are solved ... Exposing the facade – and insisting on verifiable, ` +
        `measurable carbon reductions – is essential if rhetoric is to give way to real action. (Adapted from greenpeace.org.uk)`,
      content:
        "According to paragraph 1, having products claimed as eco-friendly rather than conducting meaningful decarbonisation will _______.",
      answerList: [
        {
          key: 0,
          option:
            "A. bring about a full redesign of the business model of a company",
        },
        {
          key: 1,
          option:
            "B. lead to delays without solving the current emission problem",
        },
        {
          key: 2,
          option:
            "C. cause physical injuries to those involved in the negotiation",
        },
        {
          key: 3,
          option:
            "D. involve spending a huge amount of money paying the agency",
        },
      ],
      answerKey: 1,
    },
    {
      id: "Q21",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "The word manipulated in paragraph 2 mostly means _______.",
      answerList: [
        { key: 0, option: "A. randomly deployed" },
        { key: 1, option: "B. legally regulated" },
        { key: 2, option: "C. purposely adjusted" },
        { key: 3, option: "D. hastily produced" },
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
            "A. The stories about greenwashing reach a much wider audience due to the joint effort of social media and traditional marketing channels.",
        },
        {
          key: 1,
          option:
            "B. Commercials for everyday products ... are prevalent on unconventional marketing channels.",
        },
        {
          key: 2,
          option:
            "C. Social media influencers and impressive reports have a role to play in the dissemination of deceptive environmental claims.",
        },
        {
          key: 3,
          option:
            "D. Sustainability buzzwords now fill every sector, with their reach being amplified by influencers and polished reports.",
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
          option: "A. Increasing public concern about environmental issues",
        },
        {
          key: 1,
          option: "B. Public pressure on corporations to opt for PR campaigns",
        },
        {
          key: 2,
          option:
            "C. Growing public interest in the development of climate science",
        },
        {
          key: 3,
          option: "D. Public belief that carbon reductions are unnecessary",
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
          option: "A. Enforcement that falls behind corporate creativity",
        },
        { key: 1, option: "B. Insufficient public support" },
        { key: 2, option: "C. A lack of clear terminology" },
        { key: 3, option: "D. Conflicting laws on both sides of the Atlantic" },
      ],
      answerKey: 0,
    },
    {
      id: "Q25",
      groupId: "G3",
      isGroupQ: true,
      type: "multiple_choice",
      content: "The phrase the practice in paragraph 3 refers to _______.",
      answerList: [
        { key: 0, option: "A. global heating" },
        { key: 1, option: "B. scrutiny" },
        { key: 2, option: "C. climate science" },
        { key: 3, option: "D. greenwashing" },
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
            "A. For empty slogans to be realised into moves, revelations about greenwashing and practical measures to reduce carbon are required.",
        },
        {
          key: 1,
          option:
            "B. Greenwashing is, in fact, a fallacy and therefore should be replaced by feasible actions which are encouraged through public movements.",
        },
        {
          key: 2,
          option:
            "C. To make way for meaningful activities in reality, it is vital to expose the public to proper and specific measures to reduce emissions.",
        },
        {
          key: 3,
          option:
            "D. The real solution ... is to verify and measure carbon reductions rather than just raise public awareness through campaigns.",
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
            "A. Regulators are effectively utilising the tools and resources...",
        },
        {
          key: 1,
          option:
            "B. Greenwashing brings corporations benefits in terms of finance and reputation without having to reform their core operations.",
        },
        {
          key: 2,
          option:
            "C. The shift from denying climate science ... genuine commitment to renewables.",
        },
        {
          key: 3,
          option:
            "D. Investors who value long-term environmental impact put pressure ...",
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
        { key: 0, option: "A. [IV]" },
        { key: 1, option: "B. [III]" },
        { key: 2, option: "C. [II]" },
        { key: 3, option: "D. [I]" },
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
            "A. Greenwashing is surging as firms cover ongoing pollution in eco-friendly rhetoric, distracting the public and postponing the deep emission cuts scientists deem urgent.",
        },
        {
          key: 1,
          option:
            "B. High-emitting sectors follow the trend of greenwashing, boasting about potential renewables while quietly damaging the environment.",
        },
        {
          key: 2,
          option:
            "C. Major emitters opt for denial rather than decarbonisation.",
        },
        {
          key: 3,
          option:
            "D. Greenwashing has merely drawn policymakers’ attention worldwide.",
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
      passage:
        `How to Manage Your Money Wisely? Managing your finances properly is essential for a stable and secure life. ` +
        `(30) ________, many people struggle with budgeting and saving ... eventually leading (31) _______ overspending and financial stress. ... ` +
        `Have a bank account with an increasing amount of savings (32) _______ month ... Buy (33) _______ within your price range. ` +
        `Track your spending carefully to avoid (34) _______ expenditure ... get your money’s (35) _______! (Adapted from thebalancemoney.com)`,
      content:
        "Managing your finances properly is essential for a stable and secure life. (30) ________, many people struggle with budgeting and saving...",
      answerList: [
        { key: 0, option: "A. However" },
        { key: 1, option: "B. Otherwise" },
        { key: 2, option: "C. Though" },
        { key: 3, option: "D. While" },
      ],
      answerKey: 0,
    },
    {
      id: "Q31",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "...eventually leading (31) _______ overspending and financial stress.",
      answerList: [
        { key: 0, option: "A. on" },
        { key: 1, option: "B. at" },
        { key: 2, option: "C. in" },
        { key: 3, option: "D. to" },
      ],
      answerKey: 3,
    },
    {
      id: "Q32",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Have a bank account with an increasing amount of savings (32) _______ month...",
      answerList: [
        { key: 0, option: "A. many" },
        { key: 1, option: "B. some" },
        { key: 2, option: "C. much" },
        { key: 3, option: "D. each" },
      ],
      answerKey: 3,
    },
    {
      id: "Q33",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content: "Buy (33) _______ within your price range.",
      answerList: [
        { key: 0, option: "A. affordable products quality" },
        { key: 1, option: "B. products affordable quality" },
        { key: 2, option: "C. affordable quality products" },
        { key: 3, option: "D. products quality affordable" },
      ],
      answerKey: 2,
    },
    {
      id: "Q34",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Track your spending carefully to avoid (34) _______ expenditure on unnecessary purchases.",
      answerList: [
        { key: 0, option: "A. possessive" },
        { key: 1, option: "B. restrictive" },
        { key: 2, option: "C. objective" },
        { key: 3, option: "D. excessive" },
      ],
      answerKey: 3,
    },
    {
      id: "Q35",
      groupId: "G4",
      isGroupQ: true,
      type: "fill_blank",
      content:
        "Prioritise things that bring lasting happiness and security to get your money’s (35) _______!",
      answerList: [
        { key: 0, option: "A. worth" },
        { key: 1, option: "B. price" },
        { key: 2, option: "C. rate" },
        { key: 3, option: "D. cost" },
      ],
      answerKey: 0,
    },

    // ========== Passage 3: Holiday decision patterns (Q36–Q40) ==========
    {
      id: "Q36",
      groupId: "G5",
      isGroupQ: true,
      type: "fill_blank",
      passage:
        `The process of sorting through the various holidays on offer and determining which is the best for you is inevitably complex... ` +
        `Some people undertake extensive problem solving, in which information is sought about a series of products, (36) _______. ` +
        `Other consumers ... (37) ________, for the sake of their convenience ... Many consumers engage in routinised response behaviour... (38) _______. ` +
        `Finally, some consumers will buy on impulse. (39) _______. ... (40) ________, where ‘distressed stock’ needs to be cleared at short notice. (Adapted from The Business of Tourism)`,
      content:
        "Some people undertake extensive problem solving, in which information is sought about a series of products, (36) _______.",
      answerList: [
        {
          key: 0,
          option:
            "A. each of which is evaluated and compared with similar products",
        },
        {
          key: 1,
          option:
            "B. every one of them undergoes evaluations and comparisons with similar products",
        },
        {
          key: 2,
          option:
            "C. when it is similarly evaluated and compared with other products",
        },
        {
          key: 3,
          option:
            "D. those with similarities to other products will be evaluated and compared carefully",
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
        "Other consumers with no patience to explore a variety of choices (37) ________, for the sake of their convenience rather than trying to guarantee they buy the best product.",
      answerList: [
        {
          key: 0,
          option:
            "A. be deliberate to confine themselves to a small number of choices",
        },
        {
          key: 1,
          option: "B. being deliberately confined themselves to fewer choices",
        },
        {
          key: 2,
          option:
            "C. will deliberately confine themselves to a small number of choices",
        },
        {
          key: 3,
          option: "D. fewer choices are deliberately confined to themselves",
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
        "Many consumers engage in routinised response behaviour... (38) _______.",
      answerList: [
        {
          key: 0,
          option:
            "A. Common brands, by contrast, are a pattern among loyal consumers",
        },
        {
          key: 1,
          option:
            "B. This is a common pattern among brand-loyal consumers, for example",
        },
        {
          key: 2,
          option:
            "C. By contrast, a consumer-loyal pattern is seen among common brands",
        },
        {
          key: 3,
          option:
            "D. This is a common example of brands with loyalty to a consumer pattern",
        },
      ],
      answerKey: 1,
    },
    {
      id: "Q39",
      groupId: "G5",
      isGroupQ: true,
      type: "fill_blank",
      content: "Finally, some consumers will buy on impulse. (39) _______.",
      answerList: [
        {
          key: 0,
          option:
            "A. The products cost little, which means they are better known and more favoured by typical holiday purchasers",
        },
        {
          key: 1,
          option:
            "B. While this is more typical of products costing little, it is by no means unknown among holiday purchasers",
        },
        {
          key: 2,
          option:
            "C. It doesn’t matter whether products are unknown, it is typical of purchasers to have holidays costing little",
        },
        {
          key: 3,
          option:
            "D. In the meantime, holidays costing little are known to be products typically favoured by many purchasers",
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
        "…operators have less scope for forward planning and reduced opportunities to gain from investing deposits. (40) ________, where ‘distressed stock’ needs to be cleared at short notice…",
      answerList: [
        {
          key: 0,
          option:
            "A. Though such trait of impulse purchasing proves to be valuable",
        },
        {
          key: 1,
          option:
            "B. So valuable is such purchasing trait that it proves to be impulsive",
        },
        {
          key: 2,
          option:
            "C. Such trait is so impulsive that it proves to be valuable to purchasers",
        },
        {
          key: 3,
          option:
            "D. Such impulse purchasing proves to be a valuable trait, though",
        },
      ],
      answerKey: 3,
    },
  ],
};
