import { Footer } from "@/components/Footer";
import { EmptyBox, Search, Upload } from "@/components/icons";
import StudyLayout from "@/components/study-layout";
import { NationalExamDTO } from "@/services/exam/dto/national-exam.dto";
import { useUserStore } from "@/stores/user.store";
import {
  SortOption,
  SortOptionType,
  SortQueryParams,
} from "@/types/national-exam.type";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";
import Filter, { Filter as FilterType } from "../../components/ui/exam/filter";
import NationalExamService from "@/services/exam/national-exam.service";
import Heading from "@/components/Heading";
import SingleSelectInput from "@/components/single-select-input";
import Pagination from "@/components/pagination";
import Exam from "../../components/ui/exam/exam";
import { getLevelFilterQuery } from "@/utils/download-file";

export const Route = createFileRoute("/exam/")({
  component: NationalExams,
});

export const EXAM_MAX_DIFFICULTY = 5;
export const EXAM_PAGE_SIZE = 10;

function NationalExams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState<NationalExamDTO[]>([]);
  const [pinnedExams, setPinnedExams] = useState<NationalExamDTO[]>();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useDebounceValue(search, 500);
  const [sortValue, setSortValue] = useState<SortOptionType>(SortOption.LATEST);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
  });
  const [filter, setFilter] = useState<FilterType>({
    level: [1, EXAM_MAX_DIFFICULTY],
  });
  const { user } = useUserStore();

  const getNationalExams = useCallback(async () => {
    try {
      const examsData = (
        await NationalExamService.getExams({
          page: pagination.currentPage,
          pageSize: EXAM_PAGE_SIZE,
          sort: SortQueryParams[sortValue],
          search: debouncedSearch,
          level: getLevelFilterQuery(...filter.level),
        })
      )?.data;
      setExams(examsData.result);
      setPinnedExams(examsData.pinnedExams);
      setPagination((prev) => ({
        ...prev,
        currentPage: examsData.page,
        totalPages: examsData.totalPage,
      }));
    } catch (error) {
      console.error(error);
    }
  }, [pagination.currentPage, sortValue, debouncedSearch, filter.level]);

  useEffect(() => {
    getNationalExams();
  }, [getNationalExams]);

  // useEffect(() => {
  //   if (isUserSubscribed || user?.isManager) return;
  //   adModal?.open?.();
  // }, [isUserSubscribed, user]);

  return (
    <>
      <StudyLayout>
        <div className="flex flex-1 flex-col items-center space-y-5">
          <Heading text={"Exam"} className="my-5 self-start xl:mt-6" />

          {/* MAIN */}
          <div className="relative flex w-full flex-col items-stretch rounded-md border-[0.5px] border-[#3d4863] px-4 py-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="lg:flex lg:items-center lg:gap-2">
                <h2 className="mb-2 text-nowrap text-xl font-bold lg:mb-0">
                  Exam List
                </h2>
              </div>
              {user?.isManager && (
                <div className="absolute right-4 top-4">
                  <button
                    className="group flex items-center rounded-lg border border-primary px-2 py-1 transition-all duration-200 hover:bg-primary lg:px-4 lg:py-2"
                    onClick={() => {
                      navigate({
                        to: "/exam/create",
                      });
                    }}
                  >
                    <Upload className="size-5 fill-primary transition-all duration-200 group-hover:fill-white" />
                    <p className="ml-2 text-nowrap text-sm font-bold text-primary transition-all duration-200 group-hover:text-white lg:text-base">
                      Upload new exam
                    </p>
                  </button>
                </div>
              )}
            </div>
            <div className="mb-5 flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:space-y-0">
              <div className="flex w-full items-center space-x-2 overflow-hidden rounded-md border border-[#3d4863] p-2">
                <Search />
                <input
                  type="text"
                  placeholder="Search for exam name.."
                  className="grow focus:outline-none"
                  value={search}
                  onInput={(e) => {
                    setSearch(e.currentTarget.value);
                    setDebouncedSearch(e.currentTarget.value);
                    setPagination((prev) => ({ ...prev, currentPage: 1 }));
                  }}
                />
              </div>
              <div className="flex w-full items-center justify-between gap-2 self-end sm:w-auto sm:justify-start">
                <SingleSelectInput
                  options={Object.values(SortOption)}
                  value={sortValue}
                  onSelect={(value) => {
                    setSortValue(value);
                    setPagination((prev) => ({ ...prev, currentPage: 1 }));
                  }}
                  className="w-36"
                />
                <Filter
                  filter={filter}
                  onApplyFilter={(filter) => {
                    setFilter((prev) => ({ ...prev, ...filter }));
                    setSearch("");
                    setDebouncedSearch("");
                    setPagination((prev) => ({ ...prev, currentPage: 1 }));
                  }}
                />
              </div>
            </div>
            <div className="mb-4">
              {pinnedExams?.map((exam, index) => (
                <Exam isPinned key={exam._id} exam={exam} index={index + 1} />
              ))}
              {exams.length > 0 &&
                exams.map((exam, index) => (
                  <Exam
                    key={exam._id}
                    exam={exam}
                    index={
                      (pagination.currentPage - 1) * EXAM_PAGE_SIZE +
                      index +
                      1 +
                      (pinnedExams?.length ?? 0)
                    }
                  />
                ))}
              {pinnedExams?.length === 0 && exams.length === 0 && (
                <div className="flex h-60 flex-col items-center justify-center">
                  <EmptyBox />
                  <p className="text-tertiary-300">No exam found</p>
                </div>
              )}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => {
                    setPagination((prev) => ({ ...prev, currentPage: page }));
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </StudyLayout>
      <Footer />
    </>
  );
}
