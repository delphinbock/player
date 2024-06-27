// Font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

// Types
import { PlayButtonType } from '@typage/mainType'

const PlayButton: PlayButtonType = ({ playing, onClick }) => (
  <button className="playButton" onClick={onClick}>
    <FontAwesomeIcon icon={playing ? faStop : faPlay} />
  </button>
)

export default PlayButton
