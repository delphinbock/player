// Constants
const { VITE_IMG_PATH } = import.meta.env

// Types
import { RadioFlagType } from '@typage/mainType'

// RadioFlag component
const RadioFlag: RadioFlagType = ({ flag }) => (
  <div>
    <img src={`${VITE_IMG_PATH}${flag}`} alt={`flag_${flag}`} loading='lazy' />
  </div>
)

export default RadioFlag
