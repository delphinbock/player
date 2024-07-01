// Font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

// Types
import { VolumeControlType } from '@typage/mainType'

const VolumeControl: VolumeControlType = ({ volume, onChangeVolume }) => (
  <div className="controlVolume">
    <span>Volume </span>
    <input
      className="controlVolume_volumeRange"
      type="range"
      min="0"
      max="1"
      value={volume}
      onChange={(e) => {
        onChangeVolume(parseFloat(e.target.value))
      }}
      step="0.01"
    />
    <FontAwesomeIcon icon={volume > 0 ? faVolumeHigh : faVolumeXmark} />
  </div>
)

export default VolumeControl
