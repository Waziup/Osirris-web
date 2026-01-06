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
      // Global Settings Collection
      {
        name: "global",
        label: "Global Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header / Navigation",
            fields: [
              {
                type: "image",
                name: "logo",
                label: "Logo Image",
                description: "Upload the logo to be displayed in the navigation bar",
              },
              {
                type: "object",
                name: "navLinks",
                label: "Navigation Links",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link (href)",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "image",
                name: "logo",
                label: "Logo Image",
                description: "Upload the logo to be displayed in the footer",
              },
              {
                type: "string",
                name: "copyright",
                label: "Copyright Text",
              },
              {
                type: "object",
                name: "socialLinks",
                label: "Social Media Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "platform",
                    label: "Platform Name",
                  },
                  {
                    type: "string",
                    name: "url",
                    label: "URL",
                  },
                ],
              },
              {
                type: "object",
                name: "funding",
                label: "EU Funding Acknowledgment",
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Funding Text",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "image",
                    name: "logo",
                    label: "EU Flag Logo",
                  },
                ],
              },
            ],
          },
        ],
      },
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
                description: "The main headline displayed on the hero slider.",
                required: true,
              },
              {
                type: "string",
                name: "subheading",
                label: "Subheading",
                description: "A brief description or tagline below the headline.",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "images",
                label: "Slider Images",
                description: "Add, remove, or reorder images for the full-screen hero slider.",
                list: true,
              },
            ],
          },
          {
            type: "object",
            name: "technology",
            label: "Technology Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "string",
                name: "subheading",
                label: "Subheading/Tagline",
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
                type: "image",
                name: "image",
                label: "Main Product Image",
              },
              {
                type: "image",
                name: "gallery",
                label: "Product Gallery",
                list: true,
              },
              {
                type: "object",
                name: "features",
                label: "Features / Specs",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Feature Title",
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name (e.g., wifi, battery, activity)",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Short Description",
                  },
                  {
                    type: "string",
                    name: "detailedDescription",
                    label: "Detailed Spec/Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "application",
            label: "Application Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "string",
                name: "subheading",
                label: "Subheading/Tagline",
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
                type: "object",
                name: "features",
                label: "Features / Applications",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Short Description",
                  },
                  {
                    type: "string",
                    name: "detailedDescription",
                    label: "Detailed Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "pilots",
            label: "Pilots Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "string",
                name: "subheading",
                label: "Subheading/Tagline",
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
                type: "object",
                name: "sites",
                label: "Pilot Sites",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Country/Name",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Site Image",
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
                    type: "string",
                    name: "crop",
                    label: "Crop Type",
                  },
                  {
                    type: "string",
                    name: "status",
                    label: "Status",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "partners",
            label: "Partners Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "string",
                name: "subheading",
                label: "Subheading/Tagline",
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
                type: "object",
                name: "partners",
                label: "Partners",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Partner Name",
                  },
                  {
                    type: "image",
                    name: "logo",
                    label: "Partner Logo",
                  },
                ],
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
            type: "image",
            name: "pdfUrl",
            label: "PDF File",
            description: "Upload PDF file or provide external URL",
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
