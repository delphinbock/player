// Types
import { PlayControlType } from '@typage/mainType'

// Components
import PlayButton from '@atoms/PlayButton'
import LoadingButton from '@atoms/LoadingButton'

const PlayControl: PlayControlType = ({ playing, toggle, loading }) => <>{!loading ? <PlayButton playing={playing} onClick={toggle} /> : <LoadingButton />}</>

export default PlayControl
