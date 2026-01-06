"use client";

import { ChevronDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

export default function HeroSlider({ hero }: { hero: { heading: string; subheading: string; images: string[]; body: string } }) {
  const { heading, subheading, images, body } = hero;

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

  // Filter out empty image paths
  const validImages = images && images.length > 0
    ? images.filter((img) => img && img.trim().length > 0).map(getImageUrl)
    : [];

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
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`);
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
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/40 via-emerald-500/30 to-blue-600/40"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-6 inline-block">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
            EU Horizon 2020 Project
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tight drop-shadow-2xl">
          {heading}
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 sm:mb-8 font-light drop-shadow-lg">
          {subheading}
        </p>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-light">
          {body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <a
            href="#tensiometers"
            className="w-full sm:w-auto bg-white text-emerald-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 text-base sm:text-lg"
          >
            Discover Technology
          </a>
          <a
            href="#pilots"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold hover:bg-white/20 transition-all shadow-2xl hover:scale-105 text-base sm:text-lg"
          >
            View Pilots
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white w-8 h-8 opacity-75" />
      </div>
    </section>
  );
}
