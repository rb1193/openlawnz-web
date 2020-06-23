import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TertiaryNav from "../components/TertiaryNav.jsx"
import Accordion from "../components/Accordion"
import Checklist from "../components/Checklist"
import Wizard from "../components/Wizard/Wizard"

const Microsite = ({ pageContext }) => {
  
  function selectModule(module, idx) { //selects the correct module type
    let title = module.title.replace(/\s/g, '-').toLowerCase()

    const errorModule = (message) => {
      return <div className="microsite-paragraph" key={idx} name={title}>
        <h4>{module.title}</h4>
        Error: {message}
      </div>
    }
    
    switch(module.type) { 
      case "text": // Single heading, multiple paragraphs.
        return (
          <div key={idx} name={title} className="module-block">
            <h3>{module.title}</h3>
            {
              module.content.map(({content_html}, idx) => {
                return (
                  <div key={idx}
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
          <div key={idx} name={title} className="module-block">
            <h4>{module.title}</h4>
            <Accordion id={`faqs-${idx}`} items={module.content.map(faq => {
              return { title: faq.question, content: faq.answer }
            })}/>
          </div>
        )
      case "wizard":
        // This is uncomfortably fragile but the Netlify CMS does not support auto-generated ID/key fields
        // as of 29/05/2020
        const wizardData = pageContext.wizardData.find(wizard => wizard.key === module.wizard)
        if (!wizardData) return errorModule("Wizard data not found")
        return (
          <div key={idx} className="module-block" name={wizardData.title.replace(/\s/g, '-').toLowerCase()}>
            <Wizard title={wizardData.title} background={wizardData.background} steps={wizardData.steps} />
          </div>
        )
      case "checklist":
        return (
          <div key={idx} name={title} className="module-block">
            <h4>{module.title}</h4>
            <Checklist id={`checklist-${idx}`} items={module.content.map(item => {
              return { title: item.title, items: item.items }
            })}/>
          </div>
        )
      default: //Error Paragraph
        return (
          errorModule("Module type not found")
        )
    }
  }

  return (
  <Layout>
  <SEO title={`${pageContext.title} - ${pageContext.section.title}`} description={pageContext.description} />
  <div className="tertiary-background">
    <div className="side-wrapper">
      <div className="container main">
        <div className="content">
          <h1>{pageContext.title} - {pageContext.section.title}</h1>
          <div className="microsite-section" name={pageContext.section.title}>
            {
              pageContext.section.modules.map((module, idx) => {
                
                return (
                  <div key={idx}>
                    {selectModule(module, idx)}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
    <TertiaryNav 
      base={"/get-empowered/" + pageContext.title.replace(/\s/g, '-').toLowerCase()} 
      data={pageContext.section_headings.map((x) =>  {
          return x
      })}
      secondary_data={pageContext.section.modules.map(x => x.title)}
      type="/"
      page={pageContext.section.title}
      />
    </div>
  </Layout>
  )
}


export default Microsite