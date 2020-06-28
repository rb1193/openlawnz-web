import React from "react"
import PluginShowcase from "../components/PluginShowcase"
import Wizard from "../components/Wizard/Wizard"
import { GetInvolvedPageContent } from "../templates/get-involved-page"
import { MicrositeContent } from "../templates/microsite"
import { SingleNewsContent } from "../templates/single-news"
import { OurMissionPageContent } from "../templates/our-mission-page"

/**
 * All "entries" passed into the preview panes are an Immutable JS map object with a "data" key containing the content
 * See https://immutable-js.github.io/immutable-js/docs/#/Map
 */

export function newsPreview({ entry }) {
  return <SingleNewsContent pageContext={entry.get("data").toJS()} />
}

export function getInvolvedPreview({ entry }) {
  return <GetInvolvedPageContent pageContext={entry.get("data").toJS()} />
}

export function ourMissionPreview({ entry }) {
  return <OurMissionPageContent pageContext={entry.get("data").toJS()} />
}

export function pluginPreview({ entry }) {
  return <PluginShowcase data={[entry.get("data").toJS()]} />
}

export function micrositesPreview({ entry }) {
  const { title, content } = entry.get("data").toJS()
  const headings = content.map(({ title }) => title)
  return content.map((section) => {
    return (
      <>
        <MicrositeContent
          pageContext={{ title: title, section: section, section_headings: headings, wizardData: [] }}
        />
        <hr />
      </>
    )
  })
}

export function wizardPreview({ entry }) {
  const { title, background, steps } = entry.get("data").toJS()
  return <Wizard title={title} background={background} steps={steps} />
}
