import { useState } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Comment {
  id: string;
  userId: string;
  userPhoto: string;
  userName: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

export default function CommentSection({ postId, comments, onAddComment }: CommentSectionProps) {
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="px-4 py-2 space-y-4">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <img
          src={currentUser?.photoURL || "https://via.placeholder.com/32"}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-indigo-600 dark:text-indigo-400 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {isExpanded ? 'Hide comments' : `View all ${comments.length} comments`}
          </button>

          {isExpanded && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-2">
                  <img
                    src={comment.userPhoto}
                    alt={comment.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 dark:bg-dark-700 rounded-2xl px-4 py-2">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">
                        {comment.userName}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{comment.timestamp}</span>
                      <button className="hover:text-indigo-600 dark:hover:text-indigo-400">
                        Like
                      </button>
                      <button className="hover:text-indigo-600 dark:hover:text-indigo-400">
                        Reply
                      </button>
                      <span>{comment.likes} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}