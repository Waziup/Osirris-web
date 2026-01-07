import BlogPost from "@/pages/BlogPost";
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
    header: { logo: undefined, navLinks: [] },
    footer: { logo: undefined, copyright: "", socialLinks: [] },
  };

  const filename = `${slug}.mdx`;

  // Fetch Post from filesystem
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

  // Ensure post has all required fields
  if (!post) {
    return <div className="text-center py-20">Post not found</div>;
  }

  // Add default values for missing fields
  const safePost = {
    title: post.title || "Untitled",
    image: post.image || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop",
    category: post.category || "General",
    date: post.date || new Date().toISOString(),
    readTime: post.readTime || "5 min read",
    author: post.author || "Osirris Team",
    authorRole: post.authorRole || "Contributor",
    body: post.body || { type: "root", children: [] },
  };

  return <BlogPost post={safePost} globalData={globalData} />;
}

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), "content/blog");
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => ({
          slug: file.replace(".mdx", ""),
        }));
    }
  } catch (e) {
    console.error("Error generating static params:", e);
  }
  return [];
}
