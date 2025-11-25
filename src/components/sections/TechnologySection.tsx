import { Droplets, Zap, Radio } from "lucide-react";

export default function TechnologySection() {
  return (
    <section id="tensiometers" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6">
              <span className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
                IoT Sensors
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Smart Tensiometers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Our advanced IoT-enabled tensiometers provide real-time soil moisture monitoring with unprecedented accuracy. Powered by solar energy and connected via LoRaWAN, these sensors form the backbone of precision irrigation.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Droplets className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Precision Monitoring</h3>
                  <p className="text-base text-gray-600">
                    Continuous soil moisture measurement with ±2% accuracy at multiple depths
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Zap className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Solar Powered</h3>
                  <p className="text-base text-gray-600">
                    100% renewable energy with 7-day battery backup for continuous operation
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Radio className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">LoRaWAN Connectivity</h3>
                  <p className="text-base text-gray-600">
                    Long-range wireless communication up to 15km with ultra-low power consumption
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="bg-emerald-50 px-6 py-3 rounded-xl border-2 border-emerald-200">
                <p className="text-sm text-emerald-700 font-semibold">IP68 Waterproof</p>
              </div>
              <div className="bg-blue-50 px-6 py-3 rounded-xl border-2 border-blue-200">
                <p className="text-sm text-blue-700 font-semibold">5-Year Lifespan</p>
              </div>
              <div className="bg-purple-50 px-6 py-3 rounded-xl border-2 border-purple-200">
                <p className="text-sm text-purple-700 font-semibold">Field Proven</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop"
              alt="Smart Tensiometer"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
