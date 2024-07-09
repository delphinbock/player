// React
import { memo } from 'react'

// Font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

// Types
import { PlayButtonType } from '@typage/mainType'

const PlayButton: PlayButtonType = memo(({ playing, onClick }) => (
  <button className={playing ? 'playButton playButton_noPulse' : 'playButton'} onClick={onClick}>
    <FontAwesomeIcon icon={playing ? faStop : faPlay} />
  </button>
))

export default PlayButton
