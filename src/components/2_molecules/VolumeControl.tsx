// React
import { ChangeEvent, memo, useCallback } from 'react'

// Font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

// Types
import { VolumeControlType } from '@typage/mainType'

const VolumeControl: VolumeControlType = memo(({ volume, onChangeVolume }) => {
  // Volume changment
  const handleVolumeChange = useCallback(
    // Volume element
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeVolume(parseFloat(e.target.value))
    },
    [onChangeVolume]
  )

  return (
    <div className="controlVolume">
      <span>Volume </span>
      <input className="controlVolume_volumeRange" type="range" min="0" max="1" value={volume} onChange={handleVolumeChange} step="0.01" />
      <FontAwesomeIcon icon={volume > 0 ? faVolumeHigh : faVolumeXmark} />
    </div>
  )
})

export default VolumeControl
