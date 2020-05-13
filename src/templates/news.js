import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav"

const News = ({ pageContext }) => (
  <Layout>

    <SEO title="News" />
    <div className="side-wrapper">
        <div className="news-list">
          {pageContext.news.map((ni, idx) => (
            <NewsItem key={idx} context={ni} />
          ))}
        </div>
    </div>
    <TertiaryNav 
      base="/news/" 
      data={
        pageContext.news.map(({title}) =>  {
          return title
      })  
      }
      type="/"/>
  </Layout>
)

const NewsItem = ({
  context: { title, slug, formattedDate, image_url, image_alt, summary, content_html },
}) => (
  <div name={title} className="item">
    <header>
      <h2 >
        <Link to={"/news/" + slug}>{title}</Link>
      </h2>
    </header>

      
    <div className="content">
      <div className="image-container">
        {image_url && (
          <Link to={"/news/" + slug}>
            <img src={image_url} alt={image_alt} />
          </Link>
        )}
      </div>
      <div>

        <p dangerouslySetInnerHTML={{
          __html: summary,
        }}>
        </p>

        <Link className="newsLink" to={"/news/" + slug}>Read more</Link>
      </div>
    </div>
  </div>
)

export default News
