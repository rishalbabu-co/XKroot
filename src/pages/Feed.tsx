import { useState } from 'react';
import { Image, Video, Smile, Send, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FeedPost from '../components/feed/FeedPost';
import CreatePostModal from '../components/feed/CreatePostModal';

interface Post {
  id: string;
  userId: string;
  userPhoto: string;
  userName: string;
  content: string;
  media?: {
    type: 'image' | 'video' | 'gif';
    url: string;
  }[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked?: boolean;
}

// Sample data - replace with real data from your backend
const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    userName: 'John Doe',
    content: 'Excited to announce that we are hiring! Check out our latest job openings.',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
      }
    ],
    likes: 42,
    comments: 12,
    shares: 5,
    timestamp: '2h ago'
  },
  {
    id: '2',
    userId: 'user2',
    userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    userName: 'Sarah Wilson',
    content: 'Just completed an amazing project with my team! #coding #webdev',
    likes: 28,
    comments: 8,
    shares: 3,
    timestamp: '4h ago'
  }
];

export default function Feed() {
  const { currentUser } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Create Post Card */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser?.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex-1 bg-gray-100 dark:bg-dark-700 rounded-full px-4 py-2 text-left text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
            >
              What's on your mind?
            </button>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Image className="h-5 w-5" />
              <span>Photo</span>
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Video className="h-5 w-5" />
              <span>Video</span>
            </button>
            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Smile className="h-5 w-5" />
              <span>GIF</span>
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>

      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}