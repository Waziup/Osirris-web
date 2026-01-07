import Image from "next/image";
import { MapPin, Sprout, Activity } from "lucide-react";

interface PilotData {
  heading?: string;
  subheading?: string;
  description?: string;
  sites?: {
    name: string;
    image?: string;
    description?: string;
    crop: string;
    status: string;
  }[];
}

export default function PilotsSection({ data }: { data: PilotData }) {
  const { heading, subheading, description, sites } = data || {};

  const defaultPilots = [
    {
      name: "Tunisia",
      crop: "Wheat & Olives",
      status: "Active",
      description:
        "Large-scale deployment in arid regions focusing on water optimization for staple crops.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    },
    {
      name: "France",
      crop: "Vineyards",
      status: "Active",
      description:
        "Precision irrigation testing in Bordeaux vineyards to maintain terroir while reducing water usage.",
      image:
        "https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?w=600&h=400&fit=crop",
    },
    {
      name: "Spain",
      crop: "Citrus",
      status: "Active",
      description:
        "Optimizing citrus yield and fruit quality through AI-driven soil moisture management.",
      image:
        "https://images.unsplash.com/photo-1582092789280-97593d6b9f65?w=600&h=400&fit=crop",
    },
    {
      name: "Italy",
      crop: "Tomatoes",
      status: "Active",
      description:
        "High-density tomato farming pilot utilizing advanced tensiometers for precise hydration.",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop",
    },
  ];

  const pilotsToDisplay = sites && sites.length > 0 ? sites : defaultPilots;

  return (
    <section id="pilots" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
              {subheading || "Field Testing"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            {heading || "Active Pilot Sites"}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description ||
              "Our technology is currently deployed and tested across multiple pilot sites in Europe and North Africa"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {pilotsToDisplay.map((pilot, index) => (
            <div
              key={index}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] max-w-sm group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={
                    pilot.image ||
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
                  }
                  alt={pilot.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      pilot.status === "Active"
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    {pilot.status}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow text-center">
                <div className="flex items-center justify-center mb-2 text-gray-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-1 text-emerald-600" />
                  {pilot.name}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {pilot.crop}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {pilot.description ||
                    "Field testing site focused on optimizing irrigation strategies for local climate conditions."}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-center text-sm text-gray-500">
                  <Sprout className="w-4 h-4 mr-2 text-emerald-500" />
                  <span>Crop Monitoring</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
