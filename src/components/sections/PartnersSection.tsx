import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

interface PartnersData {
  heading?: string;
  subheading?: string;
  description?: string;
  partners?: { name: string; logo: string }[];
}

export default function PartnersSection({ data }: { data: PartnersData }) {
  const { heading, subheading, description, partners } = data || {};

  const defaultPartners = [
    { name: "Research Institute A", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
    { name: "Agricultural Org B", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
    { name: "Tech Partner C", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
    { name: "University D", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
    { name: "Farm Network E", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
    { name: "IoT Provider F", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
    { name: "Sustainability G", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
    { name: "Innovation Hub H", logo: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=200&h=200&fit=crop" },
  ];

  const partnersToDisplay =
    partners && partners.length > 0 ? partners : defaultPartners;

  return (
    <section
      id="partners"
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-blue-100 text-blue-700 text-xs sm:text-sm font-bold px-4 py-2 rounded-full">
              {subheading || "Collaboration"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            {heading || "Our Partners"}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description ||
              "Working with leading research institutions and agricultural organizations across Europe"}
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {partnersToDisplay.map((partner, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-40 flex items-center justify-center hover:shadow-md transition-all group">
                    {partner.logo ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          style={{ objectFit: "contain" }}
                          className="filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ) : (
                      <span className="font-semibold text-gray-500 group-hover:text-emerald-600 transition-colors text-center">
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
    </section>
  );
}
