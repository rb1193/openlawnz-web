import React from "react"
import Wizard from "../components/Wizard/Wizard"
import { GetInvolvedPageContent } from "../templates/get-involved-page"
import { MicrositeContent } from "../templates/microsite"
import { SingleNewsContent } from "../templates/single-news"
import { OurMissionPageContent } from "../templates/our-mission-page"

/**
 * All "entries" passed into the preview panes are an Immutable JS map object with a "data" key containing the content
 * See https://immutable-js.github.io/immutable-js/docs/#/Map
 */

const basicPreview = (title) => (
  <div className="container-wide main">
    <div className="content">
      <h1>{title}</h1>
    </div>
  </div>
)


export function newsPreview({ entry }) {
  const pageContext = entry.get("data").toJS()

  if (pageContext.title === undefined) return basicPreview("New News Item")
  if (pageContext.content_html === undefined) return basicPreview(pageContext.title)

  return <SingleNewsContent pageContext={pageContext} />
}

export function getInvolvedPreview({ entry }) {

  const pageContext = entry.get("data").toJS()

  if (pageContext.title === undefined) return basicPreview("New Get Involved Page")
  if (pageContext.content === undefined) return basicPreview(pageContext.title)

  return <GetInvolvedPageContent pageContext={pageContext} />
}

export function ourMissionPreview({ entry }) {

  const pageContext = entry.get("data").toJS()

  if (pageContext.title === undefined) return basicPreview("New Our Mission Page")
  if (pageContext.content === undefined) return basicPreview(pageContext.title)
  return <OurMissionPageContent pageContext={pageContext} />
}

export function micrositesPreview({ entry }) {
  const { title, content } = entry.get("data").toJS()

  if (title === undefined) return basicPreview("New Microsite")
  if (content === undefined) return basicPreview(title)

  const headings = content.map(({ title }) => title)
  return content.map((section) => {
    if (section.modules === undefined) return <div></div>
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

  if (title === undefined || background === undefined || steps === undefined) return <div></div>

  return <Wizard title={title} background={background} steps={steps} />
}
