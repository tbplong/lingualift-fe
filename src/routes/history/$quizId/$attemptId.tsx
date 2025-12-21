import { ArrowLeft, ArrowRight } from "@/components/icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  Clock,
  Trophy,
  ArrowLeft as BackArrow,
  Flag,
  Loader2,
} from "lucide-react";
import AttemptService from "@/services/attempt/attempt.service";
import QuizService from "@/services/quiz/quiz.service";
import { QuizAttempt } from "@/types/attempt.type";
import { Question } from "@/types/quiz.type";

export const Route = createFileRoute("/history/$quizId/$attemptId")({
  component: RouteComponent,
});

// Utility function to format time duration
const formatTimeTaken = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
};

// Utility function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function RouteComponent() {
  const { quizId, attemptId } = Route.useParams();
  const navigate = useNavigate();

  const [attemptData, setAttemptData] = useState<QuizAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(1);
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch attempt data
        const attemptResponse = await AttemptService.getAttemptById(attemptId);
        setAttemptData(attemptResponse.data);

        // Fetch quiz with questions
        const quizResponse = await QuizService.getQuizContent(quizId);
        setQuestions(
          (quizResponse.data as unknown as { questions: Question[] })
            .questions || [],
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load attempt details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [attemptId, quizId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            className="animate-spin text-primary mx-auto mb-4"
            size={48}
          />
          <p className="text-slate-500">Loading attempt details...</p>
        </div>
      </div>
    );
  }

  if (error || !attemptData) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Attempt Not Found
          </h2>
          <p className="text-slate-500 mb-4">
            {error || "The quiz attempt you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate({ to: `/history/${quizId}` })}
            className="btn bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  const { answers, score, totalQuestions } = attemptData;
  const numQ = totalQuestions;
  const question = questions[current - 1];
  const content = question?.content || "";
  const optList = question?.answerList || [];

  // Find user's answer for current question
  const userAnswer = answers.find((a) => a.questionIndex === current);
  const userSelectedAnswer = userAnswer?.selectedAnswer ?? -1;
  const correctAnswer =
    typeof question?.answerKey === "number" ? question.answerKey : -1;
  const isMarkedForReview = markedForReview.has(current);

  // Toggle mark for review
  const toggleReview = () => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(current)) {
        newSet.delete(current);
      } else {
        newSet.add(current);
      }
      return newSet;
    });
  };

  // Get passage for grouped questions
  let passage: string | undefined = question?.passage;
  if (question?.isGroupQ && !passage) {
    const parentQuestion = questions.find(
      (q) => q.groupId === question.groupId && q.passage,
    );
    if (parentQuestion) {
      passage = parentQuestion.passage;
    }
  }

  const loadQuestion = (questionNo: number) => {
    if (questionNo >= 1 && questionNo <= numQ) {
      setCurrent(questionNo);
    }
  };

  const getAnswerStatus = (
    optionKey: number,
  ): "correct" | "wrong" | "missed" | "default" => {
    if (optionKey === correctAnswer && userSelectedAnswer === correctAnswer) {
      return "correct";
    }
    if (optionKey === correctAnswer && userSelectedAnswer !== correctAnswer) {
      return "correct";
    }
    if (
      optionKey === userSelectedAnswer &&
      userSelectedAnswer !== correctAnswer
    ) {
      return "wrong";
    }
    return "default";
  };

  const getAnswerBoxStatus = (
    questionIndex: number,
  ): "correct" | "wrong" | "unanswered" => {
    const answer = answers.find((a) => a.questionIndex === questionIndex);
    if (!answer || answer.selectedAnswer === -1) return "unanswered";
    return answer.isCorrect ? "correct" : "wrong";
  };

  const getOptionLabel = (key: number): string => {
    const labels = ["A", "B", "C", "D"];
    return labels[key] || "";
  };

  const getAnswerStyleByStatus = (
    status: "correct" | "wrong" | "missed" | "default",
  ): string => {
    switch (status) {
      case "correct":
        return "border-success bg-success/10 text-success";
      case "wrong":
        return "border-quaternary bg-quaternary/10 text-quaternary";
      default:
        return "border-slate-200 bg-white text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-primary-100/30">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate({ to: `/history/${quizId}` })}
              className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
            >
              <BackArrow size={20} />
              <span className="font-medium">Back to History</span>
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="text-slate-400" size={18} />
              <span className="text-slate-600 font-medium">
                Time: {formatTimeTaken(attemptData.timeTaken)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy
                className={clsx(
                  score / totalQuestions >= 0.8
                    ? "text-success"
                    : score / totalQuestions >= 0.6
                      ? "text-secondary"
                      : "text-quaternary",
                )}
                size={18}
              />
              <span className="text-slate-600 font-medium">
                Score:{" "}
                <span
                  className={clsx(
                    "font-bold",
                    score / totalQuestions >= 0.8
                      ? "text-success"
                      : score / totalQuestions >= 0.6
                        ? "text-secondary"
                        : "text-quaternary",
                  )}
                >
                  {score}/{totalQuestions}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        {/* Question Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Question Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-800">
                  Question {current}
                </span>
                {isMarkedForReview && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary-700 rounded-full text-sm font-medium">
                    <Flag size={14} fill="currentColor" />
                    Marked for Review
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleReview}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border-2",
                    isMarkedForReview
                      ? "bg-secondary/10 border-secondary text-secondary-700"
                      : "bg-white border-slate-200 text-slate-500 hover:border-secondary hover:text-secondary-700",
                  )}
                >
                  <Flag
                    size={14}
                    fill={isMarkedForReview ? "currentColor" : "none"}
                  />
                  {isMarkedForReview ? "Marked" : "Mark for Review"}
                </button>
                <span
                  className={clsx(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    userAnswer?.isCorrect
                      ? "bg-success/10 text-success"
                      : "bg-quaternary/10 text-quaternary",
                  )}
                >
                  {userAnswer?.isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              {passage && (
                <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {passage}
                  </p>
                </div>
              )}

              <p className="text-lg font-semibold text-slate-800 mb-6">
                {content}
              </p>

              <div className="space-y-3">
                {optList.map((option) => {
                  const status = getAnswerStatus(option.key);
                  const isUserSelection = option.key === userSelectedAnswer;
                  const isCorrectAnswer = option.key === correctAnswer;

                  return (
                    <div
                      key={option.key}
                      className={clsx(
                        "p-4 rounded-2xl border-2 transition-all relative",
                        getAnswerStyleByStatus(status),
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={clsx(
                            "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                            status === "correct"
                              ? "bg-success text-white"
                              : status === "wrong"
                                ? "bg-quaternary text-white"
                                : "bg-slate-100 text-slate-500",
                          )}
                        >
                          {getOptionLabel(option.key)}
                        </span>
                        <span className="text-base leading-relaxed flex-1">
                          {option.option}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {isUserSelection && (
                            <span
                              className={clsx(
                                "text-xs font-medium px-2 py-1 rounded",
                                isCorrectAnswer
                                  ? "bg-success/20 text-success"
                                  : "bg-quaternary/20 text-quaternary",
                              )}
                            >
                              Your Answer
                            </span>
                          )}
                          {isCorrectAnswer && !isUserSelection && (
                            <span className="text-xs font-medium px-2 py-1 rounded bg-success/20 text-success">
                              Correct Answer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => loadQuestion(current - 1)}
                disabled={current === 1}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all",
                  current === 1
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:text-primary hover:bg-primary-100/50",
                )}
              >
                <ArrowLeft
                  className={clsx(
                    current === 1 ? "fill-slate-300" : "fill-slate-600",
                  )}
                />
                Previous
              </button>
              <span className="text-slate-500 font-medium">
                {current} of {numQ}
              </span>
              <button
                onClick={() => loadQuestion(current + 1)}
                disabled={current === numQ}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all",
                  current === numQ
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:text-primary hover:bg-primary-100/50",
                )}
              >
                Next
                <ArrowRight
                  className={clsx(
                    current === numQ ? "fill-slate-300" : "fill-slate-600",
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Question Navigator */}
        <aside className="w-72 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Questions</h3>

            <div className="flex flex-wrap gap-3 mb-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-success"></div>
                <span className="text-slate-500">Correct</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-quaternary"></div>
                <span className="text-slate-500">Wrong</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-slate-300"></div>
                <span className="text-slate-500">Unanswered</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: numQ }, (_, i) => i + 1).map(
                (questionNo) => {
                  const status = getAnswerBoxStatus(questionNo);
                  const isReview = markedForReview.has(questionNo);
                  const isCurrent = questionNo === current;

                  return (
                    <button
                      key={questionNo}
                      onClick={() => loadQuestion(questionNo)}
                      className={clsx(
                        "relative w-full aspect-square rounded-lg font-semibold text-sm transition-all",
                        isCurrent && "ring-2 ring-primary ring-offset-2",
                        status === "correct" && "bg-success text-white",
                        status === "wrong" && "bg-quaternary text-white",
                        status === "unanswered" &&
                          "bg-slate-200 text-slate-600",
                        "hover:scale-105 cursor-pointer",
                      )}
                    >
                      {questionNo}
                      {isReview && (
                        <div className="absolute -top-1 -right-1 w-3 h-3">
                          <Flag
                            size={12}
                            className="text-secondary fill-secondary"
                          />
                        </div>
                      )}
                    </button>
                  );
                },
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Correct</span>
                  <span className="font-semibold text-success">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Wrong</span>
                  <span className="font-semibold text-quaternary">
                    {totalQuestions - score}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Marked for Review</span>
                  <span className="font-semibold text-secondary">
                    {markedForReview.size}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400 mb-1">Completed on</p>
              <p className="text-sm font-medium text-slate-600">
                {formatDate(attemptData.endTime)}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
