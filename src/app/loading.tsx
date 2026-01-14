export default function Loading() {
  return (
    <div className="mx-auto flex container flex-1 flex-col justify-center py-10">
      <div className="space-y-4">
        <div className="h-6 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex h-64 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="h-40 w-full animate-pulse bg-zinc-100 dark:bg-zinc-800" />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mt-auto flex items-center justify-between">
                <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-3 w-10 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

