import { Star } from "@/components/icons";
import { cn } from "@/utils/cn";

type RatingProps = {
  rate: number;
  maxRate: number;
  className?: string;
};

const Rating = ({ rate, maxRate, className }: RatingProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {Array(maxRate)
        .fill(true)
        .map((_, index) => (
          <Star
            key={index}
            className={cn(
              "size-4 sm:size-6",
              index + 1 <= rate ? "fill-secondary" : "fill-tertiary-300",
            )}
          />
        ))}
    </div>
  );
};

export default Rating;
