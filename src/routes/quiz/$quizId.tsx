import { ArrowLeft, ArrowRight } from "@/components/icons";
import AnsBox from "@/pages/quiz/AnsBox";
import Chosen from "@/pages/quiz/Chosen";
import ConfirmSubmission from "@/pages/quiz/ConfirmSubmission";
import { timeFormat } from "@/pages/quiz/timer";
import QuizService from "@/services/quiz/quiz.service";
import { QuizContentRESP } from "@/services/quiz/response/quiz.response";
// import { mockQuiz } from "@/types/quiz.type";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/quiz/$quizId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { quizId } = Route.useParams();

  // const exam: QuizCreateREQ = mockQuiz;
  const [exam, setExam] = useState<QuizContentRESP | null>(null);
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(1);
  const [review, setReview] = useState<boolean[]>([]);
  const [hasPassage, setHasPassage] = useState<number[]>([]);
  const [time, setTime] = useState<number>(0);
  const timer = useRef<HTMLDivElement | null>(null);
  const [ans, setAns] = useState<Record<number, number>>({});
  // const [choose, setChoose] = useState<Record<number, boolean>>({
  //   0: false,
  //   1: false,
  //   2: false,
  //   3: false,
  // });
  const [score, setScore] = useState<number | null>(null);
  const isSubmitted = score !== null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await QuizService.getQuizContent(quizId);
        setExam(res.data);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      }
    };
    fetchData();
  }, [quizId]);

  useEffect(() => {
    if (!exam) return;
    setTime(60 * exam.time);
    console.log(exam);

    for (let i = 0; i < exam.questionsNo; i++) {
      if (exam.questions[i].passage) setHasPassage((prev) => [...prev, i]);
    }

    for (let key = 1; key <= exam.questionsNo; key++) {
      setAns((prev) => ({
        ...prev,
        [key]: -1,
      }));
      setReview((prev) => ({
        ...prev,
        [key]: false,
      }));
    }
  }, [exam]);

  useEffect(() => {
    if (!exam) return;
    const timerID = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timerID);
          alert("Time's up!");
          if (timer.current) timer.current.innerHTML = timeFormat(0);
          return 0;
        }
        const next = prev - 1;
        return next;
      });
    }, 1000);
    return () => clearInterval(timerID);
  }, [exam]);

  const chooseAns = (chooseNo: number) => {
    // for (let i = 0; i < 4; i++) {
    //   setChoose((prev) => ({
    //     ...prev,
    //     [i]: false,
    //   }));
    // }
    // setChoose((prev) => ({
    //   ...prev,
    //   [chooseNo]: true,
    // }));
    // setChoose({
    //   0: chooseNo === 0,
    //   1: chooseNo === 1,
    //   2: chooseNo === 2,
    //   3: chooseNo === 3,
    // });
    setAns((prev) => ({
      ...prev,
      [current]: chooseNo,
    }));
  };

  const loadQuiz = (quizNo: number) => {
    setCurrent(quizNo);
    // for (let i = 0; i < 4; i++) {
    //   setChoose((prev) => ({
    //     ...prev,
    //     [i]: false,
    //   }));
    // }
    // if (ans[quizNo] !== -1) {
    //   setChoose((prev) => ({
    //     ...prev,
    //     [ans[quizNo]]: true,
    //   }));
    // }
    // const savedAns = ans[quizNo];
    // setChoose({
    //   0: savedAns === 0,
    //   1: savedAns === 1,
    //   2: savedAns === 2,
    //   3: savedAns === 3,
    // });
  };

  const submitQuiz = () => {
    if (!exam || !exam.questions) return;
    let correctCount = 0;
    exam.questions.forEach((q, i) => {
      // Lưu ý: ans dùng key bắt đầu từ 1, còn index mảng bắt đầu từ 0
      // Kiểm tra kỹ xem bạn đang dùng ans[index] hay ans[index + 1]
      const userAnswer = ans[i + 1];

      if (userAnswer === q.answerKey) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setOpenSub(false);
  };
  console.log(ans);
  if (!exam || !Array.isArray(exam.questions) || exam.questions.length === 0) {
    return <div className="p-10 text-center">Loading Quiz Data...</div>;
  }
  const numQ: number = exam.questionsNo;
  const questions = exam.questions;
  const question = questions[current - 1];
  const content = question.content;
  const optList = question.answerList;
  const progress: number = (time / (exam.time * 60)) * 100;
  let passage: string | undefined = question.passage;
  // if (question.isGroupQ) {
  //   hasPassage.forEach((i) => {
  //     if (questions[i].groupId === question.groupId) {
  //       passage = questions[i].passage;
  //       return;
  //     }
  //   });
  // } else if (question.passage) passage = question.passage;
  if (question.isGroupQ && !passage) {
    // Tìm passage từ các câu hỏi khác trong cùng group
    const parentIndex = hasPassage.find(
      (i) => questions[i].groupId === question.groupId,
    );
    if (parentIndex !== undefined) {
      passage = questions[parentIndex].passage;
    }
  }

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
          {isSubmitted && (
            <div className="text-4xl text-secondary-300 font-bold">
              Score: {score}/{numQ}
            </div>
          )}
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

          <p className="w-full h-69 mt-4 mb-6 border-x-0 text-lg overflow-y-auto content-center text-justify pr-1 whitespace-pre-line">
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
                  status = "correct"; // always green right ans
                } else if (
                  (ans[current] === value.key &&
                    question.answerKey !== value.key) ||
                  ans[current] === -1
                ) {
                  status = "wrong"; // if choose wrong then red, not choose then no red
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
            onClick={() => setOpenSub(true)}
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
        confirmSubmit={submitQuiz}
      ></ConfirmSubmission>
    </div>
  );
}
