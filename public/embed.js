// public/embed.js
(function () {
  // Load React
  const reactScript = document.createElement('script');
  reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
  reactScript.async = true;
  document.head.appendChild(reactScript);

  // Load ReactDOM
  const reactDomScript = document.createElement('script');
  reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
  reactDomScript.async = true;
  document.head.appendChild(reactDomScript);

  // Load Lucide icons
  const lucideScript = document.createElement('script');
  lucideScript.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
  lucideScript.async = true;
  document.head.appendChild(lucideScript);

  // Load Tailwind CSS
  const tailwindLink = document.createElement('link');
  tailwindLink.href = 'https://unpkg.com/tailwindcss@3.4.1/dist/tailwind.min.css';
  tailwindLink.rel = 'stylesheet';
  document.head.appendChild(tailwindLink);

  // Create container for chatbot
  const div = document.createElement('div');
  div.id = 'chatbot-root';
  document.body.appendChild(div);

  // Wait for React and ReactDOM to load
  const loadChatbot = () => {
    if (window.React && window.ReactDOM && window.lucide) {
      const shadow = div.attachShadow({ mode: 'open' });
      const container = document.createElement('div');
      shadow.appendChild(container);

      // Add Tailwind CSS to shadow DOM
      const shadowTailwindLink = document.createElement('link');
      shadowTailwindLink.href = 'https://unpkg.com/tailwindcss@3.4.1/dist/tailwind.min.css';
      shadowTailwindLink.rel = 'stylesheet';
      shadow.appendChild(shadowTailwindLink);

      // Load chatbot bundle
      const chatbotScript = document.createElement('script');
      chatbotScript.src = 'https://chat-bot-lemon-eight.vercel.app/embed.js';
      chatbotScript.async = true;
      shadow.appendChild(chatbotScript);
    } else {
      setTimeout(loadChatbot, 100); // Retry until dependencies are loaded
    }
  };

  reactDomScript.onload = loadChatbot;
  lucideScript.onload = loadChatbot;
})();