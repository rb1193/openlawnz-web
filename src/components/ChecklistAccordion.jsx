import React, { useCallback } from "react"
import { useState } from "react"
import produce from "immer"

const CHECKLIST_ITEM_CHECKED = true
const CHECKLIST_ITEM_EMPTY = false

export default function ChecklistAccordion({ id, items }) {
  const [checklistItemState, setChecklistItemState] = useState(Array(items.length).fill(CHECKLIST_ITEM_EMPTY))
  const [checklistSubItemState, setChecklistSubItemState] = useState(
    items.map((item) => {
      return Array(item.items.length).fill(CHECKLIST_ITEM_EMPTY)
    })
  )

  const toggleItem = (index) => {
    setChecklistItemState(produce(checklistItemState, newState => {
      newState[index] = !checklistItemState[index]
    }))
    setChecklistSubItemState(produce(checklistSubItemState, newState => {
      newState[index] = checklistSubItemState[index].map(() => {
        return !checklistItemState[index] ? CHECKLIST_ITEM_CHECKED : CHECKLIST_ITEM_EMPTY
      })
    }))
  }

  const renderChecklistItem = (item, index) => {
    const titleId = `${id}-item-${index}-title`
    const containerId = `${id}-item-${index}-container`
    return (
      <article key={`checklist_item_${index}`} className="checklist-item">
        <header className="checklist-item-header">
          <button className="checklist-item-checkbox" onClick={() => toggleItem(index)}>
            {checklistItemState[index] === CHECKLIST_ITEM_CHECKED && (
              <img className="checklist-item-checkbox-check" src="/assets/check.svg" alt="checked" />
            )}
          </button>
          <p id={titleId} className="checklist-item-title">{item.title}</p>
        </header>
        <ul id={containerId}>
          {item.items.map((subItem, subItemIndex) => renderChecklistSubItem(subItem, subItemIndex, index))}
        </ul>
      </article>
    )
  }

  const renderChecklistSubItem = (item, index, parentIndex) => {
    return (
      <li key={`checklist_item_${parentIndex}_subitem_${index}`} className="checklist-item checklist-sub-item">
        <div>
          <button className="checklist-item-checkbox">
            {checklistSubItemState[parentIndex][index] === CHECKLIST_ITEM_CHECKED && (
              <img src="/assets/check.svg" alt="checked" />
            )}
          </button>
        </div>
        <div>
          <p>{item.title}</p>
          <p>{item.content}</p>
        </div>
      </li>
    )
  }

  return <section className="checklist">{items.map((item, index) => renderChecklistItem(item, index))}</section>
}
