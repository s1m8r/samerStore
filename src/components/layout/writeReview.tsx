import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useAuthStore } from "@/stores/userStore";
import { usePostView } from "@/API/reviews";
import { useNavigate } from "@tanstack/react-router";
interface Props {
  id: number;
  name: string;
  storeName: string;
}

export default function WriteReview({ id, name, storeName }: Props) {
  const [rating, setRating] = useState(0);
  const user = useAuthStore.getState().user;
  const [hoverRating, setHoverRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [textRating, setTextRating] = useState("");
  const { mutate, isPending } = usePostView();
  const navigator = useNavigate();
  const send = () => {
    if (rating !== 0 && textRating !== "" && user) {
      const Name = user.firstName + " " + user.lastName;
      const ReviewId = id + name + storeName;
      mutate(
        {
          name: Name,
          reviewId: ReviewId,
          textreview: textRating,
          rating: rating,
          email: user.email,
        },
        {
          onSuccess: () => {
            setRating(0);
            setTextRating("");
            setIsOpen(false);
          },
        },
      );
    }
  };
  if (!user)
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Write a Review</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <h2 className="text-xl font-semibold">Please Login</h2>

            <p className="text-sm text-muted-foreground">
              You need to login before you can write a review.
            </p>

            <Button onClick={() => navigator({ to: "/login" })}>Login</Button>
          </div>
        </DialogContent>
      </Dialog>
    );

  if (user)
    return (
      <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Write a Review</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Write a Review</DialogTitle>
              <DialogDescription>
                Your feedback helps other customers make better decisions.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              {/* Rating */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {rating === 0
                    ? "How would you rate this product?"
                    : `${rating} out of 5`}
                </span>

                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starNumber = i + 1;

                    return (
                      <button
                        key={starNumber}
                        type="button"
                        onClick={() => setRating(starNumber)}
                        onMouseEnter={() => setHoverRating(starNumber)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer transition-transform duration-150 hover:scale-110"
                      >
                        <Star
                          size={32}
                          strokeWidth={1.8}
                          className={
                            starNumber <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/40"
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your review</label>

                <Textarea
                  placeholder="Tell us about your experience with this product..."
                  className="min-h-28 resize-none"
                  value={textRating}
                  onChange={(e) => setTextRating(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={send}
                disabled={rating === 0 || textRating === "" || isPending}
                className="w-full"
              >
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
}
