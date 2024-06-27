// Types
import { RadioLogoType } from '@typage/mainType'

const RadioLogo: RadioLogoType = ({ logo, imgPath }) => (
  <div
    className="radioLogo"
    style={{
      backgroundImage: `url(${imgPath}${logo})`,
    }}
  ></div>
)

export default RadioLogo
