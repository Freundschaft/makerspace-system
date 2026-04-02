import { Skeleton } from "@/components/ui/skeleton";

interface ListPageSkeletonProps {
  showSearch?: boolean;
  chipCount?: number;
  rowCount?: number;
}

export function ListPageSkeleton({
  showSearch = true,
  chipCount = 3,
  rowCount = 6,
}: ListPageSkeletonProps) {
  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <div className="mb-6 flex flex-col gap-3">
        {showSearch ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-10 w-full sm:max-w-sm" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20 rounded-md" />
              <Skeleton className="h-10 w-20 rounded-md" />
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: chipCount }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-24 rounded-md" />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border bg-card/70 shadow-sm">
        <div className="hidden border-b px-4 py-3 lg:block">
          <div className="grid grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-24" />
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          {Array.from({ length: rowCount }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 border-b px-4 py-4 last:border-b-0"
            >
              {Array.from({ length: 5 }).map((__, cellIndex) => (
                <Skeleton
                  key={cellIndex}
                  className={cellIndex === 0 ? "h-4 w-28" : "h-4 w-20"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[1.75rem] border border-border/80 bg-card/90 p-5 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <Skeleton className="h-6 w-28 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
