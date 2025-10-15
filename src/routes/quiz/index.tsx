import { ArrowLeft, ArrowRight, Clock } from "@/components/icons";
import AnsBox from "@/pages/quiz/AnsBox";
import Chosen from "@/pages/quiz/Chosen";
import { timeFormat } from "@/pages/quiz/timer";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/quiz/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Question Nav
  const [current, setCurrent] = useState<number>(1);
  // Timer
  const [, setTime] = useState(600);
  const timer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerID);
          alert("Time's up!");
          if (timer.current) timer.current.innerHTML = timeFormat(0);
          return 0;
        }
        const next = prev - 1;
        if (timer.current) timer.current.innerHTML = timeFormat(next);
        return next;
      });
      // console.log(time);
    }, 1000);
    return () => clearInterval(timerID);
  }, []);
  // Answer sidebar
  const numQ: number = 50;
  const [ans, setAns] = useState<Record<number, number>>({});
  useEffect(() => {
    for (let key = 1; key <= numQ; key++) {
      setAns((prev) => ({
        ...prev,
        [key]: -1,
      }));
    }
  }, []);

  // console.log(Object.entries(ans)[0]);

  // Main question
  const qu: string[] = [
    "This is Correct!!!",
    "This is Correct!!!",
    "This is Correct!!!",
    "This is Correct!!!",
  ];

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
  return (
    <div className={clsx("drawer drawer-end h-dvh")}>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-secondary-300 px-10 pb-10">
        <div className="h-20 flex items-center justify-between">
          <button
            onClick={() => {
              if (current !== 1) loadQuiz(current - 1);
            }}
            className={clsx("h-full", current !== 1 ? "cursor-pointer" : "")}
          >
            <ArrowLeft
              className={clsx(
                current !== 1 ? "fill-tertiary" : "fill-tertiary-100",
              )}
            />
          </button>
          <label
            htmlFor="my-drawer-4"
            className="drawer-button p-0 btn border-none rounded-md "
          >
            <Clock className="fill-tertiary w-10 h-10" />{" "}
          </label>
          <div className="flex flex-row items-center">
            <Clock className="fill-tertiary w-10 h-10 mr-2" />
            <span ref={timer} className="font-bold w-40 text-4xl text-tertiary">
              00:00:00
            </span>
          </div>
          <label
            htmlFor="my-drawer-4"
            className="drawer-button p-0 btn border-none rounded-md "
          >
            <Clock className="fill-tertiary w-10 h-10" />{" "}
          </label>
          <button
            onClick={() => {
              if (current !== numQ) loadQuiz(current + 1);
            }}
            className={clsx("h-full", current !== numQ ? "cursor-pointer" : "")}
          >
            <ArrowRight
              className={clsx(
                current !== numQ ? "fill-tertiary" : "fill-tertiary-100",
              )}
            />
          </button>
        </div>
        <div className="w-full h-full bg-white border-4 border-tertiary rounded-2xl p-6">
          <span className="font-semibold content-center text-tertiary-300 text-xl block mb-2">
            Quesion {current}
          </span>
          <span className="font-bold text-xl wrap-normal">
            Read the following passage and mark the letter A, B, C or D on your
            answer sheet to indicate the option that best fits each of the
            numbered blanks from 7 to 11.
          </span>
          <p className="w-full h-64 mt-4 border-x-0 text-lg overflow-y-auto">
            All holidays involve some element of risk, whether in the form of
            illness, bad weather, being unable to get what we want if we delay
            booking, or (7) ______. We ask ourselves what risks we would run if
            we went there, if there is a high likelihood of their occurrence, if
            the risks are avoidable and how significant the consequences would
            be.
            <br></br>
            Some tourists, of course, relish a degree of risk, as this gives an
            edge of excitement to the holiday. (8) ______ Others, however, are
            risk averse and will studiously avoid risk wherever possible.
            Clearly, the significance of the risk will be a key factor. (9)
            ______ The risk averse will book early, choose to return to the same
            resort and hotel they have visited, knowing its reliability, or book
            a package tour rather than travel independently.
            <br></br>
            (10) ______ There is evidence that much of the continuing reluctance
            shown by some tourists to seek information and make bookings through
            Internet providers can be attributed to, in part, the lack of
            face-to-face contact with a trusted – and, hopefully, expert –
            travel agent and, in part, (11) ______ in favour of the information
            provided.
          </p>

          <div className="w-full grid grid-cols-2 mt-11 gap-4">
            {qu.map((opt, i) => {
              return (
                <Chosen
                  key={i}
                  op={i}
                  content={opt}
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
          <div className="grid grid-cols-5 gap-x-2.5 gap-y-2">
            {Object.entries(ans).map(([key, ansVal]) => {
              return (
                <AnsBox
                  key={Number(key)}
                  ansNum={Number(key)}
                  ansVal={ansVal}
                  loadQuiz={loadQuiz}
                />
              );
            })}
          </div>
          <button
            onClick={() => console.log(ans)}
            className="btn h-16 bg-secondary border-2 hover:bg-white border-white hover:border-secondary rounded-xl mt-6 text-white hover:text-secondary text-3xl font-semibold hover:animate-[fadeIn_0.1s_ease-in] cursor-pointer"
          >
            Submit
          </button>
        </ul>
      </div>
    </div>
  );
}
