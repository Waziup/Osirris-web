'use client';

import { CheckCircle } from 'lucide-react';

interface AboutSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  objectives?: string[];
  content?: string;
  focusAreas?: { title: string; icon: string }[];
}

export default function AboutSection({
  heading = 'About Osirris',
  subheading = 'Innovative Edge AI-Driven Irrigation Management',
  description = 'OSIRRIS is an innovative project developing Edge AI-driven irrigation management systems for sustainable agriculture in Mediterranean regions.',
  objectives = [],
  focusAreas = [],
  content = '',
}: AboutSectionProps) {
  // Default focus areas if none provided
  const defaultFocusAreas = [
    { title: 'Sustainability', icon: '🌾' },
    { title: 'AI Innovation', icon: '🤖' },
    { title: 'IoT Technology', icon: '📡' },
    { title: 'Collaboration', icon: '👥' },
  ];

  const displayFocusAreas = focusAreas && focusAreas.length > 0 ? focusAreas : defaultFocusAreas;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {heading}
          </h2>
          <p className="text-xl text-orange-500 font-semibold mb-4">
            {subheading}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Main Content & Focus Areas Side-by-Side */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Objectives Column */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center lg:text-left">
              Our Objectives
            </h3>
            <div className="space-y-6 flex-grow">
              {objectives && objectives.length > 0 ? (
                objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium">{objective}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium">
                      Semi-autonomous operation with automatic calibration and soil evaluation
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium">
                      High user acceptance through advanced user interfaces
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium">
                      Easy to deploy and maintain across diverse agricultural settings
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium">
                      Cost-effective solution for practical farmer adoption
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Key Focus Areas Column */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-blue-100/50 flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Key Focus Areas
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              {displayFocusAreas.map((area, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white w-20 h-20 rounded-2xl shadow-sm border border-orange-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{area.icon}</span>
                  </div>
                  <h4 className="font-bold text-gray-900">{area.title}</h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
