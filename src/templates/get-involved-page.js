import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ModuleSelector from "../components/ModuleSelector"

const GetInvolvedPageContent = ({ pageContext }) => {
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

const GetInvolvedPage = ({ pageContext }) => (
  <Layout>
    <SEO title={pageContext.title} description={pageContext.description} />
    <GetInvolvedPageContent pageContext={pageContext} />
  </Layout>
)

export default GetInvolvedPage
