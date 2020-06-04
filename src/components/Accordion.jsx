import React, { useState } from "react"

const STATE_CLOSED = false
const STATE_OPEN = true

export default function Accordion({ id, items }) {
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

  const titleId = `${id}-item-${index}-title`
  const containerId = `${id}-item-${index}-container`

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
              aria-controls={containerId}
              onClick={() => toggleAccordionItem(index)}
            >
              <span className="accordion-item-toggle" />
              <span id={titleId} className="accordion-item-title">{item.title}</span>
            </button>
            <div
              id={containerId}
              role="region"
              aria-hidden={accordionState[index] === STATE_CLOSED}
              aria-labelledby={titleId}
              className="accordion-item-container"
            >
              <p className="accordion-item-content">{item.content}</p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
