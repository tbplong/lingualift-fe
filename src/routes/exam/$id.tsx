import { Footer } from "@/components/Footer";
import {
  RoundHollowStar,
  FireIcon,
  Question,
  Visibility,
  Calendar,
  Star,
  Video,
  Download,
  Setting,
} from "@/components/icons";
import StudyLayout from "@/components/study-layout";
import PdfTab from "@/components/ui/exam/pdf-tab";
import VideoTab from "@/components/ui/exam/video-tab";
import { Modal, ModalHandler } from "@/components/ui/modal";
import Rating from "@/components/ui/rating";
import StatusTag from "@/components/ui/status-tag";
import handleAxiosError from "@/helpers/handle-axios-error";
import { NationalExamDTO } from "@/services/exam/dto/national-exam.dto";
import NationalExamService from "@/services/exam/national-exam.service";
import { NationalExamTagValue } from "@/types/national-exam.type";
import { cn } from "@/utils/cn";
import { downloadFile } from "@/utils/download-file";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { EXAM_MAX_DIFFICULTY } from ".";
import BackButton from "@/components/button/back-button";
import Heading from "@/components/Heading";
import { useUserStore } from "@/stores/user.store";
import Delete from "@/components/icons/delete";

export const Route = createFileRoute("/exam/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [exam, setExam] = useState<NationalExamDTO>();
  const [currentTab, setCurrentTab] = useState(0);
  const modalRef = useRef<ModalHandler>(null);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const getExamData = useCallback(async () => {
    try {
      const { data: examData } = await NationalExamService.getExamById(id);
      setExam(examData);
    } catch (error) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    }
  }, [id]);

  useEffect(() => {
    getExamData();
  }, [getExamData]);

  if (!exam) {
    return null;
  }

  return (
    <>
      <StudyLayout>
        <div className="flex flex-1 flex-col items-stretch space-y-5">
          <BackButton
            toRoutePath={`/exam`}
            className="group flex cursor-pointer items-center space-x-1"
          />
          <div className="flex items-center space-x-5">
            <Heading text={exam.title} />
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
                  "static rounded text-xl",
                  exam.status === NationalExamTagValue.NEW &&
                    "bg-green-500 text-white",
                  exam.status === NationalExamTagValue.HOT &&
                    "bg-red-500 text-white",
                )}
              />
            )}
          </div>
          <Rating maxRate={EXAM_MAX_DIFFICULTY} rate={exam.level} />
          <div className="space-y-2 sm:flex sm:items-center sm:space-x-5 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Calendar />
              <span>{dayjs(exam.createdAt).format("HH:mm DD/MM/YYYY")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Question />
              <span>Questions: {exam.questions}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="size-5 fill-tertiary" />
              <span>Difficulty: {`${exam.level}/${EXAM_MAX_DIFFICULTY}`}</span>
            </div>
          </div>

          {/* MAIN */}
          <div>
            <div className="flex overflow-auto">
              <button
                onClick={() => {
                  setCurrentTab(0);
                }}
                className={cn(
                  "flex items-center space-x-1 rounded-t border p-2 text-sm sm:px-3",
                  currentTab === 0
                    ? "cursor-default border-b-0"
                    : "border-x-0 border-b border-t-0 hover:underline",
                )}
              >
                <Visibility className="me-1 hidden size-4 fill-primary sm:size-auto md:block" />
                <span className="text-nowrap">File</span>
              </button>
              {exam.videoLink && (
                <button
                  onClick={() => {
                    setCurrentTab(1);
                  }}
                  className={cn(
                    "flex items-center space-x-1 rounded-t border p-2 text-sm sm:px-3",
                    currentTab === 1
                      ? "cursor-default border-b-0"
                      : "border-x-0 border-b border-t-0 hover:underline",
                  )}
                >
                  <Video className="me-1 hidden fill-red md:block" />
                  <span>Video</span>
                </button>
              )}
              <div className="flex grow items-center overflow-auto border-b py-2 cursor-pointer">
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
                  className="group ms-2 flex items-center space-x-1 rounded border border-green p-1.5 text-sm font-bold text-green duration-200 ease-in-out hover:bg-green-700 hover:text-white sm:px-3"
                >
                  <Download className="size-6 me-1 hidden fill-green-500 group-hover:fill-white md:block" />
                  <span className="text-nowrap">Download file</span>
                </button>
                {user?.isManager && (
                  <button
                    onClick={() => {
                      modalRef.current?.open();
                    }}
                    className="cursor-pointer group ms-2 flex items-center space-x-1 rounded border border-red p-1.5 text-sm font-bold text-red duration-200 ease-in-out hover:bg-red-700 hover:text-white sm:px-3"
                  >
                    <Delete className="size-6 me-1 hidden fill-red group-hover:fill-white md:block" />
                    <span className="text-nowrap">Delete Exam</span>
                  </button>
                )}
                {user?.isManager && (
                  <button
                    onClick={() => {
                      navigate({ to: "/exam/edit/$id", params: { id: id } });
                    }}
                    className="cursor-pointer group ms-2 flex items-center space-x-1 rounded border border-magenta p-1.5 text-sm font-bold text-magenta duration-200 ease-in-out hover:bg-magenta hover:text-white sm:px-3"
                  >
                    <Setting className="size-6 me-1 hidden fill-magenta group-hover:fill-white md:block" />
                    <span className="text-nowrap">Edit Exam</span>
                  </button>
                )}
              </div>
            </div>
            <div className="w-full border border-t-0 bg-slate-100 py-5">
              {currentTab === 0 && exam.examBucket && exam.examKey && (
                <div className="size-full overflow-auto">
                  <PdfTab bucket={exam.examBucket} _key={exam.examKey} />
                </div>
              )}
              {currentTab === 1 && exam.videoLink && (
                <VideoTab link={exam.videoLink} />
              )}
            </div>
          </div>
        </div>
      </StudyLayout>
      <Footer />
      <Modal ref={modalRef}>
        <div className="rounded-lg bg-white p-6">
          <h1 className="text-2xl font-bold text-tertiary">
            Confirm deleting exam
          </h1>
          <p className="mt-8">
            This action is{" "}
            <span className="font-bold text-red-500">irreversible</span>
          </p>
          <div className="mt-14 flex items-center justify-end">
            <button
              onClick={() => {
                modalRef.current?.close();
              }}
              className="rounded-lg border border-red px-4 py-2 font-bold text-red transition-all duration-200 hover:bg-red-700 hover:text-white"
            >
              Cancel
            </button>
            <button
              className="ml-4 rounded-lg border border-red bg-red px-4 py-2 font-bold text-white transition-all duration-200 hover:border-red-700 hover:bg-red-700"
              onClick={async () => {
                try {
                  await NationalExamService.deleteExamById(id);
                  navigate({ to: "/exam" });
                  toast.success("Delete exam success");
                } catch {
                  toast.error("Error occur, please try again");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
