(function() {
  'use strict';

  // Prevent multiple instances
  if (window.EmbeddableChatbot) {
    return;
  }

  // Default configuration
  const defaultConfig = {
    apiUrl: '/api/chat',
    primaryColor: '#3B82F6',
    position: 'bottom-right',
    welcomeMessage: 'Hello! How can I help you today?'
  };

  // Merge with user config
  const config = Object.assign({}, defaultConfig, window.chatbotConfig || {});

  // Get the script's origin to make API calls
  const currentScript = document.currentScript || document.querySelector('script[src*="embed.js"]');
  const scriptOrigin = currentScript ? new URL(currentScript.src).origin : window.location.origin;
  
  // Update API URL to use the script's origin
  if (config.apiUrl.startsWith('/')) {
    config.apiUrl = scriptOrigin + config.apiUrl;
  }

  class EmbeddableChatbot {
    constructor(config) {
      this.config = config;
      this.isOpen = false;
      this.isMinimized = false;
      this.messages = [];
      this.isLoading = false;
      this.isTyping = false;
      this.messageIdCounter = 0;
      
      this.init();
    }

    init() {
      this.createStyles();
      this.createHTML();
      this.bindEvents();
      this.addWelcomeMessage();
    }

    createStyles() {
      const styles = `
        .embeddable-chatbot * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .embeddable-chatbot {
          position: fixed;
          z-index: 999999;
          ${this.getPositionStyles()}
        }
        
        .chatbot-container {
          width: 320px;
          height: 400px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.3s ease;
          margin-bottom: 16px;
        }
        
        .chatbot-container.minimized {
          height: 48px;
        }
        
        .chatbot-header {
          background: ${this.config.primaryColor};
          color: white;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 48px;
        }
        
        .chatbot-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .chatbot-actions {
          display: flex;
          gap: 8px;
        }
        
        .chatbot-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .chatbot-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .chatbot-messages::-webkit-scrollbar {
          width: 4px;
        }
        
        .chatbot-messages::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .chatbot-messages::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
        
        .message {
          display: flex;
          max-width: 80%;
        }
        
        .message.user {
          justify-self: flex-end;
          margin-left: auto;
        }
        
        .message.bot {
          justify-self: flex-start;
        }
        
        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
          word-wrap: break-word;
        }
        
        .message.user .message-bubble {
          background: ${this.config.primaryColor};
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .message.bot .message-bubble {
          background: white;
          color: #374151;
          border: 1px solid #e5e7eb;
          border-bottom-left-radius: 4px;
        }
        
        .message-time {
          font-size: 11px;
          opacity: 0.7;
          margin-top: 4px;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          max-width: 80px;
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: typing 1.4s ease-in-out infinite;
        }
        
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        
        .chatbot-input {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
          background: white;
          display: flex;
          gap: 8px;
        }
        
        .chatbot-input input {
          flex: 1;
          border: 1px solid #d1d5db;
          border-radius: 24px;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        
        .chatbot-input input:focus {
          border-color: ${this.config.primaryColor};
          box-shadow: 0 0 0 3px ${this.config.primaryColor}20;
        }
        
        .send-btn {
          background: ${this.config.primaryColor};
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .send-btn:hover {
          transform: scale(1.05);
        }
        
        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        
        .chatbot-toggle {
          background: ${this.config.primaryColor};
          color: white;
          border: none;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .chatbot-toggle:hover {
          transform: scale(1.1);
        }
        
        .hidden {
          display: none !important;
        }
        
        @media (max-width: 480px) {
          .embeddable-chatbot {
            left: 16px !important;
            right: 16px !important;
            bottom: 16px !important;
          }
          
          .chatbot-container {
            width: 100%;
            height: 70vh;
            max-height: 500px;
          }
        }
      `;

      const styleSheet = document.createElement('style');
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }

    getPositionStyles() {
      switch (this.config.position) {
        case 'bottom-left':
          return 'bottom: 16px; left: 16px;';
        case 'top-right':
          return 'top: 16px; right: 16px;';
        case 'top-left':
          return 'top: 16px; left: 16px;';
        default:
          return 'bottom: 16px; right: 16px;';
      }
    }

    createHTML() {
      const container = document.createElement('div');
      container.className = 'embeddable-chatbot';
      container.innerHTML = `
        <div class="chatbot-container hidden">
          <div class="chatbot-header">
            <h3>Chat Support</h3>
            <div class="chatbot-actions">
              <button class="chatbot-btn minimize-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9,11 12,14 15,11"></polyline>
                </svg>
              </button>
              <button class="chatbot-btn close-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <div class="chatbot-messages"></div>
          <div class="chatbot-input">
            <input type="text" placeholder="Type your message..." />
            <button class="send-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
        </div>
        <button class="chatbot-toggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
          </svg>
        </button>
      `;

      document.body.appendChild(container);
      this.container = container;
      this.chatContainer = container.querySelector('.chatbot-container');
      this.messagesContainer = container.querySelector('.chatbot-messages');
      this.input = container.querySelector('.chatbot-input input');
      this.sendBtn = container.querySelector('.send-btn');
      this.toggleBtn = container.querySelector('.chatbot-toggle');
    }

    bindEvents() {
      this.toggleBtn.addEventListener('click', () => this.toggle());
      this.container.querySelector('.close-btn').addEventListener('click', () => this.close());
      this.container.querySelector('.minimize-btn').addEventListener('click', () => this.minimize());
      this.sendBtn.addEventListener('click', () => this.sendMessage());
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.open();
      } else {
        this.close();
      }
    }

    open() {
      this.isOpen = true;
      this.isMinimized = false;
      this.chatContainer.classList.remove('hidden', 'minimized');
      this.toggleBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
      setTimeout(() => this.input.focus(), 100);
    }

    close() {
      this.isOpen = false;
      this.isMinimized = false;
      this.chatContainer.classList.add('hidden');
      this.chatContainer.classList.remove('minimized');
      this.toggleBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      `;
    }

    minimize() {
      this.isMinimized = !this.isMinimized;
      if (this.isMinimized) {
        this.chatContainer.classList.add('minimized');
      } else {
        this.chatContainer.classList.remove('minimized');
        setTimeout(() => this.input.focus(), 100);
      }
    }

    addWelcomeMessage() {
      const message = {
        id: this.messageIdCounter++,
        text: this.config.welcomeMessage,
        isUser: false,
        timestamp: new Date()
      };
      this.messages.push(message);
      this.renderMessage(message);
    }

    async sendMessage() {
      const text = this.input.value.trim();
      if (!text || this.isLoading) return;

      const userMessage = {
        id: this.messageIdCounter++,
        text: text,
        isUser: true,
        timestamp: new Date()
      };

      this.messages.push(userMessage);
      this.renderMessage(userMessage);
      this.input.value = '';
      this.setLoading(true);
      this.showTyping();

      try {
        const response = await fetch(this.config.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: text }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();
        
        setTimeout(() => {
          this.hideTyping();
          const botMessage = {
            id: this.messageIdCounter++,
            text: data.message,
            isUser: false,
            timestamp: new Date()
          };
          this.messages.push(botMessage);
          this.renderMessage(botMessage);
          this.setLoading(false);
        }, 500);

      } catch (error) {
        console.error('Error sending message:', error);
        setTimeout(() => {
          this.hideTyping();
          const errorMessage = {
            id: this.messageIdCounter++,
            text: 'Sorry, I encountered an error. Please try again.',
            isUser: false,
            timestamp: new Date()
          };
          this.messages.push(errorMessage);
          this.renderMessage(errorMessage);
          this.setLoading(false);
        }, 500);
      }
    }

    renderMessage(message) {
      const messageEl = document.createElement('div');
      messageEl.className = `message ${message.isUser ? 'user' : 'bot'}`;
      messageEl.innerHTML = `
        <div class="message-bubble">
          ${message.text}
          <div class="message-time">${this.formatTime(message.timestamp)}</div>
        </div>
      `;
      
      this.messagesContainer.appendChild(messageEl);
      this.scrollToBottom();
    }

    showTyping() {
      this.isTyping = true;
      const typingEl = document.createElement('div');
      typingEl.className = 'message bot typing-message';
      typingEl.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      this.messagesContainer.appendChild(typingEl);
      this.scrollToBottom();
    }

    hideTyping() {
      this.isTyping = false;
      const typingMessage = this.messagesContainer.querySelector('.typing-message');
      if (typingMessage) {
        typingMessage.remove();
      }
    }

    setLoading(loading) {
      this.isLoading = loading;
      this.sendBtn.disabled = loading;
      this.input.disabled = loading;
    }

    scrollToBottom() {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    formatTime(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.EmbeddableChatbot = new EmbeddableChatbot(config);
    });
  } else {
    window.EmbeddableChatbot = new EmbeddableChatbot(config);
  }
})();