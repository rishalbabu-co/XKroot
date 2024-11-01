import { useRef, useEffect } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const EMOJI_CATEGORIES = [
  {
    name: 'Smileys & People',
    emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘']
  },
  {
    name: 'Gestures & Body',
    emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '✋', '🤚', '🖐️', '✋']
  },
  {
    name: 'Objects',
    emojis: ['💼', '📁', '📂', '🗂️', '📅', '📆', '📊', '📈', '📉', '📋', '📌', '📍', '📎', '🖇️', '📏', '📐']
  },
  {
    name: 'Symbols',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝']
  }
];

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClose);

  return (
    <div
      ref={ref}
      className="absolute bottom-full right-0 mb-2 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 w-64 max-h-72 overflow-y-auto"
    >
      {EMOJI_CATEGORIES.map((category, categoryIndex) => (
        <div key={categoryIndex} className="p-2">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
            {category.name}
          </h3>
          <div className="grid grid-cols-8 gap-1">
            {category.emojis.map((emoji, emojiIndex) => (
              <button
                key={emojiIndex}
                onClick={() => onSelect(emoji)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}