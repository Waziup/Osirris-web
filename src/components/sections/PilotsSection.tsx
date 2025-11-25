export default function PilotsSection() {
  const pilots = [
    { name: "Tunisia", crop: "Wheat & Olives", status: "Active" },
    { name: "France", crop: "Vineyards", status: "Active" },
    { name: "Spain", crop: "Citrus", status: "Active" },
    { name: "Italy", crop: "Tomatoes", status: "Active" },
  ];

  return (
    <section id="pilots" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
              Field Testing
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Active Pilot Sites
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our technology is currently deployed and tested across multiple pilot sites in Europe and North Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilots.map((pilot, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-emerald-200 hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pilot.name}</h3>
              <p className="text-gray-600 mb-4">{pilot.crop}</p>
              <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {pilot.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
