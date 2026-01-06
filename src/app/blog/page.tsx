import Blog from "@/pages/Blog";
import { client } from "../../../tina/__generated__/client";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const metadata = {
  title: "Blog - Osirris",
  description: "Latest news, updates, and insights from the Osirris project",
};

export default async function BlogPage() {
  let posts: any[] = [];
  let globalData: any = {
    header: { navLinks: [] },
    footer: { copyright: "", socialLinks: [] },
  };

  // Helper to read MDX files
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

  // Fetch Blog Posts
  try {
    const postsResponse = await client.queries.blogConnection();
    posts = postsResponse?.data?.blogConnection?.edges?.map((edge) => ({
      id: edge?.node?.id,
      ...edge?.node,
    })) || [];
  } catch (error) {
    console.error("Error fetching blog posts from Tina:", error);
  }

  if (posts.length === 0) {
    posts = readContentDir("content/blog");
  }

  // Fetch Global Settings
  try {
    const globalResponse = await client.queries.global({ relativePath: "index.json" });
    globalData = globalResponse?.data?.global || globalData;
  } catch (error) {
    console.error("Error fetching global settings:", error);
    try {
       const globalPath = path.join(process.cwd(), "content/global/index.json");
       if (fs.existsSync(globalPath)) {
         globalData = JSON.parse(fs.readFileSync(globalPath, "utf8"));
       }
    } catch (e) {
       console.error("Error reading global settings file:", e);
    }
  }

  return <Blog posts={posts} globalData={globalData} />;
}
