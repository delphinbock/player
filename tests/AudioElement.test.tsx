// @ts-ignore
import React, { createRef, MutableRefObject } from 'react'

// React library
import { render, fireEvent } from '@testing-library/react'

// Jest
import '@testing-library/jest-dom'

// Redux
import { useDispatch } from 'react-redux'
import { setLoading } from '@redux/playerSlice'

// Component
import AudioElement from '@atoms/AudioElement'

// Mock Redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@redux/playerSlice', () => ({
  setLoading: jest.fn(),
}))

describe('AudioElement', () => {
  // Jest mock default
  let dispatchMock: jest.Mock

  // Reference
  let audioRef: MutableRefObject<HTMLAudioElement | null>

  // Test audio reference
  beforeEach(() => {
    dispatchMock = jest.fn()
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock)
    audioRef = createRef<HTMLAudioElement>()
  })

  // Clean mock fn
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Test audio element
  test('renders the audio element with the correct props', () => {
    // Audio element
    render(<AudioElement currentRadioUrl="test-url" audioRef={audioRef} />)

    // Get the audio element
    const audio = document.getElementById('audio-element') as HTMLAudioElement

    // Check that audio element is present in document
    expect(audio).toBeInTheDocument()

    // Check that the URL contains 'test-url' without taking into account the domain
    expect(audio.src.includes('test-url')).toBe(true)
  })

  // Test setLoading
  test('dispatches setLoading action on canplay event', () => {
    // Audio element
    render(<AudioElement currentRadioUrl="test-url" audioRef={audioRef} />)

    // Test audio reference
    fireEvent(audioRef.current!, new Event('canplay'))

    // Test setLoading
    expect(dispatchMock).toHaveBeenCalledWith(setLoading(false))
  })

  // Test canPlay event
  test('adds and removes canplay event listener on mount and unmount', () => {
    // Spy add event listener
    const addEventListenerSpy = jest.spyOn(HTMLMediaElement.prototype, 'addEventListener')

    // Spy remove event listener
    const removeEventListenerSpy = jest.spyOn(HTMLMediaElement.prototype, 'removeEventListener')

    // Unmount audio element
    const { unmount } = render(<AudioElement currentRadioUrl="test-url" audioRef={audioRef} />)

    // Check if add event have been called
    expect(addEventListenerSpy).toHaveBeenCalledWith('canplay', expect.any(Function))

    // Unmount audio element
    unmount()

    // Check if remove event have been called
    expect(removeEventListenerSpy).toHaveBeenCalledWith('canplay', expect.any(Function))
  })
})
