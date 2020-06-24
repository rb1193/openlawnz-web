import React from "react"
import { Link } from "gatsby"

const LandingCard = (props) => {
    let content = props.content
    return (
    <div className="landing-card" key={props.idx}>
        
        <h2>{content.title}</h2>
        <p>{content.description}</p>
        
        <img src={content.image_url} alt={content.title}/>
        
        <Link to={`${props.slug}`}/>
    </div>
    )
}

export default LandingCard
