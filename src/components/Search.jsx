import React, { Component } from "react"
import DOMPurify from "dompurify"
import queryString from "query-string"
import SearchIcon from "../images/svgs/search-icon.svg"
import Exclamation from "../images/svgs/exclamation.svg"

import { navigate } from "gatsby"

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      currentSearchQuery: "",
      searchMsg: "",
    }
    this.searchMsgRef = React.createRef()
  }

  componentDidMount() {
    if (!this.props.populateComponent) return
    const locationSearch = queryString.parse(window.location.search)
    if (locationSearch.q) this.setState({ currentSearchQuery: locationSearch.q })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { currentSearchQuery } = this.state
    if (currentSearchQuery === "") {
      this.setState({
        searchMsg: "Please enter a search term",
      })
    } else if (this.props.onSubmit) {
      this.props.onSubmit(`q=${currentSearchQuery}`, `search=${currentSearchQuery}`, "query", currentSearchQuery)
    } else {
      navigate(`/search?q=${currentSearchQuery}`)
    }
  }

  handleChange(e) {
    this.setState({ currentSearchQuery: DOMPurify.sanitize(e.target.value) })
  }

  render() {
    return (
      <div className="search-container">
        <div className="search">
          <form className="search-input" onSubmit={this.handleSubmit.bind(this)}>
            <div className="input-wrapper">
              <label className="search-label" htmlFor="searchTerm">
                Search legal cases
              </label>
              
              <button type="submit" className="search-button" title="Search">
                <SearchIcon />
              </button>

              <input
                id="searchTerm"
                type="text"
                className="search-term"
                placeholder="Search legal cases"
                onChange={this.handleChange.bind(this)}
                value={this.state.currentSearchQuery}
              />
              
            </div>
            <button type="submit" className="search-submit-button">
              Search
            </button>
          </form>
          {this.props.toggleTypeOfSearch && (
            <div className="toggle-search">
              <a href="/">
                Search Help
              </a>
              <a data-testid="advanced-search-link" href="#advanced-search" onClick={this.props.toggleTypeOfSearch}>
              Advanced Search
              </a>
            </div>
            
          )}
        </div>
        {this.state.searchMsg ? (
          <div className="search-msg">
            <Exclamation /> <p>{this.state.searchMsg}</p>
          </div>
        ) : null}
      </div>
    )
  }
}
