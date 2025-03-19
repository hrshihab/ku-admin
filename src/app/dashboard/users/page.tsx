'use client'
import { useState } from "react";
import Image from "next/image";
import { useGetAllUsersQuery, useSoftDeleteUserMutation } from "@/redux/api/adminApi";
import CreateAdminModal from "./CreateAdminModal";

interface User {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

// Add new interface for delete confirmation
interface DeleteConfirmation {
  isOpen: boolean;
  userId: string | null;
}

// Add at the top with other interfaces
type FilterStatus = 'all' | 'active' | 'blocked';
type SortOrder = 'asc' | 'desc';

export default function UsersPage() {
  const { data, isLoading, isError } = useGetAllUsersQuery(undefined, {
    skip: false,
  });
  const [softDeleteUser] = useSoftDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Add state for delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>({
    isOpen: false,
    userId: null
  });

  // Add inside your component, after the existing state declarations
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('active');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Handle delete confirmation
  const handleDeleteClick = (userId: string) => {
    setDeleteConfirmation({
      isOpen: true,
      userId
    });
  };

  // Handle delete action
  const handleDelete = async () => {
    if (deleteConfirmation.userId) {
      try {
        await softDeleteUser({ id: deleteConfirmation.userId }).unwrap();
        // Close the confirmation popup
        setDeleteConfirmation({
          isOpen: false,
          userId: null
        });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6">Error loading users</div>;
  }

  const users = data || [];

  // Modified filtering and sorting function
  const filteredAndSortedUsers = users.length ? [...users]
    .filter(user => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'active') return !user.isDeleted;
      return user.isDeleted; // for blocked
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }) : [];

  const getStatusColor = (isDeleted: boolean) => {
    return isDeleted 
      ? 'bg-red-100 text-red-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Users List</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Admin
        </button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="filter" className="text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              id="filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="all">All Users</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by Date:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Count summary with active highlighted */}
        <div className="text-sm space-x-2">
          <span className={`px-2 py-1 rounded ${filterStatus === 'active' ? 'bg-green-100 text-green-800' : 'text-gray-600'}`}>
            Active: {users.filter((user: User) => !user.isDeleted).length}
          </span>
          <span className={`px-2 py-1 rounded ${filterStatus === 'blocked' ? 'bg-red-100 text-red-800' : 'text-gray-600'}`}>
            Blocked: {users.filter((user: User) => user.isDeleted).length}
          </span>
          <span className={`px-2 py-1 rounded ${filterStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}>
            Total: {users.length}
          </span>
        </div>
      </div>

      {/* Table with filtered results */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(filteredAndSortedUsers) && filteredAndSortedUsers.length > 0 ? (
              filteredAndSortedUsers.map((user: User) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.profilePhoto ? (
                      <Image
                        src={user.profilePhoto}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.contactNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.isDeleted)}`}>
                      {user.isDeleted ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleDeleteClick(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No {filterStatus === 'all' ? '' : filterStatus} users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data?.meta && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {data.meta.page} to {Math.min(data.meta.page * data.meta.limit, data.meta.total)} of {data.meta.total} entries
          </div>
          <div className="flex gap-2">
            <button
              disabled={data.meta.page === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={data.meta.page * data.meta.limit >= data.meta.total}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmation({ isOpen: false, userId: null })}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <CreateAdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 