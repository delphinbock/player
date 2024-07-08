// React
import { FC, useEffect, useRef } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@redux/store'
import { togglePlay, switchRadio, setVolume, setLoading, setError } from '@redux/playerSlice'

// Hooks
import { useErrorHandling } from '@hooks/useErrorHandling'
import { useTimer } from '@hooks/useTimer'

// Components
import RadioList from '@organisms/RadiosList'
import RadioHeader from '@organisms/RadioHeader'

const Player: FC = () => {
  // Redux states
  const state = useSelector((state: RootState) => state.player)
  const dispatch = useDispatch<AppDispatch>()

  // References
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Destructuring hooks
  const { handleStreamError } = useErrorHandling()
  const { counter } = useTimer(audioRef)

  // Side effects
  useEffect(() => {
    // Check audio reference
    if (audioRef.current) {
      // Pause to audio element
      audioRef.current.pause()

      // Up URL to audio element source
      audioRef.current.src = state.currentRadioUrl

      // In playing
      if (state.playing) {
        // Load the audio element with its new source
        audioRef.current.load()

        // On error during the playing
        audioRef.current.play().catch((error) => {
          // Error
          handleStreamError()

          // Record error to Redux store
          dispatch(setError(error.message))
        })
      }
    }
  }, [state.currentRadioUrl, state.playing, handleStreamError, dispatch])

  // Set the dark template
  useEffect(() => {
    document.body.classList.add('dark')

    return () => {
      document.body.classList.remove('dark')
    }
  }, [])

  // Change the volume
  const handleVolumeChange = (volume: number) => {
    // Record the volume settings to Redux store
    dispatch(setVolume(volume))

    // Reinitialize the volume
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }

  // Switch of radio
  const handleRadioSwitch = (id: number) => {
    // Check the audio reference
    if (audioRef.current) {
      // Pause to audio element
      audioRef.current.pause()

      // Reinitialize the timer
      audioRef.current.currentTime = 0
    }

    // Record the settings changments to Redux store
    dispatch(setLoading(true))
    dispatch(switchRadio(id))
  }

  return (
    <div id="player" className={state.playing ? 'borderAnimationColor' : ''}>
      <audio ref={audioRef} src={state.currentRadioUrl} onCanPlay={() => dispatch(setLoading(false))}></audio>
      <RadioHeader
        playing={state.playing}
        toggle={() => dispatch(togglePlay())}
        loading={state.loading}
        volume={state.volume}
        changeVolume={handleVolumeChange}
        error={state.error}
        counter={counter}
        logo={state.logo}
      />
      <RadioList
        radioList={state.radioList}
        switchRadio={handleRadioSwitch}
        currentRadioUrl={state.currentRadioUrl}
        counter={counter}
        playing={state.playing}
      />
    </div>
  )
}

export default Player
