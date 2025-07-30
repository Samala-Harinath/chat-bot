'use client';

import ChatBot from '../../components/ChatBot';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Chatbot Demo</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Embed Code</h2>
          <p className="text-gray-600 mb-4">
            Copy and paste this code into any website to embed the chatbot:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-800">
              {`<script src="${typeof window !== 'undefined' && window.location ? window.location.origin : ''}/embed.js" async></script>`}
            </code>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Customization Options</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Position</h3>
              <p className="text-sm text-gray-600">bottom-right, bottom-left, top-right, top-left</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Primary Color</h3>
              <p className="text-sm text-gray-600">Any valid CSS color value</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Welcome Message</h3>
              <p className="text-sm text-gray-600">Custom greeting message</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Example Usage</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-800 whitespace-pre">
              {`<script>
  window.chatbotConfig = {
    domain: '${window.location.origin}',
    apiKey: 'your-api-key-here',
    primaryColor: '#10B981',
    position: 'bottom-left',
    welcomeMessage: 'Welcome! How can we help you?',
    speechRecognition: true,
    speechLanguage: 'en-US'
  };
</script>
<script src="${typeof window !== 'undefined' && window.location ? window.location.origin : ''}/embed.js" async></script>`}
            </code>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">New Configuration Options</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800">Domain</h3>
              <p className="text-sm text-gray-600">Custom domain for API calls (e.g., &apos;{window.location.origin}&apos;)</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">API Key</h3>
              <p className="text-sm text-gray-600">Authentication key sent in Authorization and X-API-Key headers</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Speech Recognition</h3>
              <p className="text-sm text-gray-600">Enable/disable voice input (true/false)</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Speech Language</h3>
              <p className="text-sm text-gray-600">Language code for speech recognition (e.g., &apos;en-US&apos;, &apos;es-ES&apos;)</p>
            </div>
          </div>
        </div>
      </div>

      <ChatBot
        speechRecognition={true}
        speechLanguage="en-US"
      />
    </div>
  );
}