// Types
import { RadioInfosType } from '@typage/mainType'

// RadioInfo component
const RadioInfos: RadioInfosType = ({ id, name, state, city, radioList, switchRadio }) => (
  <div className="radioItem">
    <button onClick={radioList ? () => switchRadio(id) : undefined} className="radioItem_radioName">
      {name}
    </button>
    <div className="radioItem_radioInfos">
      <span>{state}</span>
      <span> - </span>
      <span>{city}</span>
    </div>
  </div>
)

export default RadioInfos
