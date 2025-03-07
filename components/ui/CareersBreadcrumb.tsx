"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import CareerPathBreadcrumb from "./CareerPathBreadcrumb"; // Importing CareerPathBreadcrumb

const careersPages = [
  { name: "Career Paths", href: "/careers/career-path", hasDropdown: false }, // Now a parent page
  { name: "Life at Instient", href: "/careers/life-at-instients" },
  { name: "Why Join Instient", href: "/careers/why-join-instients"},
  { name: "Meet our people", href: "/careers/meet-our-people"},
];

export default function CareersBreadcrumb() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative cursor-pointer" ref={triggerRef}>
      {/* Trigger Icon */}
      <div className="flex items-center" onMouseEnter={() => setIsOpen(true)}>
        <ChevronDown className="w-4 h-4 ml-1" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-50"
          onMouseEnter={() => setIsOpen(true)} // Keep open when hovering over dropdown
          onMouseLeave={() => setIsOpen(false)} // Close when leaving dropdown
          ref={dropdownRef}
        >
          {careersPages.map((page) => (
            <div key={page.href} className="relative">
              <Link
                href={page.href}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
              >
                {page.name}
              </Link>

              {/* Insert CareerPathBreadcrumb under "Career Path" */}
              {page.hasDropdown && <CareerPathBreadcrumb />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
