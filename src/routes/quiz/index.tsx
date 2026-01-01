import { Setting, Trash } from "@/components/icons";
import StudyLayout from "@/components/study-layout";
import AttemptService, {
  CreateAttemptRequest,
} from "@/services/attempt/attempt.service";
import QuizService from "@/services/quiz/quiz.service";
import { QuizsResponse } from "@/services/quiz/response/quiz.response";
import { useUserStore } from "@/stores/user.store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/quiz/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [isCreatingAttempt, setIsCreatingAttempt] = useState<string | null>(
    null,
  );

  // Navigate to quiz overview page when clicking the title
  const viewQuiz = (id: string) => {
    navigate({ to: `/quiz/${id}` });
  };

  // Create a new attempt and navigate to quiz attempt page
  const takeExam = async (quiz: {
    _id: string;
    title: string;
    questionsNo: number;
  }) => {
    if (isCreatingAttempt) return; // Prevent double-click
    try {
      setIsCreatingAttempt(quiz._id);
      const newAttemptData: CreateAttemptRequest = {
        quizId: quiz._id,
        quizTitle: quiz.title,
        startTime: new Date().toISOString(),
        totalQuestions: quiz.questionsNo,
        isCompleted: false,
        answers: [],
        markedForReview: [],
      };
      const createRes = await AttemptService.createAttempt(newAttemptData);
      navigate({ to: `/quiz/${quiz._id}/${createRes.data._id}` });
    } catch (error) {
      console.error("Failed to create attempt", error);
      setIsCreatingAttempt(null);
    }
  };

  const createExam = () => {
    navigate({ to: `/quiz/create` });
  };
  const editExam = (id: string) => {
    navigate({ to: `/quiz/edit/${id}` });
  };
  const [exams, setExams] = useState<QuizsResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await QuizService.getQuizsMeta();
        setExams(res.data);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      }
    };
    fetchData();
  }, []);
  console.log(exams);
  if (!exams) {
    return <div className="p-10 text-center">Loading Quiz Data...</div>;
  }
  const quizEntries = Object.entries(exams.quizs);
  return (
    <>
      <StudyLayout>
        {" "}
        {user?.isManager && (
          <div className="flex flex-row px-10 py-4 justify-end">
            <div
              className="btn border-2 border-secondary text-white text-xl bg-secondary hover:shadow-md hover:-translate-y-0.5 transition-all w-fit p-2 rounded-lg font-semibold"
              onClick={() => {
                createExam();
              }}
            >
              Create New Exam
            </div>
          </div>
        )}
        {quizEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="text-3xl font-bold text-tertiary-400 opacity-50">
              No Quiz Found
            </div>
            <p className="text-tertiary-500 mt-2">
              Currently, there are no examinations available.
            </p>
          </div>
        ) : (
          <div className="px-10 grid grid-cols-4 gap-6 w-full">
            {quizEntries.map(([key, quiz]) => {
              return (
                <div
                  key={key}
                  className="card card-md bg-white border-2 border-tertiary-700 shadow-lg h-auto rounded-2xl"
                >
                  <div className="card-body p-4 flex flex-col justify-between">
                    <h2
                      className="card-title text-secondary font-bold cursor-pointer hover:underline"
                      onClick={() => viewQuiz(quiz._id)}
                    >
                      {quiz.title}
                    </h2>
                    <div className="text-tertiary">
                      {/* <p>Id: {quiz._id}</p> */}
                      <p>Time: {quiz.time} minutes</p>
                      <p>Number of Questions: {quiz.questionsNo}</p>
                      <div className="flex flex-row mt-3 gap-1">
                        <div
                          className={clsx(
                            "card-actions w-10",
                            user?.isManager ? "" : "hidden",
                          )}
                        >
                          <button
                            className="btn p-0 w-full rounded-lg shadow-sm bg-quaternary border-2 border-quaternary hover:bg-white"
                            onClick={async () => {
                              try {
                                console.log(
                                  (await QuizService.deleteQuiz(quiz._id)).data,
                                );
                                setExams((prev) => {
                                  if (!prev) return null;

                                  return {
                                    ...prev,
                                    quizs: prev.quizs.filter(
                                      (q) => q._id !== quiz._id,
                                    ),
                                  };
                                });
                              } catch (error) {
                                console.error("Failed to delete", error);
                              }
                            }}
                          >
                            <Trash className="scale-130 fill-white hover:fill-quaternary"></Trash>
                          </button>
                        </div>
                        <div
                          className={clsx(
                            "card-actions w-10",
                            user?.isManager ? "" : "hidden",
                          )}
                        >
                          <button
                            className="btn p-0 w-full rounded-lg shadow-sm bg-tertiary border-2 border-tertiary hover:bg-white"
                            onClick={() => {
                              editExam(quiz._id);
                            }}
                          >
                            <Setting className="w-full h-full fill-white hover:fill-tertiary"></Setting>
                          </button>
                        </div>
                        <div
                          className="card-actions flex-1"
                          onClick={() => {
                            takeExam(quiz);
                          }}
                        >
                          <button
                            className={clsx(
                              "btn w-full rounded-lg text-lg text-white bg-primary border-2 border-primary hover:text-primary hover:bg-white hover:border-primary shadow-sm",
                              isCreatingAttempt === quiz._id && "loading",
                            )}
                            disabled={isCreatingAttempt === quiz._id}
                          >
                            {isCreatingAttempt === quiz._id
                              ? "Creating..."
                              : "Take Exam"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </StudyLayout>
    </>
  );
}
