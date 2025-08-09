"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to feed page as the main homepage
    router.replace("/feed");
  }, [router]);

  // Optional: You can show a loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default HomePage;