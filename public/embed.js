(() => {
  // Load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.tailwindcss.com';
  document.head.appendChild(link);
  
  // Load Lucide icons
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.js';
  document.head.appendChild(script);
  
  // Wait for dependencies to load
  setTimeout(() => {
    // Create chatbot HTML
    const chatbotHTML = `
      <div id="chatbot-widget" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: system-ui, -apple-system, sans-serif;">
        <div id="chatbot-trigger" style="display: block;">
          <button id="chat-open-btn" style="height: 56px; width: 56px; border-radius: 50%; background: #2563eb; color: white; border: none; box-shadow: 0 10px 25px rgba(0,0,0,0.1); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        </div>
        
        <div id="chatbot-window" style="display: none; width: 384px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.15); border: 1px solid #e5e7eb; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 16px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 600; font-size: 14px;">Chat Support</div>
                <div style="font-size: 12px; opacity: 0.9;">We're here to help</div>
              </div>
            </div>
            <button id="chat-close-btn" style="background: none; border: none; color: white; cursor: pointer; padding: 4px; border-radius: 4px; opacity: 0.8; transition: opacity 0.2s;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <!-- Messages -->
          <div id="chat-messages" style="height: 320px; overflow-y: auto; padding: 16px; background: #fafafa;">
            <div style="display: flex; justify-content: flex-start; margin-bottom: 16px;">
              <div style="max-width: 80%; background: #f3f4f6; color: #374151; padding: 12px 16px; border-radius: 12px; border-bottom-left-radius: 4px; font-size: 14px;">
                <p style="margin: 0; line-height: 1.4;">Hi there! 👋 How can I help you today?</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.7;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
              </div>
            </div>
          </div>
          
          <!-- Input -->
          <div style="padding: 16px; border-top: 1px solid #e5e7eb; background: white;">
            <div style="display: flex; gap: 8px;">
              <input id="chat-input" type="text" placeholder="Type your message..." style="flex: 1; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; transition: border-color 0.2s;" />
              <button id="chat-send-btn" style="background: #2563eb; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9"></polygon>
                </svg>
              </button>
            </div>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #6b7280;">Press Enter to send</p>
          </div>
        </div>
      </div>
    `;
    
    // Insert chatbot into page
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    
    // Get elements
    const trigger = document.getElementById('chatbot-trigger');
    const window = document.getElementById('chatbot-window');
    const openBtn = document.getElementById('chat-open-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const messages = document.getElementById('chat-messages');
    
    // Event listeners
    openBtn.addEventListener('click', () => {
      trigger.style.display = 'none';
      window.style.display = 'block';
      input.focus();
    });
    
    closeBtn.addEventListener('click', () => {
      window.style.display = 'none';
      trigger.style.display = 'block';
    });
    
    // Send message function
    function sendMessage() {
      const message = input.value.trim();
      if (!message) return;
      
      // Add user message
      const userMsg = document.createElement('div');
      userMsg.style.cssText = 'display: flex; justify-content: flex-end; margin-bottom: 16px;';
      userMsg.innerHTML = `
        <div style="max-width: 80%; background: #2563eb; color: white; padding: 12px 16px; border-radius: 12px; border-bottom-right-radius: 4px; font-size: 14px;">
          <p style="margin: 0; line-height: 1.4;">${message}</p>
          <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.7;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
        </div>
      `;
      messages.appendChild(userMsg);
      
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
      
      // Show typing indicator
      const typingMsg = document.createElement('div');
      typingMsg.id = 'typing-indicator';
      typingMsg.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 14px; color: #6b7280;';
      typingMsg.innerHTML = `
        <div style="display: flex; gap: 4px;">
          <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out;"></div>
          <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: 0.16s;"></div>
          <div style="width: 8px; height: 8px; background: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: 0.32s;"></div>
        </div>
        <span>Assistant is typing...</span>
      `;
      messages.appendChild(typingMsg);
      messages.scrollTop = messages.scrollHeight;

      const botMsg = document.createElement('div');
        botMsg.style.cssText = 'display: flex; justify-content: flex-start; margin-bottom: 16px;';
        botMsg.innerHTML = `
          <div style="max-width: 80%; background: #f3f4f6; color: #374151; padding: 12px 16px; border-radius: 12px; border-bottom-left-radius: 4px; font-size: 14px;">
            <p style="margin: 0; line-height: 1.4;">${'Sorry, I am not able to answer that question.'}</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.7;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
          </div>
        `;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      
      // Make API call to your chat endpoint
      // fetch('https://chat-bot-lemon-eight.vercel.app/api/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ message })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   typingMsg.remove();
      //   console.log("data",data);
        
      //   // Add bot response
      //   const botMsg = document.createElement('div');
      //   botMsg.style.cssText = 'display: flex; justify-content: flex-start; margin-bottom: 16px;';
      //   botMsg.innerHTML = `
      //     <div style="max-width: 80%; background: #f3f4f6; color: #374151; padding: 12px 16px; border-radius: 12px; border-bottom-left-radius: 4px; font-size: 14px;">
      //       <p style="margin: 0; line-height: 1.4;">${data.message || 'Sorry, I am not able to answer that question.'}</p>
      //       <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.7;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
      //     </div>
      //   `;
      //   messages.appendChild(botMsg);
      //   messages.scrollTop = messages.scrollHeight;
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      //   typingMsg.remove();
        
      //   // Add error message
      //   const errorMsg = document.createElement('div');
      //   errorMsg.style.cssText = 'display: flex; justify-content: flex-start; margin-bottom: 16px;';
      //   errorMsg.innerHTML = `
      //     <div style="max-width: 80%; background: #fee2e2; color: #991b1b; padding: 12px 16px; border-radius: 12px; border-bottom-left-radius: 4px; font-size: 14px;">
      //       <p style="margin: 0; line-height: 1.4;">Sorry, there was an error processing your message. Please try again.</p>
      //       <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.7;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
      //     </div>
      //   `;
      //   messages.appendChild(errorMsg);
      //   messages.scrollTop = messages.scrollHeight;
      // });
    }
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
      #chat-open-btn:hover {
        background: #1d4ed8 !important;
        transform: scale(1.05);
      }
      #chat-close-btn:hover {
        opacity: 1 !important;
      }
      #chat-send-btn:hover {
        background: #1d4ed8 !important;
      }
      #chat-input:focus {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
      }
    `;
    document.head.appendChild(style);
    
  }, 500);
})(); 