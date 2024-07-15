// Testing library
import { render, fireEvent, screen } from '@testing-library/react'

// Component
import PlayButton from '@atoms/PlayButton'

describe('PlayButton', () => {
  // Test play button faPlay
  test('renders PlayButton with faPlay icon when not playing', () => {
    // Display play button no playing
    render(<PlayButton playing={false} onClick={() => {}} />)

    // Button role
    const playButton = screen.getByRole('button')

    // Check if button is present and has the correct class
    expect(playButton).toBeInTheDocument()
    expect(playButton).toHaveClass('playButton')
  })

  // Test play button faStop
  test('renders PlayButton with faStop icon when playing', () => {
    // Display play button playing
    render(<PlayButton playing={true} onClick={() => {}} />)

    // Button role
    const playButton = screen.getByRole('button')

    // Check if button is present and has the correct class
    expect(playButton).toBeInTheDocument()
    expect(playButton).toHaveClass('playButton playButton_noPulse')
  })

  // Test clicked play button
  test('calls onClick handler when PlayButton is clicked', () => {
    // Jest function
    const handleClick = jest.fn()

    // Display play button no playing
    render(<PlayButton playing={false} onClick={handleClick} />)

    // Button role
    const playButton = screen.getByRole('button')

    // Click event
    fireEvent.click(playButton)

    // Check calls
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
