// React
import { FC, useRef, useEffect, useState, useCallback } from 'react'

// Components
import RadioList from '@organisms/RadiosList'
import PlayControl from '@molecules/PlayControl'
import VolumeControl from '@molecules/VolumeControl'
import Timer from '@molecules/Timer'
import RadioLogo from '@atoms/RadioLogo'
import ErrorDisplay from '@/components/1_atoms/ErrorDisplay'

// Obj
import radioObj from '@objs/radios.json'

// Constants
const { VITE_IMG_PATH } = import.meta.env

// Radio player component
const Player: FC = () => {
  // Constants
  const errorPlay = 'Playing error. The player will be reinitialized'

  // References
  const audioRef = useRef<HTMLAudioElement>(new Audio(radioObj[2].url))
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // States
  const [playing, setPlaying] = useState<boolean>(false)
  const [radioList, setRadioList] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [logo, setLogo] = useState<string>(radioObj[2].logo)
  const [counter, setCounter] = useState<{
    sec: string
    min: string
    hour: string
  }>({
    sec: '00',
    min: '00',
    hour: '00',
  })
  const [volume, setVolume] = useState<number>(0.5)

  // Toggle play or pause state
  const toggle = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying)
    setRadioList((prevRadioList) => !prevRadioList)
  }, [])

  // Switch radio station
  const switchRadio = useCallback(
    (id: number) => {
      // Set states
      setLogo(radioObj[id].logo)
      setRadioList(!radioList)
      setLoading(true)

      // Stop stream
      audioRef.current.pause()

      // Load new stream
      audioRef.current = new Audio(radioObj[id].url)

      // Play
      setPlaying((prevPlaying) => !prevPlaying)
    },
    [audioRef, radioList]
  )

  // Define handleAudioError outside the useEffect
  const handleAudioError = useCallback(() => {
    // SetState
    setError(errorPlay)

    // Display message during 5s
    setTimeout(() => {
      // Reload page
      window.location.reload()
    }, 5000)
  }, [])

  // Define a function to handle stream error outside the useEffect
  const handleStreamError = useCallback(() => {
    if (audioRef.current.currentTime === 0) {
      handleAudioError()
    }
  }, [handleAudioError])

  // Define a named function outside of the useEffect
  const handleAudioPlay = useCallback(() => {
    // Set play state directly with the current value
    setPlaying((prevPlaying) => prevPlaying)

    // Set loading state
    setLoading(false)

    // Reinitialize if the stream is not read after a certain time
    setTimeout(() => handleStreamError(), 10000)
  }, [handleStreamError])

  // Play effects
  useEffect(() => {
    // Play or pause based on the playing state
    if (playing) {
      setTimeout(() => {
        let promise = audioRef.current.play()

        // Audio play promise
        if (promise !== null) {
          promise.then(handleAudioPlay).catch(handleAudioError)
        }
      }, 500)
    } else {
      audioRef.current.pause()
    }

    // Cleanup function for the effect
    return () => clearInterval(intervalRef.current!)
  }, [audioRef, playing, handleAudioError, handleAudioPlay])

  // Border effects
  useEffect(() => {
    // Decrease counter function
    const increaseDate = () => {
      if (playing) {
        // Format seconds
        const result = new Date(audioRef.current.currentTime * 1000).toISOString().slice(11, 19)

        // Split
        let split = result.split(':')

        // Object
        let obj = { sec: split[2], min: split[1], hour: split[0] }

        // Set state counter
        setCounter(obj)

        return obj
      }
    }

    // Run function every second
    intervalRef.current = setInterval(() => {
      increaseDate()
    }, 1000)

    return () => clearInterval(intervalRef.current!)
  }, [playing])

  // Volume change
  const changeVolume = (newVolume: number) => {
    // Set state
    setVolume(newVolume)

    // Up reference
    audioRef.current.volume = newVolume
  }

  return (
    <div className="container">
      <div id="player">
        <div className="controllers">
          <Timer counter={counter} />
          <PlayControl playing={playing} toggle={toggle} loading={loading} />
          <RadioLogo logo={logo} imgPath={VITE_IMG_PATH} />
        </div>
        <VolumeControl volume={volume} onChangeVolume={changeVolume} />
        <ErrorDisplay error={error} />
        <RadioList radioList={radioList} switchRadio={switchRadio} />
      </div>
    </div>
  )
}

export default Player
