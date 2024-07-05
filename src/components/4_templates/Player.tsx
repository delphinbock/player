import { FC, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'
import { togglePlay, switchRadio, setVolume, setLoading, setError } from '@/redux/playerSlice'
import { useErrorHandling } from '@hooks/useErrorHandling'
import { useTimer } from '@hooks/useTimer'
import RadioList from '@organisms/RadiosList'
import RadioHeader from '@organisms/RadioHeader'

const Player: FC = () => {
  const state = useSelector((state: RootState) => state.player)
  const dispatch = useDispatch<AppDispatch>()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { handleStreamError, handleAudioError } = useErrorHandling()
  const { counter } = useTimer(audioRef)

  useEffect(() => {
    const handlePlayPause = async () => {
      if (audioRef.current) {
        const isPlaying =
          audioRef.current.currentTime > 0 &&
          !audioRef.current.paused &&
          !audioRef.current.ended &&
          audioRef.current.readyState > audioRef.current.HAVE_CURRENT_DATA

        if (state.playing && !isPlaying) {
          try {
            await audioRef.current.play()
            dispatch(setLoading(false))
          } catch (error: any) {
            if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
              console.error('Playback error:', error)
              handleAudioError()
            } else {
              throw error
            }
          }
        } else {
          audioRef.current.pause()
        }
      }
    }

    handlePlayPause()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [state.playing, state.currentRadioUrl, dispatch, handleAudioError])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume
    }
  }, [state.volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = state.currentRadioUrl
      if (state.playing) {
        audioRef.current.load()
        audioRef.current.play().catch(handleStreamError)
      }
    }
  }, [state.currentRadioUrl, state.playing, handleStreamError])

  useEffect(() => {
    document.body.classList.add('dark')

    return () => {
      document.body.classList.remove('dark')
    }
  }, [])

  const handleVolumeChange = (volume: number) => {
    dispatch(setVolume(volume))
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }

  const handleRadioSwitch = (id: number) => {
    const radioToPlay = state.radioList.find((radio) => radio.id === id)
    if (!radioToPlay) return

    if (state.currentRadioUrl !== radioToPlay.url) {
      dispatch(switchRadio(id))
      dispatch(setLoading(true))
    }
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
      <RadioList radioList={state.radioList} switchRadio={handleRadioSwitch} currentRadioUrl={state.currentRadioUrl} />
    </div>
  )
}

export default Player
