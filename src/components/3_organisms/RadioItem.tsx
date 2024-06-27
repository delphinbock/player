// Components
import RadioFlag from '@atoms/RadioFlag'
import RadioInfos from '@/components/2_molecules/RadioInfos'

// Types
import { RadioItemType } from '@typage/mainType'

// RadioItem component
const RadioItem: RadioItemType = ({ radio, radioList, switchRadio }) => (
  <div className="radioItemWrapper">
    <RadioFlag flag={radio.flag} />
    <RadioInfos id={radio.id} name={radio.name} state={radio.state} city={radio.city} radioList={radioList} switchRadio={switchRadio} />{' '}
  </div>
)

export default RadioItem
