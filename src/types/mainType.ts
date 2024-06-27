// React
import { FC } from 'react'

// Radio flag
type RadioFlagProps = {
  flag: string
}

type RadioFlagType = FC<RadioFlagProps>

// Radio infos
type RadioInfosProps = {
  id: number
  name: string
  state: string
  city: string
  radioList: boolean
  switchRadio: (id: number) => void
}

type RadioInfosType = FC<RadioInfosProps>

// Radio item
type RadioItemData = {
  id: number
  name: string
  flag: string
  state: string
  city: string
}

type RadioItemProps = {
  id: number
  radioList: boolean
  radio: RadioItemData
  switchRadio: (id: number) => void
}

type RadioItemType = FC<RadioItemProps>

// Radio list
type RadioListProps = {
  radioList: boolean
  switchRadio: (id: number) => void
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

// Errors
type ErrorProps = {
  error: string
}

type ErrorType = FC<ErrorProps>

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
}