// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  // Replace with your default branch name
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from your Tina Cloud dashboard
  token: process.env.TINA_TOKEN,
  // Get this from your Tina Cloud dashboard
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading"
              },
              {
                type: "string",
                name: "subheading",
                label: "Subheading"
              },
              {
                type: "image",
                name: "images",
                label: "Slider Images",
                list: true
              }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
