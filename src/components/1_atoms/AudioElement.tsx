// Redux
import { useDispatch } from 'react-redux'
import { setLoading } from '@redux/playerSlice'

// Types
import { RadioElementType } from '@typage/mainType'
import { useEffect } from 'react'

const AudioElement: RadioElementType = ({ currentRadioUrl, audioRef }) => {
  // Redux record initialization
  const dispatch = useDispatch()

  // Redux record
  const handleCanPlay = () => {
    dispatch(setLoading(false))
  }

  useEffect(() => {
    // Audio reference
    const audioElement = audioRef.current

    // Check if audio reference
    if (audioElement) {
      // Add an event on audio element
      audioElement.addEventListener('canplay', handleCanPlay)
      return () => {
        // Remove an event on audio element
        audioElement.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [audioRef, dispatch])

  return (
    <audio id="audioElement" ref={audioRef} src={currentRadioUrl}>
      <track default kind="captions" srcLang="en" src="default.vtt" />
    </audio>
  )
}

// Display the component name in react dev tools profiler
AudioElement.displayName = 'AudioElement'

export default AudioElement
