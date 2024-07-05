// Types
import { ErrorType } from '@typage/mainType'

const ErrorDisplay: ErrorType = ({ error: errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <div className="errorDisplay">
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  )
}

export default ErrorDisplay
