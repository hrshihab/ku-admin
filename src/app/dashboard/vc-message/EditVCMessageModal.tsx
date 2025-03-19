'use client';

import { useState, useEffect } from 'react';
import { useUpdateVCMessageMutation } from '@/redux/api/vcMessageApi';

interface EditVCMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  vcMessage: {
    id: string;
    message: string;
    imageUrl: string;
  } | null;
}

const EditVCMessageModal = ({ isOpen, onClose, vcMessage }: EditVCMessageModalProps) => {
  const [updateVCMessage] = useUpdateVCMessageMutation();
  const [formData, setFormData] = useState({
    message: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');

  // Set initial form data when vcMessage changes
  useEffect(() => {
    if (vcMessage) {
      setFormData({
        message: vcMessage.message || '',
        imageUrl: vcMessage.imageUrl || '',
      });
    }
  }, [vcMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.message.trim()) {
      setError('Message is required');
      return;
    }

    try {
   

     

      const response = await updateVCMessage({
        id: vcMessage?.id as string,
        message: formData.message.trim(),
        imageUrl: formData.imageUrl.trim() 
      }).unwrap();
      
      //console.log('Response:', response);
      onClose();
      setFormData({ message: '', imageUrl: '' });
    } catch (err: any) {
      console.error('Full error:', err);
      setError(err?.data?.message || 'Failed to update VC message');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Edit VC Message</h2>
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
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message here..."
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
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
              Update Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVCMessageModal; 