"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [userData, setUserData] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token"); // Retrieve JWT from localStorage
      if (!token) {
        toast({ description: "Unauthorized: No token found", variant: "destructive" });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Sending JWT for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({ description: "Error loading profile", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [toast]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    toast({ description: "Logged out successfully", variant: "default" }); // ✅ Change 'success' to 'default'
    router.push("/login"); // Redirect to login page
  };  

  return (
    <div className="flex justify-center items-center h-screen font-ubuntu bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        {loading ? (
          <p>Loading...</p>
        ) : userData ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Welcome, {userData.name}!</h2>
            <div className="text-left">
              <p className="text-lg font-medium">User Details:</p>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700"><strong>Name:</strong> {userData.name}</p>
                <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
                <p className="text-gray-700"><strong>Mobile No:</strong> {userData.phone}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-6 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-red-500">Failed to load profile</p>
        )}
      </div>
    </div>
  );
}
