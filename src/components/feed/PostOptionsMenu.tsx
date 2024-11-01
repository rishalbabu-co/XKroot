import { useRef, useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, Flag } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface PostOptionsMenuProps {
  postId: string;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostOptionsMenu({ postId, isAuthor, onEdit, onDelete }: PostOptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {isAuthor && (
              <>
                <button
                  onClick={() => {
                    onEdit();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  <Edit2 className="h-4 w-4 mr-3" />
                  Edit Post
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-700"
                >
                  <Trash2 className="h-4 w-4 mr-3" />
                  Delete Post
                </button>
              </>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              <Flag className="h-4 w-4 mr-3" />
              Report Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}