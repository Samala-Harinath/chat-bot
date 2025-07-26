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

      // Add Tailwind CSS to shadow DOM by fetching and injecting the styles
      fetch('https://unpkg.com/tailwindcss@3.4.1/dist/tailwind.min.css')
        .then(response => response.text())
        .then(css => {
          const style = document.createElement('style');
          style.textContent = css;
          shadow.appendChild(style);

          // Load chatbot bundle after Tailwind is loaded
          const chatbotScript = document.createElement('script');
          chatbotScript.src = 'https://chat-bot-lemon-eight.vercel.app/chatbot.bundle.js';
          chatbotScript.async = true;
          shadow.appendChild(chatbotScript);
        })
        .catch(error => {
          console.error('Failed to load Tailwind CSS:', error);
        });
    } else {
      setTimeout(loadChatbot, 100); // Retry until dependencies are loaded
    }
  };

  reactDomScript.onload = loadChatbot;
  lucideScript.onload = loadChatbot;
})();