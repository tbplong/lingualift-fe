import { ArrowLeft, ArrowRight } from "@/components/icons";
import AnsBox from "@/pages/quiz/AnsBox";
import Chosen from "@/pages/quiz/Chosen";
import { timeFormat } from "@/pages/quiz/timer";
import { mockQuiz, Quiz } from "@/pages/quiz/type";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/quiz/")({
  component: RouteComponent,
});

function RouteComponent() {
  const exam: Quiz = mockQuiz;
  const numQ: number = exam.questionsNo;
  // Question Nav
  const [current, setCurrent] = useState<number>(1);
  const [review, setReview] = useState<boolean[]>([]);
  const questions = exam.questions;
  const [hasPassage, setHasPassage] = useState<number[]>([]);
  useEffect(() => {
    for (let i = 0; i < numQ; i++) {
      if (questions[i].passage) setHasPassage((prev) => [...prev, i]);
    }
  }, []);

  // Timer
  const [time, setTime] = useState(60 * exam.time);
  const timer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timerID);
          alert("Time's up!");
          if (timer.current) timer.current.innerHTML = timeFormat(0);
          return 0;
        }
        const next = prev - 1;
        // if (timer.current) timer.current.innerHTML = timeFormat(next);
        return next;
      });
      // console.log(time);
    }, 1000);
    return () => clearInterval(timerID);
  }, []);
  // Answer sidebar
  const [ans, setAns] = useState<Record<number, number>>({});
  useEffect(() => {
    for (let key = 1; key <= numQ; key++) {
      setAns((prev) => ({
        ...prev,
        [key]: -1,
      }));
      setReview((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  }, []); // init

  // console.log(Object.entries(ans)[0]);

  // Main question
  const question = questions[current - 1];
  const content = question.content;
  let passage: string | undefined;
  // console.log(hasPassage);
  if (question.isGroupQ) {
    hasPassage.forEach((i) => {
      if (questions[i].groupId === question.groupId) {
        passage = questions[i].passage;
        return;
      }
    });
  }
  const optList = question.answerList;

  const [choose, setChoose] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const chooseAns = (chooseNo: number) => {
    for (let i = 0; i < 4; i++) {
      setChoose((prev) => ({
        ...prev,
        [i]: false,
      }));
    }
    setChoose((prev) => ({
      ...prev,
      [chooseNo]: true,
    }));
    setAns((prev) => ({
      ...prev,
      [current]: chooseNo,
    }));
  };

  const loadQuiz = (quizNo: number) => {
    setCurrent(quizNo);
    for (let i = 0; i < 4; i++) {
      setChoose((prev) => ({
        ...prev,
        [i]: false,
      }));
    }
    if (ans[quizNo] !== -1) {
      setChoose((prev) => ({
        ...prev,
        [ans[quizNo]]: true,
      }));
    }
  };
  // console.log(time);
  const progress: number = (time / (exam.time * 60)) * 100;
  return (
    <div className={clsx("drawer drawer-end h-dvh")}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-primary-200 px-10 pb-10">
        <div className="h-20 flex items-center justify-between">
          <div className="flex flex-row items-center justify-center h-10">
            {/* <Clock className="fill-tertiary w-20 h-10 mr-2" /> */}
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
              ></div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-52">
            <button
              onClick={() =>
                setReview((prev) => ({ ...prev, [current]: !review[current] }))
              }
              className="btn bg-white border-2 border-tertiary p-2 rounded-md w-auto h-10 drop-shadow-lg"
            >
              <img
                src={clsx(
                  review[current]
                    ? "/flag-outline-red.svg"
                    : "/flag-outline-nocolor.svg",
                )}
                className="aspect-square h-full"
              ></img>
              {/* <div className="text-lg flex flex-col leading-4 justify-start">
                <span className="w-fit">Mark as</span>
                <span className="w-fit">review</span>
              </div> */}
            </button>
            <label
              htmlFor="my-drawer-4"
              className="drawer-button h-10 border-2 text-tertiary border-tertiary p-2 w-auto bg-white btn rounded-md drop-shadow-lg transition-colors duration-10 ease-in"
            >
              <span className="text-lg ">View progress</span>
              <img src={clsx("/fire.png")} className="aspect-square h-7"></img>
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
                  "text-xl font-medium",
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

          <p className="w-full h-69 mt-4 mb-6 border-x-0 text-lg overflow-y-auto content-center text-justify pr-1 whitespace-pre-line">
            {passage}
          </p>
          <span className="font-bold text-xl text-justify wrap-normal w-full h-14 mb-4 content-center block">
            {content}
          </span>

          <div className="w-full grid grid-cols-2 gap-4">
            {optList.map((value, i) => {
              return (
                <Chosen
                  key={i}
                  op={value.key}
                  content={value.option}
                  choose={choose}
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
        ></label>
        <ul className="menu bg-white border-l-4 text-base-content min-h-full w-80 p-4 px-10">
          {/* Sidebar content here */}
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
                />
              );
            })}
          </div>
          <button
            onClick={() => console.log(ans)}
            className="btn h-16 absolute bottom-8 w-59 bg-secondary hover:border-2 hover:bg-white hover:border-secondary rounded-xl text-white hover:text-secondary text-3xl font-semibold transition-all duration-100 cursor-pointer"
          >
            Submit
          </button>
        </ul>
      </div>
    </div>
  );
}
