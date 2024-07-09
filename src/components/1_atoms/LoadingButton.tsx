// React
import { FC, memo } from 'react'

// Loading button component
const LoadingButton: FC = memo(() => {
  return (
    <div className="spinner">
      <div className="spinner_bounce1"></div>
      <div className="spinner_bounce2"></div>
      <div className="spinner_bounce3"></div>
    </div>
  )
})

export default LoadingButton
