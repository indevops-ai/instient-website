"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  const isProd = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview";

  const footerRoutes = [
    { name: "Services", href: "/services" },
    { name: "Clients", href: "/clients" },
    { name: "Careers", href: "/careers" },
    ...(isProd ? [{ name: "Support", href: "https://support.instient.ai/portal/en/home" }] : []),
    { name: "Blogs", href: "/blogs" },
    { name: "About us", href: "/aboutus" },
    { name: "Contact us", href: "/contactus" },
  ];
  
  const policyLinks = [
    { name: "Cookie Policy", href: "/cookiepolicy" },
    { name: "Cookie Settings", href: "/cookiesettings" },
    { name: "Privacy Notice", href: "/privacynotice" },
    { name: "Terms of Use", href: "/termsofuse" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/instient" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/instientllc" },
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@Instient" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/instient" },
    { name: "Glassdoor", icon: "/glassdoor.svg", href: "https://www.glassdoor.co.in/Overview/Working-at-Instient-EI_IE9821788.11,19.htm", isImage: true },
    { name: "Twitter", icon: "/twitter.svg", href: "https://x.com/instient", isImage: true },
  ];

  return (
    <footer className="divide-y divide-gray-200 font-ubuntu">
      {/* Middle Section - Info & Links */}
      <div className="bg-gray-50 text-gray-800 py-6 px-6 text-left lg:text-left">
        <div className="container mx-auto flex flex-col lg:flex-row justify-start lg:justify-between items-start">
          <Link href="/" >
            <Image
              src="/Instient Logo2.svg"
              alt="Logo"
              width={150}
              height={150}
              className="mx-auto mt-2 mb-4 lg:mx-0"
            />
          </Link>
          <div className="flex flex-col lg:flex-row mt-10 lg:mt-0">
            <div>
              <ul className="text-base">
                {footerRoutes.map((route) => (
                  <li key={route.href} className="mt-2 mb-2">
                    <Link href={route.href}  className="hover:text-primary transition">
                      {route.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 lg:mt-0 lg:px-72">
              <ul className="text-base">
                {policyLinks.map((policy) => (
                  <li key={policy.href} className="mt-2 mb-2">
                    <Link href={policy.href} className="hover:text-primary transition">
                      {policy.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Social Media */}
      <div className="text-black bg-gray-50 py-5 px-6 text-left font-ubuntu">
        <div className="flex flex-col lg:flex-row justify-between text-base relative">
          <p>&copy; Instient, 2025. All rights reserved.</p>
          <div className="relative flex flex-col items-center">
            {hoveredIcon && (
              <div
                className="absolute top-[-30px] bg-gray-200 px-2 py-1 rounded-full font-ubuntu text-xs transition-opacity"
                style={{ left: `${tooltipPosition}px` }}
              >
                {hoveredIcon}
              </div>
            )}
            <div className="flex space-x-4 mt-2 lg:mt-0 mr-0 sm:mr-14">
              {socialLinks.map(({ name, icon: Icon, href, isImage }) => (
                <Link key={name} href={href} target="_blank" aria-label={name}>
                  <div
                    className="p-2 bg-gray-200 rounded-full hover:bg-blue-400 transition-all duration-300 transform hover:scale-110 relative"
                    onMouseEnter={(e) => {
                      setHoveredIcon(name);
                      setTooltipPosition(e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2 - 33);
                    }}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    {isImage ? (
                      <Image src={Icon} alt={name} width={19} height={19} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}