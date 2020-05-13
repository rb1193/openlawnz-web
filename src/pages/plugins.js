import React from "react"
import SEO from "../components/seo"

import Layout from "../components/layout"
import PluginShowcase from "../components/PluginShowcase.js"
import TertiaryNav from "../components/TertiaryNav.jsx"
import { graphql } from 'gatsby'

const PluginPage = ({ data }) => {
  
  const pluginsShowcaseData = data.allPluginsJson.edges.map(n => n.node)
  return (
  <Layout>
    <SEO title="Plugins" />
    
    <div className="side-wrapper">
      <div className="container main">
        <div className="content">
        <h2>Plugins</h2>
        <span>These plugins are built using the OpenLaw NZ API.</span>
        <PluginShowcase data={pluginsShowcaseData}/>
        </div>
      </div>
    
      
     
    </div>
    <TertiaryNav 
      base={"/plugins/"} 
      data={pluginsShowcaseData.map(({title}) =>  {
          return title
      })}
      type="#"/>
  </Layout>
  )
}

export const pluginsQuery = graphql`
  query pluginsQuery {
    allPluginsJson {
      edges {
        node {
          title
          content_html
          image_url
          image_alt
        }
      }
    }
  }
`


export default PluginPage
