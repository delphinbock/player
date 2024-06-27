// React
import { FC } from 'react'

// Radio flag
type RadioFlagData = {
  id: number
  flag: string
}

type RadioFlagProps = {
  flag: string
}

type RadioFlagType = FC<RadioFlagProps>

// Radio infos
type RadioInfosData = {
  id: number
  name: string
  flag: string
  state: string
  city: string
}

type RadioInfosProps = {
  name: string
  state: string
  city: string
  id: number
  radioList: boolean
  switchRadio: (id: number) => void
}

type RadioInfosType = FC<RadioInfosProps>

// Radio list
type RadioListData = {
  id: number
  name: string
  flag: string
  state: string
  city: string
}

type RadioListProps = {
  radioList: boolean
  switchRadio: (id: number) => void
}

type RadioListType = FC<RadioListProps>

export type {
  RadioListData,
  RadioListProps,
  RadioListType,
  RadioFlagData,
  RadioFlagProps,
  RadioFlagType,
  RadioInfosData,
  RadioInfosProps,
  RadioInfosType,
}