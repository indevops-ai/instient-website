"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [userData, setUserData] = useState<{ name: string; email: string; phone: string; is2FAEnabled: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false); // Ensured a defined boolean state

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({ description: "Unauthorized: No token found", variant: "destructive" });
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("https://dev-api.instient.ai/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          toast({ description: "Session expired. Please log in again.", variant: "destructive" });
          router.push("/login");
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const data = await response.json();
        setUserData(data);
        setIs2FAEnabled(data.isTwoFactorEnabled); // Ensure boolean value
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast({ description: "Error loading profile", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [toast, router]);

  const handleToggle2FA = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({ description: "Unauthorized: No token found", variant: "destructive" });
      return;
    }
  
    const password = prompt("Please enter your password to proceed:");
    if (!password) {
      toast({ description: "Password is required to proceed", variant: "destructive" });
      return;
    }
  
    try {
      const response = await fetch("https://dev-api.instient.ai/user/2fa/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ enable2FA: !is2FAEnabled, password }), // Send password with request
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast({ description: errorData.error || "Failed to update 2FA status", variant: "destructive" });
        return;
      }
  
      const isEnabling2FA = !is2FAEnabled; // Capture current state before updating it
  
      setIs2FAEnabled(isEnabling2FA);
      toast({ description: `Two-Factor Authentication ${isEnabling2FA ? "Enabled" : "Disabled"}`, variant: "default" });
  
      if (isEnabling2FA) {
        localStorage.setItem("temp_token", token);
        localStorage.removeItem("token");
        router.push("/2fa/qr");
      }
    } catch (error) {
      console.error("Error updating 2FA:", error);
      toast({ description: "Error updating 2FA", variant: "destructive" });
    }
  };
  
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({ description: "Logged out successfully", variant: "default" });
    router.push("/login");
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

            {/* Toggle 2FA Switch */}
            {userData && (
              <label className="inline-flex items-center cursor-pointer mt-4">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={!!is2FAEnabled} // Ensure it's always a boolean
                  onChange={handleToggle2FA}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
                </span>
              </label>
            )}




            <div>
            <button 
              onClick={handleLogout}
              className="mt-6 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
            </div>

          </>
        ) : (
          <p className="text-red-500">Failed to load profile</p>
        )}
      </div>
    </div>
  );
}
