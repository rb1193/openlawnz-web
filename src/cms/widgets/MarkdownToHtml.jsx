import React from "react"
import CMS from "netlify-cms-app"

export class MarkdownToHtmlControl extends React.Component {
  render() {
    const MarkdownControl = CMS.getWidget("markdown").control
    const props = { ...this.props }

    props.entry.get('metaData').set('asHtml', props.field.get('name'))

    return <SelectControl {...props} />
  }
}
