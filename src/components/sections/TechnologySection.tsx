import { useState } from "react";
import {
  Droplets,
  Zap,
  Radio,
  Wifi,
  Battery,
  Activity,
  Thermometer,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

interface TechnologyData {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: string;
  gallery?: string[];
  features?: {
    title: string;
    description: string;
    detailedDescription?: string;
    icon?: string;
  }[];
}

const iconMap: Record<string, any> = {
  droplets: Droplets,
  zap: Zap,
  radio: Radio,
  wifi: Wifi,
  battery: Battery,
  activity: Activity,
  thermometer: Thermometer,
  cpu: Cpu,
  shield: ShieldCheck,
};

export default function TechnologySection({ data }: { data: TechnologyData }) {
  const { heading, subheading, description, image, gallery, features } =
    data || {};

  const defaultMainImage =
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=1000&fit=crop";

  const defaultGallery = [
    defaultMainImage,
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?w=400&h=400&fit=crop",
  ];

  const initialMainImage = image || defaultMainImage;
  const images =
    gallery && gallery.length > 0
      ? [initialMainImage, ...gallery]
      : defaultGallery;
  
  // Ensure unique images only
  const uniqueImages = Array.from(new Set(images));

  const [activeImage, setActiveImage] = useState(uniqueImages[0]);

  const defaultFeatures = [
    {
      title: "Precision Monitoring",
      description: "±2% accuracy at multiple depths",
      detailedDescription:
        "High-fidelity soil moisture sensors calibrated for diverse soil types, providing reliable data for critical irrigation decisions.",
      icon: "droplets",
    },
    {
      title: "Solar Powered",
      description: "100% renewable energy",
      detailedDescription:
        "Integrated solar panel with a high-capacity Li-Ion battery ensures 24/7 operation even during extended cloudy periods.",
      icon: "zap",
    },
    {
      title: "LoRaWAN Connectivity",
      description: "15km+ wireless range",
      detailedDescription:
        "Long-range, low-power wide-area network technology allows for deep rural deployment without cellular coverage dependence.",
      icon: "radio",
    },
    {
      title: "Rugged Design",
      description: "IP68 Waterproof Rating",
      detailedDescription:
        "Industrial-grade enclosure designed to withstand extreme temperatures, moisture, and chemical exposure in agricultural environments.",
      icon: "shield",
    },
  ];

  const featuresToDisplay =
    features && features.length > 0 ? features : defaultFeatures;

  return (
    <section id="tensiometers" className="py-12 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Product Image Gallery */}
          <div className="order-1 lg:order-1 lg:sticky lg:top-24">
            <div className="relative h-[300px] sm:h-[500px] lg:h-[600px] w-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-2xl mb-6">
              <Image
                src={activeImage}
                alt="Smart Tensiometer Product"
                fill
                style={{ objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700 cursor-zoom-in"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-white/50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Model
                </p>
                <p className="text-xl font-black text-gray-900">OSIRRIS T-1000</p>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {uniqueImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-16 sm:h-24 w-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === img
                      ? "border-emerald-500 shadow-md scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Content & Features */}
          <div className="order-2 lg:order-2">
            <div className="inline-block mb-6">
              <span className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
                {subheading || "IoT Sensors"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {heading || "Next-Gen Smart Tensiometers"}
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              {description ||
                "Our advanced IoT-enabled tensiometers provide real-time soil moisture monitoring with unprecedented accuracy. Designed for the harsh realities of the field, they are the reliable eyes and ears of your smart farm."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {featuresToDisplay.map((feature, index) => {
                const IconComponent =
                  iconMap[feature.icon?.toLowerCase() || "activity"] || Activity;

                return (
                  <div key={index} className="flex flex-col">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/10 mb-5">
                      <IconComponent className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-emerald-700 font-medium text-sm mb-3">
                      {feature.description}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feature.detailedDescription}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 pt-10 border-t border-gray-100 flex flex-wrap gap-4">
              <div className="px-5 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Made in EU
              </div>
              <div className="px-5 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                5-Year Warranty
              </div>
              <div className="px-5 py-2 bg-gray-50 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
