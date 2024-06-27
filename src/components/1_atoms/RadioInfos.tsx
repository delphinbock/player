// Types
import { RadioInfosType } from "@typage/mainType";

// RadioInfo component
const RadioInfos: RadioInfosType = ({
  name,
  state,
  city,
  id,
  radioList,
  switchRadio,
}) => (
  <div>
    <button
      onClick={radioList ? () => switchRadio(id) : undefined}
      className="radio-name"
    >
      {name}
    </button>
    <div className="radio-infos">
      <span>{state}</span>
      <span> - </span>f<span>{city}</span>
    </div>
  </div>
);

export default RadioInfos;
