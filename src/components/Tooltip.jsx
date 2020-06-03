import React, { useState, useRef, useLayoutEffect } from "react"
import { createPopper } from "@popperjs/core"

export default function Tooltip({ name, content }) {
  const toggle = useRef(null)
  const tooltip = useRef(null)

  const [active, setActive] = useState(false)

  useLayoutEffect(() => {
    if (!toggle.current || !tooltip.current) {
      return
    }

    let popper = createPopper(toggle.current, tooltip.current, { placement: "auto" })

    return () => {
      popper.destroy()
      popper = null
    }
  }, [toggle, tooltip])

  const tooltipClasses = active ? ["tooltip-content", "tooltip-content-visible"]
    : ["tooltip-content"]

  return (
    <span className="tooltip">
      <button
        id={`${name}-toggle`}
        className="tooltip-toggle"
        aria-describedby={active ? `${name}-content` : null}
        aria-expanded={active}
        ref={toggle}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <img src="/assets/info.svg" alt="More information"/>
      </button>
      <div
        id={`${name}-content`}
        className={tooltipClasses.join(" ")}
        ref={tooltip}
        role="tooltip"
      >{content}</div>
    </span>
  )
}
