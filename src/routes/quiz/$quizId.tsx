import { ArrowLeft, ArrowRight } from "@/components/icons";
import AnsBox from "@/pages/quiz/AnsBox";
import Chosen from "@/pages/quiz/Chosen";
import ConfirmSubmission from "@/pages/quiz/ConfirmSubmission";
import { timeFormat } from "@/pages/quiz/timer";
import AttemptService, {
  CreateAttemptRequest,
} from "@/services/attempt/attempt.service";
import QuizService from "@/services/quiz/quiz.service";
import { QuizContentRESP } from "@/services/quiz/response/quiz.response";
import { UserAnswer } from "@/types/attempt.type";
// import { mockQuiz } from "@/types/quiz.type";
import { createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/quiz/$quizId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { quizId } = Route.useParams();

  const [exam, setExam] = useState<QuizContentRESP | null>(null);
  const [openSub, setOpenSub] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(1);
  const [review, setReview] = useState<boolean[]>([]);
  const [hasPassage, setHasPassage] = useState<number[]>([]);
  const [time, setTime] = useState<number>(0);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");

  const timer = useRef<HTMLDivElement | null>(null);
  const ansRef = useRef(ans);
  const reviewRef = useRef(review);
  const isSubmitted = score !== null;

  // Cập nhật Ref mỗi khi state thay đổi
  useEffect(() => {
    ansRef.current = ans;
  }, [ans]);
  useEffect(() => {
    reviewRef.current = review;
  }, [review]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // BƯỚC 1: Lấy nội dung Quiz
        const quizRes = await QuizService.getQuizContent(quizId);
        const quizData = quizRes.data;
        console.log(quizData);
        setExam(quizData);
        setTitle(quizData.title);

        // --- LOGIC HAS PASSAGE (Thay thế vòng lặp for cũ) ---
        const passageIndices: number[] = [];
        quizData.questions.forEach((q, i) => {
          if (q.passage) passageIndices.push(i);
        });
        setHasPassage(passageIndices);

        // BƯỚC 2: Check xem user đã có lượt làm bài nào cho Quiz này chưa (chưa hoàn thành)
        const attemptRes = await AttemptService.getAttemptsByQuizId(
          quizId,
          false,
        );
        const existingAttempts = attemptRes.data.attempts;
        console.log(existingAttempts);

        // Khởi tạo giá trị mặc định (Default)
        const initialAns: Record<number, number> = {};
        const initialReview: boolean[] = new Array(
          quizData.questionsNo + 1,
        ).fill(false);
        let initialTime = quizData.time * 60;

        for (let key = 1; key <= quizData.questionsNo; key++) {
          initialAns[key] = -1;
        }

        if (existingAttempts.length > 0) {
          const last = existingAttempts[0];

          // Nếu đã có lượt đang làm, lấy ID lượt đó
          console.log("Resuming existing attempt...");
          setAttemptId(last._id);
          console.log(last);
          if (last.answers) {
            last.answers.forEach((a: UserAnswer) => {
              initialAns[a.questionIndex] = a.selectedAnswer;
            });
          }

          if (last.markedForReview) {
            last.markedForReview.forEach((idx: number) => {
              if (idx < initialReview.length) initialReview[idx] = true;
            });
          }

          const elapsed = last.timeTaken || 0;
          initialTime = quizData.time * 60 - elapsed;

          // (Tùy chọn) Nếu bạn muốn load lại đáp án cũ đã lưu:
          // setAns(existingAttempts[0].answers);
        } else {
          // BƯỚC 3: Nếu chưa có, tạo mới một lượt làm bài (POST)
          console.log("Creating new attempt...");

          console.log(quizData._id);
          const newAttemptData: CreateAttemptRequest = {
            quizId: quizData._id,
            quizTitle: quizData.title,
            startTime: new Date().toISOString(),
            totalQuestions: quizData.questionsNo,
            isCompleted: false,
            answers: [], // Khởi tạo mảng rỗng
            markedForReview: [],
          };

          console.log(quizData._id);
          const createRes = await AttemptService.createAttempt(newAttemptData);
          setAttemptId(createRes.data._id);
        }
        // CẬP NHẬT STATE 1 LẦN DUY NHẤT ĐỂ TRÁNH XUNG ĐỘT
        setAns(initialAns);
        setReview(initialReview);
        setTime(initialTime > 0 ? initialTime : 0);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      }
    };
    fetchData();
  }, [quizId]);

  // useEffect(() => {
  //   if (!exam) return;
  //   setTime(60 * exam.time);
  //   console.log(exam);

  //   for (let i = 0; i < exam.questionsNo; i++) {
  //     if (exam.questions[i].passage) setHasPassage((prev) => [...prev, i]);
  //   }

  //   for (let key = 1; key <= exam.questionsNo; key++) {
  //     setAns((prev) => ({
  //       ...prev,
  //       [key]: -1,
  //     }));
  //     setReview((prev) => ({
  //       ...prev,
  //       [key]: false,
  //     }));
  //   }
  // }, [exam]);

  useEffect(() => {
    if (!exam || !attemptId || isSubmitted) return;
    const timerID = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timerID);
          handleFinalSubmit(
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
        if (next > 0 && next % 1 === 0) {
          handleAutoSync(
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
  }, [exam, attemptId, isSubmitted, title]);

  // 1. Hàm Sync nhận tham số
  const handleAutoSync = async (
    currentAttemptId: string,
    currentExam: QuizContentRESP,
    currentTitle: string,
    currentAns: Record<number, number>,
    currentReview: boolean[],
    remainingTime: number,
  ) => {
    if (!currentAttemptId || !currentExam || !Array.isArray(currentReview))
      return;

    const formattedAnswers: UserAnswer[] = Object.entries(currentAns).map(
      ([idx, selected]) => ({
        questionIndex: Number(idx),
        selectedAnswer: selected,
        isCorrect: false,
      }),
    );

    const markedIndices = currentReview
      .map((val, idx) => (val ? idx : -1))
      .filter((idx) => idx > 0);

    const syncData = {
      _id: currentAttemptId,
      timeTaken: currentExam.time * 60 - remainingTime,
      answers: formattedAnswers,
      markedForReview: markedIndices,
    };

    try {
      await AttemptService.updateAttemptById(currentAttemptId, syncData);
      console.log("Auto-save successful");
    } catch (err) {
      console.error("Auto-save failed", err);
    }
  };

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
        return "Không xác định";
    }
  };

  const handleFinalSubmit = async (
    currentAttemptId: string,
    currentExam: QuizContentRESP,
    currentTitle: string,
    currentAns: Record<number, number>,
    currentReview: boolean[],
    currentTime: number,
  ) => {
    if (!currentAttemptId || !currentExam) return;

    let correctCount = 0;
    currentExam.questions.forEach((q, i) => {
      if (currentAns[i + 1] === q.answerKey) correctCount++;
    });

    const formattedAnswers: UserAnswer[] = Object.entries(currentAns).map(
      ([idx, selected]) => ({
        questionIndex: Number(idx),
        selectedAnswer: selected,
        isCorrect:
          currentAns[Number(idx)] ===
          currentExam.questions[Number(idx) - 1].answerKey,
      }),
    );

    const markedIndices = currentReview
      .map((val, idx) => (val ? idx : -1))
      .filter((idx) => idx > 0);

    const finalData = {
      _id: currentAttemptId,
      timeTaken: currentExam.time * 60 - currentTime,
      answers: formattedAnswers,
      markedForReview: markedIndices,
      score: correctCount,
      isCompleted: true,
    };

    try {
      await AttemptService.updateAttemptById(currentAttemptId, finalData);
      setScore(correctCount); // Setter của useState là an toàn
      setOpenSub(false);
      alert(
        `Nộp bài thành công! Điểm: ${correctCount}/${currentExam.questionsNo}`,
      );
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  // console.log(ans);
  if (!exam || !Array.isArray(exam.questions) || exam.questions.length === 0) {
    return <div className="p-10 text-center">Loading Quiz Data...</div>;
  }
  const numQ: number = exam.questionsNo;
  const questions = exam.questions;
  const question = questions[current - 1];
  const questionType = getQuestionType(question.type);
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
                setReview((prev) => {
                  const nextReview = [...prev]; // Copy mảng cũ
                  nextReview[current] = !nextReview[current]; // Cập nhật phần tử tại vị trí current
                  return nextReview; // Trả về mảng mới
                })
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
              Question {current}
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
                  isSubmitted={isSubmitted}
                  correctAnswer={exam.questions[Number(key) - 1].answerKey}
                />
              );
            })}
          </div>
          <button
            onClick={() => setOpenSub(true)}
            disabled={isSubmitted} // Không cho bấm sau khi đã nộp
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
      ></ConfirmSubmission>
    </div>
  );
}
