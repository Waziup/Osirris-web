"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  heroHeading: string;
  navLinks: { label: string; href: string }[];
  logo?: string;
}

export default function Navigation({ heroHeading, navLinks, logo }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Helper function to determine if link should use hash routing or page routing
  const isHashLink = (href: string) => href.startsWith("#");
  const isExternalLink = (href: string) => href.startsWith("http");

  // Helper to handle navigation
  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    
    // If it's a hash link and we're on the home page, scroll to section
    if (isHashLink(href) && pathname === "/") {
      // Let the browser handle hash navigation
      return;
    }
    
    // If it's a hash link but we're not on home page, navigate to home with hash
    if (isHashLink(href) && pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
  };

  const renderLink = (link: { label: string; href: string }, index: number) => {
    const isHash = isHashLink(link.href);
    const isExternal = isExternalLink(link.href);

    if (isExternal) {
      return (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
        >
          {link.label}
        </a>
      );
    }

    if (isHash) {
      // Hash link - use regular anchor tag but with custom handler
      return (
        <a
          key={index}
          href={link.href}
          onClick={(e) => {
            if (pathname !== "/") {
              e.preventDefault();
              window.location.href = "/" + link.href;
            }
          }}
          className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
        >
          {link.label}
        </a>
      );
    }

    // Regular page link - use Next.js Link
    return (
      <Link
        key={index}
        href={link.href}
        className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 transition-all duration-300 transform ${
        isScrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            {logo ? (
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">O</span>
              </div>
            )}
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {heroHeading}
            </span>
          </Link>
          <div className="hidden md:flex space-x-8 lg:space-x-10">
            {navLinks && navLinks.map((link, index) => renderLink(link, index))}
          </div>
          <button className="md:hidden text-gray-700 hover:text-emerald-600 transition-colors" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks && navLinks.map((link, index) => {
              const isHash = isHashLink(link.href);
              const isExternal = isExternalLink(link.href);

              if (isExternal) {
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              }

              if (isHash) {
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (pathname !== "/") {
                        e.preventDefault();
                        window.location.href = "/" + link.href;
                      }
                    }}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
