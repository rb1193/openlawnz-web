import React, { useState } from "react"
import { WizardOperations } from "./Wizard"
import Tooltip from "../Tooltip"

export default function WizardStep({ step, navigate }) {
  const [selectedOption, setSelectedOption] = useState(null)

  const onOptionClick = (option) => {
    if (option.hasOwnProperty("next")) {
      navigate({ type: WizardOperations.NEXT, payload: option.next })
      return
    }
    setSelectedOption(option)
  }

  const onNavigation = (type) => {
    setSelectedOption(null)
    navigate({ type: type })
  }

  return (
    <div className="wizard-step">
      <button className="wizard-nav-btn wizard-back" onClick={() => onNavigation(WizardOperations.BACK)}>
        <svg
          className="wizard-nav-btn-icon"
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.7188 1L1.71875 10L10.7188 19" strokeWidth="2" />
        </svg>
        <span>Back</span>
      </button>
      <div className="wizard-step-content">
        <p className="wizard-question">{step.question}</p>
        {selectedOption === null ? (
          <div className="wizard-step-options">
            {step.options.map((option) => {
              const optionId = `${step.key}_${option.value}`
              return (
                <div key={optionId} className="wizard-step-option">
                  <input
                    className="wizard-step-option-btn"
                    id={optionId}
                    type="button"
                    onClick={() => onOptionClick(option)}
                  />
                  <label className="wizard-step-option-label" htmlFor={optionId}>
                    {option.label}
                  </label>
                  {option.tooltip && <Tooltip name={optionId} content={option.tooltip} />}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="wizard-step-selected-option-content">
            <span>{selectedOption.label}</span>
            <div dangerouslySetInnerHTML={{ __html: selectedOption.content }}></div>
          </div>
        )}
      </div>
      <button className="wizard-nav-btn wizard-restart" onClick={() => onNavigation(WizardOperations.RESTART)}>
        <svg
          className="wizard-nav-btn-icon"
          width="19"
          height="20"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.01074 16H11.8256C14.6893 16 17.0107 13.6785 17.0107 10.8148C17.0107 7.95112 14.6893 5.62963 11.8256 5.62963H1.81074M1.81074 5.62963L6.34408 9.77778M1.81074 5.62963L6.34408 1.33333"
            strokeWidth="2"
          />
        </svg>
        <span>Restart</span>
      </button>
    </div>
  )
}
