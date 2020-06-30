import { init, registerWidget, registerPreviewTemplate } from "netlify-cms-app"
import { NextStepControl } from "./widgets/NextStep"
import * as previews from "./previews"

window.CMS_MANUAL_INIT = true

const { GATSBY_BRANCH } = process.env

const config = {
  backend: {
    name: "git-gateway",
    repo: "openlaw-web",
    branch: GATSBY_BRANCH || "master",
  },
  media_folder: "static/assets",
  public_folder: "/assets",
  local_backend: true,
  module,
}

init({ config })

registerWidget("wizard_option_next_step", NextStepControl)

registerPreviewTemplate("news", previews.newsPreview)
registerPreviewTemplate("getInvolved", previews.getInvolvedPreview)
registerPreviewTemplate("ourMission", previews.ourMissionPreview)
registerPreviewTemplate("microsites", previews.micrositesPreview)
registerPreviewTemplate("plugins", previews.pluginPreview)
registerPreviewTemplate("wizards", previews.wizardPreview)
