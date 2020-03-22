import React from "react"
import DOMPurify from "dompurify";

const Markdown = content => {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.data) }} />;
}
export default Markdown