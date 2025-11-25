import Navigation from "../components/sections/Navigation";
import TechnologySection from "../components/sections/TechnologySection";
import ApplicationSection from "../components/sections/ApplicationSection";
import PilotsSection from "../components/sections/PilotsSection";
import PartnersSection from "../components/sections/PartnersSection";
import Footer from "../components/sections/Footer";
import HeroSlider from "../components/sections/HeroSlider";

interface HeroData {
  heading: string;
  subheading: string;
  images: string[];
}

interface TinaData {
  title: string;
  hero: HeroData;
  body: string;
}

interface HomeProps {
  tinaData: TinaData;
}

export default function Home({ tinaData }: HomeProps) {
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
