'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('fe_token');
    if (token) {
      // If token exists, redirect to dashboard
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center transform hover:scale-105 transition duration-300">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            Welcome to the Home Page
          </h1>
          <p className="text-gray-600 text-lg">
            Explore the features and enjoy your stay!
          </p>
        </div>
      </div>
    </div>
  );
}
