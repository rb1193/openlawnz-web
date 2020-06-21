import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import {graphql} from "gatsby"
// import TertiaryNav from "../components/TertiaryNav.jsx"
import LandingCard from "../components/LandingCard"


const EmpowerPage = ({ data }) => {
    const micrositeData = data.allMicrositesJson.edges.map(n => n.node)
    
  return (
    <Layout>
      <SEO title="Get Empowered" />  
      <div className="side-wrapper">
        <div className="main">
          <div className="content">
          <h1>Get Empowered</h1>
            {
              micrositeData.map((content, idx) => {
                  return (
                    <LandingCard slug={`/get-empowered/${content.fields.slug}${content.content[0].title.replace(/\s/g, '-').toLowerCase()}`} key={idx} content={content}/>
                  )
              }) 
            }
          </div>
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
            image_url
        }
      }
    }
  }
`
export default EmpowerPage
