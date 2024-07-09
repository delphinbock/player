// React
import { memo, useCallback } from 'react'

// Components
import RadioFlag from '@atoms/RadioFlag'
import RadioInfos from '@molecules/RadioInfos'

// Types
import { RadioItemType } from '@typage/mainType'

// Constants
const { VITE_IMG_PATH } = import.meta.env

const RadioItem: RadioItemType = memo(({ radio, switchRadio, currentRadioUrl }) => {
  // Switch radio to click on the button element
  const handleClick = useCallback(() => {
    if (radio.url !== currentRadioUrl) {
      switchRadio(radio.id)
    }
  }, [radio.url, currentRadioUrl, switchRadio])

  return (
    <button className="radioItemWrapper" onClick={handleClick}>
      <RadioFlag flag={radio.flag} imgPath={VITE_IMG_PATH} />
      <RadioInfos name={radio.name} state={radio.state} city={radio.city} />
    </button>
  )
})

export default RadioItem
