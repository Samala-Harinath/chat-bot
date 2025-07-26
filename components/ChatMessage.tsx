import { Message } from '@/lib/types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          message.isBot
            ? 'bg-gray-100 text-gray-800'
            : 'bg-blue-600 text-white'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;