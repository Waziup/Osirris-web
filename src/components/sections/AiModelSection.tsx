import { Zap, Brain, Database, BarChart3 } from "lucide-react";

interface AiModelData {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: string;
  features?: { title: string; description: string; icon?: string }[];
}

const iconMap: { [key: string]: any } = {
  zap: Zap,
  brain: Brain,
  database: Database,
  chart: BarChart3,
};

export default function AiModelSection({ data }: { data: AiModelData }) {
  const { heading, subheading, description, image, features } = data || {};

  return (
    <section id="ai-model" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="mb-12 lg:mb-0">
            {subheading && (
              <div className="inline-block mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
                  {subheading}
                </span>
              </div>
            )}
            
            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {heading}
              </h2>
            )}

            {description && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {description}
              </p>
            )}

            {features && (
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon ? iconMap[feature.icon.toLowerCase()] || Brain : Brain;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-video lg:aspect-square flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="AI Model Architecture"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <Brain className="w-24 h-24 mb-4 opacity-20" />
                  <span className="text-sm">Model Architecture Diagram</span>
                </div>
              )}
            </div>
            {/* Decorative background element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-100/50 to-blue-100/50 rounded-full blur-3xl opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
