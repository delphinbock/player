// React
import { FC, memo, useEffect, useRef, useState } from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { resetPlayer, setError } from '@redux/playerSlice'

const CounterError: FC = memo(() => {
  // Redux dispatch
  const dispatch = useDispatch()

  // Redux states
  // ! const { error } = useSelector((state: RootState) => state.player)
  const error = 'test'

  // Local state to force re-render
  const [, forceUpdate] = useState<number>(0)

  // Ref for countdown display
  const countdownRef = useRef<number | null>(null)

  // Effect to start countdown when error is set
  useEffect(() => {
    //if (error) {
    countdownRef.current = 5
    forceUpdate((prev) => prev + 1) // Trigger re-render

    // Set timeout to reset player and clear error after 5 seconds
    const resetTimer = setTimeout(() => {
      dispatch(resetPlayer())
      dispatch(setError(''))
      countdownRef.current = null
      forceUpdate((prev) => prev + 1) // Trigger re-render
    }, 5000)

    return () => clearTimeout(resetTimer)
    //}
  }, [error, dispatch])

  // Effect to handle countdown logic
  useEffect(() => {
    if (countdownRef.current !== null && countdownRef.current > 0) {
      const timer = setTimeout(() => {
        if (countdownRef.current !== null) {
          countdownRef.current -= 1
          forceUpdate((prev) => prev + 1) // Trigger re-render
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdownRef.current])

  console.log('error', error)
  console.log('countdown', countdownRef.current)

  return (
    <div>
      {error && countdownRef.current !== null && (
        <div className="error-counter">
          <p>{error}</p>
          <p>Error will disappear in {countdownRef.current} seconds</p>
        </div>
      )}
    </div>
  )
})

export default CounterError
