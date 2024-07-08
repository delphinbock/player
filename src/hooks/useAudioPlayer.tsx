// React
import { useCallback } from 'react'

// Types
import { StateType } from '@typage/mainType'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { togglePlay, switchRadio, setVolume, resetPlayer, setError, setLoading, setLogo, setCounter } from '@redux/playerSlice'

export const useAudioPlayer = () => {
  const state = useSelector((state: { player: StateType }) => state.player)
  const dispatch = useDispatch()

  const handleTogglePlay = useCallback(() => {
    dispatch(togglePlay())
  }, [dispatch])

  const handleSwitchRadio = useCallback(
    (id: number) => {
      dispatch(switchRadio(id))
    },
    [dispatch]
  )

  const handleChangeVolume = useCallback(
    (newVolume: number) => {
      dispatch(setVolume(newVolume))
    },
    [dispatch]
  )

  const handleResetPlayer = useCallback(() => {
    dispatch(resetPlayer())
  }, [dispatch])

  const handleError = useCallback(
    (errorMessage: string) => {
      dispatch(setError(errorMessage))
    },
    [dispatch]
  )

  const handleSetLoading = useCallback(
    (isLoading: boolean) => {
      dispatch(setLoading(isLoading))
    },
    [dispatch]
  )

  const handleSetLogo = useCallback(
    (logoUrl: string) => {
      dispatch(setLogo(logoUrl))
    },
    [dispatch]
  )

  const handleSetCounter = useCallback(
    (counter: { sec: string; min: string; hour: string }) => {
      dispatch(setCounter(counter))
    },
    [dispatch]
  )

  return {
    state,
    handleTogglePlay,
    handleSwitchRadio,
    handleChangeVolume,
    handleResetPlayer,
    handleError,
    handleSetLoading,
    handleSetLogo,
    handleSetCounter,
  }
}
