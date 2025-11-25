"use client";

import { useState } from "react";
import { Download, FileText, Play, Leaf, Filter } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  type: "photo" | "video";
  image: string;
  category: string;
}

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  fileSize: string;
  downloads: number;
  category: string;
  color: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Field Testing in Tunisia",
    type: "photo",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop",
    category: "Field Testing",
  },
  {
    id: "2",
    title: "Sensor Installation Process",
    type: "photo",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop",
    category: "Installation",
  },
  {
    id: "3",
    title: "Smart Tensiometer Close-up",
    type: "photo",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop",
    category: "Equipment",
  },
  {
    id: "4",
    title: "Vineyard Irrigation System",
    type: "photo",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=600&fit=crop",
    category: "Application",
  },
  {
    id: "5",
    title: "OSIRRIS System Overview",
    type: "video",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop",
    category: "Demo",
  },
  {
    id: "6",
    title: "AI Algorithm Explanation",
    type: "video",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop",
    category: "Education",
  },
];

const publications: Publication[] = [
  {
    id: "1",
    title: "Edge AI for Precision Irrigation",
    journal: "Journal of Agricultural Technology, Vol. 45, Issue 3",
    year: "2024",
    fileSize: "2.4 MB",
    downloads: 342,
    category: "AI & ML",
    color: "blue",
  },
  {
    id: "2",
    title: "LoRaWAN Network Performance",
    journal: "IEEE IoT Conference Proceedings 2024",
    year: "2024",
    fileSize: "1.8 MB",
    downloads: 287,
    category: "IoT",
    color: "emerald",
  },
  {
    id: "3",
    title: "Water Conservation in Mediterranean Agriculture",
    journal: "Agricultural Water Management Journal",
    year: "2023",
    fileSize: "3.1 MB",
    downloads: 521,
    category: "Sustainability",
    color: "purple",
  },
  {
    id: "4",
    title: "Solar-Powered IoT Sensors for Smart Farming",
    journal: "Renewable Energy Systems Review",
    year: "2023",
    fileSize: "2.7 MB",
    downloads: 198,
    category: "Green Tech",
    color: "amber",
  },
  {
    id: "5",
    title: "Real-time Soil Moisture Monitoring Systems",
    journal: "Sensors and Actuators Journal",
    year: "2023",
    fileSize: "2.2 MB",
    downloads: 412,
    category: "Sensors",
    color: "cyan",
  },
];

export default function Media() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mediaFilter, setMediaFilter] = useState<"all" | "photos" | "videos">("all");
  const [filteredMediaType, setFilteredMediaType] = useState<"photo" | "video" | "all">("all");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const filteredMedia =
    mediaFilter === "all"
      ? mediaItems
      : mediaItems.filter((item) => (mediaFilter === "photos" ? item.type === "photo" : item.type === "video"));

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-700", icon: "text-blue-600" },
      emerald: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "text-emerald-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-700", icon: "text-purple-600" },
      amber: { bg: "bg-amber-100", text: "text-amber-700", icon: "text-amber-600" },
      cyan: { bg: "bg-cyan-100", text: "text-cyan-700", icon: "text-cyan-600" },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="text-white w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                OSIRRIS
              </span>
            </div>
            <div className="hidden md:flex space-x-8 lg:space-x-10">
              <a href="/" className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Home
              </a>
              <a href="/#tensiometers" className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Technology
              </a>
              <a href="/#application" className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Application
              </a>
              <a href="/#pilots" className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Pilots
              </a>
              <a href="/#partners" className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Partners
              </a>
              <a href="/media" className="text-sm lg:text-base font-medium text-emerald-600 border-b-2 border-emerald-600 transition-colors">
                Media
              </a>
              <a href="/blog" className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Blog
              </a>
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
              <a href="/" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Home
              </a>
              <a href="/#tensiometers" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Technology
              </a>
              <a href="/#application" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Application
              </a>
              <a href="/#pilots" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Pilots
              </a>
              <a href="/#partners" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Partners
              </a>
              <a href="/media" className="block py-2 text-emerald-600 font-bold transition-colors">
                Media
              </a>
              <a href="/blog" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Blog
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
                Visual Documentation
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6">
              Media Gallery
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore photos and videos documenting our journey in precision agriculture and IoT innovation
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setMediaFilter("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                mediaFilter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50"
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setMediaFilter("photos")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                mediaFilter === "photos"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setMediaFilter("videos")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                mediaFilter === "videos"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50"
              }`}
            >
              Videos
            </button>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">Photo & Video Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <span className="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  {item.type === "video" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Scientific Publications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub) => {
              const colors = getColorClasses(pub.color);
              return (
                <div
                  key={pub.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
                      <FileText className={`${colors.icon} w-7 h-7`} />
                    </div>
                    <span className={`${colors.bg} ${colors.text} text-xs font-bold px-3 py-1 rounded-full`}>
                      {pub.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{pub.journal}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>
                      <FileText className="w-3 h-3 inline mr-1" />
                      {pub.fileSize}
                    </span>
                    <span>
                      <Download className="w-3 h-3 inline mr-1" />
                      {pub.downloads} downloads
                    </span>
                  </div>
                  <button className={`block w-full ${colors.bg} ${colors.text} text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}>
                    <Download className="w-4 h-4 inline mr-2" />
                    Download PDF
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6 text-emerald-500" />
                <span className="text-xl font-bold">OSIRRIS</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionizing agricultural water management through IoT and AI innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-emerald-500 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-emerald-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/media" className="hover:text-emerald-500 transition-colors">
                    Media
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/#tensiometers" className="hover:text-emerald-500 transition-colors">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="/#pilots" className="hover:text-emerald-500 transition-colors">
                    Pilots
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
                For inquiries about OSIRRIS technology and partnerships, please reach out to our team.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 OSIRRIS Project. All rights reserved. EU Horizon 2020 Initiative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
