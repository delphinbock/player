// React
import { memo } from 'react'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'

// Types
import { ErrorType } from '@typage/mainType'

// Components
import Counter from '@atoms/Countdown'

const ErrorDisplay: ErrorType = memo(() => {
  // Redux states
  const { error } = useSelector((state: RootState) => state.player)

  return (
    <>
      {error && (
        <div className="errorDisplay">
          <p>
            Player will be reset in <Counter timerInSecondes={5} /> seconds
          </p>
          <p>{`☹️​ ${error}`}</p>
        </div>
      )}
    </>
  )
})

// Display the component name in react dev tools profiler
ErrorDisplay.displayName = 'ErrorDisplay'

export default ErrorDisplay
