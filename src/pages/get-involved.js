import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"
import { graphql } from 'gatsby'
import LandingCard from "../components/LandingCard"

const getInvolvedPage = ({data}) => {
  const pageContext = data.allGetInvolvedJson.nodes;
  return (
    <Layout>
      <SEO title="Get Involved" />
        <div className="side-wrapper">
            <div className="container-wide main">
                <div className="content">
                  <h1>Get Involved</h1>
                  <p>Get Involved with OpenLawNZ</p>
                  {
                    pageContext.map((content, idx) => (
                      <LandingCard slug={`/get-involved${content.fields.slug}`} key={idx} content={content}/>
                    ))
                  }
                </div>
            </div>
        </div>
      <TertiaryNav 
      base="/get-involved" 
      data={
        pageContext.map(({title}) =>  {
          return {title: title}
        })  
      }/>
    </Layout>
  )
}



export const aboutQuery = graphql`
query getInvolvedQuery {
  allGetInvolvedJson {
    nodes {
      description
      title
      image_url
      fields {
        slug
      }
    }
  }
}

`
export default getInvolvedPage
