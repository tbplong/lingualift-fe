const CoreValueCard = ({
  color,
  title,
  content,
  img,
  comp,
}: {
  color: string;
  title: string;
  content: string;
  img?: string;
  comp?: React.ReactNode;
}) => {
  return (
    <div
      className={
        `card grow-0 shrink-0 xl:basis-85 lg:basis-60 basis-full aspect-[476.8/636.8] snap-center rounded-2xl bg-white shadow-lg text-tertiary border-2 border-` +
        color
      }
    >
      <figure
        className={
          `h-4/5 w-auto m-4 border-none border-white rounded-2xl bg-` + color
        }
      >
        {(img && <img className="h-full rounded-xl" src={img} />) || comp}
      </figure>
      <div className="card-body p-4 pt-2 gap-0">
        <h2 className="card-title lg:text-2xl md:text-base">{title}</h2>
        <p className="2xl:text-lg lg:text-base md:text-2xs leading-6">
          {content}
        </p>
      </div>
    </div>
  );
};

export default CoreValueCard;
