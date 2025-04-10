'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // This is a client-side check, but the middleware will handle the redirect
  // before this component even renders
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name}!</h2>
          <p className="mb-4">This is a protected dashboard page. Only authenticated users can see this content.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Your Profile</h3>
              <p><span className="font-medium">Email:</span> {session?.user?.email}</p>
              <p><span className="font-medium">Name:</span> {session?.user?.name}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Account Status</h3>
              <p className="text-green-600 font-medium">Active</p>
              <p className="text-sm text-gray-500">Last login: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              View Profile
            </button>
            <button className="p-4 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
              Manage Settings
            </button>
            <button className="p-4 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
              View Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 