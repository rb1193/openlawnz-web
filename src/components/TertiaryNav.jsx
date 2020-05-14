import React from "react"

import { Link } from "gatsby"

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
                              <Link to={(props.base + props.type + content.replace(/\s/g, '-').toLowerCase())}
                               activeClassName="tertiary-active">

                                <li className="tertiary-item">{content}</li>
                              </Link>
                              {
                                content === props.page &&  props.type === "/" &&
                                <>
                                 <ul className="tertiary-sub-routes">
                                    {
                                      props.secondary_data.map((x, idx) => {
                                        return (
                                        <Link to={(props.base + props.type + content.replace(/\s/g, '-').toLowerCase()) + "#" + x.replace(/\s/g, '-').toLowerCase()} key={idx}>
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
