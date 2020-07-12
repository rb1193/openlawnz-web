import React from "react"
import { Link } from "gatsby"

const LandingCard = ({content, idx, slug}) => {
    let {title, description, image_url} = content
    return (
    <div className="landing-card" key={idx}>
        
        <h2>{title}</h2>
        <hr/>   
        <img src={image_url} alt={title}/>
        <p>{description}</p>
        
        
        
        <Link to={slug}/>
    </div>
    )
}

export default LandingCard
