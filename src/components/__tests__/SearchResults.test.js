import "@testing-library/jest-dom"
import React from "react"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import { Server } from "miragejs"
import fakerStatic from "faker"

import SearchResults from "../SearchResults"

let server

const testResults = Array(20).fill().map(() => {
  return {
    caseId: fakerStatic.random.number({ min: 1000, max: 50000 }),
    caseName: `${fakerStatic.name.findName()} vs ${fakerStatic.name.findName()}`,
    citation: fakerStatic.random.alphaNumeric(10),
    date: fakerStatic.date.past(30).toISOString(),
  }
})

const testData = {
  results: testResults,
  total: 20
}

beforeEach(() => {
  server = new Server()
})

afterEach(() => {
  server.shutdown()
})

test("fetches and renders search results", async () => {
  server.get(`${process.env.GATSBY_SEARCH_API_URL}/cases`, () => testData)
  window.history.replaceState({}, "", "/search?q=foo")
  
  render(<SearchResults />)

  expect(screen.queryByTestId('searching-message')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.queryByTestId('searching-message')).not.toBeInTheDocument()
    expect(screen.queryByTestId('search-results-message')).toBeInTheDocument()
    testData.results.splice(-10).forEach(result => {
      expect(screen.getByText(result.caseName)).toBeInTheDocument()
    });
  })
})

test("fetches the next page of search results when a pagination link is clicked", async () => {
  server.get(`${process.env.GATSBY_SEARCH_API_URL}/cases`, () => testData)
  window.history.replaceState({}, "", "/search?q=foo")
  
  const { container } = render(<SearchResults />)

  await waitFor(() => {
    expect(screen.queryByTestId('searching-message')).not.toBeInTheDocument()
  })

  fireEvent.click(container.querySelector('.pagination-header .next a'))

  await waitFor(() => {
    expect(screen.queryByTestId('searching-message')).not.toBeInTheDocument()
  })

  // TODO: Test that second tranche of results are used
})
