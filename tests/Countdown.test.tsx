// @ts-ignore
import React from 'react'
import { render } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import Counter from '@atoms/Countdown'

// Mock useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

// Mock Redux fn
jest.mock('@redux/playerSlice', () => ({
  resetPlayer: jest.fn(),
  setError: jest.fn(),
}))

describe('Counter', () => {
  let dispatchMock: jest.Mock

  beforeEach(() => {
    dispatchMock = jest.fn()
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock)
  })

  afterEach(() => {
    // Clean all mocks after each test
    jest.clearAllMocks()
  })

  // Test countdown element
  test('render countdown element', () => {
    // Rendu du composant
    render(<Counter timerInSecondes={5} />)
  })

  // Test countdown set 0 seconde
  test('does not render countdown when timerInSecondes is 0', () => {
    // Render component with the timer set at 0
    render(<Counter timerInSecondes={0} />)

    // Check that no countdown is rendered in the DOM
    const countdownDisplay = document.querySelector('.countdownDisplay')

    // Check that the countdown element is not in the document
    expect(countdownDisplay).not.toBeInTheDocument()
  })
})
