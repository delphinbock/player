// Types
import { RadioInfosType } from '@typage/mainType'

// RadioInfo component
const RadioInfos: RadioInfosType = ({ name, state, city }) => (
  <div className="radioItem">
    <div className="radioItem_radioName">{name}</div>
    <div className="radioItem_radioInfos">
      <span>
        {state} - {city}
      </span>
    </div>
  </div>
)

export default RadioInfos
