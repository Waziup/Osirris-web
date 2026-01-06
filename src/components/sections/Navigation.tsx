"use client";

import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";

interface NavigationProps {
  heroHeading: string;
  navLinks: { label: string; href: string }[];
}

export default function Navigation({ heroHeading, navLinks }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 transition-all duration-300 transform ${
        isScrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {heroHeading}
            </span>
          </div>
          <div className="hidden md:flex space-x-8 lg:space-x-10">
            {navLinks && navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
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
            {navLinks && navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
