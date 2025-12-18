import { Trash } from "@/components/icons";
import { Question } from "@/types";
import clsx from "clsx";
import { useRef } from "react";
// Import type Question của bạn

interface QuestionItemProps {
  index: number;
  q: Question;
  existingGroups: string[];
  onChange: (
    index: number,
    field: keyof Question,
    value: string | number | boolean | undefined,
  ) => void;
  onGroupSelect: (index: number, value: string) => void;
  onAnswerChange: (index: number, ansKey: number, value: string) => void;
  onDelete: (index: number) => void;
}

export const QuestionItem = ({
  index,
  q,
  existingGroups,
  onChange,
  onGroupSelect,
  onAnswerChange,
  onDelete,
}: QuestionItemProps) => {
  // Kiểm tra xem Group ID hiện tại có phải là group cũ không
  const isExistingGroup = existingGroups.includes(q.groupId || "");
  // 1. Khởi tạo Ref để nắm giữ giá trị của 2 ô input mà không gây re-render
  const newIdRef = useRef<HTMLInputElement>(null);
  const newPassageRef = useRef<HTMLTextAreaElement>(null);

  // 2. Hàm xử lý khi bấm Save
  const handleSaveNewGroup = () => {
    const idVal = newIdRef.current?.value;
    const passageVal = newPassageRef.current?.value;

    if (!idVal || !idVal.trim()) {
      alert("Please enter a Group ID!");
      return;
    }

    // Lúc này mới gọi lên cha để cập nhật State 1 lần duy nhất
    // Lưu ý: Cập nhật passage trước hoặc ID sau tùy vào logic validate của bạn
    // Nhưng thường nên update cả 2
    onChange(index, "passage", passageVal);
    onChange(index, "groupId", idVal);

    // Sau khi update, Component sẽ re-render.
    // Vì lúc này q.groupId đã có và (có thể) đã nằm trong existingGroups (tùy logic cha update),
    // giao diện sẽ tự chuyển sang màn hình Read-only.
  };

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
          value={q.type}
          onChange={(e) => onChange(index, "type", e.target.value)}
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
          onClick={() => onChange(index, "isGroupQ", !q.isGroupQ)}
        >
          Grouped Question:
        </label>
        <input
          type="checkbox"
          className="checkbox checkbox-xs text-white bg-primary-100 rounded-sm"
          checked={q.isGroupQ}
          onChange={(e) => onChange(index, "isGroupQ", e.target.checked)}
        />
      </div>
      {/* 2. Group Question Logic (Passage) */}
      {q.isGroupQ && (
        <div className="bg-black/3 p-3 rounded-xl border border-gray-200 my-2">
          {/* Chỉ hiện khi checkbox được tick */}
          <div className="flex flex-col gap-2 border-gray-200 animate-in fade-in slide-in-from-top-1">
            {/* 1. Dòng chọn Group ID (Luôn hiện) */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-gray-500">Group ID:</span>
              <select
                className="select pl-1 appearance-none h-full w-fit py-1 text-md font-semibold border-none"
                // Logic: Nếu ID hiện tại có trong list cũ thì hiện ID đó, không thì hiện 'NEW_GROUP'
                value={isExistingGroup ? q.groupId : "NEW_GROUP"}
                onChange={(e) => onGroupSelect(index, e.target.value)}
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
            {!q.groupId || !isExistingGroup ? (
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
                    defaultValue={q.groupId || ""} // Chỉ set giá trị ban đầu
                    className="input input-bordered h-fit text-lg w-16 px-2 bg-white focus:border-primary focus:ring-1 focus:ring-blue-500"
                    placeholder=""
                    // Sự kiện Enter để Save nhanh
                    onKeyDown={(e) => e.key === "Enter" && handleSaveNewGroup()}
                  />
                </div>

                {/* Textarea Passage */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-gray-700">
                    Passage Content:
                  </span>
                  <textarea
                    ref={newPassageRef} // Dùng ref
                    defaultValue={q.passage || ""} // Chỉ set giá trị ban đầu
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
                  value={q.passage || ""}
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
          <span className="font-semibold text-lg text-tertiary">Content:</span>
          <input
            className="input input-bordered input-sm text-base pl-2 w-full bg-transparent"
            value={q.content}
            onChange={(e) => onChange(index, "content", e.target.value)}
            placeholder="Type the question here..."
          />
        </div>

        {/* 4. Answer Options */}
        <span className="text-lg font-semibold text-tertiary ">Options:</span>
        {q.answerList?.map((ans) => (
          <div key={ans.key} className="flex flex-row items-center gap-2">
            {/* RADIO BUTTON CƠ BẢN */}
            <input
              type="radio"
              // name: Gom nhóm các radio của cùng 1 câu hỏi lại với nhau
              name={`question-${index}`}
              // checked: So sánh key hiện tại với đáp án đúng trong data
              checked={q.answerKey === ans.key}
              // onChange: Cập nhật đáp án đúng
              onChange={() => onChange(index, "answerKey", ans.key)}
              className="cursor-pointer w-4 h-4" // Chỉnh size một chút cho dễ bấm
            />

            {/* A., B., C., D. */}
            <span
              className="font-bold cursor-pointer"
              onClick={() => onChange(index, "answerKey", ans.key)}
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
              onChange={(e) => onAnswerChange(index, ans.key, e.target.value)}
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
};
