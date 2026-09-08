import { useGetreviews } from "@/API/reviews";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
interface Props {
  id: number;
  name: string;
  storeName: string;
}
export default function ReadView({ id, name, storeName }: Props) {
  const search = id + name + storeName;
  const { data: myReviews, isLoading } = useGetreviews(search);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!myReviews?.data.length) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-border">
        <p className="text-muted-foreground">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {myReviews.data.map((item) => (
        <div className="rounded-2xl border border-border p-4" key={item.id}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {item.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold">{item.name}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(item.createdAt!).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 text-base font-semibold">
              <Star size={20} className="fill-yellow-500 text-yellow-500" />
              <span>{item.rating}</span>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {item.textreview}
          </p>
        </div>
      ))}
    </div>
  );
}
