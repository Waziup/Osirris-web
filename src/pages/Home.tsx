"use client";

import Navigation from "../components/sections/Navigation";
import HeroSlider from "../components/sections/HeroSlider";
import AboutSection from "../components/sections/AboutSection";
import TechnologySection from "../components/sections/TechnologySection";
import AiModelSection from "../components/sections/AiModelSection";
import PilotsSection from "../components/sections/PilotsSection";
import PartnersSection from "../components/sections/PartnersSection";
import Footer from "../components/sections/Footer";

interface HeroData {
  displayMode?: "text" | "logo";
  logo?: string;
  heading: string;
  subheading: string;
  images: string[];
}

interface TinaData {
  title: string;
  hero: HeroData;
  about?: any;
  technology: any;
  aiModel: any;
  pilots: any;
  partners: any;
  body: string;
}

interface GlobalData {
  header: {
    logo?: string;
    navLinks: { label: string; href: string }[];
  };
  footer: {
    logo?: string;
    copyright: string;
    socialLinks: { platform: string; url: string }[];
    funding?: {
      text: string;
      logo: string;
    };
  };
}

interface HomeProps {
  tinaData: TinaData;
  globalData: GlobalData;
}

export default function Home({ tinaData, globalData }: HomeProps) {
  // Provide defaults for missing data
  const safeData = {
    title: tinaData?.title || "Home",
    hero: tinaData?.hero || { displayMode: "text", logo: undefined, heading: "Welcome", subheading: "", images: [] },
    about: tinaData?.about || {},
    technology: tinaData?.technology || {},
    aiModel: tinaData?.aiModel || {},
    pilots: tinaData?.pilots || {},
    partners: tinaData?.partners || {},
    body: tinaData?.body || "",
  };
  const { title, hero, about, technology, aiModel, pilots, partners, body } = safeData;
  const { header, footer } = globalData || { header: { navLinks: [] }, footer: { copyright: "", socialLinks: [] } };

  return (
    <div className="bg-gray-50 text-gray-900">
      <Navigation heroHeading={hero?.heading || "OSIRRIS"} navLinks={header?.navLinks || []} logo={header?.logo} />

      <HeroSlider hero={{ 
        displayMode: hero.displayMode,
        logo: hero.logo,
        heading: hero.heading, 
        subheading: hero.subheading, 
        images: hero.images, 
        body: body 
      }} />

      <AboutSection
        heading={about?.heading}
        subheading={about?.subheading}
        description={about?.description}
        objectives={about?.objectives}
        focusAreas={about?.focusAreas}
        content={about?.content}
      />

      <TechnologySection data={technology} />

      <AiModelSection data={aiModel} />

      <PilotsSection data={pilots} />

      <PartnersSection data={partners} />

      <Footer heroHeading={hero.heading} data={footer} />
    </div>
  );
}
