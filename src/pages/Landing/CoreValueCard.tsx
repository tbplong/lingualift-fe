const CoreValueCard = ({
  className,
  title,
  content,
  img,
  comp,
}: {
  className: string;
  title: string;
  content: string;
  img?: string;
  comp?: React.ReactNode;
}) => {
  return (
    <div
      className={
        `card rounded-2xl bg-white w-120 h-160 shadow-lg text-tertiary border-2 ` +
        className
      }
    >
      <figure className="h-4/5 w-full p-4 rounded-2xl">
        {(img && <img className="h-full rounded-xl" src={img} />) || comp}
      </figure>
      <div className="card-body p-4 pt-2 gap-0">
        <h2 className="card-title text-2xl ">{title}</h2>
        <p className="text-lg leading-6">{content}</p>
      </div>
    </div>
  );
};

export default CoreValueCard;
