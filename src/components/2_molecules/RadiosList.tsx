// Obj
import radioObj from "@objs/radios.json";

// Types
import { RadioListType, RadioListData } from "@typage/mainType";

// Components
import RadioFlag from "@atoms/RadioFlag";

// RadioItem component
const RadioItem: React.FC<{
  radio: RadioListData;
  radioList: boolean;
  switchRadio: (id: number) => void;
}> = ({ radio, radioList, switchRadio }) => (
  <div className="radio-container">
    <RadioFlag flag={radio.flag} />
    <RadioInfo
      name={radio.name}
      state={radio.state}
      city={radio.city}
      id={radio.id}
      radioList={radioList}
      switchRadio={switchRadio}
    />
  </div>
);

// RadioList component
const RadioList: RadioListType = ({ radioList, switchRadio }) => {
  return (
    <div className={radioList ? "radio-list" : "radio-list radio-list-off"}>
      {(radioObj as RadioListData[]).map((radio, i) => (
        <RadioItem
          key={`${i}_${radio.id}`}
          radio={radio}
          radioList={radioList}
          switchRadio={switchRadio}
        />
      ))}
    </div>
  );
};

export default RadioList;
