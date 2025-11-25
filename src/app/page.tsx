import { tinaClient } from "../app/tina/client";
import Home from "../pages/Home";

export default async function Page() {
  // TinaCMS data fetching logic
  let tinaData = {};
  try {
    const result = await tinaClient.queries.page({
      relativePath: "index.mdx",
    });
    tinaData = {
      title: result.data.page.title,
      hero: result.data.page.hero,
      body: result.data.page.body,
    };
  } catch (e) {
    console.error("Error fetching TinaCMS data:", e);
    // Fallback data structure in case TinaCMS is not running or content is missing
    tinaData = {
      title: "Fallback Home Page",
      hero: {
        heading: "Welcome to Osirris (Fallback)",
        subheading: "The future of technology",
        images: [],
      },
      body: "Content not loaded from TinaCMS. Please run TinaCMS server.",
    };
  }

  // Pass the TinaCMS data to the Home component
  return <Home tinaData={tinaData} />;
}
