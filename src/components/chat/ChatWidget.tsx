import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import { useAuth } from '../../contexts/AuthContext';

interface ChatRecipient {
  id: string;
  name: string;
  photo: string;
  context?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<ChatRecipient | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleStartChat = (event: CustomEvent<ChatRecipient>) => {
      setRecipient(event.detail);
      setActiveChat(event.detail.id);
      setIsOpen(true);
    };

    window.addEventListener('startChat', handleStartChat as EventListener);
    return () => window.removeEventListener('startChat', handleStartChat as EventListener);
  }, []);

  if (!currentUser) return null;

  return (
    <div className="fixed bottom-7 right-6 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-xl w-[340px] h-[480px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-dark-700 flex justify-between items-center bg-white dark:bg-dark-800 z-10">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeChat ? recipient?.name || 'Chat' : 'Messages'}
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setActiveChat(null);
                setRecipient(null);
              }}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            {activeChat ? (
              <ChatWindow
                chatId={activeChat}
                recipient={recipient}
                onBack={() => {
                  setActiveChat(null);
                  setRecipient(null);
                }}
              />
            ) : (
              <ChatList onSelectChat={(chatId, recipient) => {
                setActiveChat(chatId);
                setRecipient(recipient);
              }} />
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs">
            2
          </span>
        </button>
      )}
    </div>
  );
}