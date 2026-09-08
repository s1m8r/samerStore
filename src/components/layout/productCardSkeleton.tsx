import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="mt-2.5 flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-8 shrink-0" />
        </div>
        <Skeleton className="mt-auto h-5 w-1/3" />
      </div>
    </div>
  );
}
