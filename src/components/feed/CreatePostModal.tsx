import { useState, useRef } from 'react';
import { X, Image, Video, Smile, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Post } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Post) => void;
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically:
      // 1. Upload media files to storage
      // 2. Create post in database
      // 3. Update feed

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPost: Post = {
        id: Date.now().toString(),
        userId: currentUser?.uid || '',
        userPhoto: currentUser?.photoURL || 'https://via.placeholder.com/40',
        userName: currentUser?.displayName || 'Anonymous',
        content,
        media: media.map(file => ({
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: URL.createObjectURL(file)
        })),
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now'
      };

      onSubmit(newPost);
      setContent('');
      setMedia([]);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMedia(prev => [...prev, ...files]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-800 rounded-xl max-w-lg w-full">
        <div className="p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create Post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-dark-700 resize-none"
              required
            />
          </div>

          {media.length > 0 && (
            <div className="mb-4 grid grid-cols-2 gap-2">
              {media.map((file, index) => (
                <div key={index} className="relative">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Upload preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setMedia(media.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-lg"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Image className="h-5 w-5" />
                <span>Photo</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Video className="h-5 w-5" />
                <span>Video</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Smile className="h-5 w-5" />
                <span>GIF</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}