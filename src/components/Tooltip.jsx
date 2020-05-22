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
        aria-describedby={active ? `${name}-content`: null}
        aria-expanded={active}
        ref={toggle}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM8.40333 11.7799H9.44894V12.8728H8.40333V11.7799ZM7.27365 5.74529C7.701 5.28466 8.28773 5.05435 9.03385 5.05435C9.72392 5.05435 10.2765 5.25138 10.6916 5.64546C11.1067 6.03954 11.3142 6.54307 11.3142 7.15608C11.3142 7.52739 11.238 7.82863 11.0857 8.05982C10.9333 8.29102 10.6259 8.63079 10.1635 9.07917C9.82725 9.40493 9.6092 9.68079 9.50936 9.90672C9.40953 10.1327 9.35962 10.4663 9.35962 10.9077H8.42434C8.42434 10.4068 8.48389 10.0031 8.60299 9.69655C8.72209 9.39005 8.98305 9.03888 9.38589 8.64306L9.80623 8.22796C9.93234 8.10887 10.0339 7.98451 10.111 7.85491C10.2511 7.62722 10.3212 7.39078 10.3212 7.14557C10.3212 6.80229 10.2187 6.50454 10.0138 6.25234C9.80886 6.00013 9.46996 5.87402 8.99707 5.87402C8.41208 5.87402 8.0075 6.0912 7.78332 6.52556C7.65721 6.76726 7.5854 7.11579 7.56789 7.57117H6.63262C6.63262 6.81454 6.84629 6.20592 7.27365 5.74529Z"
            fill="#A26638"
          />
        </svg>
      </button>
      <div
        id={`${name}-content`}
        className={tooltipClasses.join(" ")}
        ref={tooltip}
        role="tooltip"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </span>
  )
}
