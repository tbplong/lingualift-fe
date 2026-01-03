import { ArrowLeft, ArrowRight } from "@/components/icons";
import AnsBox from "@/pages/quiz/AnsBox";
import Chosen from "@/pages/quiz/Chosen";
import ConfirmSubmission from "@/pages/quiz/ConfirmSubmission";
import { timeFormat } from "@/pages/quiz/timer";
import AttemptService from "@/services/attempt/attempt.service";
import QuizService from "@/services/quiz/quiz.service";
import { QuizContentRESP } from "@/services/quiz/response/quiz.response";
import { getUserId } from "@/stores/user.store";
import { UserAnswer, QuizAttempt } from "@/types/attempt.type";
import { Question } from "@/types/quiz.type";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Trophy,
  ArrowLeft as BackArrow,
  Flag,
  Loader2,
} from "lucide-react";

import { savePickup, clearPickup } from "@/utils/pickup";
import { pushRecent } from "@/utils/recent";

export const Route = createFileRoute("/quiz/$quizId/$attemptId")({
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

  // Common state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attemptData, setAttemptData] = useState<QuizAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(
    new Set(),
  );

  // Quiz-taking specific state
  const [exam, setExam] = useState<QuizContentRESP | null>(null);
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [review, setReview] = useState<boolean[]>([]);
  const [hasPassage, setHasPassage] = useState<number[]>([]);
  const [time, setTime] = useState<number>(0);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");

  const timer = useRef<HTMLDivElement | null>(null);
  const ansRef = useRef(ans);
  const reviewRef = useRef(review);
  const isSubmittedRef = useRef(false);
  const isSubmitted = score !== null;

  // ✅ keep current + time in refs so persistPickup always has latest value
  const currentRef = useRef(current);
  const timeRef = useRef(time);

  const userId = getUserId(); // must be stable string/id

  // Update refs when state changes
  useEffect(() => {
    ansRef.current = ans;
  }, [ans]);

  useEffect(() => {
    reviewRef.current = review;
  }, [review]);

  useEffect(() => {
    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    timeRef.current = time;
  }, [time]);

  // ✅ Persist pickup helper
  const persistPickup = () => {
    if (!exam || !attemptId || !quizId) return;
    if (!userId) return;

    const answeredCount = Object.values(ansRef.current).filter(
      (v) => v !== -1,
    ).length;

    savePickup({
      userId,
      quizId,
      attemptId,
      title: title || exam.title || "Quiz",
      category: "Quiz",
      current: currentRef.current,
      questionsNo: exam.questionsNo,
      answeredCount,
      remainingTime: timeRef.current,
      updatedAt: Date.now(),
    });
  };

  // Fetch data - determines if this is a completed or in-progress attempt
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch attempt data first to check if completed
        const attemptResponse = await AttemptService.getAttemptById(attemptId);
        const attempt = attemptResponse.data;
        setAttemptData(attempt);

        // Fetch quiz content
        const quizResponse = await QuizService.getQuizContent(quizId);
        const quizData = quizResponse.data;
        setExam(quizData);
        setTitle(quizData.title);
        setQuestions(quizData.questions || []);

        // Set passage indices
        const passageIndices: number[] = [];
        quizData.questions.forEach((q, i) => {
          if (q.passage) passageIndices.push(i);
        });
        setHasPassage(passageIndices);

        if (attempt.isCompleted) {
          // Completed attempt - set score inView mode
          setScore(attempt.score ?? null);
          if (attempt.markedForReview) {
            setMarkedForReview(new Set(attempt.markedForReview));
          }

          // ✅ completed => clear pickup (avoid showing continue for done attempt)
          if (userId) clearPickup(userId);
        } else {
          // In-progress attempt - resume quiz taking
          const initialAns: Record<number, number> = {};
          const initialReview: boolean[] = new Array(
            quizData.questionsNo + 1,
          ).fill(false);

          // Initialize all answers to -1
          for (let key = 1; key <= quizData.questionsNo; key++) {
            initialAns[key] = -1;
          }

          // Load saved answers
          if (attempt.answers) {
            attempt.answers.forEach((a: UserAnswer) => {
              initialAns[a.questionIndex] = a.selectedAnswer;
            });
          }

          // Load marked for review
          if (attempt.markedForReview) {
            attempt.markedForReview.forEach((idx: number) => {
              if (idx < initialReview.length) initialReview[idx] = true;
            });
          }

          // Calculate remaining time
          const elapsed = attempt.timeTaken || 0;
          const initialTime = quizData.time * 60 - elapsed;

          setAns(initialAns);
          setReview(initialReview);
          setTime(initialTime > 0 ? initialTime : 0);

          // ✅ persist initial pickup for dashboard
          // wait a tick so refs update
          setTimeout(persistPickup, 0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load quiz attempt");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId, quizId]);

  // Auto-sync function
  const handleAutoSync = async (
    currentAttemptId: string,
    currentExam: QuizContentRESP,
    currentTitle: string,
    currentAns: Record<number, number>,
    currentReview: boolean[],
    remainingTime: number,
  ) => {
    if (isSubmittedRef.current) return;
    if (!currentAttemptId || !currentExam || !Array.isArray(currentReview))
      return;

    const formattedAnswers = Object.entries(currentAns)
      .filter(([idx, selected]) => {
        const questionIndex = Number(idx);
        return (
          !isNaN(questionIndex) &&
          questionIndex >= 1 &&
          questionIndex <= currentExam.questionsNo &&
          typeof selected === "number" &&
          !isNaN(selected)
        );
      })
      .map(([idx, selected]) => ({
        questionIndex: Number(idx),
        selectedAnswer: selected,
        isCorrect: false,
      }));

    const markedIndices = currentReview
      .map((val, idx) => (val ? idx : -1))
      .filter((idx) => idx > 0);

    const syncData = {
      timeTaken: currentExam.time * 60 - remainingTime,
      answers: formattedAnswers,
      markedForReview: markedIndices,
    };

    try {
      await AttemptService.updateAttemptById(currentAttemptId, syncData);

      // ✅ pickup + recent in-progress
      persistPickup();
      if (userId) {
        pushRecent(userId, {
          id: currentAttemptId,
          quizId,
          title: currentTitle,
          scorePercent: 0,
          updatedAt: Date.now(),
        });
      }

      console.log("Auto-save successful");
    } catch (err: unknown) {
      console.error("Auto-save failed", err);
    }
  };

  // Final submit function
  const handleFinalSubmit = async (
    currentAttemptId: string,
    currentExam: QuizContentRESP,
    currentTitle: string,
    currentAns: Record<number, number>,
    currentReview: boolean[],
    currentTime: number,
  ) => {
    if (!currentAttemptId || !currentExam) return;

    isSubmittedRef.current = true;

    let correctCount = 0;
    currentExam.questions.forEach((q, i) => {
      if (currentAns[i + 1] === q.answerKey) correctCount++;
    });

    const formattedAnswers = Object.entries(currentAns)
      .filter(([idx, selected]) => {
        const questionIndex = Number(idx);
        return (
          !isNaN(questionIndex) &&
          questionIndex >= 1 &&
          questionIndex <= currentExam.questionsNo &&
          typeof selected === "number" &&
          !isNaN(selected)
        );
      })
      .map(([idx, selected]) => {
        const questionIndex = Number(idx);
        const question = currentExam.questions[questionIndex - 1];
        return {
          questionIndex,
          selectedAnswer: selected,
          isCorrect: question ? selected === question.answerKey : false,
        };
      });

    const markedIndices = currentReview
      .map((val, idx) => (val ? idx : -1))
      .filter((idx) => idx > 0);

    const finalData = {
      timeTaken: currentExam.time * 60 - currentTime,
      answers: formattedAnswers,
      markedForReview: markedIndices,
      score: correctCount,
      isCompleted: true,
    };

    try {
      await AttemptService.updateAttemptById(currentAttemptId, finalData);

      setScore(correctCount);

      // ✅ recent completed + clear pickup
      if (userId) {
        pushRecent(userId, {
          id: currentAttemptId,
          quizId,
          title: currentTitle,
          scorePercent: Math.round(
            (correctCount / currentExam.questionsNo) * 100,
          ),
          updatedAt: Date.now(),
        });
        clearPickup(userId);
      }

      setOpenSub(false);
      alert(
        `Nộp bài thành công! Điểm: ${correctCount}/${currentExam.questionsNo}`,
      );
    } catch (err: unknown) {
      console.error("Submit failed", err);
    }
  };

  const autoSyncRef = useRef(handleAutoSync);
  const finalSubmitRef = useRef(handleFinalSubmit);

  useEffect(() => {
    if (!exam || !attemptId || score !== null || attemptData?.isCompleted)
      return;

    const timerID = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timerID);

          finalSubmitRef.current(
            attemptId,
            exam,
            title,
            ansRef.current,
            reviewRef.current,
            0,
          );

          if (timer.current) timer.current.innerHTML = timeFormat(0);
          return 0;
        }

        const next = prev - 1;

        // ✅ auto-sync every 10 seconds
        if (next > 0 && next % 10 === 0) {
          autoSyncRef.current(
            attemptId,
            exam,
            title,
            ansRef.current,
            reviewRef.current,
            next,
          );
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(timerID);
  }, [exam, attemptId, score, attemptData?.isCompleted, title]);

  const chooseAns = (chooseNo: number) => {
    setAns((prev) => {
      const next = { ...prev, [currentRef.current]: chooseNo };
      ansRef.current = next;
      return next;
    });

    // ✅ persist immediately for pickup
    persistPickup();
  };

  const loadQuiz = (quizNo: number) => {
    setCurrent(quizNo);
    // ✅ persist after state updates
    setTimeout(persistPickup, 0);
  };

  const loadQuestion = (questionNo: number) => {
    if (questionNo >= 1 && questionNo <= questions.length) {
      setCurrent(questionNo);
      setTimeout(persistPickup, 0);
    }
  };

  const getQuestionType = (
    type: "multiple_choice" | "fill_blank" | "arrangement" | "matching",
  ) => {
    switch (type) {
      case "multiple_choice":
        return "Multiple Choice";
      case "fill_blank":
        return "Fill In The Blank";
      case "arrangement":
        return "Ordering";
      case "matching":
        return "Matching";
      default:
        return "Unknown";
    }
  };

  // Toggle mark for review (for review mode) - with API call
  const toggleReview = async () => {
    const newSet = new Set(markedForReview);
    if (newSet.has(current)) newSet.delete(current);
    else newSet.add(current);

    setMarkedForReview(newSet);

    try {
      await AttemptService.updateAttemptById(attemptId, {
        _id: attemptId,
        markedForReview: Array.from(newSet),
      });

      // ✅ also persist pickup
      persistPickup();

      console.log("Marked for review updated successfully");
    } catch (err) {
      console.error("Failed to update marked for review", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            className="animate-spin text-primary mx-auto mb-4"
            size={48}
          />
          <p className="text-slate-500">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !attemptData || !exam) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Quiz Not Found
          </h2>
          <p className="text-slate-500 mb-4">
            {error || "The quiz attempt you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate({ to: `/quiz/${quizId}` })}
            className="btn bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Back to Quiz
          </button>
        </div>
      </div>
    );
  }

  const numQ = exam.questionsNo;
  const question = questions[current - 1];
  const questionType = question ? getQuestionType(question.type) : "";
  const content = question?.content || "";
  const optList = question?.answerList || [];

  // Get passage for grouped questions
  let passage: string | undefined = undefined;

  if (question?.isGroupQ) {
    passage = question.passage;

    if (!passage) {
      const parentIndex = hasPassage.find(
        (i) => questions[i].groupId === question.groupId,
      );
      if (parentIndex !== undefined) {
        passage = questions[parentIndex].passage;
      }
    }
  }

  // =====================================================
  // COMPLETED ATTEMPT - REVIEW MODE
  // =====================================================
  if (attemptData.isCompleted || score !== null) {
    const { answers, score: finalScore, totalQuestions } = attemptData;
    const displayScore = score ?? finalScore;

    const hasValidAnswers =
      answers?.length > 0 && answers[0]?.questionIndex !== undefined;

    const getUserSelectedAnswer = (questionIndex: number): number => {
      if (hasValidAnswers) {
        const answer = answers.find((a) => a.questionIndex === questionIndex);
        return answer?.selectedAnswer ?? -1;
      }
      return ans[questionIndex] ?? -1;
    };

    const userSelectedAnswer = getUserSelectedAnswer(current);
    const correctAnswer =
      typeof question?.answerKey === "number" ? question.answerKey : -1;
    const isMarkedForReview = markedForReview.has(current);

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
      const selectedAnswer = getUserSelectedAnswer(questionIndex);
      if (selectedAnswer === -1) return "unanswered";
      const questionData = questions[questionIndex - 1];
      if (!questionData) return "wrong";
      return selectedAnswer === questionData.answerKey ? "correct" : "wrong";
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
                onClick={() => navigate({ to: `/quiz/${quizId}` })}
                className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
              >
                <BackArrow size={20} />
                <span className="font-medium">Back to Quiz</span>
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
                    displayScore && totalQuestions
                      ? displayScore / totalQuestions >= 0.8
                        ? "text-success"
                        : displayScore / totalQuestions >= 0.6
                          ? "text-secondary"
                          : "text-quaternary"
                      : "",
                  )}
                  size={18}
                />
                <span className="text-slate-600 font-medium">
                  Score:{" "}
                  <span
                    className={clsx(
                      "font-bold",
                      displayScore && totalQuestions
                        ? displayScore / totalQuestions >= 0.8
                          ? "text-success"
                          : displayScore / totalQuestions >= 0.6
                            ? "text-secondary"
                            : "text-quaternary"
                        : "",
                    )}
                  >
                    {displayScore}/{totalQuestions}
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
                      userSelectedAnswer === correctAnswer
                        ? "bg-success/10 text-success"
                        : "bg-quaternary/10 text-quaternary",
                    )}
                  >
                    {userSelectedAnswer === correctAnswer
                      ? "Correct"
                      : "Incorrect"}
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
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Questions
              </h3>

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
                    <span className="font-semibold text-success">
                      {displayScore}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wrong</span>
                    <span className="font-semibold text-quaternary">
                      {totalQuestions && displayScore
                        ? totalQuestions - displayScore
                        : ""}
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
                  {formatDate(attemptData.endTime ?? "")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // =====================================================
  // IN-PROGRESS ATTEMPT - QUIZ TAKING MODE
  // =====================================================
  const progress: number = (time / (exam.time * 60)) * 100;

  return (
    <div className={clsx("drawer drawer-end h-dvh")}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-primary-200 px-10 pb-10">
        <div className="h-20 flex items-center justify-between">
          {/* Return to Quiz button */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to leave? Your progress will be saved.",
                )
              ) {
                // ✅ persist before leaving
                persistPickup();
                navigate({ to: `/quiz/${quizId}` });
              }
            }}
            className="btn btn-ghost text-secondary-300 hover:bg-secondary-300/10 flex items-center gap-2 mr-4"
          >
            <BackArrow size={20} />
            <span className="hidden sm:inline">Exit Quiz</span>
          </button>

          <div className="flex flex-row items-center justify-center h-10">
            <div className="flex flex-col mr-2">
              <span
                ref={timer}
                className="font-bold w-30 text-3xl text-secondary-300 leading-6"
              >
                {timeFormat(time)}
              </span>
              <span className="text-secondary-300 font-medium leading-5">
                Time Left
              </span>
            </div>

            <div className="w-90 bg-white h-5 rounded-3xl flex justify-start p-1 border-2 border-tertiary">
              <div
                className={clsx(
                  "h-full rounded-2xl transition-all duration-1000 ease-linear",
                  progress > 40 ? "bg-secondary-300" : "bg-quaternary-300",
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {isSubmitted && (
            <div className="text-4xl text-secondary-300 font-bold">
              Score: {score}/{numQ}
            </div>
          )}

          <div className="flex flex-row justify-between items-center w-52">
            <button
              onClick={async () => {
                const nextReview = [...review];
                nextReview[current] = !nextReview[current];
                setReview(nextReview);

                try {
                  const markedIndices = nextReview
                    .map((val, idx) => (val ? idx : -1))
                    .filter((idx) => idx > 0);
                  await AttemptService.updateAttemptById(attemptId, {
                    _id: attemptId,
                    markedForReview: markedIndices,
                  });

                  // ✅ persist pickup after mark
                  persistPickup();

                  console.log("Marked for review updated successfully");
                } catch (err) {
                  console.error("Failed to update marked for review", err);
                }
              }}
              className="btn bg-white border-2 border-tertiary p-2 rounded-md w-auto h-10 drop-shadow-lg"
            >
              <img
                src={clsx(
                  review[current]
                    ? "/flag-outline-red.svg"
                    : "/flag-outline-nocolor.svg",
                )}
                className="aspect-square h-full"
              />
            </button>

            <label
              htmlFor="my-drawer-4"
              className="drawer-button h-10 border-2 text-tertiary border-tertiary p-2 w-auto bg-white btn rounded-md drop-shadow-lg transition-colors duration-10 ease-in"
            >
              <span className="text-lg ">View progress</span>
              <img src={"/fire.png"} className="aspect-square h-7" />
            </label>
          </div>
        </div>

        <div className="w-full h-full bg-white border-4 border-tertiary rounded-2xl p-6 pb-2 drop-shadow-2xl">
          <div className="flex flex-row justify-between items-center mb-2">
            <button
              onClick={() => {
                if (current !== 1) loadQuiz(current - 1);
              }}
              className={clsx(
                "flex flex-row items-center justify-start w-26",
                current !== 1 ? "cursor-pointer" : "",
              )}
            >
              <div className={clsx("h-full")}>
                <ArrowLeft
                  className={clsx(
                    current !== 1 ? "fill-tertiary" : "fill-tertiary-100",
                  )}
                />
              </div>
              <span
                className={clsx(
                  "text-xl font-medium",
                  current !== 1 ? "text-tertiary" : "text-tertiary-100",
                )}
              >
                Previous
              </span>
            </button>

            <span className="font-semibold flex justify-center items-center w-36 text-tertiary text-2xl">
              Quesion {current}
            </span>

            <button
              onClick={() => {
                if (current !== numQ) loadQuiz(current + 1);
              }}
              className={clsx(
                "flex flex-row items-center justify-end w-26",
                current !== numQ ? "cursor-pointer" : "",
              )}
            >
              <span
                className={clsx(
                  "text-xl font-medium h-full",
                  current !== numQ ? "text-tertiary" : "text-tertiary-100",
                )}
              >
                Next
              </span>
              <div className={clsx("h-full")}>
                <ArrowRight
                  className={clsx(
                    current !== numQ ? "fill-tertiary" : "fill-tertiary-100",
                  )}
                />
              </div>
            </button>
          </div>

          <span className="font-semibold">{questionType}</span>
          <p className="w-full h-69 mt-2 mb-6 border-x-0 text-lg overflow-y-auto content-center text-justify pr-1 whitespace-pre-line">
            {passage}
          </p>
          <span className="font-bold text-xl text-justify wrap-normal w-full h-14 mb-4 content-center block">
            {content}
          </span>

          <div className="w-full grid grid-cols-2 gap-4 h-40">
            {optList.map((value, i) => {
              let status: "default" | "selected" | "correct" | "wrong" =
                "default";

              if (!isSubmitted) {
                if (ans[current] === value.key) status = "selected";
              } else {
                if (question.answerKey === value.key) {
                  status = "correct";
                } else if (
                  (ans[current] === value.key &&
                    question.answerKey !== value.key) ||
                  ans[current] === -1
                ) {
                  status = "wrong";
                }
              }

              return (
                <Chosen
                  key={i}
                  op={value.key}
                  content={value.option}
                  status={status}
                  disabled={isSubmitted}
                  chooseAns={chooseAns}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-white border-l-4 text-base-content min-h-full w-80 p-4 px-10">
          <div className="w-full flex justify-center mb-4 text-primary text-justify text-4xl font-bold">
            Questions
          </div>

          <div className="grid grid-cols-5 gap-x-2.5 gap-y-2 h-fit">
            {Object.entries(ans).map(([key, ansVal]) => {
              return (
                <AnsBox
                  key={Number(key)}
                  ansNum={Number(key)}
                  ansVal={ansVal}
                  loadQuiz={loadQuiz}
                  isCurrent={Number(key) === current}
                  isReview={review[Number(key)]}
                  isSubmitted={isSubmitted}
                  correctAnswer={
                    exam.questions[Number(key) - 1]?.answerKey ?? -1
                  }
                />
              );
            })}
          </div>

          <button
            onClick={() => setOpenSub(true)}
            disabled={isSubmitted}
            className="btn h-16 absolute bottom-8 w-59 bg-secondary hover:border-2 hover:bg-white hover:border-secondary rounded-xl text-white hover:text-secondary text-3xl font-semibold transition-all duration-100 cursor-pointer"
          >
            Submit
          </button>
        </ul>
      </div>

      <ConfirmSubmission
        open={openSub}
        onClose={async () => {
          setOpenSub(false);
        }}
        confirmSubmit={() => {
          if (attemptId && exam) {
            handleFinalSubmit(
              attemptId,
              exam,
              title,
              ansRef.current,
              reviewRef.current,
              time,
            );
          }
        }}
      />
    </div>
  );
}
