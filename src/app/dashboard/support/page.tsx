'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useGetAllSupportsQuery } from '@/redux/api/supportApi';

type SupportStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
type SupportCategory = 'IT' | 'ELECTRICAL' | 'PLUMBING' | 'CARPENTRY' | 'CLEANING' | 'SECURITY' | 'OTHER';

interface Support {
  id: string;
  name: string;
  designation: string;
  instituteOffice: string;
  email: string;
  buildingName?: string;
  roomNumber?: string;
  mobileNumber?: string;
  problemDescription: string;
  attachmentUrl?: string;
  status: SupportStatus;
  category: SupportCategory;
  createdAt: string;
  updatedAt: string;
}

// Mock data based on your console output
const mockSupports = [
  {
    id: '1090bfd2-541a-43cf-9218-6b86c163bf14',
    name: 'Smith',
    designation: 'Associate Professor',
    instituteOffice: 'Department of Computer Science',
    email: 'john.smith@ku.ac.bd',
    status: 'PENDING',
    category: 'IT',
    createdAt: new Date().toISOString(),
  },
  {
    id: '7296c3eb-26ea-4e85-ad74-ee5fd78cd60e',
    name: 'Dr. John Smith',
    designation: 'Associate Professor',
    instituteOffice: 'Department of Computer Science',
    email: 'john.smith@ku.ac.bd',
    status: 'PENDING',
    category: 'ELECTRICAL',
    createdAt: new Date().toISOString(),
  },
  {
    id: '93799991e-2efc-4b12-b6bf-26ece4e45a66',
    name: 'Dr. John Smith',
    designation: 'Associate Professor',
    instituteOffice: 'Department of Computer Science',
    email: 'john.smith@ku.ac.bd',
    status: 'PENDING',
    category: 'IT',
    createdAt: new Date().toISOString(),
  }
];

export default function SupportDashboard() {
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<Support | null>(null);

  const { data, isLoading } = useGetAllSupportsQuery({
    page: currentPage,
    limit: itemsPerPage,
    sortBy,
    sortOrder,
    status: selectedStatus,
    category: selectedCategory,
  });

  console.log("data",data)

  const supports = data || [];
  const totalItems = data?.meta?.total || 0;

  const handlePreview = (support: Support) => {
    setSelectedSupport(support);
    setIsPreviewModalOpen(true);
  };

  const getStatusColor = (status: SupportStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Support Tickets</h3>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select 
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="IT">IT</option>
            <option value="ELECTRICAL">Electrical</option>
            <option value="PLUMBING">Plumbing</option>
            <option value="CARPENTRY">Carpentry</option>
            <option value="CLEANING">Cleaning</option>
            <option value="SECURITY">Security</option>
            <option value="OTHER">Other</option>
          </select>

          {/* Status Filter */}
          <select 
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute/Office</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supports.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  No support tickets found
                </td>
              </tr>
            ) : (
              supports.map((support) => (
                <tr key={support.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {support.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {support.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {support.instituteOffice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p>{support.email}</p>
                      <p>{support.mobileNumber || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p>{support.buildingName || 'N/A'}</p>
                      <p>Room: {support.roomNumber || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {support.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(support.status)}`}>
                      {support.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(support.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handlePreview(support)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {supports.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage * itemsPerPage >= totalItems}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewModalOpen && selectedSupport && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-3xl mx-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Support Ticket Details</h3>
              <button 
                onClick={() => {
                  setIsPreviewModalOpen(false);
                  setSelectedSupport(null);
                }}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                    <p className="text-gray-900">{selectedSupport.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Designation</h4>
                    <p className="text-gray-900">{selectedSupport.designation}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Institute/Office</h4>
                    <p className="text-gray-900">{selectedSupport.instituteOffice}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                    <p className="text-gray-900">{selectedSupport.email}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Mobile Number</h4>
                    <p className="text-gray-900">{selectedSupport.mobileNumber || 'N/A'}</p>
                  </div>
                </div>

                {/* Location and Status */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Building Name</h4>
                    <p className="text-gray-900">{selectedSupport.buildingName || 'N/A'}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Room Number</h4>
                    <p className="text-gray-900">{selectedSupport.roomNumber || 'N/A'}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Category</h4>
                    <p className="text-gray-900">{selectedSupport.category}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedSupport.status)}`}>
                      {selectedSupport.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Created At</h4>
                    <p className="text-gray-900">
                      {format(new Date(selectedSupport.createdAt), 'PPpp')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem Description - Full Width */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Problem Description</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedSupport.problemDescription}</p>
                </div>
              </div>

              {/* Attachment - Full Width */}
              {selectedSupport.attachmentUrl && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Attachment</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <a 
                      href={selectedSupport.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Attachment
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => {
                  setIsPreviewModalOpen(false);
                  setSelectedSupport(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 