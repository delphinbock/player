// useErrorHandling.ts

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StateType } from '@typage/mainType'
import { resetPlayer, setError, setLoading } from '@redux/playerSlice' // Adjust the import path based on your project structure

export const useErrorHandling = () => {
  const dispatch = useDispatch()
  const { audioRef } = useSelector((state: { player: StateType }) => state.player)
  const errorPlay = 'Playing error. The player will be reinitialized'

  const handleAudioError = useCallback(() => {
    dispatch(setError(errorPlay))
    dispatch(setLoading(false)) // Ensure setLoading is triggered correctly here

    setTimeout(() => {
      dispatch(resetPlayer())
      dispatch(setError(''))
    }, 5000)
  }, [dispatch])

  const handleStreamError = useCallback(() => {
    if (audioRef && audioRef.currentTime === 0) {
      // Check that the stream has started
      handleAudioError()
    }
  }, [audioRef, handleAudioError])

  return { handleAudioError, handleStreamError }
}
