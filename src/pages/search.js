import React, { Component } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchResults from "../components/SearchResults"

class SearchPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Search results" />
        <SearchResults />
      </Layout>
    )
  }
}

export default SearchPage
