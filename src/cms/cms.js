import { init, registerEventListener } from 'netlify-cms-app'
import addHtmlToEntry from './listeners/addHtmlToEntry'

window.CMS_MANUAL_INIT = true;

const { GATSBY_BRANCH } = process.env; 

const config = {
  backend: {
    name: "git-gateway",
    repo: "openlaw-web",
    branch: GATSBY_BRANCH || "master" 
  },
  media_folder: "static/assets",
  public_folder: "/assets",
  local_backend: true
};

init({ config });

registerEventListener({
  name: 'preSave',
  handler: addHtmlToEntry
});