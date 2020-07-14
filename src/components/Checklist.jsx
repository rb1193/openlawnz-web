import React from "react"
import { useState } from "react"
import produce from "immer"

const CHECKLIST_CHECKED = true
const CHECKLIST_EMPTY = false

export default function Checklist({ id, items }) {
  const [checklist, setChecklist] = useState(
    items.map((item) => {
      if (item.subitems === undefined) return Array(1).fill(CHECKLIST_EMPTY)

      return Array(item.subitems.length).fill(CHECKLIST_EMPTY)
    })
  )

  const toggleCheck = (parentIndex, index) => {
    setChecklist(
      produce(checklist, (newState) => {
        newState[parentIndex][index] = !checklist[parentIndex][index]
      })
    )
  }

  const renderChecklistItem = (item, index) => {
    const titleId = `${id}-item-${index}-title`
    const containerId = `${id}-item-${index}-container`
    return (
      <article key={`checklist_item_${index}`} className="checklist-item">
        <header className="checklist-item-header">
          <strong id={titleId} className="checklist-item-title">
            {item.title}
          </strong>
        </header>
        <ul id={containerId} className="checklist-sub-item-list">
          {item.subitems !== undefined && item.subitems.map((subitem, subitemIndex) => {
            if (subitem.title === undefined) return <div></div>
            return (
              renderChecklistSubItem(subitem, subitemIndex, index)
            )
            
          })
          }
        </ul>
      </article>
    )
  }

  const renderChecklistSubItem = (subitem, index, parentIndex) => {
    if (subitem.content === undefined) return <div></div>
    return (
      <li key={`checklist_item_${parentIndex}_subitem_${index}`} className="checklist-sub-item">
        <div className="checklist-sub-item-control">
          <button
            className="checklist-item-checkbox"
            onClick={() => {
              toggleCheck(parentIndex, index)
            }}
          >
            {checklist[parentIndex][index] === CHECKLIST_CHECKED && <img src="/assets/check.svg" alt="checked" />}
          </button>
        </div>
        <div className="checklist-sub-item-content">
          <strong className="checklist-sub-item-title">{subitem.title}</strong>
          {subitem.content !== undefined && <p>{subitem.content}</p>}
        </div>
      </li>
    )
  }

  return <section className="checklist">{items.map((item, index) => renderChecklistItem(item, index))}</section>
}