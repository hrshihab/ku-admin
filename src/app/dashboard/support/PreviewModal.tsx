import { format } from 'date-fns';
import { Support } from './page';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  support: Support; // Changed from Support | null to any to fix the error
}

// Define the function to return CSS classes based on status
const getStatusColor = (status: string): string => {
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

const PreviewModal = ({ isOpen, onClose, support }: PreviewModalProps) => {
  if (!isOpen || !support) return null;

  return (
    <div className="fixed inset-0 bg-gray-700/75 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Support Ticket Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-sm text-gray-500">Name</label>
              <div className="mt-1 text-gray-900">{support.name}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Building Name</label>
              <div className="mt-1 text-gray-900">{support.buildingName || 'N/A'}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Designation</label>
              <div className="mt-1 text-gray-900">{support.designation}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Room Number</label>
              <div className="mt-1 text-gray-900">{support.roomNumber || 'N/A'}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Institute/Office</label>
              <div className="mt-1 text-gray-900">{support.instituteOffice}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Category</label>
              <div className="mt-1 text-gray-900">{support.category}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Email</label>
              <div className="mt-1 text-gray-900">{support.email}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Status</label>
              <div className="mt-1">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(support.status)}`}>
                  {support.status}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Mobile Number</label>
              <div className="mt-1 text-gray-900">{support.mobileNumber || 'N/A'}</div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Created At</label>
              <div className="mt-1 text-gray-900">
                {format(new Date(support.createdAt), "MMM dd, yyyy, h:mm:ss a")}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">Problem Description</label>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 whitespace-pre-wrap">{support.problemDescription}</p>
            </div>
          </div>

          {support.attachmentUrl && (
            <div>
              <label className="block text-sm text-gray-500 mb-2">Attachment</label>
              <a 
                href={support.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                View Attachment
              </a>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal; 