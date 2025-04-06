"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export default function TwoFactorQRCodePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [qrCode, setQrCode] = useState("");
  const [secretKey, setSecretKey] = useState("");

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

        const response = await fetch("https://dev-api.instient.ai/2fa/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tempToken}`,
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (response.ok) {
          setQrCode(data.qrCode);
          setSecretKey(data.secret);
        } else {
          throw new Error(data.message || "Failed to fetch QR Code");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast({ description: "Failed to load QR Code", variant: "destructive" });
      }
    };

    fetchQRCode();
  }, [toast, router]);

  const formatSecretKey = (key: string) => {
    return key.match(/.{1,4}/g)?.join(" ") || key;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-ubuntu bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>

        {qrCode && (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2">Scan this QR Code in your authenticator app:</p>
            <Image src={qrCode} alt="QR Code" width={200} height={200} priority />
          </div>
        )}

        {secretKey && (
          <div className="mt-4 p-2 bg-gray-200 rounded-lg text-center">
            <p className="text-gray-700 font-medium">Below is Recovery Code:</p>
            <p className="text-lg font-bold text-black-600 break-all">{formatSecretKey(secretKey)}</p>
          </div>
        )}

        <Button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => router.push("/2fa/validateotp")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
