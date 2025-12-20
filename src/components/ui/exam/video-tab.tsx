type VideoTabProps = {
  link: string;
};

const VideoTab = ({ link }: VideoTabProps) => {
  return (
    <div className="h-[50vh] w-full md:h-[80vh]">
      <iframe
        className="size-full"
        src={link}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoTab;
