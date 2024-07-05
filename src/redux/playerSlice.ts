import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import radioObj from '@objs/radios.json'; // Assurez-vous que ce chemin est correct
import { StateType } from '@typage/mainType'; // Assurez-vous que ce chemin est correct

const initialState: StateType = {
  playing: false,
  loading: false,
  error: '',
  logo: radioObj[2].logo, // Exemple de logo
  radioList: radioObj, // Initialisez radioList avec le tableau d'objets radio
  volume: 0.5,
  counter: { sec: '00', min: '00', hour: '00' },
  currentRadioUrl: radioObj[2].url, // URL par défaut de la radio
  audioRef: null, // Référence à l'élément audio
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLogo: (state, action: PayloadAction<string>) => {
      state.logo = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setCounter: (state, action: PayloadAction<{ sec: string; min: string; hour: string }>) => {
      state.counter = action.payload;
    },
    setCurrentRadioUrl: (state, action: PayloadAction<string>) => {
      state.currentRadioUrl = action.payload;
    },
    resetPlayer: (state) => {
      state.playing = false;
      state.loading = false;
      state.error = '';
      state.logo = radioObj[2].logo; // Réinitialisation au logo par défaut
      state.radioList = radioObj; // Réinitialisation à la liste complète de radios
      state.volume = 0.5;
      state.counter = { sec: '00', min: '00', hour: '00' };
      state.currentRadioUrl = radioObj[2].url; // Réinitialisation à l'URL par défaut
    },
    switchRadio: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const radioToPlay = state.radioList.find(radio => radio.id === id);
      if (!radioToPlay) return;

      if (state.currentRadioUrl !== radioToPlay.url) {
        state.currentRadioUrl = radioToPlay.url;
        state.logo = radioToPlay.logo;
        state.playing = true;
      }
      state.loading = true;
    },
  },
});

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
} = playerSlice.actions;

export default playerSlice.reducer;
