import NotFoundIcon from "@/components/icons/not-found";
import PdfViewer from "@/components/pdf-viewer";
import Loading from "@/components/ui/loading";
import CdnService from "@/services/cdn/cdn.service";
import { useEffect, useState } from "react";

type PdfTabProps = {
  bucket: string;
  _key: string;
  title?: string;
};

const PdfTab = ({ bucket, _key: key, title }: PdfTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState<Blob>();

  useEffect(() => {
    const fetchPdf = async () => {
      setIsLoading(true);
      try {
        const { data } = await CdnService.getContent(bucket, key);
        setPdf(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPdf();
  }, [bucket, key, title]);

  if (isLoading) return <Loading loop />;

  if (!pdf) {
    return (
      <div className="relative flex size-full flex-col items-center justify-center gap-4 font-medium">
        <NotFoundIcon className="size-20 fill-black" />
        <p>Error during fetching the file, please try again later</p>
      </div>
    );
  }

  return <PdfViewer file={pdf} />;
};

export default PdfTab;
