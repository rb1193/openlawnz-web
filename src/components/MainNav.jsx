import React from "react"
import { Link } from "gatsby"

import Logo from "../images/svgs/openlaw-logo.svg"
import SearchContainer from "./SearchContainer"


const MainNav = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleNavState = () => setIsNavOpen(!isNavOpen)

  return (
    <header role="banner" className="nav-container">
      <div className="nav-items">
        <div className="nav-logo">
          <Link to="/">
            <span className="visuallyhidden">OpenLaw NZ</span>
            <Logo alt="OpenLaw NZ" className="main-logo" />
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
              <Link activeClassName="link-active" to="/"><li>Our Mission</li></Link>
              <Link to="/get-empowered" partiallyActive={true} activeClassName="link-active"><li>Get Empowered</li></Link>
              <Link to="/about" partiallyActive={true} activeClassName="link-active"><li>Get Involved</li></Link>
              <Link activeClassName="link-active" partiallyActive={true} to="/news"><li>Blog</li></Link>
            </ul>
          </nav>
          <div className="nav-secondary">
          
          

          <ul>
              
              <a href="https://donorbox.org/openlaw-nz-3"><li>Support Us</li></a>
              <Link to="/developers"><li>Developers</li></Link>
              <Link to="/plugins"><li>Plugins</li></Link>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </header>
  )
}

export default MainNav
