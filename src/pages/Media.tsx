"use client";

import { useState } from "react";
import { Download, FileText, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "../components/sections/Navigation";
import Footer from "../components/sections/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import Image from "next/image";

interface MediaItem {
  id: string;
  title: string;
  type: string;
  image: string;
  category: string;
  videoUrl?: string;
  description?: string;
}

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  fileSize?: string;
  downloads?: number;
  category: string;
  color?: string;
  pdfUrl?: string;
}

interface GlobalData {
  header?: {
    logo?: string;
    navLinks?: { label: string; href: string }[];
  };
  footer?: {
    logo?: string;
    copyright?: string;
    socialLinks?: { platform: string; url: string }[];
    funding?: { text: string; logo: string };
  };
}

interface MediaProps {
  mediaItems: any[];
  publications: any[];
  globalData: GlobalData;
}

export default function Media({ mediaItems = [], publications = [], globalData }: MediaProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  
  // Ensure arrays are valid
  const safeMediaItems = Array.isArray(mediaItems) ? mediaItems : [];
  const safePublications = Array.isArray(publications) ? publications : [];
  
  const photos = safeMediaItems.filter((item) => item?.type === "photo");
  const videos = safeMediaItems.filter((item) => item?.type === "video");

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedPhotoIndex === null) return;
    
    if (direction === "prev") {
      setSelectedPhotoIndex(selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1);
    } else {
      setSelectedPhotoIndex(selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-700", icon: "text-blue-600" },
      emerald: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "text-emerald-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-700", icon: "text-purple-600" },
      amber: { bg: "bg-amber-100", text: "text-amber-700", icon: "text-amber-600" },
      cyan: { bg: "bg-cyan-100", text: "text-cyan-700", icon: "text-cyan-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-700", icon: "text-orange-600" },
      green: { bg: "bg-green-100", text: "text-green-700", icon: "text-green-600" },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <Navigation heroHeading="OSIRRIS" navLinks={globalData?.header?.navLinks || []} logo={globalData?.header?.logo} />

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-3 bg-black/20 hover:bg-black/40 rounded-full z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-3 bg-black/20 hover:bg-black/40 rounded-full z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div 
            className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
          >
            <div className="relative w-full h-full">
              <Image
                src={photos[selectedPhotoIndex].image}
                alt={photos[selectedPhotoIndex].title}
                fill
                style={{ objectFit: "contain" }}
                className="select-none"
              />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <h3 className="text-white text-xl font-bold drop-shadow-md">
                {photos[selectedPhotoIndex].title}
              </h3>
              <p className="text-gray-300 text-sm mt-2 max-w-2xl mx-auto drop-shadow-md">
                 {/* @ts-ignore */}
                 {photos[selectedPhotoIndex].description?.children ? "View details" : photos[selectedPhotoIndex].description}
              </p>
            </div>
          </div>
          
          {/* Close on backdrop click */}
          <div className="absolute inset-0 -z-10" onClick={closeLightbox}></div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
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
        </div>
      </section>

      {/* Photo Gallery Carousel */}
      {photos.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 px-4">
              <h2 className="text-3xl font-bold text-gray-900">Photo Gallery</h2>
              <span className="text-gray-500 text-sm font-medium">{photos.length} Photos</span>
            </div>
            
            <div className="relative px-8 sm:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {photos.map((item, index) => (
                    <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div 
                        className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all h-[400px] group bg-gray-100 cursor-zoom-in"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-white font-bold text-xl">{item.title}</h3>
                          {item.description && (
                             <p className="text-gray-200 text-sm mt-2 line-clamp-2">
                               {/* @ts-ignore */}
                               {item.description.children ? "View details" : item.description}
                             </p>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 lg:-left-12 border-gray-200" />
                <CarouselNext className="-right-4 lg:-right-12 border-gray-200" />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* Video Gallery Carousel */}
      {videos.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 px-4">
              <h2 className="text-3xl font-bold text-gray-900">Video Gallery</h2>
              <span className="text-gray-500 text-sm font-medium">{videos.length} Videos</span>
            </div>

            <div className="relative px-8 sm:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {videos.map((item) => (
                    <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                      <div 
                        className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all h-[350px] group bg-black cursor-pointer"
                        onClick={() => item.videoUrl && window.open(item.videoUrl, "_blank")}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-white/50">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.category}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 lg:-left-12 border-gray-200" />
                <CarouselNext className="-right-4 lg:-right-12 border-gray-200" />
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* Publications Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mr-5 shadow-lg shadow-blue-500/20">
              <FileText className="text-white w-7 h-7" />
            </div>
            <div>
               <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Scientific Publications</h2>
               <p className="text-gray-500 mt-1">Research papers, reports, and technical documents</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.length > 0 ? (
                publications.map((pub) => {
                const colors = getColorClasses(pub.color || "blue");
                return (
                    <div
                    key={pub.id}
                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full group"
                    >
                    <div className="flex items-start justify-between mb-6">
                        <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
                        <FileText className={`${colors.icon} w-7 h-7`} />
                        </div>
                        <span className={`${colors.bg} ${colors.text} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                        {pub.category || "Research"}
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug flex-grow group-hover:text-blue-700 transition-colors">
                        {pub.title}
                    </h3>
                    
                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                         <p className="font-medium">{pub.journal}</p>
                         <p>Year: {pub.year}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6 pt-6 border-t border-gray-100">
                        <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {pub.fileSize || "PDF"}
                        </span>
                        {pub.downloads !== undefined && (
                             <span className="flex items-center">
                                <Download className="w-3 h-3 mr-1" />
                                {pub.downloads} downloads
                            </span>
                        )}
                    </div>
                    
                    <a 
                        href={pub.pdfUrl || "#"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full ${colors.bg} ${colors.text} text-center py-3 rounded-xl font-bold hover:brightness-95 transition-all mt-auto flex items-center justify-center`}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download / View PDF
                    </a>
                    </div>
                );
                })
            ) : (
                <div className="col-span-full text-center py-20 text-gray-500">
                    No publications available yet.
                </div>
            )}
          </div>
        </div>
      </section>

      <Footer heroHeading="OSIRRIS" data={globalData?.footer ? { logo: globalData.footer.logo, copyright: globalData.footer.copyright || "", socialLinks: globalData.footer.socialLinks || [], funding: globalData.footer.funding } : { copyright: "", socialLinks: [] }} />
    </div>
  );
}
