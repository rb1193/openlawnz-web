import React from "react"

import { Link } from "gatsby"
import { toSlug } from "../js/ToSlug"


const TertiaryNav = props => {
  return (
    <div className="tertiary-nav">
      <ul className="primary-menu">
        {
          props.data.map((content, idx) => {  
            return (
              <div key={idx} >
                <li className="tertiary-item">
                  <Link to={(props.base + "/" + toSlug(content[1]))}
                  activeClassName="tertiary-active">

                  {content[0]}
                  </Link>
                  </li>
                  {
                    content[0] === props.page &&
                      <ul className="tertiary-sub-routes">
                        {
                          props.secondary_data.map((title, idx) => {
                            return (
                              <li key={idx}>
                                <Link  to={(props.base + "/" + toSlug(content[1])) + "#" + toSlug(title)} key={idx}>
                                 {title}
                                </Link>
                              </li>
                            )  
                          })
                        }
                      </ul>
                  }
              </div>
            )
          })
        }

        { //Used in the 'Get Empowered' Page.
          props.tertiary_data !== undefined &&
          <div className="secondary-menu">
            {
              props.tertiary_data.map((content, idx) => (
                <li className="tertiary-item" key={idx}>
                  <Link to={(props.base + "/" + toSlug(content[1]))}
                  activeClassName="tertiary-active">
    
                  {content[0]}
                  </Link>
                </li>
              ))
            }
          </div>
          
        }
      </ul>
    </div>
  )
}

export default TertiaryNav
