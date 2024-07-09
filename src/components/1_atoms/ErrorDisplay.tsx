// React
import { memo } from 'react'

// Types
import { ErrorType } from '@typage/mainType'

// Components
import CounterError from '@atoms/CounterError'

const ErrorDisplay: ErrorType = memo(({ error }) => {
  return (
    <>
      {!error && (
        <div className="errorDisplay">
          <CounterError />
          <span>{`☹️​ ${error}`}</span>
        </div>
      )}
    </>
  )
})

export default ErrorDisplay
