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
                  <Link to={(props.base + "/" + toSlug(content[1]))}
                  activeClassName="tertiary-active">

                  <li className="tertiary-item">{content[0]}</li>
                  </Link>
                  {
                    content[0] === props.page &&
                    <>
                      <ul className="tertiary-sub-routes">
                        {
                          props.secondary_data.map((x, idx) => {
                            return (
                              <Link to={(props.base + "/" + toSlug(content[1])) + "#" + toSlug(x)} key={idx}>
                                <li>
                                  {x}
                                </li>
                              </Link>
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
