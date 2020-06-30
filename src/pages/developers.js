import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql } from "gatsby"

//import External from "../images/svgs/external.svg"
// Having an issue with this will come back to it later.

const DevelopersPage = ({ data }) => {
  const developersContent = data.allDevelopersJson.edges.map((n) => n.node)
  return (
    <Layout>
      <SEO title="Developers" />
      <DevelopersPageContent content={developersContent[0]}/>
    </Layout>
  )
}

export const DevelopersPageContent = ({ content }) => (
  <div className="container main">
    <div className="content">
      <h2>Developers</h2>
      <span>Use our API to integrate case law intelligence into your own applications.</span>

      <div
        className="content-spaced"
        dangerouslySetInnerHTML={{
          __html: content.content_html,
        }}
      ></div>
    </div>
  </div>
)

export const developersQuery = graphql`
  query developersQuery {
    allDevelopersJson {
      edges {
        node {
          title
          content_html
        }
      }
    }
  }
`

export default DevelopersPage
