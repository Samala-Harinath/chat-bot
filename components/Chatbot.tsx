'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message } from '@/lib/types';
import { createRoot } from 'react-dom/client';

// Chatbot component (same as before)
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! How can I assist you today?', isBot: true },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = { id: messages.length + 1, text, isBot: false };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(text),
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('hello')) {
      return 'Hi there! How can I help you?';
    } else if (lowerMessage.includes('how are you')) {
      return 'Doing great, thanks for asking! How about you?';
    } else {
      return 'Hmm, interesting! Could you clarify or ask something else?';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && chatWindowRef.current) {
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Open chatbot"
      >
        <MessageSquare size={24} />
      </button>
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed w-80 bg-white rounded-lg shadow-xl flex flex-col"
          style={{ bottom: `${position.y}px`, right: `${position.x}px` }}
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          <div
            className="bg-blue-600 text-white p-4 rounded-t-lg cursor-move flex justify-between items-center"
            onMouseDown={handleMouseDown}
          >
            <h2 id="chatbot-title" className="text-lg font-semibold">
              Chatbot
            </h2>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto max-h-80">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
          <ChatInput onSend={handleSendMessage} />
        </div>
      )}
    </>
  );
};

// Export the component and a mount function
export default Chatbot;

export function mountChatbot(container: HTMLElement) {
  const root = createRoot(container);
  root.render(<Chatbot />);
}

// Auto-mount if in browser and shadow DOM container exists
if (typeof window !== 'undefined') {
  const rootElement = document.querySelector('#chatbot-root');
  if (rootElement?.shadowRoot) {
    const container = rootElement.shadowRoot.querySelector('div');
    if (container) {
      mountChatbot(container);
    }
  }
}