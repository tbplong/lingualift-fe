import BackButton from "@/components/button/back-button";
import StudyLayout from "@/components/study-layout";
import { LevelInput } from "@/components/ui/exam/level-input";
import handleAxiosError from "@/helpers/handle-axios-error";
import CdnService from "@/services/cdn/cdn.service";
import { CreateNationalExamRequestDTO } from "@/services/exam/dto/national-exam.dto";
import NationalExamService from "@/services/exam/national-exam.service";
import {
  NationalExamTag,
  NationalExamTagValue,
} from "@/types/national-exam.type";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { EXAM_MAX_DIFFICULTY } from ".";
import SingleSelectInput from "@/components/single-select-input";
import { cn } from "@/utils/cn";
import { Upload, Video, Visibility } from "@/components/icons";
import { Button } from "@/components/button/button";
import PDF from "@/components/icons/pdf";
import { formatBytes } from "@/utils/memory";
import PdfViewer from "@/components/pdf-viewer";
import VideoTab from "@/components/ui/exam/video-tab";
import { Footer } from "@/components/Footer";
import { Modal, ModalHandler } from "@/components/ui/modal";
import Loading from "@/components/ui/loading";
import { FILENAME_REGEX } from "@/constants";
import StorageService from "@/services/cdn/storage.service";

export const Route = createFileRoute("/exam/create")({
  beforeLoad: ({ context }) => {
    if (!context.authContext.isManager) {
      toast.error("You are not authorized to access this page.");
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

const DEFAULT_EXAM_FILE_CDN_BUCKET = "booking-classroom-assets";

function RouteComponent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState<NationalExamTag | null>(null);
  const [questions, setQuestions] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [examFile, setExamFile] = useState<Blob>();
  const [examFileName, setExamFileName] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const createModalRef = useRef<ModalHandler>(null);

  const getEmbedYoutubeUrl = (urlString: string | undefined) => {
    if (!urlString) {
      return { embedUrl: null };
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

  const validateFileName = (fileName: string): boolean => {
    const isValid = FILENAME_REGEX.test(fileName);
    return isValid;
  };

  const getPresignedUrl = async () => {
    try {
      const response = await CdnService.getPresignedUrl(`${examFileName}`);
      return response.data.url;
    } catch (e) {
      setIsLoading(false);
      handleAxiosError(e, (message) => {
        toast.error(message);
      });
    }
  };

  const uploadToStorage = async () => {
    const presignedUrl = await getPresignedUrl();
    if (presignedUrl && examFile) {
      try {
        await StorageService.uploadToStorage(presignedUrl, examFile);
        return true;
      } catch (e) {
        handleAxiosError(e, (message) => {
          toast.error(message);
        });
        setIsLoading(false);
        return false;
      }
    }
    return true;
  };

  const isAllRequirementMeet = () => {
    return (
      title.trim() !== "" &&
      level !== 0 &&
      questions >= 0 &&
      examFile !== undefined &&
      videoUrl !== undefined &&
      videoUrl.trim() !== ""
    );
  };

  const publishNewExam = async () => {
    setIsLoading(true);
    const embedYoutubeUrl = getEmbedYoutubeUrl(videoUrl);
    const isUploadToStorageSuccess = await uploadToStorage();
    if (!isUploadToStorageSuccess) {
      toast.error("Uploading file fail");
      setIsLoading(false);
      return;
    }
    const input: CreateNationalExamRequestDTO = {
      title: title.trim(),
      level,
      status,
      questions,
      examBucket: DEFAULT_EXAM_FILE_CDN_BUCKET,
      examKey: `${examFileName}`,
      videoLink: embedYoutubeUrl.embedUrl,
    };

    try {
      await NationalExamService.create(input);
      toast.success("Success");
      navigate({
        to: "/exam",
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
          <BackButton className="mb-5 w-fit" toRoutePath="/exam" />
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
                    <h2 className="text-xl font-bold">Uploading file</h2>
                    <Button
                      className="ml-3"
                      onClick={() => {
                        setExamFile(undefined);
                        setExamFileName("");
                      }}
                      disabled={examFile === undefined}
                    >
                      Clear option
                    </Button>
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
                        setVideoUrl(undefined);
                      }}
                      disabled={videoUrl === undefined}
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
                  value={videoUrl}
                />
                {videoUrl && (
                  <div className="mt-5">
                    <h2 className="mb-5 text-xl font-bold">Preview</h2>
                    <VideoTab
                      link={getEmbedYoutubeUrl(videoUrl).embedUrl || ""}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="mt-12 flex justify-end">
              <button
                onClick={() => {
                  navigate({ to: "/exam" });
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
                  const isValid = validateFileName(examFileName);
                  if (!isValid) {
                    toast.error("No special character in filename");
                    return;
                  }
                  createModalRef.current?.open();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <Modal ref={createModalRef}>
          <div className="rounded-lg bg-white p-6">
            {isLoading ? (
              <div className="flex h-80 flex-col items-center justify-center gap-4">
                <Loading loop={true} className="size-40" />
                <p>Please wait during the uploading process</p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-tertiary">
                  Confirm creating new exam
                </h1>
                <p className="mt-8">
                  New exam will be created{" "}
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
                    onClick={publishNewExam}
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
