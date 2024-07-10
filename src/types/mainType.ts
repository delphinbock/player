// React
import { FC, MutableRefObject } from 'react'

// Radio flag
type RadioFlagProps = {
  flag: string
  imgPath: string
}

type RadioFlagType = FC<RadioFlagProps>

// Radio infos
type RadioInfosProps = {
  name: string
  state: string
  city: string
}

type RadioInfosType = FC<RadioInfosProps>

// Radio item
type RadioItemData = {
  id: number
  name: string
  flag: string
  state: string
  city: string
  url: string
}

type RadioItemProps = {
  id: number
  radioList: RadioListData[]
  radio: RadioItemData
  switchRadio: (id: number) => void
  currentRadioUrl: string
}

type RadioItemType = FC<RadioItemProps>

// Radio list
type RadioListData = {
  id: number
  name: string
  country: string
  state: string
  city: string
  style: string[]
  url: string
  logo: string
  flag: string
}

type RadioListProps = {
  radioList: RadioListData[]
  switchRadio: (id: number) => void
  currentRadioUrl: string
  counter: {
    sec: string
    min: string
    hour: string
  }
  playing: boolean
}

type RadioListType = FC<RadioListProps>

// Play button
type PlayButtonProps = {
  playing: boolean
  onClick: () => void
}

type PlayButtonType = FC<PlayButtonProps>

// Play control
type PlayControlProps = {
  playing: boolean
  toggle: () => void
  loading: boolean
}

type PlayControlType = FC<PlayControlProps>

// Volume control
type VolumeControlProps = {
  volume: number
  onChangeVolume: (volume: number) => void
}

type VolumeControlType = FC<VolumeControlProps>

// Timer
type TimerProps = {
  counter: {
    sec: string
    min: string
    hour: string
  }
}

type TimerType = FC<TimerProps>

// Timer
type RadioLogoProps = {
  logo: string
  imgPath: string
}

type RadioLogoType = FC<RadioLogoProps>

// Countdown
type CountdownProps = {
  timerInSecondes: number
}

type CountdownType = FC<CountdownProps>

// Errors
type ErrorProps = {
  error: string
}

type ErrorType = FC<ErrorProps>

// Radio header
type RadioHeaderProps = {
  playing: boolean
  toggle: () => void
  loading: boolean
  volume: number
  changeVolume: (newVolume: number) => void
  error: string
  counter: { sec: string; min: string; hour: string }
  logo: string
}

type RadioHeaderType = FC<RadioHeaderProps>

// Audio reference
type UseAudioPlayerProps = {
  audioRef: MutableRefObject<HTMLAudioElement | null>
}

type UseAudioPlayerData = {
  playAudio: () => void;
  pauseAudio: () => void;
  handleVolumeChange: (volume: number) => void;
  handleRadioSwitch: (id: number) => void;
}

type UseAudioPlayerType = (props: UseAudioPlayerProps) => UseAudioPlayerData

// Radio element
type AudioElementProps = {
  currentRadioUrl: string
  audioRef: MutableRefObject<HTMLAudioElement | null>
}

type RadioElementType = FC<AudioElementProps>

// Load image
type LoadImageProps = {
  nameStr: string
  imgPath: string
}

type LoadImageType = (props: LoadImageProps) => Promise<string>;

// Play reducer
type CounterType = {
  sec: string,
  min: string,
  hour: string
}

type StateType = {
  audioRef: HTMLAudioElement | null,
  currentRadioUrl: string,
  playing: boolean,
  radioList: RadioListData[],
  loading: boolean,
  error: string,
  logo: string,
  counter: CounterType,
  volume: number,
}

type ActionType =
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SWITCH_RADIO'; payload: { id: number; logo: string } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LOGO'; payload: string }
  | { type: 'SET_COUNTER'; payload: { sec: string; min: string; hour: string } }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'RESET' };


type PlayReducerType = (state: StateType, action: ActionType) => StateType;

export type {
  RadioListProps,
  RadioListType,
  RadioFlagProps,
  RadioFlagType,
  RadioInfosProps,
  RadioInfosType,
  RadioItemData,
  RadioItemProps,
  RadioItemType,
  PlayButtonType,
  PlayControlType,
  VolumeControlType,
  TimerType,
  RadioLogoType,
  ErrorType,
  LoadImageType,
  RadioHeaderType,
  PlayReducerType,
  StateType,
  ActionType,
  RadioListData,
  RadioElementType,
  AudioElementProps,
  UseAudioPlayerProps,
  UseAudioPlayerType,
  CountdownType,
}