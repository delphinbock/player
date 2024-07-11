// React
import { memo } from 'react'

// Font icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

// Types
import { RadioInfosType } from '@typage/mainType'

// Components
import RadioFlag from '@atoms/RadioFlag'

// Constants
const { VITE_IMG_PATH } = import.meta.env

// RadioInfo component
const RadioInfos: RadioInfosType = memo(({ name, state, city, flag, style }) => (
  <div className="radioItem">
    <span className="radioItem_radioName">{name}</span>
    <div className="radioItem_radioInfos">
      <RadioFlag flag={flag} imgPath={VITE_IMG_PATH} />
      <span>
        {state} - {city}
      </span>
    </div>
    <div className="radioItem_radioInfos">
      <FontAwesomeIcon icon={faMusic} />
      <span>{style.join(', ')}</span>
    </div>
  </div>
))

// Display the component name in react dev tools profiler
RadioInfos.displayName = 'RadioInfos'

export default RadioInfos
