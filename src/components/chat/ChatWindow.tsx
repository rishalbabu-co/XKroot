import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Image as ImageIcon, Smile, X } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ChatWindowProps {
  chatId: string;
  recipient: any;
  onBack: () => void;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachments?: {
    type: 'file' | 'image';
    url: string;
    name: string;
  }[];
}

// Sample data - replace with real data from your backend
const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'other',
    text: 'Hi! Thanks for applying to the Senior Frontend Developer position.',
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    senderId: 'me',
    text: 'Thank you for considering my application! I\'m very excited about the opportunity.',
    timestamp: '10:32 AM'
  },
  {
    id: '3',
    senderId: 'other',
    text: 'Your experience looks great! When would you be available for a technical interview?',
    timestamp: '10:33 AM'
  }
];

export default function ChatWindow({ chatId, recipient, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        senderId: 'me',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (file: File, type: 'file' | 'image') => {
    try {
      setUploading(true);

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
        return;
      }

      // Create a reference to the file location
      const fileRef = ref(storage, `chat-attachments/${chatId}/${Date.now()}-${file.name}`);
      
      // Upload the file
      await uploadBytes(fileRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(fileRef);

      // Add message with attachment
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          senderId: 'me',
          text: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          attachments: [{
            type,
            url: downloadURL,
            name: file.name
          }]
        }
      ]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-3 border-b border-gray-200 dark:border-dark-700 flex items-center space-x-3 bg-white dark:bg-dark-800">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <img
          src={recipient?.photo || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop"}
          alt={recipient?.name || "Chat recipient"}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {recipient?.name || "Chat recipient"}
          </h4>
          {recipient?.context && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {recipient.context}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-4 py-2 ${
                message.senderId === 'me'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
              }`}
            >
              {message.text && (
                <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
              )}
              
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mt-2">
                  {attachment.type === 'image' ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-full rounded-lg"
                    />
                  ) : (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm underline"
                    >
                      <Paperclip className="h-4 w-4" />
                      <span>{attachment.name}</span>
                    </a>
                  )}
                </div>
              ))}

              <span className={`text-xs mt-1 block ${
                message.senderId === 'me'
                  ? 'text-indigo-200'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
        <div className="flex items-end space-x-2">
          <div className="flex-1 min-h-[40px] max-h-32 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-end">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-2 bg-transparent border-0 focus:ring-0 resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              style={{ minHeight: '40px' }}
              rows={1}
            />
          </div>
          <div className="flex items-center space-x-2">
            {/* File Upload */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'file');
              }}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 disabled:opacity-50"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {/* Image Upload */}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'image');
              }}
              className="hidden"
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              disabled={uploading}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 disabled:opacity-50"
            >
              <ImageIcon className="h-5 w-5" />
            </button>

            {/* Emoji Picker */}
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2"
              >
                <Smile className="h-5 w-5" />
              </button>
              {showEmojiPicker && (
                <EmojiPicker
                  onSelect={handleEmojiSelect}
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}
            </div>

            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || uploading}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}