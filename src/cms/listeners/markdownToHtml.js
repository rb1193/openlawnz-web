import { Map, List } from "immutable"
import { markdownToHtml } from "netlify-cms-widget-markdown/dist/esm/serializers/index"

export default function entryToHtml({ entry }) {
  return objectToHtml(entry.get("data"))
}

const MARKDOWN_SUFFIX = "_html"
const HTML_SUFFIX = "_output"

function objectToHtml(object) {
  let htmlOutput = Map()
  object.forEach((value, key) => {
    if (key.substring(key.length - MARKDOWN_SUFFIX.length) === MARKDOWN_SUFFIX) {
      const htmlKey = key.substring(0, key.length - MARKDOWN_SUFFIX.length) + HTML_SUFFIX
      htmlOutput = htmlOutput.set(htmlKey, markdownToHtml(value))
    }
    if (Map.isMap(value)) {
      htmlOutput = htmlOutput.set(key, objectToHtml(value))
    }
    if (List.isList(value)) {
      htmlOutput = htmlOutput.set(key, value.map(item => {
        return Map.isMap(item) ? objectToHtml(item) : item
      }))
    }
  })
  return object.merge(htmlOutput)
}
