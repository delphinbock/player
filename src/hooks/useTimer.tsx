import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '@typage/mainType';
import { setCounter } from '@redux/playerSlice'; // Adjust the import path based on your project structure

export const useTimer = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { player: StateType }) => state.player);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const increaseDate = () => {
      if (state.playing && audioRef.current) {
        const result = new Date(audioRef.current.currentTime * 1000).toISOString().slice(11, 19);
        const [hour, min, sec] = result.split(':');
        dispatch(setCounter({ sec, min, hour }));
      }
    };

    if (state.playing) {
      intervalRef.current = setInterval(increaseDate, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.playing, dispatch, audioRef]);

  return { counter: state.counter };
};
