import { useState } from 'react';
import { Search } from 'lucide-react';

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
}

// Sample data - replace with real data from your backend
const SAMPLE_CHATS = [
  {
    id: '1',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop',
    lastMessage: 'Thanks for your application! When are you available for an interview?',
    timestamp: '2m ago',
    unread: true
  },
  {
    id: '2',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop',
    lastMessage: 'The technical assessment has been reviewed.',
    timestamp: '1h ago',
    unread: true
  },
  {
    id: '3',
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop',
    lastMessage: 'Looking forward to our discussion tomorrow!',
    timestamp: '2h ago',
    unread: false
  }
];

export default function ChatList({ onSelectChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = SAMPLE_CHATS.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-dark-700 border-0 rounded-full focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="w-full p-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors relative"
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {chat.name}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {chat.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread && (
              <span className="absolute top-4 right-3 h-2 w-2 bg-indigo-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}