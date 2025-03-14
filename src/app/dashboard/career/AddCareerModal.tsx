'use client';

import { useState } from 'react';
import { useCreateCareerMutation } from '@/redux/api/careerApi';

interface AddCareerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCareerModal = ({ isOpen, onClose }: AddCareerModalProps) => {
  const [createCareer] = useCreateCareerMutation();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    documentsUrl: '',
  });
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation to ensure all fields are filled out
    if (!formData.title || !formData.date || !formData.documentsUrl) {
      setError('All fields are required');
      return;
    }

    try {
        const data = {
            title: formData.title,
            date: new Date(formData.date).toISOString(),
            documentsUrl: formData.documentsUrl
        }
      console.log("data",data);    
     const response = await createCareer(data).unwrap();
      console.log(response)
        
      

      // Clear form after successful submission
      onClose();
      setFormData({ title: '', date: '', documentsUrl: '' });
    } catch (err: any) {
      // Set error message from the response
      setError(err?.data?.message || 'Failed to create career');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Add New Career</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="documentsUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Documents URL
            </label>
            <input
              type="url"
              id="documentsUrl"
              value={formData.documentsUrl}
              onChange={(e) => setFormData({ ...formData, documentsUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/document.pdf"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Career
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCareerModal;
