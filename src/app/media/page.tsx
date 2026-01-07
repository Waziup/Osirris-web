import Media from "@/pages/Media";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata = {
  title: "Media - Osirris",
  description: "Photos, videos, and publications from the Osirris project",
};

export default async function MediaPage() {
  let mediaItems: any[] = [];
  let publications: any[] = [];
  let globalData: any = {
    header: { logo: undefined, navLinks: [] },
    footer: { logo: undefined, copyright: "", socialLinks: [] },
  };

  // Helper to read MDX files from a directory
  const readContentDir = (dirPath: string) => {
    try {
      const fullPath = path.join(process.cwd(), dirPath);
      if (!fs.existsSync(fullPath)) return [];
      
      const files = fs.readdirSync(fullPath);
      return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
          const filePath = path.join(fullPath, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data, content } = matter(fileContent);
          return {
            id: file.replace(".mdx", ""),
            ...data,
            body: content,
            _sys: { filename: file.replace(".mdx", ""), relativePath: file },
          };
        });
    } catch (e) {
      console.error(`Error reading ${dirPath}:`, e);
      return [];
    }
  };

  // Read media items from filesystem
  mediaItems = readContentDir("content/media");

  // Also try to read the gallery from media.mdx
  try {
    const mediaPagePath = path.join(process.cwd(), "content/pages/media.mdx");
    if (fs.existsSync(mediaPagePath)) {
      const fileContent = fs.readFileSync(mediaPagePath, "utf8");
      const { data } = matter(fileContent);
      if (data.gallery && Array.isArray(data.gallery)) {
        const mappedGalleryItems = data.gallery.map((item: any, index: number) => ({
          id: `gallery-fs-${index}`,
          title: item?.title || "Untitled",
          type: "photo",
          image: item?.image,
          category: item?.category || "General",
          description: item?.description,
          date: new Date().toISOString(),
        })).filter((item: any) => item.image);
        mediaItems = [...mappedGalleryItems, ...mediaItems];
      }
    }
  } catch (e) {
    console.error("Error reading media.mdx fallback:", e);
  }

  // Read publications from filesystem
  publications = readContentDir("content/publications");

  // Read Global Settings from filesystem
  try {
     const globalPath = path.join(process.cwd(), "content/global/index.json");
     if (fs.existsSync(globalPath)) {
       const fileData = JSON.parse(fs.readFileSync(globalPath, "utf8"));
       globalData = {
         header: {
           logo: fileData.header?.logo,
           navLinks: fileData.header?.navLinks || [],
         },
         footer: {
           logo: fileData.footer?.logo,
           copyright: fileData.footer?.copyright || "",
           socialLinks: fileData.footer?.socialLinks || [],
           funding: fileData.footer?.funding,
         },
       };
     }
  } catch (e) {
     console.error("Error reading global settings file:", e);
  }

  return (
    <Media
      mediaItems={mediaItems || []}
      publications={publications || []}
      globalData={globalData}
    />
  );
}
