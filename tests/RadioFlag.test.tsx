// Testing library
import { render, screen, waitFor } from '@testing-library/react'

// Component
import RadioFlag from '@atoms/RadioFlag'

// Lib
import { loadImage } from '@libs/mainLib'

// Mock loadImage
jest.mock('@libs/mainLib', () => ({
  loadImage: jest.fn(),
}))

describe('RadioFlag', () => {
  // Default
  const flag = 'fr'
  const imgPath = '/images/'

  // Clean mocks
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test component
  test('renders RadioFlag and loads image successfully', async () => {
    // Mock LoadImage base64
    ;(loadImage as jest.Mock).mockResolvedValue('data:image/png;base64,IMAGE_DATA')

    // Display component
    render(<RadioFlag flag={flag} imgPath={imgPath} />)

    // Check loading image
    await waitFor(() => expect(loadImage).toHaveBeenCalledWith({ nameStr: flag, imgPath: `${imgPath}flags/` }))

    // Check display flag
    const imgElement = screen.getByAltText(`flag_${flag}`)

    // Check image existing in document
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', 'data:image/png;base64,IMAGE_DATA')
  })

  // Test error loading
  test('handles error when image fails to load', async () => {
    // Mock LoadImage error
    ;(loadImage as jest.Mock).mockRejectedValue(new Error('Image load error'))

    // Hide console
    const originalConsoleError = console.error
    console.error = jest.fn()

    // Display component
    render(<RadioFlag flag={flag} imgPath={imgPath} />)

    // Check error
    await waitFor(() => expect(loadImage).toHaveBeenCalledWith({ nameStr: flag, imgPath: `${imgPath}flags/` }))

    // Check display error
    const imgElement = screen.getByAltText(`flag_${flag}`)

    // Check error existing in document
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', '')

    // Restaurer console.error
    console.error = originalConsoleError
  })
})
