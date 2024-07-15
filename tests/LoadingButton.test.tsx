// Testing library
import { render } from '@testing-library/react'

// Component
import LoadingButton from '@atoms/LoadingButton'

describe('LoadingButton', () => {
  // Test if the LoadingButton component renders with spinner elements
  test('renders LoadingButton with spinner elements', () => {
    render(<LoadingButton />)

    // Check if spinner elements are present
    expect(document.querySelector('.spinner')).toBeInTheDocument()
    expect(document.querySelector('.spinner_bounce1')).toBeInTheDocument()
    expect(document.querySelector('.spinner_bounce2')).toBeInTheDocument()
    expect(document.querySelector('.spinner_bounce3')).toBeInTheDocument()
  })
})
