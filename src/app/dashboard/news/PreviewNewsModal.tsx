'use client';

interface PreviewNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: any;
}

const PreviewNewsModal = ({ isOpen, onClose, news }: PreviewNewsModalProps) => {
  if (!isOpen || !news) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full mx-auto max-w-2xl my-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">News Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{news.title}</h3>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Image Preview:</h4>
            {news.imageUrl ? (
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden bg-white h-[300px] flex items-center justify-center">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
                <div className="text-sm text-gray-500 break-all">
                  URL: <a href={news.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{news.imageUrl}</a>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No image available
              </div>
            )}
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
            <div className="prose max-w-none max-h-[200px] overflow-y-auto">
              <p className="text-gray-600 whitespace-pre-wrap">{news.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewNewsModal; 