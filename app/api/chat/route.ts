import { NextRequest, NextResponse } from 'next/server';

// Mock responses for demonstration
const responses = [
  "That's a great question! Let me help you with that.",
  "I understand what you're looking for. Here's what I can tell you...",
  "Thanks for reaching out! I'm here to assist you.",
  "I'd be happy to help you with that. Let me provide some information.",
  "That's an interesting point. Here's my perspective on it.",
  "I appreciate you asking. Let me give you a detailed response.",
  "Great question! I think I can help clarify that for you.",
  "I'm glad you brought that up. Here's what you should know.",
];

const getRandomResponse = (message: string): string => {
  // Simple keyword-based responses
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    return "Hello! Welcome to our chat support. How can I assist you today?";
  }
  
  if (lowercaseMessage.includes('help')) {
    return "I'm here to help! You can ask me about our services, features, pricing, or any other questions you might have.";
  }
  
  if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
    return "Our pricing is very competitive! We offer flexible plans starting from $29/month. Would you like to know more about our pricing structure?";
  }
  
  if (lowercaseMessage.includes('support') || lowercaseMessage.includes('contact')) {
    return "Our support team is available 24/7 to help you. You can reach us through this chat, email at support@example.com, or call us at 1-800-SUPPORT.";
  }
  
  if (lowercaseMessage.includes('feature') || lowercaseMessage.includes('what can')) {
    return "Our platform offers many powerful features including real-time analytics, customizable dashboards, API integrations, and much more! What specific features are you interested in?";
  }
  
  // Return a random response for other messages
  return responses[Math.floor(Math.random() * responses.length)];
};

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = getRandomResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}