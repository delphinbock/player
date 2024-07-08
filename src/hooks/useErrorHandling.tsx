import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StateType } from '@typage/mainType'
import { resetPlayer, setError, setLoading } from '@redux/playerSlice'

export const useErrorHandling = () => {
  const dispatch = useDispatch()
  const { audioRef } = useSelector((state: { player: StateType }) => state.player)
  const errorPlay = 'Playing error. The player will be reinitialized'

  const handleAudioError = useCallback(() => {
    dispatch(setError(errorPlay))
    dispatch(setLoading(false)) // Assure that setLoading is correctly set

    setTimeout(() => {
      dispatch(resetPlayer())
      dispatch(setError(''))
    }, 5000)
  }, [dispatch])

  const handleStreamError = useCallback(() => {
    handleAudioError()
  }, [audioRef, handleAudioError])

  return { handleAudioError, handleStreamError }
}
