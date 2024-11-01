import { useState, useRef, useEffect } from 'react';
import { X, Image, Video, Smile } from 'lucide-react';
import type { Post } from '../../types';

interface EditPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPost: Post) => void;
}

export default function EditPostModal({ post, isOpen, onClose, onSave }: EditPostModalProps) {
  const [content, setContent] = useState(post.content);
  const [media, setMedia] = useState(post.media || []);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(post.content);
      setMedia(post.media || []);
    }
  }, [isOpen, post]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically:
      // 1. Upload any new media files
      // 2. Update post in database
      // 3. Update feed

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedPost: Post = {
        ...post,
        content,
        media,
        editedAt: new Date().toISOString()
      };

      onSave(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMedia = files.map(file => ({
      type: file.type.startsWith('image/') ? 'image' as const : 'video' as const,
      url: URL.createObjectURL(file)
    }));
    setMedia([...media, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-800 rounded-xl max-w-lg w-full">
        <div className="p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Post
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
              {media.map((item, index) => (
                <div key={index} className="relative">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt="Media content"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}