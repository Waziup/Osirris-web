import Home from "../pages/Home";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function Page() {
  // Default Tina Data
  let tinaData = {
    title: "Home Page",
    hero: {
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
      navLinks: [] as { label: string; href: string }[],
    },
    footer: {
      copyright: "© 2026 Osirris Project",
      socialLinks: [] as { platform: string; url: string }[],
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
        header: parsedGlobalData.header || globalData.header,
        footer: parsedGlobalData.footer || globalData.footer,
      };
    }
  } catch (e) {
    console.error("Error reading content files:", e);
  }

  // Pass the data to the Home component
  return <Home tinaData={tinaData} globalData={globalData} />;
}
