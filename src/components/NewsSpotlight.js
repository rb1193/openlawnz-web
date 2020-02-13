import React, { Component } from "react"
import { Link } from "gatsby"
import { getNews } from "../js/ApiNews"
import NewsContext from "../components/NewsContext"

const selectNews = (news = [], qty = 3) => news.slice(0, qty)

class NewsSpotlight extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    if (!this.context.data) {
      const data = await getNews()
      this.context.updateData(data.items)
      this.setState({ data: selectNews(data.items) })
    } else {
      this.setState({ data: selectNews(this.context.data) })
    }
  }

  render() {
    return (
      <section className="news-container">
        <div className="news-items">
          <h1>
            <Link to="/news">News</Link>
          </h1>
          <div className="news-cards-wrapper">
            {this.state.data.map(
              (
                { slug, title, image_url: imageUrl, summary, image_alt },
                idx
              ) => (
                <div key={idx} className="news-card">
                  {imageUrl && (
                    <div className="picture">
                      <img src={imageUrl} alt={image_alt} />
                    </div>
                  )}
                  <div>
                    <h2>{title}</h2>
                    <p>{summary}</p>

                    <Link to={"/news/" + slug} className="link">
                      Find out more
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    )
  }
}

NewsSpotlight.contextType = NewsContext

export default NewsSpotlight
