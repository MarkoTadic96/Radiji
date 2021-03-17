import * as React from "react";

export interface IAppProps {}

export default function App(props: IAppProps) {
  const [isPlaying, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  return (
    <div>
      <audio ref={audioRef} src="https://streaming.radiojat.rs/radiojat.mp3" />
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
  );
}
