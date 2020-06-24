import React from "react"
import { Map, List } from "immutable"
import PluginShowcase from "../components/PluginShowcase"
import Wizard from "../components/Wizard/Wizard"
import { AboutPageContent } from "../pages/about"
import { DevelopersPageContent } from "../pages/developers"
import { GetInvolvedPageContent } from "../templates/get-involved-page"
import { MicrositeContent } from "../templates/microsite"
import { SingleNewsContent } from "../templates/single-news"
import { OurMissionPageContent } from "../templates/our-mission-page"

export function aboutPreview({ entry }) {
  const data = entry.get("data")
  return (
    <AboutPageContent
      content={toArray(data.get("content"))}
      directors={toObject(data.get("directors"))}
      contributors={toArray(data.get("contributors"))}
    />
  )
}

export function developersPreview({ entry }) {
  const data = toObject(entry.get("data"))
  return <DevelopersPageContent content={data} />
}

export function newsPreview({ entry }) {
  return <SingleNewsContent pageContext={toObject(entry.get("data"))} />
}

export function getInvolvedPreview({ entry }) {
  return <GetInvolvedPageContent pageContext={toObject(entry.get("data"))} />
}

export function ourMissionPreview({ entry }) {
  return <OurMissionPageContent pageContext={toObject(entry.get("data"))} />
}

export function pluginPreview({ entry }) {
  return <PluginShowcase data={[toObject(entry.get("data"))]} />
}

export function micrositesPreview({ entry }) {
  const immutableData = entry.get("data")
  const data = toObject(immutableData)
  const headings = data.content.map((section) => section.title)
  return data.content.map((section) => {
    return (
      <>
        <MicrositeContent
          pageContext={{ title: data.title, section: section, section_headings: headings, wizardData: [] }}
        />
        <hr />
      </>
    )
  })
}

export function wizardPreview({ entry }) {
  const data = entry.get("data")
  return <Wizard title={data.get("title")} background={data.get("background")} steps={toArray(data.get("steps"))} />
}

function toObject(immutableMap) {
  const object = {}
  immutableMap.forEach((value, key) => {
    if (Map.isMap(value)) {
      object[key] = toObject(value)
      return
    }
    if (List.isList(value)) {
      object[key] = toArray(value)
      return
    }
    object[key] = value
  })
  return object
}

function toArray(immutableList) {
  return immutableList.toArray().map((value) => {
    return Map.isMap(value) ? toObject(value) : value
  })
}
