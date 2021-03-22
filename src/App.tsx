import * as React from "react";
import radioStations from "./components/radioStations";
import "./App.css";

import Header from "./components/header";

export interface IAppProps {}

interface RadioStation {
  name: string;
  src: string;
  logo: string;
}

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
      {station != null && (
        <div>
          <audio ref={audioRef} src={station.src} />
          <button
            onClick={() => {
              setPlaying(!isPlaying);
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}

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
  );
}
