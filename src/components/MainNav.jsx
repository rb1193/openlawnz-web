import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Logo from "../images/svgs/openlaw-logo.svg"
import SearchContainer from "./SearchContainer"
import {toSlug} from "../js/ToSlug"


const MainNav = () => {

  const { allMicrositesJson, allGetInvolvedJson } = useStaticQuery(
    graphql`
      query {
        allMicrositesJson {
          nodes {
            title
            fields {
              slug
            }
            content {
              title
            }
          }
        }
        allGetInvolvedJson {
          nodes {
            title
            fields {
              slug
            }
          }
        }
      }
    `
  )

  return (
    <header role="banner" id="nav" className="nav-container">
      <div className="nav-items centre">
        <div className="nav-logo">
          <Link to="/">
            <span className="visuallyhidden">OpenLaw NZ</span>
            <Logo alt="OpenLaw NZ" className="main-logo" />
            <img alt="OpenLaw NZ (Small) " src="/assets/openlaw-logo-small.png"/>
          </Link>
        </div>

        <div className="nav-search">
          <SearchContainer/>
        </div>
        
        <div className="nav-menu"  id="menuToggle">
          <input
              aria-hidden
              type="checkbox"
          />
          <span></span>
          <span></span>
          <span></span>

        
          <div className="nav-collapsing">
            <nav>
              <ul>
                <li><Link to="/our-mission" partiallyActive={true} activeClassName="link-active"  >Our Mission</Link></li>
                <li>
                  <Link to="/get-empowered" partiallyActive={true} activeClassName="link-active">Get Empowered</Link>
                    <input
                      aria-hidden
                      type="checkbox"
                    />
                    <span></span>
                    <span></span>

                  <ul className="mobile-secondary">
                    {
                      allMicrositesJson.nodes.map(({title, fields, content}, idx) => {
                        return (
                          <li key={idx}>
                            <Link to={`/get-empowered${fields.slug}${toSlug(content[0].title)}`}>{title}</Link>
                          </li>
                        )
                    })
                    }
                  </ul>
                </li>
                <li><Link to="/get-involved" partiallyActive={true} activeClassName="link-active">Get Involved</Link>
                  <input
                    aria-hidden
                    type="checkbox"
                  />
                  <span></span>
                  <span></span>
                
                  <ul className="mobile-secondary">
                    {
                      allGetInvolvedJson.nodes.map(({title, fields}, idx) => {
                        return (
                          <li key={idx}>
                            <Link to={`/get-involved${fields.slug}`}>{title}</Link>
                          </li>
                        )
                    })
                    }
                  </ul>
                </li>
                <li><Link to="/news" partiallyActive={true} activeClassName="link-active">News</Link></li>
              </ul>
            </nav>
           
          </div>
         
        </div>
        <div className="nav-secondary">
          <a className="developers-text" href="https://github.com/openlawnz">
            Developers
          </a>
        </div>
      </div>
    </header>
  )
}

export default MainNav