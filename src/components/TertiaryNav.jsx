import React from "react"

import { Link } from "gatsby"

const TertiaryNav = props => {

  const toSlug = (string) => {
    return string.replace(/\s/g, '-').toLowerCase()
  }
  
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

                  </Link>
                  </li>
                  {
                    content[0] === props.page &&
                    <>
                      <ul className="tertiary-sub-routes">
                        {
                          props.secondary_data.map((x, idx) => {
                            return (
                              <li>
                                <Link to={(props.base + "/" + toSlug(content[1])) + "#" + toSlug(x)} key={idx}>
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
