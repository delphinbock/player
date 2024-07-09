// React
import { useCallback, useLayoutEffect } from 'react'

const useDarkMode = () => {
  const cleanupDarkMode = useCallback(() => {
    document.body.classList.remove('dark')
  }, [])

  useLayoutEffect(() => {
    document.body.classList.add('dark')

    return cleanupDarkMode
  }, [cleanupDarkMode])
}

export { useDarkMode }
