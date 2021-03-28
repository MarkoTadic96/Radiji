import * as React from "react";
import radioStations from "./components/radioStations";
import "./App.css";

import Header from "./components/header";
import Player from "./components/player";
import { RadioStation } from "./model/RadioStation";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [isPlaying, setPlaying] = React.useState(false);
  const [station, setStation] = React.useState<RadioStation | null>(null);
  const [stationsList, setStationsList] = React.useState<RadioStation[]>(
    radioStations
  );
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [station, isPlaying]);

  return (
    <div>
      <Header
        onSearch={(query) => {
          const filtered = radioStations.filter((radioStation) => {
            return (
              radioStation.name.toLowerCase().indexOf(query.toLowerCase()) !==
              -1
            );
          });
          setStationsList(filtered);
        }}
      ></Header>
      <div className="main">
        <div className="stationList">
          {stationsList.map((station) => {
            return (
              <div
                className="station"
                key={station.name}
                onClick={() => {
                  setStation(station);
                  setPlaying(true);
                }}
              >
                <img src={station.logo} alt="" className="stationLogo"></img>
                <p className="stationName"> {station.name} </p>
              </div>
            );
          })}
        </div>
      </div>
      {station && <Player station={station}></Player>}
    </div>
  );
}
