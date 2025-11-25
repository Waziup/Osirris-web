import Navigation from "../components/sections/Navigation";
import TechnologySection from "../components/sections/TechnologySection";
import ApplicationSection from "../components/sections/ApplicationSection";
import PilotsSection from "../components/sections/PilotsSection";
import PartnersSection from "../components/sections/PartnersSection";
import Footer from "../components/sections/Footer";
import { APP_LOGO, APP_TITLE } from "@/const";
import { ChevronDown } from "lucide-react";
import HeroSlider from "../components/sections/HeroSlider";

export default function Home({ tinaData }) {


  const { title, hero, body } = tinaData;

  return (
    <div className="bg-gray-50 text-gray-900">
      <Navigation heroHeading={hero.heading} />

      <HeroSlider hero={{ heading: hero.heading, subheading: hero.subheading, images: hero.images, body: body }} />

      <TechnologySection />

      <ApplicationSection />

      <PilotsSection />

      <PartnersSection />

      <Footer heroHeading={hero.heading} />
    </div>
  );
}
