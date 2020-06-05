import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"

import { graphql } from 'gatsby'

const AboutPage = ({data}) => {
  const aboutJson = data.allAboutJson.edges.map(n => n.node)[0]
  const directors = aboutJson.directors
  
  return (
    <Layout>
      <SEO title="About" />
      <div className="side-wrapper">
        <div className="container main">
          <div className="content">
          {
            aboutJson.content.map(({title, content_html}, idx) => {
              return (
                <div style={{marginBottom: '40px'}} key={idx}>
                <h2 name={title.replace(/\s/g, '-').toLowerCase()}>{title}</h2>
                  <div dangerouslySetInnerHTML={{
                    __html: content_html,
                  }}>
                  </div>
                </div>
              )
            })
          }
          <div aria-hidden="true" id="infrastructure" className="modal-window">
              <div>
                <a href="#close" title="Close" className="modal-close">
                  Close
                </a>
                <img src="/assets/openlaw-infrastructure.png" alt="Infrastructure" />
              </div>
            </div>

            <hr className="divider" />

            <h2>Directors</h2>
            <div className="cards-list directors">
            
            <div className="card-item">
                <img src={directors.image_one_url} alt={directors.dir_one_name}/>
                <strong>{directors.dir_one_name}</strong>
                <p>
                 {directors.dir_one_bio}
                </p>
             </div>
              
             <div className="card-item">
                <img src={directors.image_two_url} alt={directors.dir_two_name}/>
                <strong>{directors.dir_two_name}</strong>
                <p>
                 {directors.dir_two_bio}
                </p>
             </div>

            </div>

            <h2>Past and Present Contributors</h2>

            <div className="cards-list">

              {
                aboutJson.contributors.map(({image_url, title}, idx) => {
                  return(
                    <div key={idx} className="card-item-small">
                      <div>
                        <img src={image_url} alt={title}/>
                        <strong>{title}</strong>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const aboutQuery = graphql`
  query aboutQuery {
    allAboutJson {
      edges {
        node {
          title
          content {
            title,
            content_html
          }
          directors { 
            dir_one_name,
            dir_one_bio,
            image_one_url,

            dir_two_name,
            dir_two_bio,
            image_two_url
          }
          contributors {
            title,
            image_url
          }
        }
      }
    }
  }
`

export default AboutPage
