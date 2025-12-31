import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { toast } from "react-toastify";
import { useIntersectionObserver } from "usehooks-ts";

import { cn } from "@/utils/cn";

import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "../icons";
import Loading from "../ui/loading";

import { MAX_ZOOM, MIN_ZOOM } from "./constants";

if (typeof Promise.withResolvers === "undefined") {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const documentOptions = {
  cMapUrl: "/cmaps/",
};

type PdfViewerProps = {
  className?: string;
  file: File | Blob | string;
};

const PdfViewer = ({ className, file }: PdfViewerProps) => {
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState<number>();
  const [numPages, setNumPages] = useState<number>();
  const [isShowTool, setIsShowTool] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const timerRef = useRef<NodeJS.Timeout>(null);
  const pdfWrapperRef = useRef<HTMLDivElement>(null);

  const { isIntersecting, ref } = useIntersectionObserver({});

  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM;

  const handleShowTool = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsShowTool(true);
    timerRef.current = setTimeout(() => {
      setIsShowTool(false);
    }, 2000);
  }, []);

  useEffect(() => {
    window?.addEventListener("scroll", handleShowTool);

    return () => {
      window?.removeEventListener("scroll", handleShowTool);
    };
  }, [handleShowTool]);

  useEffect(() => {
    setWidth(pdfWrapperRef.current?.clientWidth);
  }, [pdfWrapperRef.current?.clientWidth]);

  return (
    <div
      className="relative flex size-full justify-center font-medium"
      ref={(node: HTMLDivElement) => {
        pdfWrapperRef.current = node;
        ref(node);
      }}
      onMouseMove={handleShowTool}
    >
      {currentPage > 1 && (
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          className="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-primary-300 p-1 lg:p-3"
        >
          <ArrowLeft className="size-3 lg:size-6" />
        </button>
      )}
      {width && (
        <Document
          className={cn(
            className,
            "relative flex items-center justify-between overflow-auto",
          )}
          options={documentOptions}
          renderMode={"canvas"}
          error={<p>Error</p>}
          loading={<Loading loop />}
          file={file}
          onLoadSuccess={({ numPages: nextNumPages }) => {
            setNumPages(nextNumPages);
          }}
          onLoadError={(error: Error) => {
            toast.error(`${error.message}`);
          }}
        >
          <Page
            width={width}
            loading={<Loading loop />}
            pageNumber={currentPage}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            renderMode="canvas"
            scale={zoom}
            onLoadError={(error: Error) => {
              toast.error(`${error.message}`);
            }}
          />
        </Document>
      )}
      {numPages && currentPage < numPages && (
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-primary-300 p-1 lg:p-3"
        >
          <ArrowRight className="size-3 lg:size-6" />
        </button>
      )}
      <div
        className={cn(
          isShowTool && isIntersecting ? "opacity-100" : "opacity-0",
          "fixed bottom-20 z-10 flex justify-center gap-x-2 rounded-lg border border-[#0c0c0d] bg-[#38383d] p-2 text-sm text-[#d4d4d5] transition-all duration-200 hover:text-[#efeff0] hover:opacity-100 lg:bottom-10",
        )}
      >
        {numPages && (
          <div className="me-1 flex items-center">
            <span className="me-2">Trang</span>
            <input
              key={currentPage}
              defaultValue={currentPage}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              onBlur={(e) => {
                const newValue = Number(e.currentTarget.value);
                if (newValue <= numPages && newValue > 0) {
                  setCurrentPage(newValue);
                } else {
                  e.currentTarget.value = currentPage.toString();
                }
              }}
              className="w-[40px] rounded-lg bg-[#4a4a4f] p-1 text-[#f9f9fa] lg:p-2 3xl:p-3"
            />
            <span className="mx-2">/</span>
            <span>{numPages}</span>
          </div>
        )}
        <div className="relative inset-y-0 w-px bg-[#d4d4d5]"></div>
        <button
          type="button"
          onClick={() => {
            if (canZoomOut) setZoom(zoom - 0.1);
          }}
          className="rounded-lg p-1 hover:bg-[#606063] md:p-1 lg:p-2 3xl:p-3"
          disabled={!canZoomOut}
        >
          <ZoomOut className="size-5 md:size-4 lg:size-5 2xl:size-6" />
        </button>
        <span className="flex flex-1 cursor-default select-none items-center justify-center rounded-lg bg-[#4a4a4f] p-1 text-[#f9f9fa] md:p-1 lg:p-2 3xl:p-3">{`${Math.floor(
          zoom * 100,
        )}%`}</span>
        <button
          type="button"
          onClick={() => {
            if (canZoomIn) setZoom(zoom + 0.1);
          }}
          className="rounded-lg p-1 hover:bg-[#606063] md:p-1 lg:p-2 3xl:p-3"
          disabled={!canZoomIn}
        >
          <ZoomIn className="size-5 md:size-4 lg:size-5 2xl:size-6" />
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
