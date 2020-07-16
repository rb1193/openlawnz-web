import React from "react"

import { Link } from "gatsby"
import { toSlug } from "../js/ToSlug"


const TertiaryNav = props => {
  return (
    <div className="tertiary-nav">
      <ul className="primary-menu">
        {
          props.data.map(({title, link=title}, idx) => {
            return (
              <div key={idx} >
                <li className="tertiary-item">
                  <Link to={(props.base + "/" + toSlug(link))}
                  activeClassName="tertiary-active">

                  {title}
                  </Link>
                  </li>
                  {
                    title === props.page &&
                      <ul className="tertiary-sub-routes">
                        {
                          props.secondary_data.map((title, idx) => {
                            return (
                              <li key={idx}>
                                <Link  to={(props.base + "/" + toSlug(link)) + "#" + toSlug(title)} key={idx}>
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
              props.tertiary_data.map(({title, link=title}, idx) => (
                <li className="tertiary-item" key={idx}>
                  <Link to={(props.base + "/" + toSlug(link))}
                  activeClassName="tertiary-active">
    
                  {title}
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
