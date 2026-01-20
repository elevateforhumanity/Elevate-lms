import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attendance | Staff Portal',
  description: 'Manage and track student attendance records.',
  robots: { index: false, follow: false },
};

export default function StaffPortalAttendancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Attendance Management</h1>
      
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Take Attendance
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
          Export Report
        </button>
        <select className="border rounded-lg px-4 py-2">
          <option>All Classes</option>
          <option>ENG 101 - Section A</option>
          <option>MATH 202 - Section B</option>
          <option>CHEM 201 - Lab</option>
        </select>
        <input type="date" className="border rounded-lg px-4 py-2" defaultValue="2024-10-21" />
      </div>

      {/* Today's Classes */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Today&apos;s Classes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">ENG 101 - Section A</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Completed</span>
            </div>
            <p className="text-sm text-gray-600">9:00 AM - 9:50 AM</p>
            <p className="text-sm text-gray-600">Present: 28/30 | Absent: 2</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">MATH 202 - Section B</h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">In Progress</span>
            </div>
            <p className="text-sm text-gray-600">11:00 AM - 11:50 AM</p>
            <p className="text-sm text-gray-600">Taking attendance...</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">CHEM 201 - Lab</h3>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Upcoming</span>
            </div>
            <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
            <p className="text-sm text-gray-600">Enrolled: 24 students</p>
          </div>
        </div>
      </section>

      {/* Attendance Records */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Attendance Records - ENG 101</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Student</th>
                <th className="text-left py-2">ID</th>
                <th className="text-center py-2">Oct 21</th>
                <th className="text-center py-2">Oct 18</th>
                <th className="text-center py-2">Oct 16</th>
                <th className="text-center py-2">Oct 14</th>
                <th className="text-left py-2">Attendance Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3">Alice Johnson</td>
                <td className="py-3 text-gray-600">STU001</td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3"><span className="text-green-600 font-medium">100%</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Bob Smith</td>
                <td className="py-3 text-gray-600">STU002</td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-red-600">✗</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3"><span className="text-yellow-600 font-medium">92%</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3">Carol Davis</td>
                <td className="py-3 text-gray-600">STU003</td>
                <td className="py-3 text-center"><span className="text-red-600">✗</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-yellow-600">L</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3"><span className="text-yellow-600 font-medium">85%</span></td>
              </tr>
              <tr className="border-b">
                <td className="py-3">David Wilson</td>
                <td className="py-3 text-gray-600">STU004</td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-green-600">✓</span></td>
                <td className="py-3 text-center"><span className="text-red-600">✗</span></td>
                <td className="py-3"><span className="text-yellow-600 font-medium">88%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
          <span><span className="text-green-600">✓</span> Present</span>
          <span><span className="text-red-600">✗</span> Absent</span>
          <span><span className="text-yellow-600">L</span> Late</span>
          <span><span className="text-blue-600">E</span> Excused</span>
        </div>
      </section>
    </div>
  );
}
