import { Question } from "@/types";
import clsx from "clsx";
import { useEffect, useState } from "react";
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
}

export const QuestionItem = ({
  index,
  q,
  existingGroups,
  onChange,
  onGroupSelect,
  onAnswerChange,
}: QuestionItemProps) => {
  // Kiểm tra xem Group ID hiện tại có phải là group cũ không
  const isExistingGroup = existingGroups.includes(q.groupId || "");

  // --- LOCAL STATE: Dùng để nhập liệu tạm thời ---
  const [draftId, setDraftId] = useState("");
  const [draftPassage, setDraftPassage] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);

  // Khi component mount hoặc q thay đổi, nếu đang không drafting thì sync dữ liệu
  // (Logic này để đảm bảo khi chọn dropdown thì dữ liệu vẫn hiện đúng)
  useEffect(() => {
    if (!isDrafting) {
      setDraftId(q.groupId || "");
      setDraftPassage(q.passage || "");
    }
  }, [q.groupId, q.passage, isDrafting]);

  // Hàm xử lý khi chọn Dropdown
  const handleSelectChange = (val: string) => {
    if (val === "NEW_GROUP") {
      setIsDrafting(true); // Bật chế độ nhập nháp
      setDraftId(""); // Reset form nháp
      setDraftPassage("");
      // Đồng thời báo cha reset data
      onGroupSelect(index, "NEW_GROUP");
    } else {
      setIsDrafting(false); // Tắt chế độ nhập nháp
      onGroupSelect(index, val);
    }
  };

  // Hàm LƯU (Chạy khi ấn Enter hoặc nút Save)
  const handleSaveDraft = () => {
    if (!draftId.trim()) {
      alert("Please enter a Group ID");
      return;
    }
    // 1. Cập nhật lên Parent
    onChange(index, "groupId", draftId);
    onChange(index, "passage", draftPassage);

    // 2. Tắt chế độ nháp (Lúc này ID mới đã thành existing)
    setIsDrafting(false);
  };
  return (
    <div className="p-4 mx-1 bg-white border-4 border-secondary-300 h-fit rounded-2xl">
      {/* 1. Header: Số thứ tự & Loại câu hỏi */}
      <div className="flex flex-row justify-between items-center">
        <span className="text-2xl font-semibold text-tertiary">
          Question {index + 1}
        </span>
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
      <div className="flex items-center gap-2 mb-2">
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
      <div className="flex flex-col gap-3">
        {/* 2. Group Question Logic (Passage) */}
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
          {/* Chỉ hiện khi checkbox được tick */}
          {q.isGroupQ && (
            <div className="flex flex-col gap-3 pl-2 mt-2 border-l-2 border-gray-200">
              {/* 1. Dropdown chọn Group */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-500 w-20">
                  Group ID:
                </span>
                <select
                  className="select select-bordered select-xs w-40 font-semibold"
                  // Nếu đang drafting thì value là NEW_GROUP, nếu không thì lấy ID thật
                  value={
                    isDrafting
                      ? "NEW_GROUP"
                      : isExistingGroup
                        ? q.groupId
                        : "NEW_GROUP"
                  }
                  onChange={(e) => handleSelectChange(e.target.value)}
                >
                  <option value="NEW_GROUP">➕ Create New</option>
                  {existingGroups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. FORM NHẬP LIỆU (Chỉ hiện khi đang drafting hoặc chưa có ID) */}
              {isDrafting ? (
                <div className="flex flex-col gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600 uppercase">
                      Creating New Group
                    </span>
                    <button
                      onClick={handleSaveDraft}
                      className="btn btn-xs btn-primary text-white"
                    >
                      Save Group (Enter)
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">New ID:</span>
                    <input
                      className="input input-bordered input-sm w-40 bg-white"
                      placeholder="e.g. PASSAGE_1"
                      value={draftId}
                      onChange={(e) => setDraftId(e.target.value)}
                      // Bắt sự kiện Enter tại ô ID
                      onKeyDown={(e) => e.key === "Enter" && handleSaveDraft()}
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">
                      Passage Content:
                    </span>
                    <textarea
                      className="textarea textarea-bordered w-full h-24 bg-white"
                      placeholder="Type passage content..."
                      value={draftPassage}
                      onChange={(e) => setDraftPassage(e.target.value)}
                      // Bắt sự kiện Enter (Ctrl+Enter để xuống dòng thoải mái)
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        !e.shiftKey &&
                        (e.preventDefault(), handleSaveDraft())
                      }
                    />
                    <span className="text-[10px] text-gray-500 text-right">
                      Press Enter to save
                    </span>
                  </div>
                </div>
              ) : (
                // 3. CHẾ ĐỘ READ ONLY (Khi đã Save hoặc chọn group cũ)
                <div className="flex flex-col gap-1 opacity-80">
                  <div className="flex justify-between px-1">
                    <span className="text-xs font-bold text-gray-500">
                      Linked Passage:
                    </span>
                    {/* Nút Edit nhỏ nếu muốn sửa lại group vừa tạo */}
                    {q.groupId && !existingGroups.includes(q.groupId) && (
                      <button
                        onClick={() => setIsDrafting(true)}
                        className="text-xs text-blue-500 underline"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                    rows={3}
                    value={q.passage || ""}
                    readOnly
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3. Question Content */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-lg text-tertiary">Content:</span>
          <input
            className="input input-bordered w-full focus:border-secondary transition-colors"
            value={q.content}
            onChange={(e) => onChange(index, "content", e.target.value)}
            placeholder="Type the question here..."
          />
        </div>

        {/* 4. Answer Options */}
        <span className="text-lg font-semibold text-tertiary mb-1 ml-1">
          Options:
        </span>
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
              {String.fromCharCode(64 + ans.key)}.
            </span>

            {/* Ô NHẬP NỘI DUNG ĐÁP ÁN */}
            <input
              className={clsx(
                "input input-bordered input-sm text-base pl-2 w-full bg-black/3 transition-all",
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
