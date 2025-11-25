import { defineConfig } from "tinacms";

// The TinaCMS configuration for the project.
export default defineConfig({
  branch: "main",
  
  // For local development without TinaCloud
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // Home Page Collection
      {
        name: "home",
        label: "Home Page",
        path: "content/pages",
        format: "mdx",
        match: {
          include: "index",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            required: true,
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
                required: true,
              },
              {
                type: "string",
                name: "subheading",
                label: "Subheading",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "images",
                label: "Slider Images",
                list: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },
      
      // Blog Posts Collection
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "AI & Machine Learning",
              "Case Study",
              "Technology",
              "Research",
              "Partnership",
              "Sustainability",
            ],
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
            required: true,
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            description: "e.g., '5 min read'",
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
            required: true,
          },
          {
            type: "string",
            name: "authorRole",
            label: "Author Role",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Post",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Post Content",
            isBody: true,
          },
        ],
      },
      
      // Media Items Collection
      {
        name: "media",
        label: "Media Items",
        path: "content/media",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Media Type",
            options: ["photo", "video"],
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Image/Thumbnail",
            required: true,
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Video URL",
            description: "YouTube or Vimeo URL (for video type)",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Field Testing",
              "Installation",
              "Equipment",
              "Application",
              "Team",
              "Events",
            ],
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
        ],
      },
      
      // Publications Collection
      {
        name: "publications",
        label: "Publications",
        path: "content/publications",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "journal",
            label: "Journal/Conference",
            required: true,
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            required: true,
          },
          {
            type: "string",
            name: "fileSize",
            label: "File Size",
            description: "e.g., '2.4 MB'",
          },
          {
            type: "number",
            name: "downloads",
            label: "Download Count",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Research Paper",
              "Technical Report",
              "White Paper",
              "Conference Proceedings",
            ],
            required: true,
          },
          {
            type: "string",
            name: "color",
            label: "Badge Color",
            options: ["blue", "green", "purple", "orange"],
          },
          {
            type: "string",
            name: "pdfUrl",
            label: "PDF URL",
            description: "Link to the PDF file",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Abstract/Description",
            isBody: true,
          },
        ],
      },
    ],
  },
});
