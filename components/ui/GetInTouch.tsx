"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { JSX } from "react";

interface GetInTouchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GetInTouchItem {
  industry: string;
  purpose: string;
}

export default function GetInTouch({ isOpen, onClose }: GetInTouchProps): JSX.Element {
  const { toast } = useToast();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [industries, setIndustries] = React.useState<string[]>([]);
  const [purposes, setPurposes] = React.useState<string[]>([]);

  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  interface GetInTouchResponse {
    data: GetInTouchItem[];
  }
  
  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("https://api.instient.ai/api/getintouches", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
        });
  
        const result: GetInTouchResponse = await response.json();
  
        if (response.ok) {
          const uniqueIndustries: string[] = [...new Set(result.data.map((item) => item.industry))];
          const uniquePurposes: string[] = [...new Set(result.data.map((item) => item.purpose))];
  
          setIndustries(uniqueIndustries);
          setPurposes(uniquePurposes);
        } else {
          console.error("Error fetching options:", result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchOptions();
  }, [apiToken]);
  

  const isFormValid = firstName && lastName && email && jobTitle && company && industry && purpose && message && isChecked;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({ description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    try {
      const response = await fetch("https://api.instient.ai/api/contact-requests", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            firstName,
            lastName,
            email,
            jobTitle,
            phone,
            company,
            industry,
            purpose,
            message,
            consent: isChecked,
          },
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast({ description: "Thank you! Our team will get in touch with you soon." });
        onClose();
      } else {
        toast({ description: "Something went wrong. Please try again.", variant: "destructive" });
        console.error("Server Error:", responseData);
      }
    } catch (error) {
      toast({ description: "Error submitting form.", variant: "destructive" });
      console.error("Submission Error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-lg py-5 px-4 font-ubuntu flex justify-center max-h-[90vh] overflow-y-auto">
        <div className="w-full space-y-3">
          <DialogHeader className="flex-row items-center justify-between space-x-4 px-3 mt-4">
            <DialogTitle className="text-lg font-medium">Get in touch</DialogTitle>
            <Image src="/Instient Logo.svg" alt="Logo" width={100} height={100} priority />
          </DialogHeader>
          <div className="px-3">
            <form className="space-y-3 pb-6" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium mb-1">First Name <span className="text-red-500">*</span></label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              
              <label className="block text-sm font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              
              <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              
              <label className="block text-sm font-medium mb-1">Job Title <span className="text-red-500">*</span></label>
              <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />

              <label className="block text-sm font-medium mb-1">Phone no <span className="text-red-500">*</span></label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
              
              <label className="block text-sm font-medium mb-1">Company <span className="text-red-500">*</span></label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} required />
              
              <label className="block text-sm font-medium mb-1">Industry <span className="text-red-500">*</span></label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger><SelectValue placeholder="Select Industry" /></SelectTrigger>
                <SelectContent>{industries.map((ind) => (<SelectItem key={ind} value={ind}>{ind}</SelectItem>))}</SelectContent>
              </Select>

              <label className="block text-sm font-medium mb-1">Purpose of contact <span className="text-red-500">*</span></label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger><SelectValue placeholder="Select Purpose" /></SelectTrigger>
                <SelectContent>{purposes.map((pur) => (<SelectItem key={pur} value={pur}>{pur}</SelectItem>))}</SelectContent>
              </Select>

              <label className="block text-sm font-medium mb-1">Message <span className="text-red-500">*</span></label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required />

              <div className="flex items-center space-x-2">
                <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked((prev) => !prev)} />
                <label className="text-xs font-normal leading-none">
                  I agree to Instient collecting and processing my personal data and confirm that I&apos;m not a robot.
                </label>
              </div>

              <Button type="submit" className="bg-black text-white rounded-full">Submit <ArrowRight className="w-4 h-4" /></Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
