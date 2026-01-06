"use client";

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
  technology: any;
  application: any;
  pilots: any;
  partners: any;
  body: string;
}

interface GlobalData {
  header: {
    navLinks: { label: string; href: string }[];
  };
  footer: {
    copyright: string;
    socialLinks: { platform: string; url: string }[];
  };
}

interface HomeProps {
  tinaData: TinaData;
  globalData: GlobalData;
}

export default function Home({ tinaData, globalData }: HomeProps) {
  const { title, hero, technology, application, pilots, partners, body } = tinaData;
  const { header, footer } = globalData;

  return (
    <div className="bg-gray-50 text-gray-900">
      <Navigation heroHeading={hero.heading} navLinks={header.navLinks} />

      <HeroSlider hero={{ heading: hero.heading, subheading: hero.subheading, images: hero.images, body: body }} />

      <TechnologySection data={technology} />

      <ApplicationSection data={application} />

      <PilotsSection data={pilots} />

      <PartnersSection data={partners} />

      <Footer heroHeading={hero.heading} data={footer} />
    </div>
  );
}
