import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"

import {Link, graphql} from "gatsby"
import TertiaryNav from "../components/TertiaryNav.jsx"
import { toSlug } from "../js/ToSlug"
import LandingCard from "../components/LandingCard"


const EmpowerPage = ({ data }) => {
  const micrositeData = data.allMicrositesJson.edges.map(n => n.node)
      <div className="tertiary-background">
        <div className="side-wrapper">
          <div className="container main">
            <div className="content">
            <h1>Get Empowered</h1>
              {
                micrositeData.map(({title, description, fields, content}, idx) => {
                    return (
                          <LandingCard slug={`/get-empowered/${content.fields.slug}${content.content[0].title.replace(/\s/g, '-').toLowerCase()}`} key={idx} content={content}/>

                    )
                }) 
              }
            </div>
          </div>
        </div>
        <TertiaryNav 
        base= "/get-empowered/"
        data={micrositeData.map(({title, content}) =>  {
            return [title,`${toSlug(title)}/${toSlug(content[0].title)}`]
        })}
        />
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