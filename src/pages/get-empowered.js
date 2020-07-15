import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"

import {graphql} from "gatsby"
import TertiaryNav from "../components/TertiaryNav.jsx"
import { toSlug } from "../js/ToSlug"
import LandingCard from "../components/LandingCard"


const EmpowerPage = ({ data }) => {
  const micrositeData = data.allMicrositesJson.nodes
  const getEmpoweredData = data.allGetEmpoweredJson.nodes
  return (
    <Layout>
      <SEO title="Get Empowered" /> 
        <div className="side-wrapper">
          <div className="container-wide main">
            <div className="content">
            <h1>Get Empowered</h1>
            <h2>Topics</h2>
              {
                micrositeData.map((content, idx) => (
                  <LandingCard slug={`/get-empowered${content.fields.slug}${toSlug(content.content[0].title)}`} key={idx} content={content}/>
                )) 
              }
              <h2>Using OpenLawNZ</h2>
              {
                getEmpoweredData.map((content, idx) => (
                  <LandingCard slug={`/get-empowered${content.fields.slug}`} key={idx} content={content}/>
                )) 
              }
            </div>
          </div>
        </div>
        <TertiaryNav 
        base= "/get-empowered"
        data={micrositeData.map(({title, content}) =>  {
          return [title,`${title}/${content[0].title}`]
        })}
        tertiary_data={getEmpoweredData.map(({title}) =>  {
          return [title,`${title}`]
        })}
        />
    </Layout>
  )
}

export const empowerQuery = graphql`
  query empowerQuery {
    allMicrositesJson {
      nodes {
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
    allGetEmpoweredJson {
      nodes {
        title
        description
        image_url
  
        fields {
          slug
        }
      }
    }
  }
`
export default EmpowerPage