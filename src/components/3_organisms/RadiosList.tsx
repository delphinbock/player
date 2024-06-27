// Obj
import radioObj from '@objs/radios.json'

// Types
import { RadioListType, RadioListData } from '@typage/mainType'

// Components
import RadioItem from '@/components/3_organisms/RadioItem'

// RadioList component
const RadioList: RadioListType = ({ radioList, switchRadio }) => {
  return (
    <div className={radioList ? 'radioList' : 'radioList--off'}>
      {(radioObj as RadioListData[]).map((radio) => (
        <RadioItem key={`radio_${radio.id}`} id={radio.id} radio={radio} radioList={radioList} switchRadio={switchRadio} />
      ))}
    </div>
  )
}

export default RadioList
