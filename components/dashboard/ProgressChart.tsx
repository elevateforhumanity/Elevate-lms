'use client';

export function ProgressChart() {
  const courses = [
    { name: 'Barber', progress: 100, color: 'bg-green-500' },
    { name: 'CNA', progress: 65, color: 'bg-blue-500' },
    { name: 'HVAC', progress: 23, color: 'bg-orange-500' },
  ];

  return (
    <div className="elevate-card">
      <div className="elevate-card-header">
        <h3 className="elevate-card-title">Course Progress</h3>
      </div>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{course.name}</span>
              <span className="text-sm font-bold text-gray-900">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${course.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-600">Active Courses</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">63%</div>
            <div className="text-xs text-gray-600">Avg Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}
