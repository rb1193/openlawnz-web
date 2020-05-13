import React from "react"

const PluginShowcase = props => {
  return (
    <section className="plugins-list">   
      {props.data.map(
        ({ title, image_url, content_html, image_alt }, idx) => {
          return (
          <div name={title.replace(/\s/g, '-').toLowerCase()} key={idx} className="item">
            
            <div className="content-spaced">
              
            <h2>{title}</h2>

            <div dangerouslySetInnerHTML={{
              __html: content_html,
            }}></div>
             {image_url && (
                <img src={image_url} alt={image_alt} />
              )}
            </div>
            
          </div>
          )
        }
      )}
      <div className="item">
        <div className="content">
         <h3>
            If you build something with our platform, get in touch and we'll list it here.
          </h3>
        </div>
      </div>
    </section>
  )
}

export default PluginShowcase
