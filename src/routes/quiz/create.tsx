import { QuestionItem, QuestionItemRef } from "@/pages/quiz/QuestionItem";
import QuizService from "@/services/quiz/quiz.service";
import { QuizCreateREQ } from "@/services/quiz/request/quiz.request";
import { mockQuiz, Question } from "@/types";
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
    isGroupQ: false,
    answerList: [
      { key: 0, option: "" },
      { key: 1, option: "" },
      { key: 2, option: "" },
      { key: 3, option: "" },
    ],
    answerKey: 0,
    explanation: undefined,
  });
  const [questions, setQuestions] = useState<Question[]>([baseQuestion(1)]);
  const questionRefs = useRef<(QuestionItemRef | null)[]>([]);

  // Đảm bảo mảng ref luôn khớp với số lượng câu hỏi
  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(0, questions.length);
  }, [questions.length]);

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
    // 1. Đồng bộ Ref (Cắt bỏ những ref dư thừa khi xóa câu hỏi)
    if (questionRefs.current.length > questions.length) {
      questionRefs.current = questionRefs.current.slice(0, questions.length);
    }

    // 2. Cuộn xuống khi thêm câu mới
    if (questions.length > prevLengthRef.current) {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    prevLengthRef.current = questions.length;
  }, [questions.length]);

  // 1. Tính toán danh sách Group ID (Lọc rỗng và trùng)
  const existingGroups = Array.from(
    new Set(
      questions.map((q) => q.groupId).filter((id) => id && id.trim() !== ""),
    ),
  );

  // 2. Hàm Save Changes chính
  const handleSaveChanges = () => {
    // Thu thập dữ liệu từ tất cả các con
    const updatedQuestions = questionRefs.current.map((ref, i) => {
      if (ref) return ref.getData();
      return questions[i]; // Fallback nếu ref bị null
    });

    setQuestions(updatedQuestions);
    console.log("Dữ liệu đã được đồng bộ lên State chính:", updatedQuestions);
    alert("Local changes saved to main state!");
  };

  const handleCreateExam = async () => {
    // Trước khi tạo Exam, cũng nên thực hiện save 1 lần để đảm bảo data mới nhất
    const finalQuestions = questionRefs.current.map((ref, i) =>
      ref ? ref.getData() : questions[i],
    );

    const payload = QuizCreateFactory(baseTitle, baseTime, finalQuestions);
    await QuizService.createQuiz(payload);
    navigate({ to: "/quiz" });
  };

  const getPassageByGroupId = (groupId: string) => {
    const sourceQ = questions.find((q) => q.groupId === groupId && q.passage);
    return sourceQ?.passage || "";
  };

  // Cập nhật logic xử lý Group ở Cha
  const handleGroupSelect = (
    index: number,
    selectedGroupId: string,
    newPassage?: string,
  ) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];

      // 1. Cập nhật cho câu hiện tại
      newQuestions[index] = {
        ...newQuestions[index],
        isGroupQ: true, // Cập nhật trạng thái này
        groupId: selectedGroupId,
        passage:
          newPassage !== undefined
            ? newPassage
            : getPassageByGroupId(selectedGroupId),
      };

      // Cập nhật cho các câu cùng group
      if (newPassage !== undefined && selectedGroupId !== "") {
        return newQuestions.map((q) =>
          q.groupId === selectedGroupId
            ? { ...q, passage: newPassage, isGroupQ: true }
            : q,
        );
      }

      return newQuestions;
    });
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
          <button
            className="btn flex-1 border-none text-xl bg-secondary text-white rounded-2xl"
            onClick={async () => {
              console.log((await QuizService.createQuiz(mockQuiz)).data);
              backToQuiz();
            }}
          >
            Add by JSON
          </button>
          <button
            className="btn flex-1 border-none text-xl bg-secondary text-white rounded-2xl"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            className="btn flex-1 border-none text-xl bg-secondary text-white rounded-2xl"
            onClick={handleCreateExam}
          >
            Create Exam
          </button>
        </div>
      </div>
      <div
        ref={listRef}
        className="w-1/2 m-4 pl-4 border-l-0 border-r-4 h-24/25 overflow-y-scroll border-y-20 border-primary-200 bg-primary-200 rounded-2xl flex flex-col gap-2"
      >
        {questions.map((q, index) => (
          <QuestionItem
            key={q.id || index} // Nên dùng ID nếu có, fallback index
            index={index}
            q={q}
            existingGroups={existingGroups as string[]}
            onGroupSelect={handleGroupSelect}
            onDelete={deleteQuestion}
            getPassageByGroupId={getPassageByGroupId}
            ref={(el) => {
              questionRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
