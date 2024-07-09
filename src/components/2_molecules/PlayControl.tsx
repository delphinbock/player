// React
import { memo } from 'react'

// Types
import { PlayControlType } from '@typage/mainType'

// Components
import PlayButton from '@atoms/PlayButton'
import LoadingButton from '@atoms/LoadingButton'

const PlayControl: PlayControlType = memo(({ playing, toggle, loading }) => (loading ? <LoadingButton /> : <PlayButton playing={playing} onClick={toggle} />))

export default PlayControl
