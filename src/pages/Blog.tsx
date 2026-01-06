"use client";

import { useState } from "react";
import { ChevronRight, Calendar, Clock, ArrowRight, Search, Mail } from "lucide-react";
import Navigation from "../components/sections/Navigation";
import Footer from "../components/sections/Footer";
import Image from "next/image";

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
  _sys?: { filename: string };
}

interface GlobalData {
  header: {
    logo?: string;
    navLinks: { label: string; href: string }[];
  };
  footer: {
    logo?: string;
    copyright: string;
    socialLinks: { platform: string; url: string }[];
    funding?: { text: string; logo: string };
  };
}

interface BlogProps {
  posts: BlogPost[];
  globalData: GlobalData;
}

export default function Blog({ posts = [], globalData = { header: { navLinks: [] }, footer: { copyright: "", socialLinks: [] } } }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure posts is an array
  const safePosts = Array.isArray(posts) ? posts : [];

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(safePosts.map((post) => post.category)))];

  // Filter posts
  const filteredPosts = safePosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts && filteredPosts.length > 0 ? filteredPosts.find((post) => post.featured) : undefined;
  const regularPosts = featuredPost ? filteredPosts.filter((post) => post.id !== featuredPost?.id) : filteredPosts;

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <Navigation heroHeading="OSIRRIS" navLinks={globalData?.header?.navLinks || []} logo={globalData?.header?.logo} />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden mt-16">
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
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1 bg-white border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto overflow-hidden group">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Featured
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {featuredPost.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    <a 
                      href={`/blog/${featuredPost._sys?.filename}`}
                      className="hidden sm:flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
                    >
                      Read Article <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar */}
            <div className="lg:w-1/4 space-y-8">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscribe */}
              <div className="bg-gradient-to-br from-emerald-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-bold">Newsletter</h3>
                </div>
                <p className="text-emerald-100 text-sm mb-4">
                  Get the latest updates delivered to your inbox.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-emerald-200/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full bg-white text-emerald-700 font-bold py-2 rounded-lg hover:bg-emerald-50 transition-colors shadow-md">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                         <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                {post.author.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{post.author}</span>
                         </div>
                         <a 
                            href={`/blog/${post._sys?.filename}`}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center"
                         >
                            Read <ChevronRight className="w-4 h-4 ml-1" />
                         </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {regularPosts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <p className="text-gray-500">No posts found matching your criteria.</p>
                    <button 
                        onClick={() => {setSelectedCategory("All"); setSearchQuery("");}}
                        className="mt-4 text-emerald-600 font-bold hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer heroHeading="OSIRRIS" data={globalData?.footer ? { logo: globalData.footer.logo, copyright: globalData.footer.copyright || "", socialLinks: globalData.footer.socialLinks || [], funding: globalData.footer.funding } : { copyright: "", socialLinks: [] }} />
    </div>
  );
}
