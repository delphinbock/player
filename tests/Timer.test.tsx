// Testing library
import { render } from '@testing-library/react'

// Component
import Timer from '@molecules/Timer'

// Test timer
test('renders timer with given counter', () => {
  // Default
  const counter = { hour: '1', min: '30', sec: '45' } // Convertir les nombres en chaînes

  // Timer text
  const { getByText } = render(<Timer counter={counter} />)

  // Default
  const hoursElement = getByText('1')
  const minutesElement = getByText('30')
  const secondsElement = getByText('45')

  // Check text in document
  expect(hoursElement).toBeInTheDocument()
  expect(minutesElement).toBeInTheDocument()
  expect(secondsElement).toBeInTheDocument()
})
