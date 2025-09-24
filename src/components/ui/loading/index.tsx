import Lottie from "lottie-react";
import LoadingAnimation from "../../../assets/animations/loading.json";

type LoadingProps = {
  className?: string;
  loop: boolean;
};

const Loading = ({ className, loop }: LoadingProps) => {
  return (
    <Lottie
      className={className}
      animationData={LoadingAnimation}
      loop={loop}
    />
  );
};

export default Loading;
