// React
import { useCallback } from 'react'

// Types
import { StateType } from '@typage/mainType'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setError, setLoading } from '@redux/playerSlice'

const useErrorHandling = () => {
  // Redux record default
  const dispatch = useDispatch()

  // Redux states
  const { audioRef } = useSelector((state: { player: StateType }) => state.player)

  // Audio error
  const handleAudioError = useCallback(() => {
    // Redux records
    dispatch(setError('☹️​ Playing error. The player will be reinitialized'))
    dispatch(setLoading(false))
  }, [dispatch])

  // Stream error
  const handleStreamError = useCallback(() => {
    handleAudioError()
  }, [audioRef, handleAudioError])

  return { handleAudioError, handleStreamError }
}

export default useErrorHandling
