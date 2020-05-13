import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"

 


const Microsite = ({ pageContext }) => (
  <Layout>
  <SEO title={`${pageContext.title} - ${pageContext.section.title}`} description={pageContext.description} />
  <div className="side-wrapper">
    <div className="container main">
    <div className="content">
     <h2>{pageContext.title} - {pageContext.section.title}</h2>
      <div className="microsite-section" name={pageContext.section.title}>
      { 
          pageContext.section.paragraphs.map(({title, content_html}, idx) => {
            return (
              <div key={idx} name={title.replace(/\s/g, '-').toLowerCase()}>
                <h4>{title}</h4>
                <div
                  className="microsite-paragraph"
                  dangerouslySetInnerHTML={{ __html: content_html }}
                />
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
    secondary_data={pageContext.section.paragraphs.map(x => x.title)}
    type="/"
    page={pageContext.section.title}
    />
  </Layout>

)


export default Microsite