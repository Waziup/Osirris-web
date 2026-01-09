import {
  createMediaHandler,
} from "next-tinacms-cloudinary/dist/handlers";

import { isUserAuthorized } from "@tinacms/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV === "development") {
        return true;
      }
      const user = await isUserAuthorized({
        req,
        clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
        token: process.env.TINA_TOKEN,
      });
      return !!(user && user.verified);
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
