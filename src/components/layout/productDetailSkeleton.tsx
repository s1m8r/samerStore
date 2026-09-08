import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="px-4 md:px-12">
      <Skeleton className="mb-4 h-7 w-48" />
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <div className="flex gap-2 md:w-20 md:flex-col">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 shrink-0 rounded-xl" />
            ))}
          </div>
          <Skeleton className="aspect-square w-full max-w-sm rounded-2xl md:w-96" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-3 border-b border-border pb-4">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full max-w-96" />
            <Skeleton className="h-4 w-3/4 max-w-96" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-9 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
