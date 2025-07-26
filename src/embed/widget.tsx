import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWidget } from './ChatWidget';

const initChatWidget = () => {
  // Create container for widget
  const container = document.createElement('div');
  container.id = 'chat-widget-root';
  document.body.appendChild(container);

  // Create React root and render widget
  const root = createRoot(container);
  root.render(React.createElement(ChatWidget));
};

// Initialize widget when script loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatWidget);
  } else {
    initChatWidget();
  }
} 