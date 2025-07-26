import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <div className={cn(
      'flex',
      isBot ? 'justify-start' : 'justify-end'
    )}>
      <div className={cn(
        'max-w-[80%] px-4 py-2 rounded-lg text-sm',
        isBot 
          ? 'bg-gray-100 text-gray-800 rounded-bl-none' 
          : 'bg-blue-600 text-white rounded-br-none'
      )}>
        <p className="whitespace-pre-wrap">{message.text||'Sorry, I am not able to answer that question.'}</p>
        <p className={cn(
          'text-xs mt-1 opacity-70',
          isBot ? 'text-gray-500' : 'text-blue-100'
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
}