"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Image from "next/image";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export default function TwoFactorAuthPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [secretKey, setSecretKey] = useState(""); // New state for secret key
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const tempToken = localStorage.getItem("temp_token");
        if (!tempToken) {
          toast({ description: "Session expired. Please log in again.", variant: "destructive" });
          router.push("/login");
          return;
        }

        const decodedToken = jwtDecode<CustomJwtPayload>(tempToken);
        const userId = decodedToken?.id;

        if (!userId) {
          toast({ description: "Invalid session. Please log in again.", variant: "destructive" });
          router.push("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/2fa/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tempToken}`,
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        console.log("QR Code API Response:", data);

        if (response.ok) {
          setQrCode(data.qrCode);
          setSecretKey(data.secret); // Store the secret key
        } else {
          throw new Error(data.message || "Failed to fetch QR Code");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast({ description: "Failed to load QR Code", variant: "destructive" });
      }
    };

    fetchQRCode();
  }, [toast,router]);

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const tempToken = localStorage.getItem("temp_token");
      if (!tempToken) {
        toast({ description: "Session expired. Please log in again.", variant: "destructive" });
        router.push("/login");
        return;
      }


      const response = await fetch("http://localhost:5000/2fa/verify", {
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
        <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>

        {qrCode && (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2 text-center">
              Scan this QR Code in your authenticator app:
            </p>
            <Image src={qrCode} alt="QR Code" width={200} height={200} priority />
          </div>
        )}



        {secretKey && (
          <div className="mt-4 p-2 bg-gray-200 rounded-lg text-center">
            <p className="text-gray-700 font-medium">Or enter this secret manually:</p>
            <p className="text-lg font-bold text-blue-600 break-all">{secretKey}</p>
          </div>
        )}

        <p className="text-gray-600 mt-4">Enter the OTP from your authenticator app:</p>
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
      </div>
    </div>
  );
}
