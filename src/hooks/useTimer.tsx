// React
import { useRef, useEffect, RefObject } from 'react'

// Types
import { StateType } from '@typage/mainType'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCounter } from '@redux/playerSlice'

const useTimer = (audioRef: RefObject<HTMLAudioElement>) => {
  // Redux record default
  const dispatch = useDispatch()

  // Redux state
  const state = useSelector((state: { player: StateType }) => state.player)

  // Reference
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const increaseTime = () => {
      // Check if playing
      if (state.playing && audioRef.current) {
        // Convert current audio to millisecondes
        const result = new Date(audioRef.current.currentTime * 1000).toISOString().slice(11, 19)

        // Split the time string
        const [hour, min, sec] = result.split(':')

        // Redux record
        dispatch(setCounter({ sec, min, hour }))
      }
    }

    // Check if playing
    if (state.playing) {
      // Increase the time each seconde
      intervalRef.current = setInterval(increaseTime, 1000)
    }

    return () => {
      // Check if the interval reference is existing
      if (intervalRef.current) {
        // Clean the setInterval function to stop it
        clearInterval(intervalRef.current)
      }
    }
  }, [state.playing, dispatch, audioRef])

  return { counter: state.counter }
}

export default useTimer
