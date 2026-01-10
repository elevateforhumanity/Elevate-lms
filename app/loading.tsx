export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton - white background for instant load */}
      <div className="relative h-screen bg-white flex items-center justify-center">
        <div className="text-center text-gray-900 px-4 max-w-4xl mx-auto animate-pulse">
          <div className="h-16 bg-gray-200 rounded-lg mb-4 mx-auto max-w-2xl"></div>
          <div className="h-8 bg-gray-200 rounded-lg mb-8 mx-auto max-w-xl"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-32 bg-orange-500/30 rounded-lg"></div>
            <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Features skeleton */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg mb-4 mx-auto max-w-md"></div>
            <div className="h-6 bg-gray-200 rounded-lg mx-auto max-w-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
