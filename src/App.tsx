import * as React from "react";
import radioStations from "./components/radioStations";

export interface IAppProps {}

interface RadioStation {
  name: string;
  src: string;
}

export default function App(props: IAppProps) {
  const [isPlaying, setPlaying] = React.useState(false);
  const [station, setStation] = React.useState<RadioStation | null>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  return (
    <div>
      {station != null && (
        <div>
          <audio ref={audioRef} src={station.src} />
          <button
            onClick={() => {
              if (isPlaying) {
                audioRef.current?.pause();
              } else {
                audioRef.current?.play();
              }
              setPlaying(!isPlaying);
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}

      {radioStations.map((station) => {
        return (
          <button
            onClick={() => {
              setStation(station);
            }}
          >
            {station.name}
          </button>
        );
      })}
    </div>
  );
}
