import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-24 h-5 hidden sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-xl hidden md:block" />
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-10 h-10 rounded-xl md:hidden" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center space-y-6">
            <Skeleton className="w-24 h-6 rounded-full mx-auto" />
            <Skeleton className="w-3/4 h-14 mx-auto" />
            <Skeleton className="w-1/2 h-14 mx-auto" />
            <Skeleton className="w-96 h-6 mx-auto max-w-full" />
            <div className="flex items-center justify-center gap-4 pt-4">
              <Skeleton className="w-40 h-14 rounded-xl" />
              <Skeleton className="w-40 h-14 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-4 mb-16">
          <Skeleton className="w-48 h-6 rounded-full mx-auto" />
          <Skeleton className="w-96 h-10 mx-auto" />
          <Skeleton className="w-64 h-5 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-border-light space-y-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="w-3/4 h-6" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          ))}
        </div>
      </section>

      {/* Bike Type Selector Skeleton */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center space-y-4 mb-10">
          <Skeleton className="w-48 h-8 mx-auto" />
          <Skeleton className="w-72 h-5 mx-auto" />
        </div>
        <div className="flex justify-center gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-40 h-20 rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
