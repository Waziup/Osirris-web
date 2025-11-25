"use client";

import { useState } from "react";
import { ChevronRight, Calendar, Clock, User, Leaf, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "AI Breakthrough: 45% Water Savings in Tunisia Pilot",
    excerpt:
      "Our latest Edge AI algorithms have achieved unprecedented water conservation results in the Tunisia pilot site. By analyzing real-time soil moisture data and weather patterns, the system optimized irrigation schedules to reduce water consumption by 45% while maintaining crop yields.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
    category: "AI & Machine Learning",
    date: "December 15, 2024",
    readTime: "8 min read",
    author: "Dr. Marie Laurent",
    authorRole: "Project Lead",
    featured: true,
  },
  {
    id: "2",
    title: "French Vineyard Achieves Premium Quality with Smart Irrigation",
    excerpt:
      "Discover how a prestigious French vineyard improved wine quality while reducing water usage by 40% using OSIRRIS technology.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
    category: "Case Study",
    date: "December 10, 2024",
    readTime: "6 min read",
    author: "Jean Dupont",
    authorRole: "Field Engineer",
  },
  {
    id: "3",
    title: "LoRaWAN Network Performance in Mediterranean Climate",
    excerpt:
      "Technical analysis of our LoRaWAN deployment across diverse Mediterranean environments, showing 99.2% uptime and reliable 15km range coverage.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
    category: "Technology",
    date: "December 5, 2024",
    readTime: "10 min read",
    author: "Prof. Ahmed Hassan",
    authorRole: "IoT Specialist",
  },
  {
    id: "4",
    title: "Sustainable Agriculture: The Future of Farming",
    excerpt:
      "Exploring how IoT and AI technologies are transforming traditional agriculture into sustainable, data-driven practices that benefit both farmers and the environment.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
    category: "Sustainability",
    date: "November 28, 2024",
    readTime: "7 min read",
    author: "Sofia Rossi",
    authorRole: "Environmental Scientist",
  },
  {
    id: "5",
    title: "Solar-Powered IoT Sensors: Reducing Carbon Footprint",
    excerpt:
      "Learn how our solar-powered tensiometers eliminate the need for battery replacements, reducing electronic waste and carbon emissions while improving operational efficiency.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
    category: "Green Technology",
    date: "November 20, 2024",
    readTime: "5 min read",
    author: "Dr. Klaus Weber",
    authorRole: "Renewable Energy Expert",
  },
];

export default function Blog() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuredPost = blogPosts.find((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
              <a href="/media" className="text-sm lg:text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                Media
              </a>
              <a href="/blog" className="text-sm lg:text-base font-medium text-emerald-600 border-b-2 border-emerald-600 transition-colors">
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
              <a href="/media" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Media
              </a>
              <a href="/blog" className="block py-2 text-emerald-600 font-bold transition-colors">
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
                Project Updates & Insights
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6">
              OSIRRIS Blog
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Latest news, technical insights, and stories from the field
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full">
                Featured Post
              </span>
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto overflow-hidden group">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {featuredPost.date}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {featuredPost.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">Recent Posts</h2>
              <div className="space-y-8">
                {recentPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                      <div className="sm:col-span-2 relative h-64 sm:h-auto overflow-hidden group">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="sm:col-span-3 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-emerald-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {post.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                              <p className="text-xs text-gray-500">{post.readTime}</p>
                            </div>
                          </div>
                          <button className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center transition-colors">
                            Read <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Categories</h3>
                <div className="space-y-3">
                  {["AI & Machine Learning", "Case Study", "Technology", "Sustainability", "Green Technology"].map(
                    (category, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Subscribe</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get the latest OSIRRIS news and technical insights delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500 mb-3"
                  />
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
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
