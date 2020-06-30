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
              <div key={idx}>
              {
                <>  
                <li className="tertiary-item">
                  <Link to={(props.base + "/" + toSlug(content[1]))}
                  activeClassName="tertiary-active">

                  {content[0]}
                  </Link>
                  </li>
                  {
                    content[0] === props.page &&
                    <>
                      <ul className="tertiary-sub-routes">
                        {
                          props.secondary_data.map((x, idx) => {
                            return (
                              <li key={idx}>
                                <Link  to={(props.base + "/" + toSlug(content[1])) + "#" + toSlug(x)} key={idx}>
                                 {x}
                                </Link>
                              </li>
                            )  
                          })
                        }
                      </ul>
                    </>
                  }
                </>
                }
              </div>
            )
          })
        }
      </ul>
    </div>
  )
}

export default TertiaryNav
