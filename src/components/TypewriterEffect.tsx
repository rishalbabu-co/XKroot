import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  messages: string[];
}

export default function TypewriterEffect({ messages }: TypewriterEffectProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const message = messages[currentMessageIndex];
    const typingSpeed = isDeleting ? 50 : 100; // Faster when deleting

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < message.length) {
          setCurrentText(message.slice(0, currentText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(message.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentMessageIndex, messages]);

  return (
    <div className="min-h-[2em] text-2xl font-light">
      {currentText}
      <span className="animate-pulse">|</span>
    </div>
  );
}