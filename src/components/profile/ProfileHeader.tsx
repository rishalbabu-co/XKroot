import { Camera } from 'lucide-react';
import { useState } from 'react';
import { auth } from '../../lib/firebase';
import { updateProfile } from 'firebase/auth';
import ImageUpload from './ImageUpload';

interface ProfileHeaderProps {
  photo: string;
  name: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export default function ProfileHeader({ photo, name, isEditing, onToggleEdit }: ProfileHeaderProps) {
  const [showUpload, setShowUpload] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (photoURL: string) => {
    try {
      if (!auth.currentUser) {
        throw new Error('User must be logged in to update profile');
      }

      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, { photoURL });
      
      // Close the upload modal
      setShowUpload(false);
      setError(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile photo. Please try again.');
    }
  };

  return (
    <>
      <div className="relative mt-8">
        <div className="h-48 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <h1 className="text-4xl font-bold text-white z-10 tracking-wide">Professional Profile</h1>
        </div>

        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <div className="relative group">
            <img
              src={photo}
              alt={name}
              className="w-32 h-32 rounded-xl border-4 border-white dark:border-dark-800 object-cover shadow-lg"
            />
            <button
              onClick={() => setShowUpload(true)}
              className="absolute bottom-2 right-2 p-2 rounded-full bg-white dark:bg-dark-700 shadow-md hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors group-hover:scale-110"
            >
              <Camera className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {error && (
            <div className="absolute -bottom-8 left-0 right-0 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        <div className="absolute -bottom-16 right-8">
          <button
            onClick={onToggleEdit}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <ImageUpload
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUpload={handleUpload}
        currentPhoto={photo}
      />
    </>
  );
}