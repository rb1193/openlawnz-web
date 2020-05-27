import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"


const Microsite = ({ pageContext }) => {
  
  function selectModule(module, idx) { //selects the correct module type
    let title = module.title.replace(/\s/g, '-').toLowerCase()
    switch(module.type) { 
      case "text": // Single heading, multiple paragraphs.
        return (
          <div key={idx} name={title}>
            <h4>{module.title}</h4>
            {
              module.content.map(({content_html}, idx) => {
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
      default: //Error Paragraph
        return (
          <div className="microsite-paragraph" key={idx} name={title}>
            <h4>{module.title}</h4>
            Error: Module type not found
          </div>
        )
    }
  }

  return (
  <Layout>
  <SEO title={`${pageContext.title} - ${pageContext.section.title}`} description={pageContext.description} />
  <div className="side-wrapper">
    <div className="container main">
    <div className="content">
     <h2>{pageContext.title} - {pageContext.section.title}</h2>
      <div className="microsite-section" name={pageContext.section.title}>
        {
          pageContext.section.modules.map((module, idx) => {
            
            return (
              <div key={idx}>
                {selectModule(module, idx)}
              </div>
            )
          })
        }
        
        </div>
      </div>
    </div>
  </div>
  <TertiaryNav 
    base={"/get-empowered/" + pageContext.title.replace(/\s/g, '-').toLowerCase()} 
    data={pageContext.section_headings.map((x) =>  {
        return x
    })}
    secondary_data={pageContext.section.modules.map(x => x.title)}
    type="/"
    page={pageContext.section.title}
    />
  </Layout>
  )
}


export default Microsite