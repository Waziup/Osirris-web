"use client";

import { ChevronDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

interface HeroData {
  heading: string;
  subheading: string;
  body?: string;
  images: string[];
}

export default function HeroSlider({ hero }: { hero: HeroData }) {
  const { heading, subheading, body, images } = hero;

  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    if (imagePath.startsWith("/")) return imagePath;
    return `/${imagePath}`;
  };

  const validImages =
    images?.filter((img) => img && img.trim().length > 0).map(getImageUrl) || [];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* FULLSCREEN CAROUSEL */}
      {validImages.length > 0 && (
        <Carousel className="absolute inset-0 w-full min-h-screen">
          <CarouselContent className="w-full min-h-screen">
            {validImages.map((image, index) => (
              <CarouselItem
                key={index}
                className="relative w-full min-h-screen"
              >
                <img
                  src={image}
                  alt={`Hero slide ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {/* FALLBACK BACKGROUND IF NO IMAGES */}
      {validImages.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600" />
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-6 inline-block">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
            EU Horizon 2020 Project
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl">
          {heading}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 drop-shadow-lg max-w-4xl mx-auto">
          {subheading}
        </p>

        {body && (
          <p className="text-base sm:text-lg text-white/85 mb-12 max-w-3xl mx-auto leading-relaxed">
            {body}
          </p>
        )}

        <a
          href="#tensiometers"
          className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-xl"
        >
          Explore More <ChevronDown className="w-5 h-5" />
        </a>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/80 z-10">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
