import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { History } from "lucide-react";
import StudyLayout from "@/components/study-layout";

export const Route = createFileRoute("/history/")({
  component: RouteComponent,
});

// This is a redirect page - history should be accessed via /history/$quizId
function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to quiz list - user should access history from quiz page
    // For demo purposes, redirect to first quiz
    navigate({ to: "/history/quiz-001" });
  }, [navigate]);

  return (
    <StudyLayout>
      <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
        <div className="flex items-center gap-2 text-slate-500">
          <History size={20} />
          <span>Loading quiz history...</span>
        </div>
      </div>
    </StudyLayout>
  );
}
