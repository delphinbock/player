// React
import { useCallback, useEffect } from 'react'

// Redux
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@redux/store'
import { switchRadio, setLoading, setError, setVolume } from '@redux/playerSlice'

// Hook
import useErrorHandling from '@hooks/useErrorHandling'

// Types
import { UseAudioPlayerType } from '@typage/mainType'

// Lodash - useful functions to facilitate the manipulation of arrays, objects, and strings
import { debounce } from 'lodash'

const useAudioPlayer: UseAudioPlayerType = ({ audioRef }) => {
  // Redux default
  const dispatch = useDispatch<AppDispatch>()

  // Redux states destructuring
  const { playing, currentRadioUrl } = useSelector((state: RootState) => state.player, shallowEqual)

  // Hook
  const { handleStreamError } = useErrorHandling()

  useEffect(() => {
    // Check audio reference
    if (audioRef.current) {
      // Pause
      audioRef.current.pause()

      // Set the new radio url
      audioRef.current.src = currentRadioUrl

      // If it is playing
      if (playing) {
        // Load reference
        audioRef.current.load()

        // Play
        audioRef.current.play().catch((error) => {
          // Get error message
          handleStreamError()

          // Record error to Redux
          dispatch(setError(error.message))
        })
      }
    }
  }, [audioRef, currentRadioUrl, playing, handleStreamError, dispatch])

  const playAudio = useCallback(() => {
    // Check audio reference existing
    if (audioRef.current) {
      // Play
      audioRef.current.play().catch((error) => {
        // Get error message
        handleStreamError()

        // Record error to Redux
        dispatch(setError(error.message))
      })
    }
  }, [audioRef, handleStreamError, dispatch])

  const pauseAudio = useCallback(() => {
    // Check audio reference existing
    if (audioRef.current) {
      // Pause
      audioRef.current.pause()
    }
  }, [audioRef])

  const handleVolumeChange = useCallback(
    debounce((volume: number) => {
      // Redux record
      dispatch(setVolume(volume))

      // Check audio reference existing
      if (audioRef.current) {
        // Set the new volume
        audioRef.current.volume = volume
      }
    }, 20),
    [dispatch]
  )

  const handleRadioSwitch = useCallback(
    (id: number) => {
      // Check audio reference existing
      if (audioRef.current) {
        // Pause
        audioRef.current.pause()

        // Reintialize the time
        audioRef.current.currentTime = 0
      }

      // Redux records
      dispatch(setLoading(true))
      dispatch(switchRadio(id))
    },
    [dispatch, audioRef]
  )

  return {
    playAudio,
    pauseAudio,
    handleVolumeChange,
    handleRadioSwitch,
  }
}

export default useAudioPlayer
