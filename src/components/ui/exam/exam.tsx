import {
  Calendar,
  FireIcon,
  Pin,
  Question,
  RoundHollowStar,
  Star,
  Visibility,
} from "@/components/icons";
import StatusTag from "@/components/ui/status-tag";
import { NationalExamDTO } from "@/services/exam/dto/national-exam.dto";
import { NationalExamTagValue } from "@/types/national-exam.type";
import { cn } from "@/utils/cn";
import Rating from "@/components/ui/rating";
import dayjs from "dayjs";
import { Link } from "@tanstack/react-router";
import { EXAM_MAX_DIFFICULTY } from "@/routes/exam";

type ExamProps = {
  exam: NationalExamDTO;
  index: number;
  isPinned?: boolean;
};

const Exam = ({ exam, index, isPinned }: ExamProps) => {
  return (
    <div
      key={exam._id}
      className="relative mb-3 flex flex-col overflow-hidden rounded-md border-[0.5px] border-[#3d4863] px-3 pb-4 pt-6 shadow-[4px_4px_0_0_#F9BA08] md:pt-7 xl:px-5"
    >
      {exam.status && (
        <StatusTag
          text={exam.status}
          icon={
            exam.status === NationalExamTagValue.NEW ? (
              <RoundHollowStar className="size-4" />
            ) : (
              <FireIcon className="size-4 fill-yellow" />
            )
          }
          className={cn(
            "absolute left-auto right-0 top-0 rounded-bl-lg rounded-br-none rounded-tl-none",
            exam.status === NationalExamTagValue.NEW &&
              "bg-green-500 text-white",
            exam.status === NationalExamTagValue.HOT && "bg-red-500 text-white",
          )}
        />
      )}

      {/* Left border */}
      <div className="absolute inset-y-0 left-0 w-[4px] bg-[#3d4863]"></div>

      <div className="mb-5 flex flex-col items-start space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0 xl:mb-10">
        <div className="flex items-center">
          {isPinned && <Pin className="me-1 rotate-45" />}
          <h3 className="text-lg font-bold">{`${index}. ${exam.title}`}</h3>
        </div>
        <Rating maxRate={EXAM_MAX_DIFFICULTY} rate={exam.level} />
      </div>

      <div className="flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div className="mb-5 flex flex-col space-y-2 md:flex-row md:space-x-5 md:space-y-0 2xl:mb-0">
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <Calendar />
            <span>{dayjs(exam.createdAt).format("HH:mm DD/MM/YYYY")}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <Question />
            <span>Questions: {exam.questions}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <Star className="size-5 fill-tertiary" />
            <span>Difficulty: {`${exam.level}/${EXAM_MAX_DIFFICULTY}`}</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between space-y-1 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0 sm:self-end">
          <Link
            to="/exam/$id"
            params={{ id: exam._id }}
            className="gap-2 flex items-center justify-center overflow-hidden rounded bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all duration-100 hover:bg-[#0220b7] sm:text-base md:px-2 md:py-1"
          >
            <Visibility className="me-1 hidden size-4 fill-white sm:size-auto md:block" />
            <span className="text-nowrap">See exam</span>
          </Link>
          {/* <Link
            to="/exam/$id"
            params={{ id: exam._id }}
            className="flex items-center justify-center overflow-hidden rounded bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-all duration-100 hover:bg-red-800 sm:text-base md:px-2 md:py-1"
          >
            <Video className="me-1 hidden fill-white md:block" />
            <span className="text-nowrap">Video</span>
          </Link>
          <button
            onClick={() => {
              if (exam.examBucket && exam.examKey) {
                downloadFile({
                  bucket: exam.examBucket,
                  key: exam.examKey,
                  title: `${exam.title.replaceAll(" ", "_")}.pdf`,
                  callback: () => {
                    toast.success("Tài liệu đang được tải xuống");
                  },
                });
              }
            }}
            className="flex items-center justify-center overflow-hidden rounded bg-green-500 fill-white px-5 py-2.5 text-sm font-bold text-white transition-all duration-100 hover:bg-green-800 sm:text-base md:px-2 md:py-1"
          >
            <Download className="me-1 hidden md:block" />
            <span className="text-nowrap">Tải đề</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Exam;
