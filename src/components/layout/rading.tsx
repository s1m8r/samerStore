import { Star, StarHalfIcon } from "lucide-react";

interface Props {
  rating: number;
  type: "main" | "product";
}

export default function Rating({ rating, type }: Props) {
  const size = type === "main" ? 18 : 26;
  return (
    <>
      <div className="gap-2 flex">
        <div className=" flex items-center gap-x-1.5">
          {Array.from({ length: Math.floor(rating) }).map((_, i) => (
            <span key={i}>
              <Star size={size} className="fill-yellow-500 text-yellow-500" />
            </span>
          ))}

          {rating % 1 !== 0 && (
            <StarHalfIcon
              size={size}
              className="fill-yellow-500 text-yellow-500"
            />
          )}
        </div>
        <div>
          <span className="text-xl font-bold">{rating}</span>
          <span className="text-base text-muted-foreground">/5</span>
        </div>
      </div>
    </>
  );
}
