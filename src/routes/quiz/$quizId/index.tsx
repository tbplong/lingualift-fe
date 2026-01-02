import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Clock,
  Trophy,
  Calendar,
  ChevronRight,
  History,
  TrendingUp,
  Award,
  ArrowLeft,
  Loader2,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import StudyLayout from "@/components/study-layout";
import AttemptService, {
  CreateAttemptRequest,
} from "@/services/attempt/attempt.service";
import QuizService from "@/services/quiz/quiz.service";
import { QuizAttempt } from "@/types/attempt.type";

export const Route = createFileRoute("/quiz/$quizId/")({
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

// Calculate stats for a quiz
const calculateQuizStats = (attempts: QuizAttempt[]) => {
  const completedAttempts = attempts.filter((a) => a.isCompleted);
  if (completedAttempts.length === 0) {
    return {
      totalAttempts: attempts.length,
      averageScore: 0,
      bestScore: 0,
      improvement: 0,
    };
  }

  const scores = completedAttempts.map(
    (a) => ((a.score ?? 0) / (a.totalQuestions ?? 1)) * 100,
  );
  const averageScore = scores.reduce((acc, s) => acc + s, 0) / scores.length;
  const bestScore = Math.max(...scores);

  let improvement = 0;
  if (completedAttempts.length >= 2) {
    const sortedAttempts = [...completedAttempts]
      .filter((a) => a.endTime && a.score !== undefined && a.totalQuestions)
      .sort(
        (a, b) =>
          new Date(a.endTime!).getTime() - new Date(b.endTime!).getTime(),
      );

    if (sortedAttempts.length >= 2) {
      const firstScore =
        ((sortedAttempts[0].score ?? 0) /
          (sortedAttempts[0].totalQuestions ?? 1)) *
        100;
      const lastScore =
        ((sortedAttempts[sortedAttempts.length - 1].score ?? 0) /
          (sortedAttempts[sortedAttempts.length - 1].totalQuestions ?? 1)) *
        100;
      improvement = lastScore - firstScore;
    }
  }

  return {
    totalAttempts: attempts.length,
    averageScore: Math.round(averageScore * 10) / 10,
    bestScore: Math.round(bestScore * 10) / 10,
    improvement: Math.round(improvement * 10) / 10,
  };
};

interface QuizMeta {
  _id: string;
  title: string;
  time: number;
  questionsNo: number;
}

function RouteComponent() {
  const { quizId } = Route.useParams();
  const navigate = useNavigate();

  const [quizMeta, setQuizMeta] = useState<QuizMeta | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingAttempt, setIsCreatingAttempt] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch quiz metadata
        const quizResponse = await QuizService.getQuizContent(quizId);
        setQuizMeta(quizResponse.data as unknown as QuizMeta);

        // Fetch all attempts for this quiz (both completed and in-progress)
        const attemptsResponseCompleted =
          await AttemptService.getAttemptsByQuizId(quizId, true);
        const attemptsResponseInProgress =
          await AttemptService.getAttemptsByQuizId(quizId, false);
        setAttempts(
          attemptsResponseCompleted.data.attempts.concat(
            attemptsResponseInProgress.data.attempts,
          ),
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load quiz details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId]);

  const handleStartNewAttempt = async () => {
    if (!quizMeta || isCreatingAttempt) return;

    try {
      setIsCreatingAttempt(true);
      const newAttemptData: CreateAttemptRequest = {
        quizId: quizMeta._id,
        quizTitle: quizMeta.title,
        startTime: new Date().toISOString(),
        totalQuestions: quizMeta.questionsNo,
        isCompleted: false,
        answers: [],
        markedForReview: [],
      };
      const createRes = await AttemptService.createAttempt(newAttemptData);
      navigate({ to: `/quiz/${quizId}/${createRes.data._id}` });
    } catch (error) {
      console.error("Failed to create attempt", error);
      setIsCreatingAttempt(false);
    }
  };

  const handleContinueAttempt = (attemptId: string) => {
    navigate({ to: `/quiz/${quizId}/${attemptId}` });
  };

  const stats = calculateQuizStats(attempts);

  // Separate in-progress and completed attempts
  const inProgressAttempts = attempts.filter((a) => !a.isCompleted);
  const completedAttempts = attempts.filter((a) => a.isCompleted);

  if (loading) {
    return (
      <StudyLayout>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[400px]">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-slate-500">Loading quiz details...</p>
        </div>
      </StudyLayout>
    );
  }

  if (error || !quizMeta) {
    return (
      <StudyLayout>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[400px]">
          <History className="text-slate-300" size={48} />
          <h2 className="text-xl font-bold text-slate-800">Quiz Not Found</h2>
          <p className="text-slate-500">
            {error || "The quiz you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate({ to: "/quiz" })}
            className="btn bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </StudyLayout>
    );
  }

  const getScoreColor = (score: number, total: number) => {
    if (!score || !total) return "text-quaternary";
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-secondary-700";
    return "text-quaternary";
  };

  const getScoreBgColor = (score: number, total: number) => {
    if (!score || !total) return "bg-quaternary/10";
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "bg-success/10";
    if (percentage >= 60) return "bg-secondary/10";
    return "bg-quaternary/10";
  };

  return (
    <StudyLayout>
      <div className="flex-1 flex flex-col gap-6">
        {/* Back Button */}
        <button
          onClick={() => navigate({ to: "/quiz" })}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors w-fit"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Quizzes</span>
        </button>

        {/* Header Section */}
        <header className="flex justify-between items-end">
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">
              Quiz Details
            </p>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800">
              {quizMeta.title}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {quizMeta.questionsNo} questions • {quizMeta.time} minutes
            </p>
          </div>
          <button
            onClick={handleStartNewAttempt}
            disabled={isCreatingAttempt}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Play size={20} fill="currentColor" />
            {isCreatingAttempt ? "Starting..." : "Start New Attempt"}
          </button>
        </header>

        {/* In-Progress Attempts Alert */}
        {inProgressAttempts.length > 0 && (
          <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-4">
            <h3 className="text-lg font-bold text-secondary-700 mb-2">
              📝 In-Progress Attempts
            </h3>
            <p className="text-slate-600 text-sm mb-3">
              You have {inProgressAttempts.length} unfinished attempt(s). Click
              to continue.
            </p>
            <div className="space-y-2">
              {inProgressAttempts.map((attempt) => (
                <button
                  key={attempt._id}
                  onClick={() => handleContinueAttempt(attempt._id)}
                  className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-secondary/20 hover:border-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="text-secondary" size={18} />
                    <span className="text-slate-700">
                      Started {formatDate(attempt.startTime ?? "")}
                    </span>
                  </div>
                  <ChevronRight className="text-secondary" size={20} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <Trophy className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Attempts
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {stats.totalAttempts}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Award className="text-secondary-700" size={20} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Best Score</p>
                <p className="text-2xl font-bold text-slate-800">
                  {stats.bestScore}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stats.improvement >= 0 ? "bg-success/20" : "bg-quaternary/20"}`}
              >
                <TrendingUp
                  className={
                    stats.improvement >= 0 ? "text-success" : "text-quaternary"
                  }
                  size={20}
                />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Improvement
                </p>
                <p
                  className={`text-2xl font-bold ${stats.improvement >= 0 ? "text-success" : "text-quaternary"}`}
                >
                  {stats.improvement >= 0 ? "+" : ""}
                  {stats.improvement}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Attempts List */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Attempt History
          </h3>

          {completedAttempts.length === 0 ? (
            <div className="text-center py-12">
              <History className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">No completed attempts yet</p>
              <p className="text-slate-400 text-sm mb-4">
                Take this quiz to see your history here
              </p>
              <button
                onClick={handleStartNewAttempt}
                disabled={isCreatingAttempt}
                className="btn bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isCreatingAttempt ? "Starting..." : "Take Quiz"}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {completedAttempts.map((attempt, index) => (
                <div
                  key={attempt._id}
                  onClick={() =>
                    navigate({ to: `/quiz/${quizId}/${attempt._id}` })
                  }
                  className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-primary-100 hover:bg-primary-100/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    {/* Attempt Number */}
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-500">
                        #{completedAttempts.length - index}
                      </span>
                    </div>

                    {/* Score Badge */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center ${getScoreBgColor(attempt.score ?? 0, attempt.totalQuestions ?? 1)}`}
                    >
                      <span
                        className={`text-xl font-bold ${getScoreColor(attempt.score ?? 0, attempt.totalQuestions ?? 1)}`}
                      >
                        {attempt.score ?? 0}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        /{attempt.totalQuestions ?? 0}
                      </span>
                    </div>

                    {/* Attempt Info */}
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">
                        {Math.round(
                          ((attempt.score ?? 0) /
                            (attempt.totalQuestions ?? 1)) *
                            100,
                        )}
                        % Score
                      </h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-sm text-slate-400">
                          <Calendar size={14} />
                          {attempt.endTime
                            ? formatDate(attempt.endTime)
                            : "Unknown date"}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-400">
                          <Clock size={14} />
                          {formatTimeTaken(attempt.timeTaken ?? 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
                    size={24}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StudyLayout>
  );
}
