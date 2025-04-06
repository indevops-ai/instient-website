"use client";
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(formData);
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
      const response = await fetch("https://dev-api.instient.ai/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.requires2FA) {
          localStorage.setItem("temp_token", data.token);
          router.push("/2fa/validateotp");
        } else {
          localStorage.setItem("token", data.token);
          router.push("/UserProfilePage");
        }
        toast({ description: "Login successful!", variant: "default" });
        setFormData({ email: "", password: "" });
      } else {
        toast({ description: data.message || "Login failed.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({ description: "Something went wrong!", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-ubuntu bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Email<span className="text-red-500"> *</span></label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email?.[0] && <p className="text-red-500 text-xs">{errors.email[0]}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Password<span className="text-red-500"> *</span></label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password?.[0] && <p className="text-red-500 text-xs">{errors.password[0]}</p>}
          </div>
          <Button type="submit" className="w-full bg-black text-white" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
