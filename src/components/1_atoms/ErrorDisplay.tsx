// Types
import { ErrorType } from '@typage/mainType'

const ErrorDisplay: ErrorType = ({ error }) => {
  return (
    <>
      {error && (
        <div className="errorDisplay">
          <span>{error}</span>
        </div>
      )}
    </>
  )
}

export default ErrorDisplay
