import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const GetInvolvedPage = ({ pageContext }) => {

  function selectModule(module) {
    const errorModule = (message) => {
      return <div className="microsite-paragraph">
        <h4>{module.title}</h4>
        Error: {message}
      </div>
    }
    switch(module.type) {
      case "text":
        return ( 
          <div className="module-block">
            <h3>{module.title}</h3>
            {
              module.group.map(({content_html}, idx) => {
                return (
                  <div key={idx}
                    className="microsite-paragraph"
                    dangerouslySetInnerHTML={{ __html: content_html }}
                  />
                ) 
              })
            }
          </div>
        )
        case "contributors":
            return (
              <div>
                <h3>{module.title}</h3>
                <div className="cards-list">
                  {
                    module.contributors.map(({image_url, title}, idx) => {
                      return(
                        <div key={idx} className="card-item-small">
                          <div>
                            <img src={image_url} alt={title}/>
                            <strong>{title}</strong>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
      default:
        return (
          errorModule("Module type not found")
        )
    }
  }

  return (
  <Layout>
      <SEO title={pageContext.title} description={pageContext.description} />
      <div className="container main">
        <div className="content">
          <h1>{pageContext.title}</h1>
          {
            pageContext.content.map((module, idx) => {
              return (
                <div key={idx}>
                  {selectModule(module)}
                </div>
              )
            })
          }
        </div>

      </div>
  </Layout>
  )
}


export default GetInvolvedPage