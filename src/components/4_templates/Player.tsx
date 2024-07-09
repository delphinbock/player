// React
import { FC, lazy, memo, useRef } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@redux/store'
import { togglePlay } from '@redux/playerSlice'

// Hooks
import useAudioPlayer from '@hooks/useAudioPlayer'
import useTimer from '@hooks/useTimer'
import { useDarkMode } from '@hooks/useTemplate'

// Components
const AudioElement = lazy(() => import('@atoms/AudioElement'))
const RadioList = lazy(() => import('@organisms/RadiosList'))
const RadioHeader = lazy(() => import('@organisms/RadioHeader'))

const Player: FC = memo(() => {
  // Redux states destructuring
  const { playing, loading, error, logo, radioList, volume, currentRadioUrl } = useSelector((state: RootState) => state.player)
  const dispatch = useDispatch<AppDispatch>()

  // References
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Destructuring hooks
  const { handleVolumeChange, handleRadioSwitch } = useAudioPlayer({ audioRef })
  const { counter } = useTimer(audioRef)

  // Set the dark template hook
  useDarkMode()

  return (
    <div id="player" className={playing ? 'borderAnimationColor' : ''}>
      <AudioElement audioRef={audioRef} currentRadioUrl={currentRadioUrl} />
      <RadioHeader
        playing={playing}
        toggle={() => dispatch(togglePlay())}
        loading={loading}
        volume={volume}
        changeVolume={handleVolumeChange}
        error={error}
        counter={counter}
        logo={logo}
      />
      <RadioList radioList={radioList} switchRadio={handleRadioSwitch} currentRadioUrl={currentRadioUrl} counter={counter} playing={playing} />
    </div>
  )
})

export default Player
