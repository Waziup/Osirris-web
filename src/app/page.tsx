import Home from "../pages/Home";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function Page() {
  // Read content from MDX file directly
  let tinaData = {
    title: "Home Page",
    hero: {
      heading: "Welcome to Osirris",
      subheading: "The future of technology",
      images: [] as string[],
    },
    body: "This is the content for the home page.",
  };

  try {
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
        body: content || "This is the content for the home page.",
      };
    }
  } catch (e) {
    console.error("Error reading content file:", e);
  }

  // Pass the data to the Home component
  return <Home tinaData={tinaData} />;
}
