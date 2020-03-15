import React from "react"
import Layout from "../components/layout"
import InfoCard from "../components/InfoCard.jsx"
import SearchContainer from "../components/SearchContainer.jsx"
import SEO from "../components/seo"

const AboutPage = ({data}) => {
  const aboutJson = data.allAboutJson.edges.map(n => n.node)
  const directorsJson = data.allDirectorsJson.edges.map(n => n.node)
  const contributorsJson = data.allContributorsJson.edges.map(n => n.node).sort((a,b) => {
    return new Date(a.date) - new Date(b.date)
  })
  
  return (
    <Layout>
      <SEO title="About" />
      <div className="highlighted-content">
        <SearchContainer />
        <InfoCard classModifier="info-card--large info-card--title info-card--column-nosub">
          <h1>About Us</h1>
        </InfoCard>
      </div>
      <div className="home-wrapper">
        <div className="container main">
          <div className="content">
 
          {
            aboutJson.map(({content_html}, idx) => {
              return (
                <div key={idx}>
                  <div dangerouslySetInnerHTML={{
                    __html: content_html,
                  }}>
                  </div>
                  <br/><  br/>
                </div>
              )
            })
          }

            <hr className="divider" />

            <h2>Directors</h2>
            <div className="cards-list">
            {
              directorsJson.map(({image_url, title, background}, idx) => {
                return (
                <div key={idx} className="card-item">
                  <img src={image_url} alt={title} />
                  <strong>{title}</strong>
                  <p>
                   {background}
                  </p>
                </div>
                )
              })
            }
            </div>

            <h2>Past and Present Contributors</h2>

            <div className="cards-list">

              {
                contributorsJson.map(({image_url, title}, idx) => {
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
          content_html
        }
      }
    }
    allDirectorsJson {
      edges {
        node {
          image_url
          title
          background
        }
      }
    }
    allContributorsJson {
      edges {
        node {
          image_url
          title
          date
        }
      }
    }
  }
`

export default AboutPage
