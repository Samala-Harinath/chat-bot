'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Code, Globe, Zap, Shield, Smartphone } from 'lucide-react';
import ChatBot from '@/components/chat/ChatBot';

export default function Home() {
  const [copied, setCopied] = useState('');
  const [origin, setOrigin] = useState('https://your-domain.com');
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const embedCode = `<script src="https://chat-bot-lemon-eight.vercel.app/embed.js" onerror="console.error('Failed to load chatbot embed script')"></script>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle size={16} />
            Embedded Chatbot Solution
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add AI Chat to Any Website
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Integrate our beautiful, responsive chatbot widget into your website with just one line of code. 
            Perfect for customer support, lead generation, and user engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <div className="flex items-center gap-2" onClick={() => setShowDemo(true)}>
                <Globe size={20} />
                View Demo
              </div>
            </Button>
            <Button size="lg" variant="outline">
              <a href="/embed" target="_blank" className="flex items-center gap-2">
                <MessageCircle size={20} />
                Try Widget
              </a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Zap className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Easy Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add to any website with a single line of JavaScript. No complex setup required.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Smartphone className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Fully Responsive</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Optimized for all devices with adaptive design that works on mobile, tablet, and desktop.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Secure & Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Built with modern security practices and optimized for lightning-fast loading.</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Guide */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code size={24} />
              Integration Guide
            </CardTitle>
            <CardDescription>
              Choose your preferred integration method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="script" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="script">JavaScript Embed</TabsTrigger>
                <TabsTrigger value="iframe">Direct iFrame</TabsTrigger>
              </TabsList>
              
              <TabsContent value="script" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">JavaScript Embed (Recommended)</h3>
                  <p className="text-gray-600 mb-4">Add this script tag to your website's HTML:</p>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{embedCode}</code>
                    </pre>
                    <Button 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(embedCode, 'script')}
                    >
                      {copied === 'script' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="iframe" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Direct iFrame</h3>
                  <p className="text-gray-600 mb-4">Embed directly using an iframe:</p>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`<iframe 
  src="${origin}/embed"
  style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);"
></iframe>`}</code>
                    </pre>
                    <Button 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`<iframe src="${origin}/embed" style="position: fixed; bottom: 20px; right: 20px; width: 400px; height: 600px; border: none; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);"></iframe>`, 'iframe')}
                    >
                      {copied === 'iframe' ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Customization Options */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customization Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Badge variant="secondary" className="p-3">Custom Colors</Badge>
            <Badge variant="secondary" className="p-3">Position Control</Badge>
            <Badge variant="secondary" className="p-3">Size Adjustment</Badge>
            <Badge variant="secondary" className="p-3">Welcome Messages</Badge>
          </div>
        </div>
      </div>
      
      {/* Demo Chatbot Widget */}
      {showDemo && <ChatBot />}
    </div>
  );
}