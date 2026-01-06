import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface PartnersData {
  heading?: string;
  subheading?: string;
  description?: string;
  partners?: { name: string; logo?: string }[];
}

export default function PartnersSection({ data }: { data: PartnersData }) {
  const { heading, subheading, description, partners } = data || {};

  const hasPartners = partners && partners.length > 0;

  return (
    <section
      id="partners"
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {subheading && (
            <div className="inline-block mb-6">
              <span className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
                {subheading}
              </span>
            </div>
          )}

          {heading && (
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              {heading}
            </h2>
          )}

          {description && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Partners */}
        {hasPartners ? (
          <div className="flex justify-center">
            <div className="w-full max-w-6xl px-8">
              <Carousel
                opts={{ align: "center", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {partners.map((partner, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-40 w-full flex items-center justify-center hover:shadow-lg transition-all group">
                        {partner.logo ? (
                          <div className="w-28 h-28 flex items-center justify-center overflow-hidden">
                            <img
                              src={partner.logo}
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.style.display = "none";
                              }}
                            />
                          </div>
                        ) : (
                          <span className="font-semibold text-gray-500 group-hover:text-emerald-600 transition-colors text-center px-2">
                            {partner.name}
                          </span>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="hidden md:flex -left-12 border-gray-200 text-gray-500 hover:text-emerald-600" />
                <CarouselNext className="hidden md:flex -right-12 border-gray-200 text-gray-500 hover:text-emerald-600" />
              </Carousel>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="text-center text-gray-500 italic">
            Partner information will be published soon.
          </div>
        )}
      </div>
    </section>
  );
}
