// components
import PlayControl from '@molecules/PlayControl'
import VolumeControl from '@molecules/VolumeControl'
import Timer from '@molecules/Timer'
import RadioLogo from '@atoms/RadioLogo'
import ErrorDisplay from '@/components/1_atoms/ErrorDisplay'

// Types
import { RadioHeaderType } from '@typage/mainType'

// Constants
const { VITE_IMG_PATH } = import.meta.env

const RadioHeader: RadioHeaderType = ({ playing, toggle, loading, volume, changeVolume, error, counter, logo }) => {
  return (
    <div className="radioHeader">
      <div className="radioHeader_controllers">
        <Timer counter={counter} />
        <PlayControl playing={playing} toggle={toggle} loading={loading} />
        <RadioLogo logo={logo} imgPath={VITE_IMG_PATH} />
      </div>
      <div>
        <VolumeControl volume={volume} onChangeVolume={changeVolume} />
      </div>
      <div>
        <ErrorDisplay error={error} />
      </div>
    </div>
  )
}

export default RadioHeader
