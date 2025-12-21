import { QuizAttempt, QuizAttemptWithQuestions } from "@/types/attempt.type";
import { Question } from "@/types/quiz.type";

// Mock questions for demo (shortened version)
const mockQuestions: Question[] = [
  {
    id: "Q1",
    groupId: "G1",
    isGroupQ: true,
    type: "multiple_choice",
    passage: `When several farmers merge plots into a single "project farm", they use digital tools to make that teamwork far more effective. GPS mapping, drones, and in-field sensors build a live, shared picture of soil types, weather shifts, and plant growth. Because everyone works on the same data, the team can settle seeding dates, determine when to spray, and track machinery in real time. What once depended on guesswork is now driven by verifiable information.`,
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
    isGroupQ: false,
    type: "multiple_choice",
    content: "Which of the following is TRUE according to the passage?",
    answerList: [
      { key: 0, option: "Climate change is not a major concern." },
      { key: 1, option: "Technology helps farmers save resources." },
      { key: 2, option: "Traditional farming is more efficient." },
      { key: 3, option: "Digital tools are too expensive." },
    ],
    answerKey: 1,
  },
  {
    id: "Q7",
    isGroupQ: false,
    type: "multiple_choice",
    content: "What is the main benefit of GPS mapping for farmers?",
    answerList: [
      { key: 0, option: "Entertainment" },
      { key: 1, option: "Communication" },
      { key: 2, option: "Accurate field planning" },
      { key: 3, option: "Weather prediction" },
    ],
    answerKey: 2,
  },
  {
    id: "Q8",
    isGroupQ: false,
    type: "multiple_choice",
    content: "The passage suggests that modern farming_______.",
    answerList: [
      { key: 0, option: "is wasteful" },
      { key: 1, option: "uses data-driven decisions" },
      { key: 2, option: "ignores technology" },
      { key: 3, option: "is unpopular" },
    ],
    answerKey: 1,
  },
  {
    id: "Q9",
    isGroupQ: false,
    type: "multiple_choice",
    content: "According to the text, blockchain technology helps with_______.",
    answerList: [
      { key: 0, option: "watering crops" },
      { key: 1, option: "record verification" },
      { key: 2, option: "pest control" },
      { key: 3, option: "soil testing" },
    ],
    answerKey: 1,
  },
  {
    id: "Q10",
    isGroupQ: false,
    type: "multiple_choice",
    content: "Smart irrigation systems can_______.",
    answerList: [
      { key: 0, option: "increase water waste" },
      { key: 1, option: "predict market prices" },
      { key: 2, option: "reduce herbicide use" },
      { key: 3, option: "replace farmers entirely" },
    ],
    answerKey: 2,
  },
];

// Mock quiz metadata
export interface QuizMeta {
  _id: string;
  title: string;
  time: number;
  questionsNo: number;
}

export const mockQuizzes: QuizMeta[] = [
  {
    _id: "quiz-001",
    title: "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 – Mã đề 1102",
    time: 50,
    questionsNo: 10,
  },
  {
    _id: "quiz-002",
    title: "Practice Test - Reading Comprehension",
    time: 45,
    questionsNo: 10,
  },
  {
    _id: "quiz-003",
    title: "Grammar Focus - Tenses and Articles",
    time: 30,
    questionsNo: 10,
  },
];

