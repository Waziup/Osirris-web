import Media from "@/pages/Media";
import { client } from "../../../tina/__generated__/client";
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

  try {
    const mediaResponse = await client.queries.mediaConnection();
    mediaItems = mediaResponse?.data?.mediaConnection?.edges?.map((edge) => ({
      id: edge?.node?.id,
      ...edge?.node,
    })) || [];
  } catch (error) {
    console.error("Error fetching media from Tina, falling back to FS:", error);
  }

  // Fetch Media Page singleton for the gallery list
  try {
    // @ts-ignore - mediaPage query might not be generated yet
    const mediaPageResponse = await client.queries.mediaPage({ relativePath: "media.mdx" });
    const galleryItems = mediaPageResponse?.data?.mediaPage?.gallery || [];

    if (galleryItems.length > 0) {
      const mappedGalleryItems = galleryItems.map((item: any, index: number) => ({
        id: `gallery-${index}`,
        title: item?.title || "Untitled",
        type: "photo",
        image: item?.image,
        category: item?.category || "General",
        description: item?.description,
        date: new Date().toISOString(),
      })).filter((item: any) => item.image);
      
      mediaItems = [...mappedGalleryItems, ...mediaItems];
    }
  } catch (error) {
    console.log("Could not fetch media page gallery (collection might be new):", error);
  }

  // Fallback if Tina returns empty (e.g. server indexing lag)
  if (mediaItems.length === 0) {
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
  }

  try {
    const publicationsResponse = await client.queries.publicationsConnection();
    publications = publicationsResponse?.data?.publicationsConnection?.edges?.map((edge) => ({
      id: edge?.node?.id,
      ...edge?.node,
    })) || [];
  } catch (error) {
    console.error("Error fetching publications from Tina, falling back to FS:", error);
  }

  if (publications.length === 0) {
    publications = readContentDir("content/publications");
  }

  try {
    const globalResponse = await client.queries.global({ relativePath: "index.json" });
    globalData = globalResponse?.data?.global || globalData;
  } catch (error) {
    console.error("Error fetching global settings:", error);
    // Fallback for global settings
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
  }

  return (
    <Media
      mediaItems={mediaItems || []}
      publications={publications || []}
      globalData={globalData}
    />
  );
}
