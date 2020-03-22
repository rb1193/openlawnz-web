import React from "react"
import DOMPurify from "dompurify";

const Sanitizer = content => {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.data) }} />;
}
export default Sanitizer