// Testing library
import { render, screen, waitFor } from '@testing-library/react'

// Component
import RadioLogo from '@atoms/RadioLogo'

// Lib
import { loadImage } from '@libs/mainLib'

// Mock loadImage
jest.mock('@libs/mainLib', () => ({
  loadImage: jest.fn(),
}))

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = jest.fn()
  disconnect = jest.fn()
  callback: any
  constructor(callback: any) {
    this.callback = callback
  }
}

// Reference
let observerInstance: IntersectionObserverMock

describe('RadioLogo', () => {
  // Default
  const logo = 'logoName'
  const imgPath = '/images/'

  beforeEach(() => {
    jest.clearAllMocks()
    // Use mock IntersectionObserver
    window.IntersectionObserver = jest.fn((callback: any) => {
      observerInstance = new IntersectionObserverMock(callback)
      return observerInstance
    }) as any
  })

  // Test laoding images
  test('renders RadioLogo and loads image successfully', async () => {
    // Mock loadImage image base64
    ;(loadImage as jest.Mock).mockResolvedValue('data:image/png;base64,IMAGE_DATA')

    // Display component
    render(<RadioLogo logo={logo} imgPath={imgPath} />)

    // Check image in document
    const imgElement = screen.getByAltText(`logo_${logo}`)
    expect(imgElement).toBeInTheDocument()

    // Check callback
    observerInstance.callback([{ isIntersecting: true }])

    // Check loadImage function call
    await waitFor(() => expect(loadImage).toHaveBeenCalledWith({ nameStr: logo, imgPath: `${imgPath}logos/` }))
    expect(imgElement).toHaveAttribute('src', 'data:image/png;base64,IMAGE_DATA')
  })

  // Test LoadImage fail
  test('handles error when image fails to load', async () => {
    // Mock loadImage fail
    ;(loadImage as jest.Mock).mockRejectedValue(new Error('Image load error'))

    // Spy console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    // Display component
    render(<RadioLogo logo={logo} imgPath={imgPath} />)

    // Check image in document
    const imgElement = screen.getByAltText(`logo_${logo}`)
    expect(imgElement).toBeInTheDocument()

    // Check callback
    observerInstance.callback([{ isIntersecting: true }])

    // Check image in document
    await waitFor(() => expect(loadImage).toHaveBeenCalledWith({ nameStr: logo, imgPath: `${imgPath}logos/` }))
    expect(imgElement).toHaveAttribute('src', '')

    // Check error is logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('☹️ Error loading image:', expect.any(Error))

    // Restore console.error
    consoleErrorSpy.mockRestore()
  })
})
