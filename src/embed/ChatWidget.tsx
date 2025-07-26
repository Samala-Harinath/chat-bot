import React from 'react';

// SVG Icons as components
const MessageSquareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9"></polygon>
  </svg>
);

interface Message {
  content: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatWidget: React.FC = () => {
  // Replace destructured hooks with direct state assignments
  const isOpenState = React.useState(false);
  const isOpen = isOpenState[0];
  const setIsOpen = isOpenState[1];

  const messagesState = React.useState<Message[]>([{
    content: 'Hi there! 👋 How can I help you today?',
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }]);
  const messages = messagesState[0];
  const setMessages = messagesState[1];

  const inputValueState = React.useState('');
  const inputValue = inputValueState[0];
  const setInputValue = inputValueState[1];

  const isTypingState = React.useState(false);
  const isTyping = isTypingState[0];
  const setIsTyping = isTypingState[1];

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    };

    setMessages(function(prev) { return prev.concat([newMessage]); });
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('https://chat-bot-lemon-eight.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage.content })
      });

      const data = await response.json();
      
      setIsTyping(false);
      setMessages(function(prev) {
        return prev.concat([{
          content: data.message || 'Sorry, I am not able to answer that question.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        }]);
      });
    } catch (error) {
      setIsTyping(false);
      setMessages(function(prev) {
        return prev.concat([{
          content: 'Sorry, there was an error processing your message. Please try again.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        }]);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {!isOpen && (
        <button
          onClick={function() { setIsOpen(true); }}
          className="h-14 w-14 rounded-full bg-blue-600 text-white border-none shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center"
        >
          <MessageSquareIcon />
        </button>
      )}

      {isOpen && (
        <div className="w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquareIcon />
              </div>
              <div>
                <div className="font-semibold text-sm">Chat Support</div>
                <div className="text-xs opacity-90">We're here to help</div>
              </div>
            </div>
            <button
              onClick={function() { setIsOpen(false); }}
              className="bg-transparent border-none text-white cursor-pointer p-1 rounded opacity-80 hover:opacity-100 transition-opacity"
            >
              <XIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map(function(msg, idx) {
              return (
                <div
                  key={idx}
                  className={"flex " + (msg.isUser ? "justify-end" : "justify-start") + " mb-4"}
                >
                  <div
                    className={"max-w-[80%] p-3 rounded-xl " + (
                      msg.isUser
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-700 rounded-bl-sm"
                    )}
                  >
                    <p className="m-0 leading-relaxed text-sm">{msg.content}</p>
                    <p className="mt-1 mb-0 text-xs opacity-70">{msg.timestamp}</p>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={function(e) { setInputValue(e.target.value); }}
                onKeyPress={function(e) { if (e.key === 'Enter') sendMessage(); }}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white border-none px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <SendIcon />
              </button>
            </div>
            <p className="mt-2 mb-0 text-xs text-gray-500">Press Enter to send</p>
          </div>
        </div>
      )}
    </div>
  );
}; 