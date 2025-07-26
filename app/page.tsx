import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Embedded Chatbot Demo</h1>
      <Chatbot />
    </main>
  );
}