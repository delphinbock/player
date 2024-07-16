// Testing library
import { render, fireEvent } from '@testing-library/react'

// Component
import VolumeControl from '@molecules/VolumeControl'

// Test change the volume input range
test('changes volume via input range', () => {
  // Default
  const onChangeVolume = jest.fn()

  // Input role
  const { getByRole } = render(<VolumeControl volume={0.5} onChangeVolume={onChangeVolume} />)

  // Volume range
  const volumeRange = getByRole('slider')

  // Event change volume
  fireEvent.change(volumeRange, { target: { value: '0.7' } })

  // Check calls
  expect(onChangeVolume).toHaveBeenCalledWith(0.7)
})

// Test volume event on wheel
test('changes volume via wheel event', () => {
  // Default
  const onChangeVolume = jest.fn()

  // Container of volume control
  const { container } = render(<VolumeControl volume={0.5} onChangeVolume={onChangeVolume} />)

  // Volume range
  const volumeRange = container.querySelector('.controlVolume_volumeRange')

  // Check existing volume range
  if (volumeRange) {
    // Scroll to top
    fireEvent.wheel(volumeRange, { deltaY: -100 })

    // Limited at 1
    expect(onChangeVolume).toHaveBeenCalledWith(0.6)

    // Scroll to bottom
    fireEvent.wheel(volumeRange, { deltaY: 100 })

    // Limited at 0
    expect(onChangeVolume).toHaveBeenCalledWith(0.5)
  } else {
    // If volume is null
    throw new Error('Volume range input not found')
  }
})
