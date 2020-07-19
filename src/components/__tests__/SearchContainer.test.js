import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import SearchContainer from '../SearchContainer'

test('shows advanced search when search is toggled', () => {
  render(<SearchContainer />)

  expect(screen.getByTestId('advanced-search-link')).toBeInTheDocument()

  fireEvent.click(screen.getByTestId('advanced-search-link'))

  expect(screen.getByTestId('advanced-search-title')).toBeInTheDocument()
})

test('shows basic search when advanced search is cancelled', () => {
  render(<SearchContainer />)

  fireEvent.click(screen.getByTestId('advanced-search-link'))

  expect(screen.getByTestId('advanced-search-title')).toBeInTheDocument()

  fireEvent.click(screen.getByText('Cancel'))

  expect(screen.getByTestId('advanced-search-link')).toBeInTheDocument()
  expect(screen.queryByTestId('advanced-search-title')).not.toBeInTheDocument()
})