import { useRef } from 'react';
import { Link2, Facebook, Twitter, Linkedin, Mail, Copy, Check } from 'lucide-react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface ShareMenuProps {
  postId: string;
  onClose: () => void;
}

export default function ShareMenu({ postId, onClose }: ShareMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, onClose);

  const shareUrl = `${window.location.origin}/posts/${postId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
      onClose();
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = (platform: string) => {
    let url = '';
    const text = 'Check out this post!';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
    >
      <div className="p-2 space-y-1">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
        >
          <Facebook className="h-4 w-4 mr-3" />
          Share on Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
        >
          <Twitter className="h-4 w-4 mr-3" />
          Share on Twitter
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
        >
          <Linkedin className="h-4 w-4 mr-3" />
          Share on LinkedIn
        </button>
        <button
          onClick={() => handleShare('email')}
          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
        >
          <Mail className="h-4 w-4 mr-3" />
          Share via Email
        </button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 dark:border-dark-700"></div>
          </div>
        </div>
        <button
          onClick={handleCopyLink}
          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
        >
          <Copy className="h-4 w-4 mr-3" />
          Copy Link
        </button>
      </div>
    </div>
  );
}