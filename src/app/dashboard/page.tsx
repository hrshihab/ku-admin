'use client'
import { useGetAllSupportsQuery } from "@/redux/api/supportApi";

export default function DashboardPage() {
  const { data: supports, isLoading } = useGetAllSupportsQuery(undefined);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Supports</h3>
          <p className="text-2xl font-semibold mt-2">{supports?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Pending Requests</h3>
          <p className="text-2xl font-semibold mt-2 text-yellow-600">
            {supports?.filter((s: any) => s.status === 'PENDING').length || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Resolved</h3>
          <p className="text-2xl font-semibold mt-2 text-green-600">
            {supports?.filter((s: any) => s.status === 'RESOLVED').length || 0}
          </p>
        </div>
      </div>

      {/* Recent Support Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Support Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : supports?.slice(0, 5).map((support: any) => (
                <tr key={support.id}>
                  <td className="px-6 py-4 text-sm">{support.name}</td>
                  <td className="px-6 py-4 text-sm">
                    {support.problemDescription?.slice(0, 30)}
                    {support.problemDescription?.length > 30 ? '...' : ''}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      support.status === 'PENDING' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {support.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(support.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 