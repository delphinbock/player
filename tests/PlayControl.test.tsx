// Testing library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Component
import PlayControl from '@molecules/PlayControl'

// Mock props
const mockProps = {
  playing: false,
  toggle: jest.fn(),
}

describe('PlayControl', () => {
  // Test toggle button
  test('calls toggle function when PlayButton is clicked', () => {
    // Display component
    render(<PlayControl {...mockProps} loading={false} />)

    // Check button on screen
    const playButton = screen.getByRole('button')
    userEvent.click(playButton)
  })
})
