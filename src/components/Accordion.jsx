import React, { useState } from "react"

const STATE_CLOSED = false
const STATE_OPEN = true

export default function Accordion({ items }) {
  const initialAccordionState = items.map(() => STATE_CLOSED)
  const [accordionState, setAccordionState] = useState(initialAccordionState)

  const toggleAccordionItem = (index) => {
    setAccordionState(
      accordionState.map((state, key) => {
        if (key === index) {
          return state === STATE_CLOSED ? STATE_OPEN : STATE_CLOSED
        }
        return STATE_CLOSED
      })
    )
  }

  return (
    <section className="accordion">
      {items.map((item, index) => {
        const itemClasses =
          accordionState[index] === STATE_OPEN ? ["accordion-item", "accordion-item-open"] : ["accordion-item"]
        return (
          <article key={`accordion_item_${index}`} className={itemClasses.join(" ")}>
            <button
              className="accordion-item-control"
              tabIndex="0"
              aria-expanded={accordionState[index] === STATE_OPEN}
              aria-controls={`accordion-item-container-${index}`}
              onClick={() => toggleAccordionItem(index)}
            >
              <span className="accordion-item-toggle" />
              <span className="accordion-item-title">{item.title}</span>
            </button>
            <div
              id={`accordion-item-container-${index}`}
              role="region"
              aria-hidden={accordionState[index] === STATE_CLOSED}
              aria-labelledby={`accordion-item-toggle-${index}`}
              className="accordion-item-container"
            >
              <p className="accordion-item-content" dangerouslySetInnerHTML={{ __html: item.content_html }}></p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
