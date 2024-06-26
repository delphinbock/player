// React
import { FC, useRef, useEffect, useState, useCallback } from "react";

// Components
import LoadingButton from "@atoms/LoadingButton";

// Font icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

// Obj
import radioObj from "../../objs/radios.json";

// Styles
import "../styles/player.scss";

// Constants
const { REACT_APP_IMG_PATH } = process.env;

// Play button component
const PlayButton: FC<{ playing: boolean }> = ({ playing }) => (
  <FontAwesomeIcon icon={!playing ? faPlay : faStop} />
);

// RadioList component
const RadioList: FC<{
  radioList: boolean;
  switchRadio: (id: number) => void;
}> = ({ radioList, switchRadio }) => (
  <div className={radioList ? "radio-list" : "radio-list radio-list-off"}>
    {radioObj.map((radio, i) => (
      <div key={`${i}_${radio.id}`} className="radio-container">
        <div>
          <img src={`${REACT_APP_IMG_PATH}${radio.flag}`} alt="flag" />
        </div>
        <div>
          <button
            onClick={radioList ? () => switchRadio(radio.id) : undefined}
            className="radio-name"
          >
            {radio.name}
          </button>
          <div className="radio-infos">
            <span>{radio.state}</span>
            <span> - </span>
            <span>{radio.city}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Radio player component
const Player: FC = () => {
  // Constants
  const errorPlay = "Playing error. The player will be reinitialized";

  // References
  const audioRef = useRef<HTMLAudioElement>(new Audio(radioObj[2].url));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // States
  const [playing, setPlaying] = useState<boolean>(false);
  const [radioList, setRadioList] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [logo, setLogo] = useState<string>(radioObj[2].logo);
  const [counter, setCounter] = useState<{
    sec: string;
    min: string;
    hour: string;
  }>({
    sec: "00",
    min: "00",
    hour: "00",
  });
  const [volume, setVolume] = useState<number>(0.5);

  // Toggle play or pause state
  const toggle = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
    setRadioList((prevRadioList) => !prevRadioList);
  }, []);

  // Switch radio station
  const switchRadio = useCallback(
    (id: number) => {
      // Set states
      setLogo(radioObj[id].logo);
      setRadioList(!radioList);
      setLoading(true);

      // Stop stream
      audioRef.current.pause();

      // Load new stream
      audioRef.current = new Audio(radioObj[id].url);

      // Play
      setPlaying((prevPlaying) => !prevPlaying);
    },
    [audioRef, radioList]
  );

  // Define handleAudioError outside the useEffect
  const handleAudioError = useCallback(() => {
    // SetState
    setError(errorPlay);

    // Display message during 5s
    setTimeout(() => {
      // Reload page
      window.location.reload();
    }, 5000);
  }, []);

  // Define a function to handle stream error outside the useEffect
  const handleStreamError = useCallback(() => {
    if (audioRef.current.currentTime === 0) {
      handleAudioError();
    }
  }, [handleAudioError]);

  // Define a named function outside of the useEffect
  const handleAudioPlay = useCallback(() => {
    // Set play state directly with the current value
    setPlaying((prevPlaying) => prevPlaying);

    // Set loading state
    setLoading(false);

    // Reinitialize if the stream is not read after a certain time
    setTimeout(() => handleStreamError(), 10000);
  }, [handleStreamError]);

  // Play effects
  useEffect(() => {
    // Play or pause based on the playing state
    if (playing) {
      setTimeout(() => {
        const promise = audioRef.current.play();

        // Audio play promise
        if (promise !== null) {
          promise.then(handleAudioPlay).catch(handleAudioError);
        }
      }, 500);
    } else {
      audioRef.current.pause();
    }

    // Cleanup function for the effect
    return () => clearInterval(intervalRef.current!);
  }, [audioRef, playing, handleAudioError, handleAudioPlay]);

  // Border effects
  useEffect(() => {
    // Decrease counter function
    const increaseDate = () => {
      if (playing) {
        // Format seconds
        const result = new Date(audioRef.current.currentTime * 1000)
          .toISOString()
          .slice(11, 19);

        // Split
        const split = result.split(":");

        // Object
        const obj = { sec: split[2], min: split[1], hour: split[0] };

        // Set state counter
        setCounter(obj);

        return obj;
      }
    };

    // Run function every second
    intervalRef.current = setInterval(() => {
      increaseDate();
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [playing]);

  // Volume change
  const changeVolume = () => {
    // Volume
    audioRef.current.volume = volume;
  };

  return (
    <div className="container">
      <div id="player">
        <div className="first">
          <div className="timer">
            <span>{counter.hour}</span>
            <span>:</span>
            <span>{counter.min}</span>
            <span>:</span>
            <span>{counter.sec}</span>
          </div>
          {!loading ? (
            <button className="button" onClick={toggle}>
              <PlayButton playing={playing} />
            </button>
          ) : (
            <div className="button loading">
              <LoadingButton />
            </div>
          )}
          <div
            className="radio"
            style={{
              backgroundImage: `url(${REACT_APP_IMG_PATH}${logo})`,
            }}
          ></div>
        </div>
        <div className="audio-volume">
          <span>Volume </span>
          <input
            className="volume"
            type="range"
            min="0"
            max="1"
            value={volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              changeVolume();
            }}
            step="0.01"
          />
          <FontAwesomeIcon icon={faVolumeHigh} />
        </div>
        {error !== "" ? (
          <div className="error">
            <span>{error}</span>
          </div>
        ) : null}
        <div>
          <RadioList radioList={radioList} switchRadio={switchRadio} />
        </div>
      </div>
    </div>
  );
};

export default Player;
