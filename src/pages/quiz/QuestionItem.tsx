import { Trash } from "@/components/icons";
import { AnswerOption, Question } from "@/types";
import clsx from "clsx";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
// Import type Question của bạn

type QuestionItemProps = {
  index: number;
  q: Question;
  existingGroups: string[];
  onGroupSelect: (
    index: number,
    selectedGroupId: string,
    newPassage?: string,
  ) => void;
  onDelete: (index: number) => void;
  getPassageByGroupId: (groupId: string) => string;
};

// Định nghĩa kiểu cho Ref mà Cha sẽ nhận được
export type QuestionItemRef = {
  getData: () => Question;
};

export const QuestionItem = forwardRef<QuestionItemRef, QuestionItemProps>(
  (
    { index, q, existingGroups, onGroupSelect, onDelete }: QuestionItemProps,
    ref,
  ) => {
    // 1. State local để lưu trữ thay đổi tạm thời
    const [localQ, setLocalQ] = useState<Question>(q);

    // 1. Khởi tạo Ref để nắm giữ giá trị của 2 ô input mà không gây re-render
    const newIdRef = useRef<HTMLInputElement>(null);
    const newPassageRef = useRef<HTMLTextAreaElement>(null);

    // 2. Public method cho Cha thông qua Ref
    useImperativeHandle(ref, () => ({
      getData: () => localQ,
    }));
    // Thêm useEffect để đồng bộ khi dữ liệu từ API đổ về trang Edit
    useEffect(() => {
      setLocalQ(q);
    }, [q]);
    // Thêm vào trong QuestionItem
    useEffect(() => {
      setLocalQ((prev) => ({
        ...prev,
        isGroupQ: q.isGroupQ,
        groupId: q.groupId,
        passage: q.passage,
        // Vẫn cần đồng bộ toàn bộ khi load trang Edit lần đầu hoặc chuyển Quiz
        content:
          q.content !== prev.content && prev.content === ""
            ? q.content
            : prev.content,
        answerList: q.answerList,
      }));
    }, [q.groupId, q.passage, q.isGroupQ, q.content, q.answerList]);
    // 3. Helper update local
    const updateLocal = (
      field: keyof Question,
      value: string | number | boolean | AnswerOption[],
    ) => {
      setLocalQ((prev) => ({ ...prev, [field]: value }));
    };

    const handleAnswerChange = (ansKey: number, value: string) => {
      const newAnswers = localQ.answerList.map((a) =>
        a.key === ansKey ? { ...a, option: value } : a,
      );
      updateLocal("answerList", newAnswers);
    };

    const handleSaveNewGroup = () => {
      const idVal = newIdRef.current?.value || "";
      const passageVal = newPassageRef.current?.value || "";

      if (!idVal.trim()) return alert("Enter Group ID!");
      // Cập nhật nháp tại chỗ để UI không bị giật
      setLocalQ((prev) => ({
        ...prev,
        isGroupQ: true,
        groupId: idVal,
        passage: passageVal,
      }));
      // Đẩy lên Cha ngay lập tức
      onGroupSelect(index, idVal, passageVal);
    };

    const isExistingGroup = existingGroups.includes(localQ.groupId || "");

    console.log(localQ.isGroupQ);
    return (
      <div className="p-4 mx-1 bg-white border-4 border-secondary-300 h-fit rounded-2xl">
        {/* 1. Header: Số thứ tự & Loại câu hỏi */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-semibold text-tertiary">
              Question {index + 1}
            </span>
            <button
              className="w-fit p-0 border-none ml-2 cursor-pointer"
              onClick={() => onDelete(index)}
            >
              <Trash className="fill-quaternary bg-transparent"></Trash>
            </button>
          </div>
          <select
            value={localQ.type}
            onChange={(e) => updateLocal("type", e.target.value)}
            className="select appearance-none h-full w-fit py-1 text-md font-semibold border-2 rounded-lg"
          >
            <option disabled value="">
              Choose Question Type
            </option>
            <option value="multiple_choice">Multiple Choice</option>
            <option value="fill_blank">Fill in Blank</option>
            <option value="arrangement">Arrangement</option>
            <option value="matching">Matching</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label
            className="font-semibold cursor-pointer text-lg text-tertiary select-none"
            onClick={() => updateLocal("isGroupQ", !localQ.isGroupQ)}
          >
            Grouped Question:
          </label>
          <input
            type="checkbox"
            className="checkbox checkbox-xs text-primary-200 bg-primary-100 rounded-sm"
            checked={localQ.isGroupQ}
            onChange={(e) => {
              const isChecked = e.target.checked;
              if (!isChecked) {
                setLocalQ((prev) => ({
                  ...prev,
                  isGroupQ: false,
                  groupId: undefined,
                  passage: undefined,
                }));
              } else {
                updateLocal("isGroupQ", true);
              }
            }}
          />
        </div>
        {/* 2. Group Question Logic (Passage) */}
        {localQ.isGroupQ && (
          <div className="bg-black/3 p-3 rounded-xl border border-gray-200 my-2">
            {/* Chỉ hiện khi checkbox được tick */}
            <div className="flex flex-col gap-2 border-gray-200 animate-in fade-in slide-in-from-top-1">
              {/* 1. Dòng chọn Group ID (Luôn hiện) */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-gray-500">
                  Group ID:
                </span>
                <select
                  className="select pl-1 appearance-none h-full w-fit py-1 text-md font-semibold border-none"
                  // Logic: Nếu ID hiện tại có trong list cũ thì hiện ID đó, không thì hiện 'NEW_GROUP'
                  value={isExistingGroup ? localQ.groupId : "NEW_GROUP"}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "NEW_GROUP") {
                      // Cập nhật local trước để UI hiện ra ngay
                      setLocalQ((prev) => ({
                        ...prev,
                        isGroupQ: true,
                        groupId: "",
                        passage: "",
                      }));
                      // Báo cho cha biết là đang chọn chế độ tạo group mới
                      onGroupSelect(index, "", "");
                    } else {
                      // Gọi Cha để link vào Group cũ
                      onGroupSelect(index, val);
                    }
                  }}
                >
                  <option value="NEW_GROUP">New Group</option>
                  {existingGroups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. LOGIC HIỂN THỊ: NHẬP MỚI vs XEM CŨ */}
              {!localQ.groupId || !isExistingGroup ? (
                // === TRƯỜNG HỢP 1: TẠO MỚI (Dùng Ref + Save Button) ===
                <div className="flex flex-col gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                  {/* Header nhỏ */}
                  <div className="flex justify-between items-center border-b border-blue-200 pb-2 mb-1">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Create New Group
                    </span>
                    <button
                      onClick={handleSaveNewGroup}
                      className="btn btn-xs btn-primary text-white border-none shadow-md"
                    >
                      Save Group
                    </button>
                  </div>

                  {/* Input ID */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 w-fit">
                      New ID:
                    </span>
                    <input
                      ref={newIdRef} // Dùng ref thay vì value/onChange
                      defaultValue={localQ.groupId || ""} // Chỉ set giá trị ban đầu
                      className="input input-bordered h-fit text-lg w-16 px-2 bg-white focus:border-primary focus:ring-1 focus:ring-blue-500"
                      placeholder=""
                      // Sự kiện Enter để Save nhanh
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSaveNewGroup()
                      }
                    />
                  </div>

                  {/* Textarea Passage */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-700">
                      Passage Content:
                    </span>
                    <textarea
                      ref={newPassageRef} // Dùng ref
                      defaultValue={localQ.passage || ""} // Chỉ set giá trị ban đầu
                      className="textarea textarea-bordered w-full h-38 bg-white text-base leading-relaxed focus:border-blue-500"
                      placeholder="Type or paste the reading passage here..."
                    />
                    <span className="text-[10px] text-gray-500 italic text-right">
                      Review carefully before saving.
                    </span>
                  </div>
                </div>
              ) : (
                // === TRƯỜNG HỢP 2: GROUP CŨ (Chỉ hiện Passage Readonly) ===
                <div className="flex flex-col gap-1 opacity-75">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-sm font-bold text-gray-400">
                      Linked Passage Content:
                    </span>
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                      Read Only
                    </span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full h-38 text-base bg-gray-100 text-gray-600 cursor-not-allowed resize-none"
                    rows={3}
                    value={localQ.passage || ""}
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {/* 3. Question Content */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-lg text-tertiary">
              Content:
            </span>
            <input
              className="input input-bordered input-sm text-base pl-2 w-full bg-transparent"
              value={localQ.content}
              onChange={(e) => updateLocal("content", e.target.value)}
              placeholder="Type the question here..."
            />
          </div>

          {/* 4. Answer Options */}
          <span className="text-lg font-semibold text-tertiary ">Options:</span>
          {localQ.answerList?.map((ans) => (
            <div key={ans.key} className="flex flex-row items-center gap-2">
              {/* RADIO BUTTON CƠ BẢN */}
              <input
                type="radio"
                // name: Gom nhóm các radio của cùng 1 câu hỏi lại với nhau
                name={`question-${index}`}
                // checked: So sánh key hiện tại với đáp án đúng trong data
                checked={localQ.answerKey === ans.key}
                // onChange: Cập nhật đáp án đúng
                onChange={() => updateLocal("answerKey", ans.key)}
                className="cursor-pointer w-4 h-4" // Chỉnh size một chút cho dễ bấm
              />

              {/* A., B., C., D. */}
              <span
                className="font-bold cursor-pointer"
                onClick={() => updateLocal("answerKey", ans.key)}
              >
                {String.fromCharCode(65 + ans.key)}.
              </span>

              {/* Ô NHẬP NỘI DUNG ĐÁP ÁN */}
              <input
                className={clsx(
                  "input input-bordered input-sm text-base pl-2 w-full bg-black/3",
                  // Nếu là đáp án đúng thì viền xanh cho nổi bật
                  // q.answerKey === ans.key ? "border-green-500 bg-white" : "bg-gray-50"
                )}
                value={ans.option}
                onChange={(e) => handleAnswerChange(ans.key, e.target.value)}
                placeholder={`Option ${ans.key}`}
              />
            </div>
          ))}

          {/* 5. Explanation */}
          {/* <div className="flex items-center gap-2 mt-1">
                    <span className='font-semibold text-gray-700 min-w-fit'>Explanation:</span>
                    <input
                        className="input input-bordered input-sm w-full"
                        value={q.explanation || ''}
                        onChange={(e) => onChange(index, 'explanation', e.target.value)}
                    />
                </div> */}
        </div>
      </div>
    );
  },
);
