import Home from "../pages/Home";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function Page() {
  // Default Tina Data
  let tinaData = {
    title: "Home Page",
    hero: {
      displayMode: "text",
      logo: undefined as string | undefined,
      heading: "Welcome to Osirris",
      subheading: "The future of technology",
      images: [] as string[],
    },
    technology: {},
    application: {},
    pilots: {},
    partners: {},
    body: "This is the content for the home page.",
  };

  // Default Global Data
  let globalData = {
    header: {
      logo: undefined as string | undefined,
      navLinks: [] as { label: string; href: string }[],
    },
    footer: {
      logo: undefined as string | undefined,
      copyright: "© 2026 Osirris Project",
      socialLinks: [] as { platform: string; url: string }[],
      funding: undefined as { text: string; logo: string } | undefined,
    },
  };

  try {
    // Read Home Page Content
    const contentPath = path.join(process.cwd(), "content/pages/index.mdx");
    if (fs.existsSync(contentPath)) {
      const fileContents = fs.readFileSync(contentPath, "utf8");
      const { data, content } = matter(fileContents);
      
      tinaData = {
        title: data.title || "Home Page",
        hero: {
          displayMode: data.hero?.displayMode || "text",
          logo: data.hero?.logo,
          heading: data.hero?.heading || "Welcome to Osirris",
          subheading: data.hero?.subheading || "The future of technology",
          images: data.hero?.images || [],
        },
        technology: data.technology || {},
        application: data.application || {},
        pilots: data.pilots || {},
        partners: data.partners || {},
        body: content || "This is the content for the home page.",
      };
    }

    // Read Global Settings
    const globalPath = path.join(process.cwd(), "content/global/index.json");
    if (fs.existsSync(globalPath)) {
      const globalFileContents = fs.readFileSync(globalPath, "utf8");
      const parsedGlobalData = JSON.parse(globalFileContents);
      
      globalData = {
        header: {
          logo: parsedGlobalData.header?.logo,
          navLinks: parsedGlobalData.header?.navLinks || globalData.header.navLinks,
        },
        footer: {
          logo: parsedGlobalData.footer?.logo,
          copyright: parsedGlobalData.footer?.copyright || globalData.footer.copyright,
          socialLinks: parsedGlobalData.footer?.socialLinks || globalData.footer.socialLinks,
          funding: parsedGlobalData.footer?.funding,
        },
      };
    }
  } catch (e) {
    console.error("Error reading content files:", e);
  }

  // Pass the data to the Home component
  return <Home tinaData={tinaData} globalData={globalData} />;
}
