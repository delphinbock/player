// Components
import RadioFlag from '@atoms/RadioFlag'
import RadioInfos from '@/components/2_molecules/RadioInfos'

// Types
import { RadioItemType } from '@typage/mainType'

// Constants
const { VITE_IMG_PATH } = import.meta.env

const RadioItem: RadioItemType = ({ radio, switchRadio, currentRadioUrl }) => (
  <button
    className="radioItemWrapper"
    onClick={() => {
      if (radio.url !== currentRadioUrl) {
        switchRadio(radio.id)
      }
    }}
  >
    <RadioFlag flag={radio.flag} imgPath={VITE_IMG_PATH} />
    <RadioInfos name={radio.name} state={radio.state} city={radio.city} />
  </button>
)

export default RadioItem
