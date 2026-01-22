export default function StudentDashboardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      {/* Header skeleton */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-200 rounded-lg" />
              <div className="hidden sm:block">
                <div className="h-4 w-24 bg-slate-200 rounded mb-1" />
                <div className="h-3 w-16 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 px-3 py-2.5 rounded-full w-20 h-8" />
              <div className="w-9 h-9 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Banner skeleton */}
        <div className="bg-slate-200 rounded-2xl p-6 mb-6 h-32" />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Courses skeleton */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <div className="h-5 w-32 bg-slate-200 rounded" />
              </div>
              <div className="divide-y divide-slate-100">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 w-48 bg-slate-200 rounded mb-2" />
                        <div className="h-3 w-32 bg-slate-100 rounded mb-3" />
                        <div className="h-2 bg-slate-100 rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours Summary skeleton */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg" />
                    <div>
                      <div className="h-3 w-16 bg-slate-100 rounded mb-1" />
                      <div className="h-5 w-12 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="h-5 w-24 bg-slate-200 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="h-3 w-12 bg-slate-100 rounded mb-1" />
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