// Mock quiz attempts data - organized by quiz
export const mockAttemptsByQuiz: Record<string, QuizAttempt[]> = {
  "quiz-001": [
    {
      _id: "attempt-001",
      quizId: "quiz-001",
      quizTitle: "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 – Mã đề 1102",
      userId: "user-001",
      startTime: "2025-12-18T14:00:00.000Z",
      endTime: "2025-12-18T14:42:30.000Z",
      timeTaken: 2550, // 42 minutes 30 seconds
      score: 8,
      totalQuestions: 10,
      answers: [
        { questionIndex: 1, selectedAnswer: 3, isCorrect: true },
        { questionIndex: 2, selectedAnswer: 3, isCorrect: true },
        { questionIndex: 3, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 4, selectedAnswer: 1, isCorrect: false },
        { questionIndex: 5, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 6, selectedAnswer: 1, isCorrect: true },
        { questionIndex: 7, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 8, selectedAnswer: 0, isCorrect: false },
        { questionIndex: 9, selectedAnswer: 1, isCorrect: true },
        { questionIndex: 10, selectedAnswer: 2, isCorrect: true },
      ],
      markedForReview: [], // Empty by default - user controls this
    },
    {
      _id: "attempt-002",
      quizId: "quiz-001",
      quizTitle: "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 – Mã đề 1102",
      userId: "user-001",
      startTime: "2025-12-17T10:00:00.000Z",
      endTime: "2025-12-17T10:35:15.000Z",
      timeTaken: 2115, // 35 minutes 15 seconds
      score: 7,
      totalQuestions: 10,
      answers: [
        { questionIndex: 1, selectedAnswer: 3, isCorrect: true },
        { questionIndex: 2, selectedAnswer: 2, isCorrect: false },
        { questionIndex: 3, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 4, selectedAnswer: 0, isCorrect: true },
        { questionIndex: 5, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 6, selectedAnswer: 1, isCorrect: true },
        { questionIndex: 7, selectedAnswer: 3, isCorrect: false },
        { questionIndex: 8, selectedAnswer: 1, isCorrect: true },
        { questionIndex: 9, selectedAnswer: -1, isCorrect: false },
        { questionIndex: 10, selectedAnswer: 2, isCorrect: true },
      ],
      markedForReview: [],
    },
    {
      _id: "attempt-003",
      quizId: "quiz-001",
      quizTitle: "Đề thi Tốt nghiệp THPT Tiếng Anh 2025 – Mã đề 1102",
      userId: "user-001",
      startTime: "2025-12-15T16:30:00.000Z",
      endTime: "2025-12-15T17:05:45.000Z",
      timeTaken: 2145, // 35 minutes 45 seconds
      score: 6,
      totalQuestions: 10,
      answers: [
        { questionIndex: 1, selectedAnswer: 3, isCorrect: true },
        { questionIndex: 2, selectedAnswer: 1, isCorrect: false },
        { questionIndex: 3, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 4, selectedAnswer: 0, isCorrect: true },
        { questionIndex: 5, selectedAnswer: 0, isCorrect: false },
        { questionIndex: 6, selectedAnswer: 1, isCorrect: true },
        { questionIndex: 7, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 8, selectedAnswer: 0, isCorrect: false },
        { questionIndex: 9, selectedAnswer: 0, isCorrect: false },
        { questionIndex: 10, selectedAnswer: 2, isCorrect: true },
      ],
      markedForReview: [],
    },
  ],
  "quiz-002": [
    {
      _id: "attempt-004",
      quizId: "quiz-002",
      quizTitle: "Practice Test - Reading Comprehension",
      userId: "user-001",
      startTime: "2025-12-16T09:00:00.000Z",
      endTime: "2025-12-16T09:38:20.000Z",
      timeTaken: 2300,
      score: 9,
      totalQuestions: 10,
      answers: [
        { questionIndex: 1, selectedAnswer: 3, isCorrect: true },
        { questionIndex: 2, selectedAnswer: 3, isCorrect: true },
        { questionIndex: 3, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 4, selectedAnswer: 0, isCorrect: true },
        { questionIndex: 5, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 6, selectedAnswer: 1, isCorrect: true },
        { questionIndex: 7, selectedAnswer: 2, isCorrect: true },
        { questionIndex: 8, selectedAnswer: 1, isCorrect: true },
        { questionIndex: 9, selectedAnswer: 0, isCorrect: false },
        { questionIndex: 10, selectedAnswer: 2, isCorrect: true },
      ],
      markedForReview: [],
    },
  ],
};

// Get quiz metadata
export const getQuizMeta = (quizId: string): QuizMeta | null => {
  return mockQuizzes.find((q) => q._id === quizId) || null;
};

// Get attempts for a specific quiz
export const getAttemptsByQuiz = (quizId: string): QuizAttempt[] => {
  return mockAttemptsByQuiz[quizId] || [];
};

// Get attempt with questions for detailed view
export const getAttemptWithQuestions = (
  attemptId: string,
): QuizAttemptWithQuestions | null => {
  // Search through all quizzes to find the attempt
  for (const attempts of Object.values(mockAttemptsByQuiz)) {
    const attempt = attempts.find((a) => a._id === attemptId);
    if (attempt) {
      return {
        ...attempt,
        questions: mockQuestions,
      };
    }
  }
  return null;
};

// Utility function to format time duration
export const formatTimeTaken = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};

// Utility function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Calculate stats for a quiz
export const calculateQuizStats = (attempts: QuizAttempt[]) => {
  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      bestScore: 0,
      improvement: 0,
    };
  }

  const scores = attempts.map((a) => (a.score / a.totalQuestions) * 100);
  const averageScore = scores.reduce((acc, s) => acc + s, 0) / scores.length;
  const bestScore = Math.max(...scores);

  // Calculate improvement (difference between first and last attempt)
  let improvement = 0;
  if (attempts.length >= 2) {
    // Attempts are ordered newest first, so reverse for chronological order
    const sortedAttempts = [...attempts].sort(
      (a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime(),
    );
    const firstScore =
      (sortedAttempts[0].score / sortedAttempts[0].totalQuestions) * 100;
    const lastScore =
      (sortedAttempts[sortedAttempts.length - 1].score /
        sortedAttempts[sortedAttempts.length - 1].totalQuestions) *
      100;
    improvement = lastScore - firstScore;
  }

  return {
    totalAttempts: attempts.length,
    averageScore: Math.round(averageScore * 10) / 10,
    bestScore: Math.round(bestScore * 10) / 10,
    improvement: Math.round(improvement * 10) / 10,
  };
};
