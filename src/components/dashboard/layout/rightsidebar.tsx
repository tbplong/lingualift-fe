import { Link } from "@tanstack/react-router";
import { Clock, PlayCircle, Star } from "lucide-react";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
};

type RecommendedQuiz = {
  id: string;
  title: string;
  category: string;
  time: string; // ví dụ: "8 min"
  color: string; // ví dụ: "bg-indigo-50 text-indigo-700"
  rating?: number;
};

export default function RightSidebar({
  user,
  recommended,
  isLoading,
}: {
  user: UserProfile | null;
  recommended: RecommendedQuiz[];
  isLoading?: boolean;
}) {
  return (
    <aside className="w-70 hidden xl:flex flex-col bg-white border-l border-slate-200 h-full overflow-y-auto z-10">
      {/* 1) User Profile */}
      <div className="p-6 flex flex-col items-center border-b border-slate-100">
        {isLoading || !user ? <UserSkeleton /> : <UserCard user={user} />}
      </div>

      {/* 2) Recommended */}
      <div className="p-6 flex-1 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Recommended</h3>
          <Link
            to="/"
            className="text-xs font-bold text-primary hover:underline"
          >
            View All
          </Link>
        </div>

        {isLoading ? (
          <RecommendedSkeleton />
        ) : recommended.length === 0 ? (
          <div className="text-sm text-slate-400">No recommendations yet.</div>
        ) : (
          <div className="space-y-4">
            {recommended.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

/* ======================= USER CARD ======================= */
function UserCard({ user }: { user: UserProfile }) {
  const avatarLetter = (user.firstName || "U").charAt(0).toUpperCase();

  return (
    <>
      <div className="relative mb-3">
        <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center text-3xl font-black text-primary border-4 border-white shadow-xl shadow-indigo-100">
          {avatarLetter}
        </div>
        <div
          className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"
          title="Online"
        />
      </div>

      <h4 className="text-xl font-bold text-slate-800">
        {user.firstName} {user.lastName}
      </h4>
      <p className="text-slate-400 text-sm font-medium mb-4">{user.email}</p>
    </>
  );
}

/* ======================= QUIZ CARD ======================= */
function QuizCard({ quiz }: { quiz: RecommendedQuiz }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 group cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -mr-8 -mt-8 z-0" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-lg ${quiz.color}`}
          >
            {quiz.category}
          </span>

          <div className="flex items-center text-amber-400">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold text-slate-400 ml-1">
              {(quiz.rating ?? 4.8).toFixed(1)}
            </span>
          </div>
        </div>

        <h4 className="text-sm font-bold text-slate-700 mb-3 group-hover:text-primary transition-colors line-clamp-1">
          {quiz.title}
        </h4>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={12} />
            <span className="text-xs font-medium">{quiz.time}</span>
          </div>

          <Link
            to={"/"}
            // /practice?quizId=${quiz.id}
            className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            <PlayCircle size={18} fill="currentColor" fillOpacity={1} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ======================= SKELETONS ======================= */
function UserSkeleton() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-slate-100 animate-pulse" />
      <div className="h-5 w-40 bg-slate-100 rounded mt-4 animate-pulse" />
      <div className="h-4 w-44 bg-slate-100 rounded mt-2 animate-pulse" />
      <div className="grid grid-cols-3 gap-2 w-full mt-4">
        <div className="h-16 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-16 bg-slate-100 rounded-xl animate-pulse" />
        <div className="h-16 bg-slate-100 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

function RecommendedSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-24 bg-white border border-slate-100 rounded-2xl animate-pulse" />
      <div className="h-24 bg-white border border-slate-100 rounded-2xl animate-pulse" />
      <div className="h-24 bg-white border border-slate-100 rounded-2xl animate-pulse" />
    </div>
  );
}
