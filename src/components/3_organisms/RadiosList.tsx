// Types
import { RadioListType } from '@typage/mainType'

// Components
import RadioItem from '@organisms/RadioItem'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const RadioList: RadioListType = ({ radioList, switchRadio, currentRadioUrl }) => {
  const playingRadioUrl = useSelector((state: RootState) => state.player.currentRadioUrl)

  // Sort the list by name
  const sortedRadioList = [...radioList].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="radioList">
      {sortedRadioList.map(
        (radio) =>
          radio.url !== playingRadioUrl && (
            <RadioItem
              key={`radio_${radio.id}`}
              id={radio.id}
              radio={radio}
              switchRadio={switchRadio}
              radioList={radioList}
              currentRadioUrl={currentRadioUrl}
            />
          )
      )}
    </div>
  )
}

export default RadioList
