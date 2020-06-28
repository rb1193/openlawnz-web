import { markdownToHtml } from "netlify-cms-widget-markdown/dist/esm/serializers/index"
import DOMPurify from "dompurify"

/**
 * Add HTML representations of markdown fields to an entry
 * @param {Map} entry - a Netlify CMS entry represented as an ImmutableJS Map object
 */
export default function addHtmlToEntry({ entry }) {
  const MARKDOWN_SUFFIX = "_html"
  const HTML_SUFFIX = "_output"

  const isKeyMarkdown = (key) => key.substring(key.length - MARKDOWN_SUFFIX.length) === MARKDOWN_SUFFIX
  const genHtmlKey = (key) => key.substring(0, key.length - MARKDOWN_SUFFIX.length) + HTML_SUFFIX

  const data = entry.get("data")
  const markdownFields = data.filter((value, key) => isKeyMarkdown(key))
  const htmlFields = markdownFields.mapEntries(([key, value]) => [
    genHtmlKey(key),
    DOMPurify.sanitize(markdownToHtml(value)),
  ])
  return data.merge(htmlFields)
}
