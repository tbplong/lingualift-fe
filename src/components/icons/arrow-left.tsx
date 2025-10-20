const ArrowLeft = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="-200 -960 960 960"
    width="24px"
    fill="#e8eaed"
    className={className}
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
  </svg>
);

export default ArrowLeft;
