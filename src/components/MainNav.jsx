import React from "react"
import { Link } from "gatsby"

import Logo from "../images/svgs/openlaw-logo.svg"
import SearchContainer from "./SearchContainer"


const MainNav = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleNavState = () => setIsNavOpen(!isNavOpen)
  let navHeight = 175

  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
     window.onscroll = function() {
      let nav = document.getElementById("nav")

      if (nav.offsetHeight - 65 > navHeight || (nav.offsetHeight && nav.offsetHeight >= 240)) {
        navHeight = nav.offsetHeight - 65;
      }

      if (document.documentElement.scrollTop >= navHeight) {
        document.body.style.marginTop = `${navHeight + 65}px`;
        
        nav.classList.add("nav-collapsed");
        nav.classList.remove("nav-container");
      } else {
        nav.classList.add("nav-container");
        document.body.style.marginTop = "0px";
        nav.classList.remove("nav-collapsed");
        
      }
    }
  }

  return (
    <header role="banner" id="nav" className="nav-container">
      <div className="nav-items">
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
              checked={isNavOpen}
              onChange={toggleNavState}
          />
          <span></span>
          <span></span>
          <span></span>

        
          <div className="nav-collapsing">
            <nav>
              <ul>
                <li><Link to="/our-mission" partiallyActive={true} activeClassName="link-active"  >Our Mission</Link></li>
                <li><Link to="/get-empowered" partiallyActive={true} activeClassName="link-active">Get Empowered</Link></li>
                <li><Link to="/get-involved" partiallyActive={true} activeClassName="link-active">Get Involved</Link></li>
                <li><Link activeClassName="link-active" partiallyActive={true} to="/news">News</Link></li>
              </ul>
            </nav>
          </div>
          <div className="nav-secondary">
            <a className="developers-text" href="https://github.com/openlawnz">
              Developers
            </a>
            <a className="developers-icon" href="https://github.com/openlawnz">
              <img src="assets/github-mark.png" alt="Developers"/>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MainNav