import { init } from "netlify-cms-app";

window.CMS_MANUAL_INIT = true;

const { BRANCH } = process.env; 

  const config = {
    backend: {
      name: "git-gateway",
      repo: "openlaw-web",
      branch: BRANCH || "master" 
    },
    media_folder: "static/assets",
    local_backend: true,
    public_folder: "/assets"
  };

  init({ config });