import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"

 


const Microsite = ({ pageContext }) => (
  <Layout>
  
  <SEO title={`${pageContext.title}`} description={pageContext.description} />
  <div className="side-wrapper">
  <div className="content-wrapper">
    <div className="container main">
      <h2>{pageContext.title}</h2>
      {
        pageContext.content.map(({title, paragraphs}, idx) => {
          return (
            <div className="microsite-section" name={title} key={idx}>
                <h3 >{title}</h3>
                {
                  paragraphs.map(({title, content_html}, idx) => {
                    return (
                      <div key={idx}>
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
          )
        })
      }
      </div>
    </div>
    {
     
    }
  </div>
  <TertiaryNav 
    base={"/get-empowered" + pageContext.fields.slug} 
    data={pageContext.content.map(({title}) =>  {
        return [title, title]
    })}/>
  </Layout>

)


export default Microsite