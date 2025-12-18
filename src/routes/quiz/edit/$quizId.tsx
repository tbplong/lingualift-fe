import { QuestionItem } from "@/pages/quiz/QuestionItem";
import QuizService from "@/services/quiz/quiz.service";
import { QuizCreateREQ } from "@/services/quiz/request/quiz.request";
import { Question } from "@/types";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/quiz/edit/$quizId")({
  component: EditRouteComponent,
});

function EditRouteComponent() {
  // Lấy quizId từ URL
  const { quizId } = Route.useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      { key: 0, option: "" },
      { key: 1, option: "" },
      { key: 2, option: "" },
      { key: 3, option: "" },
    ],
    answerKey: 0,
    explanation: undefined,
  });

  const [questions, setQuestions] = useState<Question[]>([]); // Khởi tạo rỗng để chờ load data

  // --- LOGIC MỚI: LOAD DATA TỪ API ---
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setIsLoading(true);
        // Gọi API lấy nội dung Quiz cũ
        const res = await QuizService.getQuizContent(quizId);

        if (res.data) {
          console.log(res.data);
          // Fill dữ liệu vào các field tương ứng
          setBaseTitle(res.data.title);
          setBaseTime(res.data.time);
          setQuestions(res.data.questions || []);

          // Cập nhật ref để tránh scroll xuống cuối khi vừa load xong
          prevLengthRef.current = (res.data.questions || []).length;
        }
      } catch (error) {
        console.error("Failed to load quiz data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);
  // -------------------------------------

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
    // Chỉ cuộn nếu số lượng câu hỏi TĂNG lên (tức là vừa Add Dummy, không tính lúc load data ban đầu)
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

  // Render Loading
  if (isLoading) {
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        Loading Quiz Data...
      </div>
    );
  }
  // console.log("Current Base Title:", baseTitle);
  return (
    <div className="flex flex-row items-center h-dvh w-full">
      <div className="flex flex-col w-1/2 ml-3">
        <div className="flex flex-col">
          <span className="font-bold text-4xl text-primary">Title:</span>
          <input
            type="text"
            value={baseTitle} // Bind value từ state
            onChange={(e) => setBaseTitle(e.target.value)}
            className="input validator mt-2 text-xl font-semibold h-14 w-full border-2 border-tertiary rounded-lg"
            required
            placeholder="Write your title here..."
            // pattern="[A-Za-z][A-Za-z0-9\-\ ]*"
            minLength={1}
            maxLength={200}
            // title="Only letters, numbers or dash"
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
              value={baseTime} // Bind value từ state
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
            className="btn flex-1 border-none text-xl bg-gray-400 text-white rounded-2xl"
            onClick={backToQuiz}
          >
            Cancel
          </button>

          <button
            className="btn flex-1 border-none text-xl bg-green-600 hover:bg-green-700 text-white rounded-2xl"
            onClick={async () => {
              // GỌI HÀM UPDATE
              // Giả sử service có hàm updateQuiz, nếu chưa có thì bạn cần thêm vào service
              // QuizService.updateQuiz(quizId, payload)
              try {
                console.log(
                  (
                    await QuizService.updateQuiz(
                      quizId,
                      QuizCreateFactory(baseTitle, baseTime, questions),
                    )
                  ).data,
                );
                backToQuiz();
              } catch (error) {
                console.error("Update failed", error);
              }
            }}
          >
            Update Exam
          </button>
        </div>
      </div>
      <div
        ref={listRef}
        className="w-1/2 m-4 pl-4 border-l-0 border-r-4 h-24/25 overflow-y-scroll border-y-20 border-primary-200 bg-primary-200 rounded-2xl flex flex-col gap-2"
      >
        {questions.map((q, index) => (
          <QuestionItem
            key={index} // Tốt nhất nên dùng key={q.id} nếu có
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
