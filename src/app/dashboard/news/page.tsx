'use client';

import { useState } from 'react';
import { useGetAllNewsQuery, useDeleteNewsMutation } from '@/redux/api/newsApi';
import AddNewsModal from './AddNewsModal';
import EditNewsModal from './EditNewsModal';
import PreviewNewsModal from './PreviewNewsModal';
import { format } from 'date-fns';
import DeleteNewsModal from './DeleteNewsModal';

const NewsPage = () => {
  const { data: newsList, isLoading } = useGetAllNewsQuery(undefined);
  const [deleteNews] = useDeleteNewsMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [error, setError] = useState('');

  const handleEdit = (news: any) => {
    setSelectedNews(news);
    setIsEditModalOpen(true);
  };

  const handlePreview = (news: any) => {
    setSelectedNews(news);
    setIsPreviewModalOpen(true);
  };

  const handleDeleteClick = (news: any) => {
    setSelectedNews(news);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteNews(selectedNews.id).unwrap();
      setIsDeleteModalOpen(false);
      setSelectedNews(null);
    } catch (err: any) {
      console.error('Error deleting news:', err);
      setError(err?.data?.message || 'Failed to delete news');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">News Management</h1>
        <div className="flex space-x-4">
          <select className="px-3 py-2 border rounded-md">
            <option value="">Filter by</option>
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
          <select className="px-3 py-2 border rounded-md">
            <option value="">Sort by</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
          </select>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add News
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {newsList?.map((news: any) => (
              <tr key={news.id}>
                <td className="px-6 py-4 whitespace-nowrap">{news.title}</td>
                <td className="px-6 py-4">
                  {news.description.length > 50
                    ? `${news.description.substring(0, 50)}...`
                    : news.description}
                </td>
                <td className="px-6 py-4">
                  {news.imageUrl ? (
                    <a href={news.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Image
                    </a>
                  ) : (
                    'No image'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{format(new Date(news.createdAt), 'MM/dd/yyyy')}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handlePreview(news)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleEdit(news)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(news)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2">Previous</button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Next</button>
      </div>

      <AddNewsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditNewsModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedNews(null);
        }}
        news={selectedNews}
      />

      <PreviewNewsModal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setSelectedNews(null);
        }}
        news={selectedNews}
      />

      <DeleteNewsModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedNews(null);
        }}
        onConfirm={handleDelete}
        news={selectedNews}
      />
    </div>
  );
};

export default NewsPage; 