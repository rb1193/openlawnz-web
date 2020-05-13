import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import {Link, graphql} from "gatsby"

const EmpowerPage = ({ data }) => {
    const micrositeData = data.allMicrositesJson.edges.map(n => n.node)
    
  return (
    <Layout>
      <SEO title="Developers" />  
          <div className="container main">
            <div className="content">
            <h2>Get Empowered</h2>

              {
                  micrositeData.map(({title, description, fields, content}, idx) => {
                      return (
                          <div className="microsite-paragraph" key={idx}>
                              <h3 name={fields.slug.slice(1)}>{title}</h3>
                              <p>{description}</p>
                              <Link to={`/get-empowered/${fields.slug}/${content[0].title.replace(/\s/g, '-').toLowerCase()}`}>View Site</Link>
                          </div>
                      )
                  }) 
              }
            </div>
            
      </div>
    </Layout>
  )
}

export const empowerQuery = graphql`
  query empowerQuery {
    allMicrositesJson {
      edges {
        node {
            fields {
                slug
            }
            title
            content {
              title
            }
            description
        }
      }
    }
  }
`
export default EmpowerPage
