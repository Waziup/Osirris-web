import { createClient } from "tinacms/dist/client";
import config from "../../../tina/config";

const client = createClient({
  url: "/api/tina",
  token: process.env.TINA_TOKEN,
  queries: `
    query PageQuery($relativePath: String!) {
      page(relativePath: $relativePath) {
        title
        hero {
          heading
          subheading
          images
        }
        body
      }
    }
  `,
});

export const tinaClient = client;
export default config;
