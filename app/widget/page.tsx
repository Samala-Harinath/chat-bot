'use client';

import { useEffect } from 'react';

export default function WidgetDemo() {
  useEffect(() => {
    // Create and inject the chatbot widget
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        var iframe = document.createElement('iframe');
        iframe.src = '${window.location.origin}/embed';
        iframe.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); z-index: 9999; background: white;';
        iframe.id = 'chatbot-widget';
        document.body.appendChild(iframe);
      })();
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const widget = document.getElementById('chatbot-widget');
      if (widget) {
        widget.remove();
      }
      script.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Widget Demo Page
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This is a demonstration of how the chatbot widget appears on your website. 
            The widget is positioned in the bottom-right corner and is fully interactive.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Sample Website Content</h2>
            <p className="text-gray-600 mb-4">
              This is sample content to demonstrate how the chatbot widget integrates with your existing website. 
              The widget floats above your content and doesn't interfere with your site's functionality.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Non-intrusive design</li>
                  <li>• Mobile responsive</li>
                  <li>• Easy to customize</li>
                  <li>• Fast loading</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Improved customer support</li>
                  <li>• 24/7 availability</li>
                  <li>• Lead generation</li>
                  <li>• Better user engagement</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">How it Works</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                The chatbot widget appears in the bottom-right corner of your page. Users can click on it to start a conversation.
                The widget is responsive and will adapt to different screen sizes automatically.
              </p>
              <p>
                Try clicking on the chat widget to see it in action! The widget maintains its position as users scroll through your content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}