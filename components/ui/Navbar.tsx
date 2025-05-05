"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Subpage {
  name: string;
  href: string;
}

interface ServiceItem {
  Service_Title: string;
  slug: string;
}

interface BlogItem {
  Title: string;
  slug: string;
}

async function fetchServices(): Promise<Subpage[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(`${apiUrl}/api/service-instients?populate=*`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch services:", response.status);
    return [];
  }

  const data = await response.json();

  return (
    data?.data?.map((service: ServiceItem) => ({
      name: service.Service_Title,
      href: `/services/${service.slug}`,
    })) || []
  );
}

async function fetchBlogs(): Promise<Subpage[]> {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_API_DOMAIN;

  const response = await fetch(`${apiUrl}/api/blogs?populate=*`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch blogs:", response.status);
    return [];
  }

  const data = await response.json();

  return (
    data?.data?.map((blog: BlogItem) => ({
      name: blog.Title,
      href: `/blogs/${blog.slug}`,
    })) || []
  );
}

const careersPages = [
  {
    name: "Career Paths",
    href: "/careers/career-path",
    subItems: [
      {  name: "Early Program", href: "https://careers.instient.ai/jobs/Careers" },
      { name: "Experienced", href: "https://careers.instient.ai/jobs/Careers" },
    ],
  },
  { name: "Life at Instient", href: "/careers/life-at-instients" },
  { name: "Why Join Instient", href: "/careers/why-join-instients" },
  { name: "Meet our people", href: "/careers/meet-our-people" },
];

const aboutUsPages = [
  { name: "Management & Governance", href: "/aboutus/management-and-governance" },
  { name: "Technology Partners", href: "/aboutus/technology-partners" },
  { name: "Who We Are", href: "/aboutus/who-we-are" },
];

const routes = [
  { name: "Services", href: "/services" },
  { name: "Clients", href: "/clients" },
  { name: "Blogs", href: "/blogs" },
  { name: "About us", href: "/aboutus" },
  { name: "Contact Us", href: "/contact" },  // Added Contact Us here
];

export function Navbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState<Subpage[]>([]);
  const [blogs, setBlogs] = useState<Subpage[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isHomepage = pathname === "/";

  useEffect(() => {
    fetchServices().then(setServices);
    fetchBlogs().then(setBlogs);
  }, []);

  const handleMouseEnter = (menuName: string) => setActiveMenu(menuName);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <div className={`bg-white shadow-md z-50 ${isHomepage ? "sticky top-0" : "relative"}`}>
      <div className="max-w-[100%]">
        <div className={`flex px-4 py-4 items-center justify-between lg:space-x-8 ${className}`} {...props}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 px-4">
            <Image src="/Instient Logo2.svg" alt="Logo" width={100} height={50} priority />
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center p-2 rounded-md text-black-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-start items-center space-x-8 z-50 relative">
            {/* Services */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/services" className="text-black px-4 py-2 border-b-2 border-transparent hover:border-black">
                Services
              </Link>
              {activeMenu === "services" && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  {services.map((service) => (
                    <Link key={service.href} href={service.href} className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Careers */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => handleMouseEnter("careers")}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/careers" className="text-black px-4 py-2 border-b-2 border-transparent hover:border-black">
                Careers
              </Link>
              {activeMenu === "careers" && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50">
                  {careersPages.map((career) => (
                    <div key={career.href} className="group relative">
                      <Link href={career.href} className="block px-4 py-2 text-sm text-black hover:bg-gray-200 flex justify-between items-center">
                        {career.name}
                        {career.subItems && <ChevronRight size={16} />}
                      </Link>
                      {career.subItems && (
                        <div className="absolute top-0 left-full w-48 bg-white shadow-lg rounded-md py-2 z-50 hidden group-hover:block">
                          {career.subItems.map((sub) => (
                            <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Blogs */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => handleMouseEnter("blogs")}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/blogs" className="text-black px-4 py-2 border-b-2 border-transparent hover:border-black">
                Blog
              </Link>
              {activeMenu === "blogs" && (
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-50">
                  {blogs.map((blog) => (
                    <Link key={blog.href} href={blog.href} className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                      {blog.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => handleMouseEnter("aboutus")}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/aboutus" className="text-black px-4 py-2 border-b-2 border-transparent hover:border-black">
                About Us
              </Link>
              {activeMenu === "aboutus" && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-50">
                  {aboutUsPages.map((page) => (
                    <Link key={page.href} href={page.href} className="block px-4 py-2 text-sm text-black hover:bg-gray-200">
                      {page.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Us */}
            <div className="relative group cursor-pointer">
              <Link href="/contact" className="text-black px-4 py-2 border-b-2 border-transparent hover:border-black">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden flex flex-col space-y-2 px-6 py-4 text-left bg-white z-50 shadow-md absolute top-full left-0 w-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-base font-medium text-black py-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
