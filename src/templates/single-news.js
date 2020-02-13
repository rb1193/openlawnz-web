import React from "react"

import Layout from "../components/layout"
import InfoCard from "../components/InfoCard"
import SearchContainer from "../components/SearchContainer"
import SEO from "../components/seo"

const SingleNews = ({ pageContext, history }) => (
  <Layout>
    <SEO title={`${pageContext.title}`} description={pageContext.summary} />
    <div className="highlighted-content">
      <SearchContainer history={history} />
      <InfoCard classModifier="info-card--large info-card--title info-card--column">
        <h1>{pageContext.title}</h1>
        <span>{pageContext.formattedDate}</span>
      </InfoCard>
    </div>
    <div className="home-wrapper">
      <div className="container main">
        <div className="content">
          {pageContext.image && (
            <>
              <div className="image-container">
                <img src={pageContext.image} alt={pageContext.image_alt} />
              </div>
              <hr className="divider" />
            </>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: pageContext.content_html,
            }}
          />
        </div>
      </div>
    </div>
  </Layout>
)

export default SingleNews
