"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter(); // ✅ Initialize useRouter
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};
      Object.entries(result.error.format()).forEach(([key, value]) => {
        if (value && "_errors" in value) {
          formattedErrors[key] = value._errors;
        }
      });
      setErrors(formattedErrors);
      toast({ description: "Please fix validation errors", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { name, email, phone, password } = formData;
      const payload = { name, email, phone: phone || null, password, role: "user" };

      console.log("Sending request to API:", payload);

      const response = await fetch("https://dev-api.instient.ai/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"  // Handle CORS
        },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error("Invalid JSON response:", error);
        toast({ description: "Server error: Invalid response", variant: "destructive" });
        return;
      }

      if (response.ok) {
        toast({ description: "Signup successful!", variant: "default" });
        setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });

        // ✅ Redirect to login page
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        console.error("Signup failed:", data);
        toast({ description: data.message || "Signup failed.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({ description: "Something went wrong!", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-ubuntu bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize">
                {key.replace("confirmPassword", "Confirm Password")}
                {key !== "phone" && <span className="text-red-500"> *</span>}
              </label>
              <div className="relative">
                <Input
                  type={
                    key === "password" || key === "confirmPassword"
                      ? showPassword[key]
                        ? "text"
                        : "password"
                      : "text"
                  }
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required={key !== "phone"}
                />
                {(key === "password" || key === "confirmPassword") && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }))}>
                    {showPassword[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              </div>
              {errors[key]?.[0] && <p className="text-red-500 text-xs">{errors[key][0]}</p>}
            </div>
          ))}
          <Button type="submit" className="w-full bg-black text-white" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
        {/* Already a member? Redirect to login */}
        <p className="text-center text-sm mt-4">
          Already a member?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
