// React
import { FC, memo } from 'react'

// Loading button component
const LoadingButton: FC = memo(() => {
  return (
    <div className="spinner">
      <span className="spinner__bounce spinner__bounce--1"></span>
      <span className="spinner__bounce spinner__bounce--2"></span>
      <span className="spinner__bounce spinner__bounce--3"></span>
    </div>
  )
})

// Display the component name in react dev tools profiler
LoadingButton.displayName = 'LoadingButton'

export default LoadingButton
