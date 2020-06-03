import React, { useReducer } from "react"
import WizardStep from "./WizardStep"
import WizardStart from "./WizardStart"

export const WizardOperations = {
  BACK: "back",
  NEXT: "next",
  RESTART: "restart",
}

const wizardReducer = (stack, action) => {
  switch (action.type) {
    case WizardOperations.NEXT:
      return stack.concat([action.payload])
    case WizardOperations.BACK:
      return stack.slice(0, -1)
    case WizardOperations.RESTART:
      return []
    default:
      throw Error("Invalid wizard reducer operation")
  }
}

export default function Wizard({ background, title, steps }) {
  const [wizardStack, dispatch] = useReducer(wizardReducer, [])

  return (
    <section className="wizard" style={{ backgroundImage: `url(${background})` }}>
      {wizardStack.length === 0 ? (
        <WizardStart title={title} start={() => dispatch({ type: WizardOperations.NEXT, payload: steps[0].key })} />
      ) : (
        <WizardStep step={steps.find((step) => step.key === wizardStack[wizardStack.length - 1])} navigate={dispatch} />
      )}
    </section>
  )
}
