import Slider from "rc-slider/lib/Slider";
import * as React from "react";
import { RadioStation } from "../model/RadioStation";
import "rc-slider/assets/index.css";
import "./player.css";

export interface IPlayerProps {
  station: RadioStation;
}

export default function Player(props: IPlayerProps) {
  const [isPlaying, setPlaying] = React.useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.src = props.station.src;
      }
      audioRef.current?.load();
      audioRef.current?.play();
    } else {
      if (audioRef.current) {
        audioRef.current.src = "";
      }
      audioRef.current?.load();
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef, props.station]);

  return (
    <div>
      <div className="background"> </div>
      <div className="player">
        {props.station != null && (
          <div className="stationDetails">
            <audio ref={audioRef} />
            <img
              src={props.station.logo}
              alt=""
              className="currentStationLogo"
            ></img>
            <p className="currentStationName">{props.station.name}</p>
          </div>
        )}

        <div
          className="playButton"
          onClick={() => {
            setPlaying(!isPlaying);
          }}
        >
          {isPlaying ? (
            <img src="logos/pause.png" alt="" className="playButton"></img>
          ) : (
            <img src="logos/play.png" alt="" className="playButton"></img>
          )}
        </div>

        <div className="volumeControl">
          <img src="logos/volume.png" alt="" className="volumeIcon"></img>

          <Slider
            className="slider"
            min={0}
            max={1}
            step={0.01}
            onChange={(value) => {
              if (audioRef.current) {
                audioRef.current.volume = value;
              }
            }}
          ></Slider>
        </div>
      </div>
    </div>
  );
}
