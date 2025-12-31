import { Button } from "@/components/button/button";
import { Footer } from "@/components/Footer";
import { Upload, Video, Visibility } from "@/components/icons";
import PDF from "@/components/icons/pdf";
import PdfViewer from "@/components/pdf-viewer";
import SingleSelectInput from "@/components/single-select-input";
import StudyLayout from "@/components/study-layout";
import { LevelInput } from "@/components/ui/exam/level-input";
import VideoTab from "@/components/ui/exam/video-tab";
import Loading from "@/components/ui/loading";
import { ModalHandler, Modal } from "@/components/ui/modal";
import handleAxiosError from "@/helpers/handle-axios-error";
import { CreateNationalExamRequestDTO } from "@/services/exam/dto/national-exam.dto";
import NationalExamService from "@/services/exam/national-exam.service";
import {
  NationalExamTag,
  NationalExamTagValue,
} from "@/types/national-exam.type";
import { cn } from "@/utils/cn";
import { formatBytes } from "@/utils/memory";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { EXAM_MAX_DIFFICULTY } from "..";
import BackButton from "@/components/button/back-button";
import CdnService from "@/services/cdn/cdn.service";

export const Route = createFileRoute("/exam/edit/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState<NationalExamTag | null>(null);
  const [questions, setQuestions] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [examFile, setExamFile] = useState<Blob>();
  const [examFileName, setExamFileName] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const createModalRef = useRef<ModalHandler>(null);

  const getEmbedYoutubeUrl = (urlString: string | undefined) => {
    if (!urlString) {
      return { embedUrl: undefined };
    }

    try {
      const url = new URL(urlString);
      const videoId = url.searchParams.get("v");

      if (!url.hostname.includes("youtube.com") || !videoId) {
        return { error: "Url not valid" };
      }

      return { embedUrl: `https://www.youtube.com/embed/${videoId}` };
    } catch (e) {
      console.error(e);
      return { error: "Url not valid" };
    }
  };

  const isAllRequirementMeet = () => {
    return title.trim() !== "" && level !== 0 && questions >= 0;
  };

  const getExamData = useCallback(async () => {
    try {
      const { data: examData } = await NationalExamService.getExamById(id);
      const { data } = await CdnService.getContent(
        examData.examBucket,
        examData.examKey,
      );
      setTitle(examData.title);
      setLevel(examData.level);
      setStatus(examData.status);
      setQuestions(examData.questions);
      setVideoUrl(examData.videoLink);
      setExamFile(data);
      setExamFileName(examData.examKey.split("/")[1]);
    } catch (error) {
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    }
  }, [id]);

  useEffect(() => {
    getExamData();
  }, [getExamData]);

  const updateExam = async () => {
    setIsLoading(true);
    const embedYoutubeUrl = getEmbedYoutubeUrl(newVideoUrl);
    if (newVideoUrl && !embedYoutubeUrl.embedUrl) {
      toast.error("Invalid video");
    }
    const input: Partial<CreateNationalExamRequestDTO> = {
      title: title.trim(),
      level,
      status,
      questions,
      videoLink:
        newVideoUrl && newVideoUrl.trim().length !== 0
          ? videoUrl
          : embedYoutubeUrl.embedUrl,
    };

    try {
      await NationalExamService.update(id, input);
      toast.success("Success");
      navigate({
        to: "/exam/$id",
        params: { id: id },
      });
    } catch (e) {
      handleAxiosError(e, (message) => {
        toast.error(message);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StudyLayout>
        <div className="relative flex w-full flex-col xl:max-w-[calc((100vw)-340px)] 3xl:p-10">
          <BackButton className="mb-5 w-fit" toRoutePath={`/exam/${id}`} />
          <input
            type="text"
            className="mb-5 h-fit w-full rounded-lg border border-tertiary p-4 text-xl font-bold lg:text-2xl"
            placeholder="Exam name..."
            onChange={(event) => {
              setTitle(event.target.value);
              event.preventDefault();
            }}
            value={title}
          />
          <div className="mb-5 flex justify-between">
            <div className="flex w-1/4 items-center gap-3">
              <p className="text-nowrap text-xl font-bold">
                Difficulty<span className="text-red">*</span>
              </p>
              <LevelInput
                level={level}
                onChange={(level: number) => {
                  setLevel(level);
                }}
                maxLevel={EXAM_MAX_DIFFICULTY}
              />
            </div>
            <div className="flex w-1/3 items-center gap-3">
              <p className="text-nowrap text-xl font-bold">Status</p>
              <SingleSelectInput
                className="size-10 grow rounded border-tertiary-300 text-sm"
                options={[null, ...Object.values(NationalExamTagValue)]}
                value={status}
                renderValueItem={(item) => (item ? item : "None")}
                renderOptionItem={(item) => (item ? item : "None")}
                onSelect={(status) => {
                  setStatus(status);
                }}
              />
            </div>
            <div className="flex w-1/3 items-center gap-3">
              <p className="text-nowrap text-xl font-bold">
                Questions<span className="text-red">*</span>
              </p>
              <input
                type="number"
                className="size-10 grow rounded border border-tertiary-300 px-2 py-1 outline-none"
                value={questions}
                onChange={(e) => {
                  setQuestions(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="flex w-full overflow-auto">
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
              <Visibility
                className={cn(
                  "me-1 hidden size-4 fill-primary sm:size-auto md:block",
                )}
              />
              <span className={"text-nowrap"}>File</span>
            </button>
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
              <span className={"text-nowrap"}>Video</span>
            </button>
            <div className="w-full border border-x-0 border-t-0"></div>
          </div>
          <div className="w-full rounded-b-lg border border-t-0 p-5">
            {currentTab === 0 && (
              <div className="size-full overflow-auto transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold">Exam file</h2>
                  </div>
                </div>
                {examFile ? (
                  <div className="mt-5 flex rounded-lg border px-6 py-4">
                    <PDF />
                    <div className="ml-4 flex flex-col text-base">
                      <p>{examFileName}</p>
                      <p className="text-tertiary-300">
                        {formatBytes(examFile.size)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <label className="relative mt-5 flex h-40 w-full cursor-pointer items-center justify-center border border-dashed border-tertiary-300 hover:border-tertiary">
                    <input
                      type="file"
                      className="absolute inset-0 size-full cursor-pointer opacity-0"
                      accept="application/pdf"
                      onChange={(e) => {
                        e.preventDefault();
                        const file = e.target.files?.[0];
                        if (file) {
                          setExamFileName(file.name);
                          setExamFile(file);
                        }
                      }}
                    />
                    <div className="flex flex-col items-center justify-center text-center text-gray-500">
                      <Upload className="mb-2 size-10 fill-tertiary" />
                      <p className="text-sm">Uploading exam file</p>
                      <p className="text-xs text-gray-400">
                        (Accept PDF format only)
                      </p>
                    </div>
                  </label>
                )}
                {examFile && (
                  <div className="mt-5">
                    <h2 className="mb-5 text-xl font-bold">Preview</h2>
                    <div className="border border-tertiary">
                      <PdfViewer file={examFile} />
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentTab === 1 && (
              <div className="size-full overflow-auto transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold">Video link</h2>
                    <Button
                      className="ml-3"
                      onClick={() => {
                        setNewVideoUrl(undefined);
                      }}
                      disabled={newVideoUrl === undefined}
                    >
                      Clear option
                    </Button>
                  </div>
                </div>
                <input
                  type="text"
                  className="mt-5 h-fit w-full cursor-text rounded-lg border border-tertiary p-2 text-base"
                  onChange={(e) => {
                    e.preventDefault();
                    setVideoUrl(e.target.value);
                  }}
                  placeholder="Video link..."
                  value={newVideoUrl}
                />
                {newVideoUrl ? (
                  <div className="mt-5">
                    <h2 className="mb-5 text-xl font-bold">Preview</h2>
                    <VideoTab
                      link={getEmbedYoutubeUrl(newVideoUrl).embedUrl || ""}
                    />
                  </div>
                ) : (
                  videoUrl && (
                    <div className="mt-5">
                      <h2 className="mb-5 text-xl font-bold">Preview</h2>
                      <VideoTab link={videoUrl} />
                    </div>
                  )
                )}
              </div>
            )}
            <div className="mt-12 flex justify-end">
              <button
                onClick={() => {
                  navigate({ to: "/exam/$id", params: { id: id } });
                }}
                className="rounded-lg border border-primary px-4 py-2 font-bold text-primary hover:bg-slate-100"
              >
                Back
              </button>
              <button
                className="ml-4 rounded-lg bg-primary px-4 py-2 font-bold text-white hover:bg-primary-700"
                onClick={() => {
                  if (!isAllRequirementMeet()) {
                    toast.error("Crucial information is missing");
                    return;
                  }
                  createModalRef.current?.open();
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <Modal ref={createModalRef}>
          <div className="rounded-lg bg-white p-6">
            {isLoading ? (
              <div className="flex h-80 flex-col items-center justify-center gap-4">
                <Loading loop={true} className="size-40" />
                <p>Please wait during the updating process</p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-tertiary">
                  Confirm updating existed exam
                </h1>
                <p className="mt-8">
                  The exam will be updated{" "}
                  <span className="font-bold text-primary">
                    and all user can see the exam
                  </span>{" "}
                </p>
                <div className="mt-14 flex items-center justify-end">
                  <button
                    onClick={() => {
                      createModalRef.current?.close();
                    }}
                    className="rounded-lg border border-primary px-4 py-2 font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-4 rounded-lg border border-primary bg-primary px-4 py-2 font-bold text-white transition-all duration-200 hover:border-primary-700 hover:bg-primary-700"
                    onClick={updateExam}
                  >
                    Create
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </StudyLayout>
      <Footer />
    </>
  );
}
