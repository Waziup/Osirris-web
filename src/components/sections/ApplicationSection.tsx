import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface ApplicationData {
  heading?: string;
  subheading?: string;
  description?: string;
  features?: {
    title: string;
    description: string;
    detailedDescription?: string;
    image?: string;
  }[];
}

export default function ApplicationSection({ data }: { data: ApplicationData }) {
  const { heading, subheading, description, features } = data || {};

  const defaultFeatures = [
    {
      title: "Water Conservation",
      description: "Significantly reduce water usage without compromising crop yield.",
      detailedDescription:
        "Our AI-driven system precisely calculates the water needs of your crops based on real-time soil moisture data and weather forecasts. This targeted approach prevents over-irrigation, leading to water savings of up to 45% in proven field trials.",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    },
    {
      title: "Crop Quality Enhancement",
      description: "Optimize stress levels to improve fruit quality and sugar content.",
      detailedDescription:
        "For crops like wine grapes, controlled water stress is crucial for quality. OSIRRIS allows you to maintain the perfect moisture balance to enhance flavor profiles, sugar content, and overall harvest quality, as demonstrated in our French vineyard pilots.",
      image:
        "https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?w=800&h=600&fit=crop",
    },
    {
      title: "Remote Management",
      description: "Monitor and control your irrigation systems from anywhere.",
      detailedDescription:
        "Access your farm's data through our intuitive dashboard. Receive alerts, view historical trends, and adjust irrigation schedules remotely. This capability is essential for managing multi-site operations and reducing the need for constant physical presence.",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
    },
  ];

  const featuresToDisplay =
    features && features.length > 0 ? features : defaultFeatures;

  return (
    <section
      id="application"
      className="py-12 sm:py-24 lg:py-32 bg-gradient-to-br from-emerald-50/50 to-blue-50/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
              {subheading || "Applications"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
            {heading || "Intelligent Irrigation Management"}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description ||
              "Our Edge AI algorithms analyze real-time sensor data and weather patterns to optimize irrigation schedules, reducing water consumption while maintaining crop yields."}
          </p>
        </div>

        <div className="space-y-12 sm:space-y-24">
          {featuresToDisplay.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 w-full">
                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src={
                      feature.image ||
                      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop"
                    }
                    alt={feature.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-bold text-lg sm:text-xl">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <h4 className="text-xl font-medium text-emerald-700">
                  {feature.description}
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {feature.detailedDescription}
                </p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span>Proven efficiency in field trials</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                    <span>Easy integration with existing systems</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
