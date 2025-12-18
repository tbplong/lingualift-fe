import { QuestionItem } from "@/pages/quiz/QuestionItem";
import QuizService from "@/services/quiz/quiz.service";
import { QuizCreateREQ } from "@/services/quiz/request/quiz.request";
import { Question } from "@/types";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/quiz/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [baseTitle, setBaseTitle] = useState<string>("");
  const [baseTime, setBaseTime] = useState<number>(1);
  const listRef = useRef<HTMLDivElement>(null);

  const baseQuestion = (id: number): Question => ({
    id: `Q${id}`,
    groupId: undefined,
    content: "",
    passage: undefined,
    type: "multiple_choice",
    isGroupQ: true,
    answerList: [
      { key: 1, option: "" },
      { key: 2, option: "" },
      { key: 3, option: "" },
      { key: 4, option: "" },
    ],
    answerKey: 1,
    explanation: undefined,
  });
  const [questions, setQuestions] = useState<Question[]>([baseQuestion(1)]);
  const addDummy = () => {
    setQuestions((prev) => [...prev, baseQuestion(questions.length + 1)]);
  };
  const QuizCreateFactory = (
    title: string,
    time: number,
    questions: Question[],
  ): QuizCreateREQ => {
    return {
      title: title,
      time: time,
      maxAttempt: null,
      questionsNo: questions.length,
      expiredAt: null,
      isShowAnswer: true,
      questions: questions,
    };
  };
  const prevLengthRef = useRef(questions.length);
  useEffect(() => {
    // Chỉ cuộn nếu số lượng câu hỏi TĂNG lên (tức là vừa Add Dummy)
    if (questions.length > prevLengthRef.current) {
      if (listRef.current) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }

    // Cập nhật lại độ dài hiện tại để dùng cho lần so sánh sau
    prevLengthRef.current = questions.length;
  }, [questions.length]);

  // 1. Tính toán danh sách Group ID (Lọc rỗng và trùng)
  const existingGroups = Array.from(
    new Set(
      questions.map((q) => q.groupId).filter((id) => id && id.trim() !== ""),
    ),
  );

  // 2. Logic thay đổi câu hỏi
  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string | number | boolean | undefined,
  ) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      return newQuestions;
    });
  };

  // 3. Logic thay đổi đáp án
  const handleAnswerChange = (index: number, ansKey: number, value: string) => {
    setQuestions((prev) => {
      const newQ = [...prev];
      newQ[index].answerList = newQ[index].answerList.map((a) =>
        a.key === ansKey ? { ...a, option: value } : a,
      );
      return newQ;
    });
  };

  // 4. Logic Chọn Group (Quan trọng nhất)
  const handleGroupSelect = (index: number, selectedGroupId: string) => {
    if (selectedGroupId === "NEW_GROUP") {
      // Reset để nhập mới
      handleQuestionChange(index, "groupId", "");
      handleQuestionChange(index, "passage", "");
    } else {
      // Điền ID và Tự động lấy Passage từ câu hỏi gốc
      handleQuestionChange(index, "groupId", selectedGroupId);
      const sourceQ = questions.find(
        (q) => q.groupId === selectedGroupId && q.passage,
      );
      if (sourceQ) {
        handleQuestionChange(index, "passage", sourceQ.passage);
      }
    }
  };

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();
  const backToQuiz = () => {
    navigate({ to: "/quiz" });
  };
  return (
    <div className="flex flex-row items-center h-dvh w-full">
      <div className="flex flex-col w-1/2 ml-3">
        <div className="flex flex-col">
          <span className="font-bold text-4xl text-primary">Title:</span>
          <input
            type="text"
            onChange={(e) => setBaseTitle(e.target.value)}
            className="input validator mt-2 text-xl font-semibold h-14 w-full border-2 border-tertiary rounded-lg"
            required
            placeholder="Write your title here..."
            pattern="[A-Za-z][A-Za-z0-9\-\ ]*"
            minLength={1}
            maxLength={200}
            title="Only letters, numbers or dash"
          />
          <p className="validator-hint mt-0 text-quaternary">
            Title is required!
          </p>
        </div>
        <div className="flex flex-row items-center gap-4 mb-4 text-2xl">
          <div className="flex flex-row items-center flex-1 font-bold text-primary">
            <span className="">Number of Questions: </span>
            <span className="text-secondary text-4xl font-semibold tabular-nums ml-2">
              {questions.length}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <span className="font-bold text-primary">Time:</span>
            <input
              type="text"
              onChange={(e) => setBaseTime(Number(e.target.value))}
              className="input mx-2 px-0 text-4xl text-center text-secondary tabular-nums font-semibold w-[3ch] border-b-2 border-tertiary-100 focus:border-secondary"
              required
              placeholder=""
              pattern="[0-9]+"
              minLength={1}
              maxLength={3}
              title="Only 3 numbers"
            />
            <span className="font-bold text-primary"> mins</span>
          </div>
        </div>
        <div className="flex flex-row w-full border-none gap-4">
          <button
            className="btn flex-1 border-none text-xl bg-secondary text-white rounded-2xl"
            onClick={addDummy}
          >
            New Question
          </button>
          <button className="btn flex-1 border-none text-xl bg-secondary text-white rounded-2xl">
            Add by JSON
          </button>
          <button className="btn flex-1 border-none text-xl bg-secondary text-white rounded-2xl">
            Save Changes
          </button>
          <button
            className="btn flex-1 border-none text-xl bg-secondary text-white rounded-2xl"
            onClick={async () => {
              console.log(
                (
                  await QuizService.createQuiz(
                    QuizCreateFactory(baseTitle, baseTime, questions),
                  )
                ).data,
              );
              backToQuiz();
            }}
          >
            Create Exam
          </button>
        </div>
      </div>
      <div
        ref={listRef}
        className="w-1/2 m-4 pl-4 border-l-0 border-r-4 h-24/25 overflow-y-scroll border-y-20 border-primary-200 bg-primary-200 rounded-2xl flex flex-col gap-2"
      >
        {/* {Object.entries(questions).map(([key, q]) => {
          return (
            <div className='p-2 mx-1 bg-white border-4 border-secondary-300 h-fit rounded-2xl'>

              <div className='flex flex-col ml-2'>
                <div className='flex flex-row justify-between items-center'>
                  <span className='text-2xl font-semibold'>Question {Number(key) + 1}</span>
                  <select value={q.type} defaultValue="Choose Question Type" className="select appearance-none text-md font-semibold border-2 rounded-lg">
                    <option disabled value="">Choose Question Type</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="fill_blank">Fill in Blank</option>
                    <option value="arrangement">Arrangement</option>
                    <option value="matching">Matching</option>
                  </select>
                </div>
                <div className={clsx('flex flex-row text-lg', q.isGroupQ ? '' : 'hidden')}>
                  <div className='inline-flex mr-3'>
                    <label>Group ID: </label>
                    <input
                      className='w-24 border-b-2 border-gray-300 focus:border-blue-500 outline-none px-1 transition-colors'
                      value={q.groupId}
                      placeholder=""
                    />
                  </div>
                  <span className='w-40'>Passage: {q.passage}</span>
                </div>
                <span>Content: </span>
                <input value={q.content}></input>
                <div className='flex flex-col items-start'>
                  <input type='bullet'></input>
                  <input type='checkbox'></input>
                  <input type='checkbox'></input>
                  <input type='checkbox'></input>
                </div>
                <span>Explanation: {q.explanation}</span>
              </div>
            </div>
          )
        })} */}
        {questions.map((q, index) => (
          <QuestionItem
            key={index} // Nên dùng ID nếu có, fallback index
            index={index}
            q={q}
            existingGroups={existingGroups as string[]}
            onChange={handleQuestionChange}
            onGroupSelect={handleGroupSelect}
            onAnswerChange={handleAnswerChange}
            onDelete={deleteQuestion}
          />
        ))}
      </div>
    </div>
  );
}
