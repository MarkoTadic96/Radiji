import * as React from "react";
import radioStations from "./components/radioStations";
import "./App.css";

export interface IAppProps {}

interface RadioStation {
  name: string;
  src: string;
}

export default function App(props: IAppProps) {
  const [isPlaying, setPlaying] = React.useState(false);
  const [station, setStation] = React.useState<RadioStation | null>(null);
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

      {radioStations.map((station) => {
        return (
          <div
            className="stations"
            key={station.name}
            onClick={() => {
              setStation(station);
              setPlaying(true);
            }}
          >
            <img src={station.logo} alt="" className="stationLogo"></img>
          </div>
        );
      })}
    </div>
  );
}
