import React from "react"
import { Router } from "@reach/router"

import SingleCaseContainer from "../components/SingleCaseContainer";


export default () => {
  return (
    
      <Router basepath="/case">
        <SingleCaseContainer path="/:id" />

      </Router>
   
  )
}
