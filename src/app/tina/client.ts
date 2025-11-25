// Simplified TinaCMS client for local development
// This is a placeholder - actual TinaCMS integration would require proper setup

export const tinaClient = {
  queries: {
    page: async (variables: { relativePath: string }) => {
      // This would normally query TinaCMS
      // For now, return a structure that matches expected data
      return {
        data: {
          page: {
            title: "Home Page",
            hero: {
              heading: "Welcome to Osirris",
              subheading: "The future of technology",
              images: [] as string[],
            },
            body: "Content from TinaCMS",
          },
        },
      };
    },
  },
};
