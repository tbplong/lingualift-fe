import { Setting } from "@/components/icons";
import QuizService from "@/services/quiz/quiz.service";
import { QuizsResponse } from "@/services/quiz/response/quiz.response";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/quiz/")({
  component: RouteComponent,
});

function RouteComponent() {
  const isManager: boolean = true;
  const navigate = useNavigate();
  const takeExam = (id: string) => {
    navigate({ to: `/quiz/${id}` });
  };
  const createExam = () => {
    navigate({ to: `/quiz/create` });
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
  return (
    <>
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
      <div className="px-10 grid grid-cols-4 gap-6 w-full">
        {Object.entries(exams.quizs).map(([key, quiz]) => {
          return (
            <div
              key={key}
              className="card card-md bg-white border-2 border-tertiary-700 shadow-lg h-auto rounded-2xl"
            >
              <div className="card-body p-4 flex flex-col justify-between">
                <h2 className="card-title text-secondary font-bold">
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
                        isManager ? "" : "hidden",
                      )}
                    >
                      <button className="btn p-0 w-full rounded-lg shadow-sm bg-tertiary border-2 border-tertiary hover:bg-white hover:border-tertiary">
                        <Setting className="w-full h-full fill-white hover:fill-tertiary"></Setting>
                      </button>
                    </div>
                    <div
                      className="card-actions flex-1"
                      onClick={() => {
                        takeExam(quiz._id);
                      }}
                    >
                      <button className="btn w-full rounded-lg text-lg text-white bg-primary border-2 border-primary hover:text-primary hover:bg-white hover:border-primary shadow-sm">
                        Take Exam
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
