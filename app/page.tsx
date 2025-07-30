import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Embeddable Chatbot
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Add intelligent chat support to any website with a simple script tag.
            Our chatbot provides instant responses and can be customized to match your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block">
              View Demo
            </Link>
            <a href="#integration" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-blue-600 inline-block">
              Get Started
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
            <p className="text-gray-600">Add to any website with just one line of code. No complex setup required.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
            <p className="text-gray-600">Works perfectly on desktop, tablet, and mobile devices.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customizable</h3>
            <p className="text-gray-600">Match your brand with custom colors, position, and messages.</p>
          </div>
        </div>

        <div id="integration" className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Integration</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Basic Integration</h3>
              <p className="text-gray-600 mb-4">Add this single line to your website:</p>
              <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-800">
                  {`<script src="${window.location.origin}/embed.js" async></script>`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2. Custom Configuration</h3>
              <p className="text-gray-600 mb-4">Customize appearance and behavior:</p>
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
<script src="${window.location.origin}/embed.js" async></script>`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Configuration Options</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <strong>primaryColor:</strong>
                    <p className="text-sm text-gray-600">Any valid CSS color (#hex, rgb(), etc.)</p>
                  </div>
                  <div>
                    <strong>position:</strong>
                    <p className="text-sm text-gray-600">&apos;bottom-right&apos;, &apos;bottom-left&apos;, &apos;top-right&apos;, &apos;top-left&apos;</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <strong>welcomeMessage:</strong>
                    <p className="text-sm text-gray-600">Custom greeting text</p>
                  </div>
                  <div>
                    <strong>apiUrl:</strong>
                    <p className="text-sm text-gray-600">Custom API endpoint (optional)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Try the demo and see how easy it is to add chat support to your website.</p>
          <Link href="/chat" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block">
            View Live Demo
          </Link>
        </div>
        <footer className="mt-16 pb-8 text-center text-gray-600">
          <p>Crafted by <span className="font-semibold">llamaworx</span></p>
        </footer>
      </div>
    </div>
  );
}