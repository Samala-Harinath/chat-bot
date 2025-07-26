// public/embed.js
(function () {
  // Prevent multiple executions
  if (window.chatbotInitialized) {
    console.log('Chatbot already initialized, skipping');
    return;
  }
  window.chatbotInitialized = true;

  console.log('Chatbot embed script started');

  try {
    // Load React
    const reactScript = document.createElement('script');
    reactScript.src = 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js';
    reactScript.async = false;
    reactScript.onerror = () => console.error('Failed to load React');
    document.head.appendChild(reactScript);

    // Load ReactDOM
    const reactDomScript = document.createElement('script');
    reactDomScript.src = 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js';
    reactDomScript.async = false;
    reactDomScript.onerror = () => console.error('Failed to load ReactDOM');
    document.head.appendChild(reactDomScript);

    // Load Lucide icons
    const lucideScript = document.createElement('script');
    lucideScript.src = 'https://cdn.jsdelivr.net/npm/lucide@0.453.0/dist/umd/lucide.min.js';
    lucideScript.async = false;
    lucideScript.onerror = () => console.error('Failed to load Lucide');
    document.head.appendChild(lucideScript);

    // Load Tailwind CSS
    const tailwindLink = document.createElement('link');
    tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css';
    tailwindLink.rel = 'stylesheet';
    tailwindLink.onerror = () => console.error('Failed to load Tailwind CSS');
    document.head.appendChild(tailwindLink);

    // Create container
    let div = document.getElementById('chatbot-root');
    if (!div) {
      div = document.createElement('div');
      div.id = 'chatbot-root';
      document.body.appendChild(div);
    }

    // Initialize chatbot
    const initChatbot = () => {
      try {
        if (!window.React || !window.ReactDOM || !window.lucide) {
          console.error('Dependencies not loaded:', {
            React: !!window.React,
            ReactDOM: !!window.ReactDOM,
            lucide: !!window.lucide,
          });
          return;
        }

        console.log('Dependencies loaded, initializing chatbot');

        // Check for existing shadow root
        let shadow = div.shadowRoot;
        if (!shadow) {
          shadow = div.attachShadow({ mode: 'open' });
        } else {
          console.log('Shadow root already exists, reusing');
        }

        // Create container if not already present
        let container = shadow.querySelector('div');
        if (!container) {
          container = document.createElement('div');
          shadow.appendChild(container);
        }

        // Add Tailwind CSS to shadow DOM
        if (!shadow.querySelector('link[href*="tailwind"]')) {
          const shadowTailwindLink = document.createElement('link');
          shadowTailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css';
          shadowTailwindLink.rel = 'stylesheet';
          shadowTailwindLink.onerror = () => console.error('Failed to load shadow Tailwind CSS');
          shadow.appendChild(shadowTailwindLink);
        }

        // Load embed.js if not already loaded
        if (!shadow.querySelector('script[src*="embed.js"]')) {
          const chatbotScript = document.createElement('script');
          chatbotScript.src = 'https://chat-bot-lemon-eight.vercel.app/embed.js';
          chatbotScript.async = false;
          chatbotScript.onerror = () => console.error('Failed to load embed.js');
          chatbotScript.onload = () => console.log('embed.js loaded successfully');
          shadow.appendChild(chatbotScript);
        } else {
          console.log('embed.js already loaded, skipping');
        }
      } catch (error) {
        console.error('Chatbot initialization error:', error);
      }
    };

    // Wait for DOM and dependencies
    const loadChatbot = () => {
      if (document.readyState === 'complete') {
        initChatbot();
      } else {
        window.addEventListener('load', initChatbot, { once: true });
      }
    };

    reactDomScript.onload = loadChatbot;
    lucideScript.onload = loadChatbot;
  } catch (error) {
    console.error('Chatbot embed error:', error);
  }
})();