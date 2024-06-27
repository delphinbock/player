// Types
import { TimerType } from '@typage/mainType'

const Timer: TimerType = ({ counter }) => (
  <div className="timer">
    <span className="timer_hours">{counter.hour}</span>
    <span className="timer_separator">:</span>
    <span className="timer_minutes">{counter.min}</span>
    <span className="timer_separator">:</span>
    <span className="timer_secondes">{counter.sec}</span>
  </div>
)

export default Timer
