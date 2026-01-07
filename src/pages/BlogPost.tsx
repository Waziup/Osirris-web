"use client";

import { Calendar, Clock, ArrowLeft, User, Leaf } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Navigation from "../components/sections/Navigation";
import Footer from "../components/sections/Footer";

interface BlogPostProps {
  post: {
    title: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    authorRole: string;
    body: string;
  };
  globalData?: {
    header?: { logo?: string; navLinks?: { label: string; href: string }[] };
    footer?: { logo?: string; copyright?: string; socialLinks?: { platform: string; url: string }[]; funding?: { text: string; logo: string } };
  };
}

export default function BlogPost({ post, globalData = { header: { navLinks: [] }, footer: { copyright: "", socialLinks: [] } } }: BlogPostProps) {
  // Ensure post has all required fields
  const safePost = {
    title: post?.title || "Untitled",
    image: post?.image || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
    category: post?.category || "General",
    date: post?.date || new Date().toISOString(),
    readTime: post?.readTime || "5 min read",
    author: post?.author || "Osirris Team",
    authorRole: post?.authorRole || "Contributor",
    body: post?.body || "",
  };
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navigation heroHeading="OSIRRIS" navLinks={globalData?.header?.navLinks || []} logo={globalData?.header?.logo} />

      <article className="flex-grow pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <a
            href="/blog"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </a>
          
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-4 py-1.5 rounded-full">
              {safePost.category}
            </span>
            <span className="text-gray-500 flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(safePost.date).toLocaleDateString()}
            </span>
            <span className="text-gray-500 flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2" />
              {safePost.readTime}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
            {safePost.title}
          </h1>

          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {safePost.author.charAt(0)}
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">{safePost.author}</p>
              <p className="text-sm text-gray-500">{safePost.authorRole}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={safePost.image}
              alt={safePost.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-emerald hover:prose-a:text-emerald-600">
          <ReactMarkdown>{safePost.body}</ReactMarkdown>
        </div>
      </article>

      <Footer heroHeading="OSIRRIS" data={globalData?.footer ? { logo: globalData.footer.logo, copyright: globalData.footer.copyright || "", socialLinks: globalData.footer.socialLinks || [], funding: globalData.footer.funding } : { copyright: "", socialLinks: [] }} />
    </div>
  );
}
