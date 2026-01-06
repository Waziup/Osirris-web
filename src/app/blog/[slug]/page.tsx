import BlogPost from "@/pages/BlogPost";
import { client } from "../../../../tina/__generated__/client";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: any = null;
  let globalData: any = {
    header: { navLinks: [] },
    footer: { copyright: "", socialLinks: [] },
  };

  const filename = `${slug}.mdx`;

  // Fetch Post
  try {
    const postResponse = await client.queries.blog({ relativePath: filename });
    post = {
      ...postResponse.data.blog,
      body: postResponse.data.blog.body,
    };
  } catch (error) {
    console.error(`Error fetching post ${slug} from Tina:`, error);
    // Fallback
    try {
      const filePath = path.join(process.cwd(), "content/blog", filename);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);
        post = {
          title: data.title || "Untitled Post",
          image: data.image || "/placeholder.jpg",
          category: data.category || "General",
          date: data.date || new Date().toISOString(),
          readTime: data.readTime || "5 min read",
          author: data.author || "Osirris Team",
          authorRole: data.authorRole || "Contributor",
          ...data, // Overwrite defaults with actual data
          body: { type: "root", children: [{ type: "p", children: [{ type: "text", text: content || "No content available." }] }] },
        };
      }
    } catch (e) {
      console.error("Error reading post file:", e);
    }
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

  if (!post) {
    return <div className="text-center py-20">Post not found</div>;
  }

  return <BlogPost post={post} globalData={globalData} />;
}

export async function generateStaticParams() {
  try {
    const postsResponse = await client.queries.blogConnection();
    const edges = postsResponse.data.blogConnection.edges || [];
    return edges.map((edge) => ({
      slug: edge?.node?._sys.filename,
    }));
  } catch (e) {
    // Fallback for static params
    const dirPath = path.join(process.cwd(), "content/blog");
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => ({
          slug: file.replace(".mdx", ""),
        }));
    }
    return [];
  }
}
