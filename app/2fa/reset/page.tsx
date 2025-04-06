"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ResetTwoFactorPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://dev-api.instient.ai/2fa/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, secret }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to reset 2FA");

      toast({ description: "2FA Reset Successfully. Please scan the new QR Code.", variant: "default" });
      router.push("/2fa/qr");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error resetting 2FA";
      toast({ description: errorMessage, variant: "destructive" });
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Reset 2FA</h2>
        <p className="text-gray-600 mb-4">Enter your Email and Secret Key to reset 2FA.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter Email"
        />
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter Secret Key"
        />
        <Button onClick={handleReset} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "Processing..." : "Reset 2FA"}
        </Button>
      </div>
    </div>
  );
}
