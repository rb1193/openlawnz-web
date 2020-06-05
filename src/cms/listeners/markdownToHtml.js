import { Map, List } from 'immutable'
import { markdownToHtml } from 'netlify-cms-widget-markdown/dist/esm/serializers/index'

export default function entryToHtml({ entry }) {
  return objectToHtml(entry.get('data'))
}

function objectToHtml(object) {
  let htmlOutput = Map()
  const data = object.mapEntries(([key, value]) => {
    if (key.substring(key.length - 5) === "_html") {
      htmlOutput = htmlOutput.set(key + "_output", markdownToHtml(value))
    }
    if (Map.isMap(value)) {
      return objectToHtml(value)
    }
    if (List.isList(value)) {
      return [key, value.map(item => {
        return Map.isMap(item) ? objectToHtml(item) : item
      })]
    }
    return [key, value]
  })
  return data.merge(htmlOutput)
}