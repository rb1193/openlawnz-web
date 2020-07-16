import React from "react"
import Wizard from "../../components/Wizard/Wizard"
import { GetInvolvedPageContent } from "../../templates/get-involved-page"
import { SingleNewsContent } from "../../templates/single-news"
import { OurMissionPageContent } from "../../templates/our-mission-page"

/**
 * All "entries" passed into the preview panes are an Immutable JS map object with a "data" key containing the content
 * See https://immutable-js.github.io/immutable-js/docs/#/Map
 */

export function newsPreview({ entry }) {
  return (
    <PreviewErrorBoundary>
      <SingleNewsContent pageContext={entry.get("data").toJS()} />
    </PreviewErrorBoundary>
  )
}

export function getInvolvedPreview({ entry }) {
  return (
    <PreviewErrorBoundary>
      <GetInvolvedPageContent pageContext={entry.get("data").toJS()} />
    </PreviewErrorBoundary>
  )
}

export function ourMissionPreview({ entry }) {
  return (
    <PreviewErrorBoundary>
      <OurMissionPageContent pageContext={entry.get("data").toJS()} />
    </PreviewErrorBoundary>
  )
}

export function wizardPreview({ entry }) {
  const { title, background, steps } = entry.get("data").toJS()
  return (
    <PreviewErrorBoundary>
      <Wizard title={title} background={background} steps={steps} />
    </PreviewErrorBoundary>
  )
}

export class PreviewErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <p>
            Unable to render preview. This is probably due to required content fields that have not been completed yet.
          </p>
          <p>
            Once you have completed the fields in the content panel on the left, try loading the preview again by
            clicking on the button below.
          </p>
          <button onClick={() => this.setState({ hasError: false })}>Reload</button>
        </>
      )
    }
    return this.props.children
  }
}
