// React
import { WheelEvent } from 'react'

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

  // Volume on wheel action
  const handleWheelChange = useCallback(
    (e: WheelEvent<HTMLInputElement>) => {
      if (e.deltaY < 0) {
        // Increase volume, limit to maximum of 1
        volume = Math.min(1, volume + 0.1)
      } else {
        // Decrease volume, limit to minimum of 0
        volume = Math.max(0, volume - 0.1)
      }

      // Update volume with onChangeVolume callback
      onChangeVolume(volume)
    },
    [onChangeVolume, volume]
  )

  return (
    <div className="controlVolume">
      <span>Volume </span>
      <input
        className="controlVolume_volumeRange"
        type="range"
        min="0"
        max="1"
        value={volume}
        onChange={handleVolumeChange}
        onWheel={handleWheelChange}
        step="0.1"
      />
      <FontAwesomeIcon className="controlVolume_volumeIcon" icon={volume > 0 ? faVolumeHigh : faVolumeXmark} />
    </div>
  )
})

// Display the component name in react dev tools profiler
VolumeControl.displayName = 'VolumeControl'

export default VolumeControl
