import React from "react"

export default function WizardStart({ title, start }) {
  return (
    <div className="wizard-start">
      <div className="wizard-step-content">
        <p className="wizard-title">{title}</p>
        <button className="wizard-start-btn" onClick={start}>
          Start
        </button>
      </div>
    </div>
  )
}
