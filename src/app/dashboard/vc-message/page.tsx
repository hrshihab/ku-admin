'use client';

import { useState } from 'react';
import { useGetVCMessageQuery, useDeleteVCMessageMutation } from '@/redux/api/vcMessageApi';
import DeleteModal from './DeleteModal';
import AddVCMessageModal from './AddVCMessageModal';
import { format } from 'date-fns';
import ImagePreviewModal from './ImagePreviewModal';
import EditVCMessageModal from './EditVCMessageModal';

interface VCMessage {
  id: string;
  imageUrl: string;
  message: string;
  updatedAt: string;
}

export default function VcMessagePage() {
  const { data: vcMessages = [], isLoading } = useGetVCMessageQuery(undefined);
  const [deleteVCMessage] = useDeleteVCMessageMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<VCMessage | null>(null);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const handleDelete = async () => {
    try {
      if (selectedMessage?.id) {
        console.log("selectedMessage", selectedMessage);
        await deleteVCMessage(selectedMessage.id).unwrap();
        setIsDeleteModalOpen(false);
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Failed to delete VC message:', error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString.replace(' ', 'T')), 'PPp');
    } catch {
      return 'Invalid date';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">VC Messages</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add VC Message
        </button>
      </div>

      <div className="overflow-hidden rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
           
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vcMessages.length > 0 ? (
              vcMessages.map((message: VCMessage) => (
                <tr key={message.id}>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      {message.message}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {message.imageUrl === "no" ? (
                        <span className="text-gray-500">No image</span>
                      ) : (
                        <div className="text-sm text-gray-600">
                          <a 
                            href={message.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 break-all"
                          >
                            {message.imageUrl}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(message.updatedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedMessage(message);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-[#10b981] hover:bg-[#0ea271] text-white px-4 py-1.5 rounded-md text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMessage(message);
                          setIsDeleteModalOpen(true);
                        }}
                        className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-1.5 rounded-md text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No VC messages available. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMessage(null);
        }}
        onDelete={handleDelete}
        title="Delete VC Message"
      />

      <AddVCMessageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {selectedMessage && (
        <EditVCMessageModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedMessage(null);
          }}
          vcMessage={selectedMessage}
        />
      )}

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={isImagePreviewOpen}
        onClose={() => {
          setIsImagePreviewOpen(false);
          setPreviewImageUrl('');
        }}
        imageUrl={previewImageUrl}
      />
      </div>
    );
  } 