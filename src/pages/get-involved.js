import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"
import { graphql, Link } from 'gatsby'

const getInvolvedPage = ({data}) => {
  const pageContext = data.allGetInvolvedJson.nodes;
  return (
    <Layout>
      <SEO title="Get Involved" />
        <div className="side-wrapper">
            <div className="container main">
                <div className="content">
                    <h1>Get Involved</h1>
                    <p>Get Involved with OpenLawNZ</p>
                    {
                    pageContext.map(({title, description, fields}, idx) => {
                        return (
                        <div className="module-block" key={idx}>
                            <h3>{title}</h3>
                            <p>{description} 
                            <br/>
                            <Link to={`get-involved${fields.slug}`}>View Page</Link>
                            </p>
                        </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
        <TertiaryNav 
        base="/get-involved/" 
        data={
            pageContext.map(({title}) =>  {
            return title
        })  
        }
        type="/"/>
    </Layout>
  )
}



export const aboutQuery = graphql`
query getInvolvedQuery {
  allGetInvolvedJson {
    nodes {
      description
      title
      fields {
        slug
      }
    }
  }
}

`
export default getInvolvedPage
