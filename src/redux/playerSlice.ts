// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Objects
import radioObj from '@objs/radios.json'

// Types
import { StateType } from '@typage/mainType'

// Redux player slice states by default
const initialState: StateType = {
  playing: false,
  loading: false,
  error: '',
  logo: radioObj[2].logo,
  radioList: radioObj,
  volume: 0.5,
  counter: { sec: '00', min: '00', hour: '00' },
  currentRadioUrl: radioObj[2].url,
  audioRef: null,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlay: (state) => ({
      ...state,
      playing: !state.playing
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state, loading: action.payload
    }),
    setError: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload
    }),
    setLogo: (state, action: PayloadAction<string>) => ({
      ...state,
      logo: action.payload
    }),
    setVolume: (state, action: PayloadAction<number>) => ({
      ...state,
      volume: action.payload
    }),
    setCounter: (state, action: PayloadAction<{ sec: string; min: string; hour: string }>) => ({
      ...state,
      counter: action.payload
    }),
    setCurrentRadioUrl: (state, action: PayloadAction<string>) => ({
      ...state,
      currentRadioUrl: action.payload
    }),
    resetPlayer: (state) => ({
      ...state,
      playing: !state.playing,
      loading: false,
      error: '',
      logo: radioObj[2].logo,
      radioList: radioObj,
      volume: 0.5,
      counter: { sec: '00', min: '00', hour: '00' },
      currentRadioUrl: radioObj[2].url,
    }),
    switchRadio: (state, action: PayloadAction<number>) => {
      // Selected radio id
      const id = action.payload

      // Get the selected radio from all radios
      const radioToPlay = state.radioList.find(radio => radio.id === id)

      // If no radio found then return the actual state
      if (!radioToPlay) return

      // If the selected radio has been found in the all radios list
      if (state.currentRadioUrl !== radioToPlay.url) {
        // Return the selected radio settings
        return {
          ...state,
          currentRadioUrl: radioToPlay.url,
          logo: radioToPlay.logo,
          playing: true,
          loading: true,
        }
      }
      // If the selected radio is the same than the current radio
      return {
        ...state,
        loading: true,
      }
    },
  },
})

export const {
  togglePlay,
  setLoading,
  setError,
  setLogo,
  setVolume,
  setCounter,
  setCurrentRadioUrl,
  resetPlayer,
  switchRadio,
} = playerSlice.actions

export default playerSlice.reducer
