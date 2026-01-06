"use client";

import { ChevronDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSlider({ hero }: { hero: { heading: string; subheading: string; images: string[]; body: string } }) {
  const { heading, subheading, images, body } = hero;
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Helper function to convert relative paths to absolute URLs
  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // If it's a relative path starting with /, it's a local file
    if (imagePath.startsWith("/")) {
      // For local files, we'll use them directly
      // Next.js will serve them from the public folder
      return imagePath;
    }

    // If it doesn't start with /, add it
    return "/" + imagePath;
  };

  // Filter out empty image paths and log for debugging
  const validImages = images && images.length > 0
    ? images.filter((img) => img && img.trim().length > 0).map(getImageUrl)
    : [];

  useEffect(() => {
    // Log for debugging
    console.log("HeroSlider - Raw images:", images);
    console.log("HeroSlider - Valid images:", validImages);
    setDebugInfo(`Images: ${validImages.length}, Raw: ${images?.length || 0}`);
  }, [images, validImages]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <Carousel className="absolute inset-0 w-full h-full">
        <CarouselContent className="w-full h-full">
          {validImages && validImages.length > 0 ? (
            validImages.map((image, index) => (
              <CarouselItem key={index} className="w-full h-full">
                <div className="w-full h-full relative">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                    quality={85}
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`, e);
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded image: ${image}`);
                    }}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="w-full h-full">
              <div className="w-full h-full relative">
                <Image
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop"
                  alt="Smart Agriculture (Placeholder)"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                  priority
                  quality={85}
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-emerald-500/85 to-blue-600/85"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-6 inline-block">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
            EU Horizon 2020 Project
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tight drop-shadow-2xl">
          {heading}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 drop-shadow-lg leading-relaxed">
          {subheading}
        </p>
        <a
          href="#tensiometers"
          className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-xl"
        >
          Explore More <ChevronDown className="w-5 h-5" />
        </a>
      </div>

      {/* Debug info - only show in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs p-2 rounded">
          {debugInfo}
        </div>
      )}
    </section>
  );
}
