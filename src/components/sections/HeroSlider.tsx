"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useState, useEffect } from "react";

interface HeroData {
  heading: string;
  subheading: string;
  body?: string;
  images: string[];
}

export default function HeroSlider({ hero }: { hero: HeroData }) {
  const { heading, subheading, body, images } = hero;
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
    if (imagePath.startsWith("/")) return imagePath;
    return `/${imagePath}`;
  };

  const validImages =
    images?.filter((img) => img && img.trim().length > 0).map(getImageUrl) || [];

  // Use placeholder if no images
  const imagesToDisplay = validImages.length > 0 ? validImages : [
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop"
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    // Auto-play: change slide every 5 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      api.off("select", onSelect);
      clearInterval(interval);
    };
  }, [api]);

  return (
    <section id="hero" className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Carousel */}
      <Carousel 
        className="absolute inset-0 w-full h-full"
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="w-full h-full ml-0">
          {imagesToDisplay.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full p-0">
              <div className="w-full h-full relative">
                <img
                  src={image}
                  alt={`Hero slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image}`);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white border-0 rounded-full w-12 h-12 flex items-center justify-center" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white border-0 rounded-full w-12 h-12 flex items-center justify-center" />
      </Carousel>

      {/* Overlay gradient - semi-transparent for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-20/10 via-emerald-100/65 to-blue-200/10"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-4 sm:mb-6 inline-block">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border border-white/30">
            EU Horizon 2020 Project
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 drop-shadow-2xl">
          {heading}
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-6 drop-shadow-lg max-w-4xl mx-auto">
          {subheading}
        </p>

        {body && (
          <p className="text-sm sm:text-lg text-white/85 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            {body}
          </p>
        )}

        <a
          href="#tensiometers"
          className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base rounded-full hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-xl"
        >
          Explore More <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {imagesToDisplay.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current - 1 ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce text-white/80 z-10">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
