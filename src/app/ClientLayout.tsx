"use client";

import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <AIAssistant />
    </>
  );
}
