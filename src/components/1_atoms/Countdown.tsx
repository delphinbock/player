// React
import { memo, useEffect, useReducer, useRef } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { resetPlayer, setError } from '@redux/playerSlice'

// Types
import { CountdownType } from '@typage/mainType'

const Counter: CountdownType = memo(({ timerInSecondes }) => {
  // Redux default
  const dispatch = useDispatch()

  // References
  const countdownRef = useRef<number | null>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  // To trigger re-render
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    // Duration
    countdownRef.current = timerInSecondes

    const resetTimer = setTimeout(() => {
      // Redux records
      dispatch(resetPlayer())
      dispatch(setError(''))

      // Reference reinitialization
      countdownRef.current = null

      // Reset the time of counter down
      forceUpdate()
    }, countdownRef.current * 1000)

    // Interval duration each seconde
    intervalIdRef.current = setInterval(() => {
      // Check if counterdown existing
      if (countdownRef.current !== null) {
        // Update the counterdown
        countdownRef.current -= 1

        // Update the trigger values
        forceUpdate()

        // Check if counterdown is 0 value
        if (countdownRef.current <= 0) {
          // Clean the interval function to stop it
          clearInterval(intervalIdRef.current!)
        }
      }
    }, 1000)

    return () => {
      // Clean the setttimeout to stop it
      clearTimeout(resetTimer)

      // Clean the interval function if it is existing
      if (intervalIdRef.current) clearInterval(intervalIdRef.current)
    }
  }, [dispatch])

  return <>{countdownRef.current !== null && countdownRef.current > 0 && <span className="countdownDisplay">{countdownRef.current}</span>}</>
})

// Display the component name in react dev tools profiler
Counter.displayName = 'Counter'

export default Counter
