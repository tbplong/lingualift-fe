import Chevron from "@/components/icons/chevron";
import DoubleChevron from "@/components/icons/double-chevron";
import { cn } from "@/utils/cn";

type PaginationType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const RANGE_ON_DISPLAY_SIZE = 5;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationType) {
  const pageRange: number[] = (() => {
    const halfRange = Math.floor(RANGE_ON_DISPLAY_SIZE / 2);
    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalPages, currentPage + halfRange);

    if (end - start + 1 < RANGE_ON_DISPLAY_SIZE) {
      if (start === 1) {
        end = Math.min(totalPages, start + RANGE_ON_DISPLAY_SIZE - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - RANGE_ON_DISPLAY_SIZE + 1);
      }
    }

    const pageRange = [];
    for (let i = start; i <= end; i++) {
      pageRange.push(i);
    }

    return pageRange;
  })();

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };
  return (
    <div className="relative flex items-center space-x-1">
      <div className="flex size-fit items-center justify-center">
        <button
          className={cn(
            "rounded-full",
            currentPage !== 1 && "hover:bg-slate-200",
          )}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          <DoubleChevron className="h-6 w-auto rounded-full lg:h-8" />
        </button>
      </div>

      <div className="flex size-fit items-center justify-center">
        <button
          className={cn(
            "rounded-full",
            currentPage !== 1 && "hover:bg-slate-200",
          )}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <Chevron className="h-6 w-auto lg:h-8" />
        </button>
      </div>

      {pageRange?.map((pageNumber) => {
        return (
          <div
            key={pageNumber}
            className="flex size-fit items-center justify-center"
          >
            <button
              className={cn(
                "group aspect-square size-10 rounded-full xl:size-8",
                pageNumber === currentPage
                  ? "bg-primary"
                  : "hover:bg-primary-300",
              )}
              onClick={() => handlePageChange(pageNumber as number)}
            >
              <p
                className={cn(
                  "",
                  pageNumber === currentPage
                    ? "text-white"
                    : "group-hover:text-white",
                )}
              >
                {pageNumber}
              </p>
            </button>
          </div>
        );
      })}

      <div className="flex size-fit items-center justify-center">
        <button
          className={cn(
            "rounded-full",
            currentPage !== 1 && "hover:bg-slate-200",
          )}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <Chevron className="h-6 w-auto rotate-180 lg:h-8" />
        </button>
      </div>

      <div className="flex size-fit items-center justify-center">
        <button
          className={cn(
            "rounded-full",
            currentPage !== 1 && "hover:bg-slate-200",
          )}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          <DoubleChevron className="h-6 w-auto rotate-180 lg:h-8" />
        </button>
      </div>
    </div>
  );
}
