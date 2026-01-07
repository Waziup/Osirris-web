'use client';

import { CheckCircle } from 'lucide-react';

interface AboutSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  objectives?: string[];
  content?: string;
}

export default function AboutSection({
  heading = 'About Osirris',
  subheading = 'Innovative Edge AI-Driven Irrigation Management',
  description = 'OSIRRIS is an innovative project developing Edge AI-driven irrigation management systems for sustainable agriculture in Mediterranean regions.',
  objectives = [],
  content = '',
}: AboutSectionProps) {
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

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Objectives */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Objectives
            </h3>
            <div className="space-y-4">
              {objectives && objectives.length > 0 ? (
                objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{objective}</p>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">
                      Semi-autonomous operation with automatic calibration and soil evaluation
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">
                      High user acceptance through advanced user interfaces
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">
                      Easy to deploy and maintain across diverse agricultural settings
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">
                      Cost-effective solution for practical farmer adoption
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {content ||
                `The OSIRRIS system represents a significant advancement in precision agriculture, 
              enabling farmers to make data-driven irrigation decisions that optimize water usage 
              while maintaining or improving crop yields. Our collaborative approach combines 
              expertise in IoT, machine learning, and agricultural science to deliver practical 
              solutions for water-scarce Mediterranean regions.`}
            </p>
            <div className="bg-white p-4 rounded border-l-4 border-orange-500">
              <p className="text-gray-600 italic">
                "Revolutionizing water resource management through intelligent, sensor-based 
                irrigation solutions that benefit both farmers and the environment."
              </p>
            </div>
          </div>
        </div>

        {/* Key Focus Areas */}
        <div className="bg-gray-50 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Key Focus Areas
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">🌾</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sustainability</h4>
              <p className="text-gray-600 text-sm">
                Optimizing water usage for sustainable Mediterranean agriculture
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🤖</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Innovation</h4>
              <p className="text-gray-600 text-sm">
                Edge AI and machine learning for intelligent irrigation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">📡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">IoT Technology</h4>
              <p className="text-gray-600 text-sm">
                Advanced sensors and wireless connectivity for rural areas
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">👥</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Collaboration</h4>
              <p className="text-gray-600 text-sm">
                Partnerships with research institutions and technology providers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
