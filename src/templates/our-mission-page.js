import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ModuleSelector from "../components/ModuleSelector"

export const OurMissionPageContent = ({ pageContext }) => {


  return (
  <div>
      <SEO title={pageContext.title} description={pageContext.description} />
      <div className="container main">
        <div className="content">
          <h1>{pageContext.title}</h1>
          {
            pageContext.content.map((module, idx) => {
              return (
                <div key={idx}>
                  <ModuleSelector module={module} wizardData={pageContext.wizardData} idx={idx}/>
                </div>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}

const OurMissionPage = ({pageContext}) => (
  <Layout>
      <SEO title={pageContext.title} description={pageContext.description} />
      <OurMissionPageContent pageContext={pageContext} />
  </Layout>
)

export default OurMissionPage