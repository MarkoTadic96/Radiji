import * as React from "react";
import radioStations from "./components/radioStations";
import "./App.css";
import { useHotkeys } from "react-hotkeys-hook";

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

  useHotkeys(
    "space",
    () => {
      setPlaying(!isPlaying);
    },
    {
      filter: (e) => {
        e.stopPropagation();
        e.preventDefault();
        return true;
      },
    }
  );

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
            className="station"
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
