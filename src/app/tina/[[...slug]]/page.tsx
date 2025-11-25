"use client";

import { TinaCMS } from "tinacms";
import { TinaAdmin } from "tinacms/dist/client";
import config from "../../../../tina/config";

const Tina = () => {
  return (
    <TinaAdmin
      cms={
        new TinaCMS({
          apiURL: "/api/tina",
          formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
            if (formConfig.id === "content/pages/index.mdx") {
              return createForm(formConfig);
            }
            return createGlobalForm(formConfig);
          },
        })
      }
      isLocalClient={true}
    />
  );
};

export default Tina;
