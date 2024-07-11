// React
import { useEffect, useState, memo, useMemo, useCallback } from 'react'

// Types
import { RadioListType } from '@typage/mainType'

// Components
import RadioItem from '@organisms/RadioItem'

// Redux
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'

const RadioList: RadioListType = memo(({ radioList, switchRadio, currentRadioUrl, counter }) => {
  // Local states
  const [isListDisabled, setIsListDisabled] = useState(false)
  const [lessCounter, setLessCounter] = useState(false)

  // Redux states
  const playingRadioUrl = useSelector((state: RootState) => state.player.currentRadioUrl)

  // Sort the list by name
  const sortedRadioList = useMemo(() => {
    return [...radioList].sort((a, b) => a.name.localeCompare(b.name))
  }, [radioList])

  // ! Avoid playing errors
  // Check if the counter is less than 1 seconde
  useEffect(() => {
    if (parseInt(counter.sec) < 1) {
      setLessCounter(true)
    } else {
      setLessCounter(false)
    }
  }, [counter.sec])

  // Select another radio
  const handleSwitchRadio = useCallback(
    (id: number) => {
      if (!isListDisabled) {
        // Disable the radios list
        setIsListDisabled(true)

        // Switch radio
        switchRadio(id)

        // Re-able the radios list after 2 secondes (2 > 1)
        setTimeout(() => {
          setIsListDisabled(false)
        }, 2000)
      }
    },
    [isListDisabled, switchRadio]
  )

  return (
    <div className={lessCounter && isListDisabled ? 'radioList radioList--off' : 'radioList'}>
      {sortedRadioList.map(
        (radio) =>
          radio.url !== playingRadioUrl && (
            <RadioItem
              key={`radio_${radio.id}`}
              id={radio.id}
              radio={radio}
              switchRadio={handleSwitchRadio}
              radioList={radioList}
              currentRadioUrl={currentRadioUrl}
            />
          )
      )}
    </div>
  )
})

// Display the component name in react dev tools profiler
RadioList.displayName = 'RadioList'

export default RadioList
