"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ValidateOTPPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const tempToken = localStorage.getItem("temp_token");
      if (!tempToken) {
        toast({ description: "Session expired. Please log in again.", variant: "destructive" });
        router.push("/login");
        return;
      }

      const response = await fetch("https://dev-api.instient.ai/2fa/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.removeItem("temp_token");
        toast({ description: "2FA Verified!", variant: "default" });
        router.push("/UserProfilePage");
      } else {
        toast({ description: "Invalid OTP", variant: "destructive" });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast({ description: "Something went wrong!", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-ubuntu bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="text-gray-600 mb-4">Enter the OTP from your authenticator app:</p>
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-2"
        />
        <Button onClick={verifyOtp} className="mt-4 w-full bg-black text-white" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <div className="mt-4">
                <button
                  onClick={() => router.push("/2fa/reset")}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Reset 2FA
                </button>
        </div>
        
      </div>
    </div>
  );
}
