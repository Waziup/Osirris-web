export default function PartnersSection() {
  const partners = [
    "Research Institute A",
    "Agricultural Org B",
    "Tech Partner C",
    "University D",
    "Farm Network E",
    "IoT Provider F",
    "Sustainability G",
    "Innovation Hub H",
  ];

  return (
    <section id="partners" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
              Collaboration
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Our Partners
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Working with leading research institutions and agricultural organizations across Europe
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center text-center hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <p className="font-semibold text-gray-700">{partner}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
