type HeadingProps = {
  className?: string;
  text?: string | React.ReactNode;
};

const Heading = ({ className, text }: HeadingProps) => {
  return (
    <span
      className={`text-xl font-bold lg:text-2xl xl:text-4xl 2xl:text-[2.5rem] ${className}`}
    >
      {text}
    </span>
  );
};

export default Heading;
