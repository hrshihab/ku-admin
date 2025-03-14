'use client';

import { useGetAllCareersQuery, useDeleteCareerMutation } from '@/redux/api/careerApi';
import { format } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { ICareer } from '@/types/career';
import { toast } from 'sonner';

export default function CareerPage() {
  const { data: careers, isLoading } = useGetAllCareersQuery();
  const [deleteCareer] = useDeleteCareerMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<ICareer | null>(null);

  const handleDeleteClick = (career: ICareer) => {
    setCareerToDelete(career);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!careerToDelete) return;

    try {
      await deleteCareer(careerToDelete.id).unwrap();
      toast.success('Career deleted successfully');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('Failed to delete career');
      console.error('Failed to delete career:', error);
    }
  };

  // ... existing loading state ...

  return (
    <div className="p-6">
      {/* ... existing header and table structure ... */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... existing thead ... */}
          <tbody className="bg-white divide-y divide-gray-200">
            {careers?.map((career) => (
              <tr key={career.id} className="hover:bg-gray-50">
                {/* ... other table cells ... */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link
                      href={`/dashboard/career/edit/${career.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(career)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <PHModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Confirm Delete
          </h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete "{careerToDelete?.title}"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </PHModal>
    </div>
  );
} 