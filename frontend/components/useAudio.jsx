import { useEffect, useState } from "react";

const useAudio = (url) => {
  const [audio] = useState(typeof Audio !== "undefined" && new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = (isMute, a = true) => {
    if (!isMute) {
      if (a) {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [toggle];
};

export default useAudio;
