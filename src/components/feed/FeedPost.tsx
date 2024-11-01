import { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import type { Post } from '../../types';
import CommentSection from './CommentSection';
import PostOptionsMenu from './PostOptionsMenu';
import EditPostModal from './EditPostModal';
import { useAuth } from '../../contexts/AuthContext';

interface FeedPostProps {
  post: Post;
  onUpdate?: (updatedPost: Post) => void;
  onDelete?: (postId: string) => void;
}

// Sample comments data - replace with real data from your backend
const SAMPLE_COMMENTS = [
  {
    id: '1',
    userId: 'user2',
    userPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop',
    userName: 'Sarah Wilson',
    content: 'This is amazing! Looking forward to applying.',
    timestamp: '1h ago',
    likes: 5
  },
  {
    id: '2',
    userId: 'user3',
    userPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop',
    userName: 'Mike Johnson',
    content: 'Great opportunity! 🚀',
    timestamp: '30m ago',
    likes: 3
  }
];

export default function FeedPost({ post, onUpdate, onDelete }: FeedPostProps) {
  const { currentUser } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const [showComments, setShowComments] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const isAuthor = currentUser?.uid === post.userId;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      userId: currentUser?.uid || '',
      userPhoto: currentUser?.photoURL || 'https://via.placeholder.com/32',
      userName: currentUser?.displayName || 'Anonymous',
      content,
      timestamp: 'Just now',
      likes: 0
    };
    setComments(prev => [newComment, ...prev]);
    setShowComments(true);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete?.(post.id);
    }
  };

  const handleUpdate = (updatedPost: Post) => {
    onUpdate?.(updatedPost);
    setShowEditModal(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg">
        {/* Post Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.userPhoto}
              alt={post.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {post.userName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.timestamp}
                {post.editedAt && ' (edited)'}
              </p>
            </div>
          </div>
          <PostOptionsMenu
            postId={post.id}
            isAuthor={isAuthor}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="relative">
            {post.media.map((media, index) => (
              <div key={index}>
                {media.type === 'image' && (
                  <img
                    src={media.url}
                    alt="Post content"
                    className="w-full object-cover"
                  />
                )}
                {media.type === 'video' && (
                  <video
                    src={media.url}
                    controls
                    className="w-full"
                  />
                )}
                {media.type === 'gif' && (
                  <img
                    src={media.url}
                    alt="GIF content"
                    className="w-full"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{likesCount} likes</span>
            <div className="space-x-4">
              <span>{comments.length} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-dark-700 flex justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-200 dark:border-dark-700">
            <CommentSection
              postId={post.id}
              comments={comments}
              onAddComment={handleAddComment}
            />
          </div>
        )}
      </div>

      <EditPostModal
        post={post}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
    </>
  );
}