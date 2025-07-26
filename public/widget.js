// public/embed.js
(function () {
  // Load React and ReactDOM from CDN
  const reactScript = document.createElement('script');
  reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
  reactScript.async = true;
  document.head.appendChild(reactScript);

  const reactDomScript = document.createElement('script');
  reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
  reactDomScript.async = true;
  document.head.appendChild(reactDomScript);

  // Load Tailwind CSS from CDN
  const tailwindLink = document.createElement('link');
  tailwindLink.href = 'https://unpkg.com/tailwindcss@3.4.1/dist/tailwind.min.css';
  tailwindLink.rel = 'stylesheet';
  document.head.appendChild(tailwindLink);

  // Create container for chatbot
  const div = document.createElement('div');
  div.id = 'chatbot-root';
  document.body.appendChild(div);

  // Wait for ReactDOM to load, then load chatbot bundle
  reactDomScript.onload = () => {
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
    chatbotScript.src = '/chatbot.bundle.js'; // Adjust to your deployed URL
    chatbotScript.async = true;
    shadow.appendChild(chatbotScript);
  };
})();