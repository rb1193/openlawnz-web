import React from "react"
import Accordion from "../components/Accordion"
import Wizard from "../components/Wizard/Wizard"
import { toSlug } from "../js/ToSlug"
import Checklist from "../components/Checklist"

const ModuleSelector = ({module, idx, wizardModuleData}) => {
    
    let title = toSlug(module.title)
    
    const errorModule = (message) => {
      return <div className="microsite-paragraph" name={title}>
        <h2>{module.title}</h2>
        <p>Error: {message}</p>
      </div>
    }
    
    switch(module.type) { 
      case "text": // Single heading, multiple paragraphs.
        return (
          <div name={title} className="module-block">
            <h2>{module.title}</h2>
            {
              module.content.map(({content_html}, idx) => {
                return (
                  <p key={idx}
                    className="microsite-paragraph"
                    dangerouslySetInnerHTML={{ __html: content_html }}
                  />
                ) 
              })
            }
          </div>
        )
        case "faqs":
            return (
            <div name={title}  className="module-block">
                <h4>{module.title}</h4>
                <Accordion id={`faqs-${idx}`} items={module.content.map(faq => {
                return { title: faq.question, content: faq.answer }
                })}/>
            </div>
            )
        case "contributors":
            return (
              <div>
                <h2>{module.title}</h2>
                <div className="cards-list">
                  {
                    module.contributors.map(({image_url, title}, idx) => {
                      return(
                        <div key={idx} className="card-item-small">
                          <div>
                            <img src={image_url} alt={title}/>
                            <strong>{title}</strong>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
        case "directors":
            return (
                <div>
                <h2>{module.title}</h2>
                <div className="cards-list directors">
                    {module.directors.map(({name, bio, image_url}, idx) => {
                    return (
                        <div className="card-item" key={idx}>
                        <img src={image_url} alt={name}></img>
                        <strong>{name}</strong>
                        <p>{bio}</p>
                        </div>
                    )
                    })}
                </div>
                
                </div>
            )
        case "wizard":
            // This is uncomfortably fragile but the Netlify CMS does not support auto-generated ID/key fields
            // as of 29/05/2020
            const wizardData = wizardModuleData.find(wizard => wizard.key === module.wizard)
            if (!wizardData) return errorModule("Wizard data not found")
            return (
            <div className="module-block" name={wizardData.title.replace(/\s/g, '-').toLowerCase()}>
                <Wizard title={wizardData.title} background={wizardData.background} steps={wizardData.steps} />
            </div>
            )
        case "checklist":
          return (
            <div key={idx} name={title} className="module-block">
              <h4>{module.title}</h4>
              <Checklist id={`checklist-${idx}`} items={module.content}/>
            </div>
          )
        default: //Error Paragraph
            return errorModule("Module type not found")
    }
}

export default ModuleSelector
