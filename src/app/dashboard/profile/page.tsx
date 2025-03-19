'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGetSingleUserQuery } from '@/redux/api/userApi'; // Import the mutation hook
import { useRouter } from 'next/navigation'; // Add this import
import { useUpdateMYProfileMutation } from '@/redux/api/myProfile';

export default function UserPage() {
  const { data: user, error, isLoading } = useGetSingleUserQuery(undefined);
  const [updateMYProfile, { isLoading: isUpdating, isSuccess, isError }] = useUpdateMYProfileMutation(); // Use the mutation hook
  const router = useRouter(); // Add this

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMYProfile(formData).unwrap(); // Call the mutation
      setIsEditing(false);
      // Optionally, show a success message
      console.log('Profile updated successfully');
    } catch (error) {
      // Handle error
      console.error('Failed to update profile', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleChangePassword = () => {
    router.push('/dashboard/change-password');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#10b981] hover:bg-[#0ea271] text-white px-4 py-1.5 rounded-md text-sm font-medium"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                <Image
                  src={formData?.profilePhoto || '/images/avatar-placeholder.png'}
                  alt={user?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.role.replace('_', ' ')}</p>
                <span className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                  user?.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800' 
                    : user?.status === 'BLOCKED' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user?.status}
                </span>
              </div>
            </div>

            {/* User Information */}
            <div className="flex-1">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData?.name || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData?.email || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData?.contactNumber || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Photo URL</label>
                    <input
                      type="text"
                      name="profilePhoto"
                      value={formData?.profilePhoto || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <button
                      type="submit"
                      className="bg-[#10b981] hover:bg-[#0ea271] text-white px-4 py-1.5 rounded-md text-sm font-medium"
                      disabled={isUpdating} // Disable button while updating
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(user);
                        setIsEditing(false);
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded-md text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Contact Number</p>
                        <p className="mt-1 text-sm text-gray-900">{user?.contactNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Member Since</p>
                        <p className="mt-1 text-sm text-gray-900">{formatDate(user?.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
                    <div className="mt-4">
                      <button
                        onClick={handleChangePassword}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              {/* Activity items */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Added a new news article</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Updated profile information</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-2">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Logged in from a new device</p>
                  <p className="text-sm text-gray-500">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 