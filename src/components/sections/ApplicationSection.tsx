import { Award, TrendingUp, Users } from "lucide-react";

export default function ApplicationSection() {
  return (
    <section id="application" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
              Edge AI
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Intelligent Irrigation Management
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our Edge AI algorithms analyze real-time sensor data and weather patterns to optimize irrigation schedules, reducing water consumption while maintaining crop yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <TrendingUp className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">45% Water Savings</h3>
            <p className="text-gray-600 leading-relaxed">
              Proven results in Tunisia pilot demonstrating significant water conservation without compromising crop quality.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Award className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              French vineyard achieved premium wine quality while reducing water usage by 40% using OSIRRIS technology.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Users className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Site Deployment</h3>
            <p className="text-gray-600 leading-relaxed">
              Successfully deployed across Mediterranean region with diverse crops and climate conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
