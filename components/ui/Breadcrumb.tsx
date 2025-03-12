"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import ServicesBreadcrumb from "./ServicesBreadcrumb";
import CaseStudiesBreadcrumb from "./CaseStudiesBreadcrumb";
//import NewsBreadcrumb from "./NewsBreadcrumb";
import AboutUsBreadcrumb from "./AboutUsBreadcrumb";
import CareersBreadcrumb from "./CareersBreadcrumb";
import CareerPathBreadcrumb from "./CareerPathBreadcrumb";
import { useState } from "react";
import ZohoFormDialog from "./ZohoFormDialog";

const routeMap: Record<string, string> = {
  services: "Services",
  //casestudies: "Case Studies",
  clients: "Clients",
  careers: "Careers",
  //news: "News",
  aboutus: "About us",
  contactus: "Contact us",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  if (pathname === "/") return null;

  const previousPage =
    segments.length > 1
      ? `/${segments.slice(0, segments.length - 1).join("/")}`
      : "/";

  const previousLabel =
    segments.length > 1
      ? routeMap[segments[segments.length - 2]] ||
        formatBreadcrumbText(segments[segments.length - 2])
      : "Home";

  return (
    <>
      <nav className="bg-gray-100 shadow-md w-full px-8 py-3 flex justify-between items-center">
        {/* Desktop View */}
        <div className="hidden md:flex items-center space-x-2 text-base font-ubuntu text-black max-w-7xl">
          <Link href="/" className="hover:text-gray-700 font-medium">
            Home
          </Link>
          {segments.length > 0 && <ChevronRight className="w-5 h-5" />}
          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const label = routeMap[segment.toLowerCase()] || formatBreadcrumbText(segment);

            return (
              <div key={href} className="relative flex items-center space-x-2">
                <Link href={href} className="hover:text-gray-700 font-medium">
                  {label}
                </Link>
                {segment === "services" && <ServicesBreadcrumb />}
                {segment === "casestudies" && <CaseStudiesBreadcrumb />}
                {/* {segment === "news" && <NewsBreadcrumb />} */}
                {segment === "aboutus" && <AboutUsBreadcrumb />}
                {segment === "careers" && <CareersBreadcrumb />}
                {segment === "career-path" && <CareerPathBreadcrumb />}
                {index < segments.length - 1 && <ChevronRight className="w-5 h-5" />}
              </div>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center w-full justify-between">
          <Link
            href={previousPage}
            className="flex items-center text-base sm:text-sm font-medium text-black"
          >
            <ChevronLeft className="w-5 h-5" />
            {previousLabel}
          </Link>
        </div>

        {/* Get in Touch Button */}
        <button
          onClick={openDialog}
          aria-label="Open contact dialog"
          className="bg-gray-300 text-black px-4 py-2 w-full sm:w-auto rounded-md flex items-center justify-center text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-out overflow-hidden relative group"
        >
          <span className="absolute inset-0 w-0 bg-gray-400 transition-all duration-300 ease-out group-hover:w-full origin-left"></span>
          <span className="relative hover:text-white z-10 flex items-center">
            Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
          </span>
        </button>
      </nav>
      <ZohoFormDialog open={isDialogOpen} onClose={closeDialog} />
    </>
  );
}

function formatBreadcrumbText(segment: string): string {
  const exceptions: Record<string, string> = {
    "job-openings": "Experienced",
    internships: "Early Program",
    "career-path": "Career Paths",
    "why-join-instients": "Why Join Instient",
    "life-at-instients": "Life at Instient",
  };

  return (
    exceptions[segment.toLowerCase()] ||
    decodeURIComponent(segment)
      .split("-")
      .map((word) =>
        ["aboutus", "contactus"].includes(segment.toLowerCase())
          ? word.charAt(0).toLowerCase() + word.slice(1)
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")
  );
}
