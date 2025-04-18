import $ from "jquery";
import { useState, useRef, useMemo, useEffect } from "react";
import { pull,defer,isFinite,isEmpty } from "lodash";

const audios:AudioCtrl[] = [];

export enum AudioState {
  Error="Error",
  Loading="Loading",
  Queued="Queued",
  Playing="Playing",
  CanPlay="CanPlay",
}

export class AudioCtrl {
  audio:HTMLAudioElement
  state:AudioState=AudioState.Loading
  stateChangeHandlers:(()=>void)[]=[]

  constructor(url:string) {
    console.debug("Initializing audio controller", { url });

    this.audio = new Audio(url);
    const setState = (newState:AudioState) => () => {
      console.debug("Audio state change", { url, newState });
      this.state = newState; 
      while(!isEmpty(this.stateChangeHandlers)) {
        const handler = this.stateChangeHandlers.pop();
        if(handler) defer(handler);
      }
    };
    const $audio = $(this.audio);
    $audio.one("canplaythrough", setState(AudioState.CanPlay));
    $audio.on("playing", setState(AudioState.Playing));
    $audio.on("seeking", setState(AudioState.Queued));
    $audio.on("play", setState(AudioState.Queued));
    $audio.on("pause", setState(AudioState.CanPlay));
    $audio.on("ended", setState(AudioState.CanPlay));
    $audio.on("error", (event) => {
      console.error("Audio error", { url, event });
      setState(AudioState.Error);
    });
  }

  stop():void {
    console.debug("Stopping audio", { url:this.audio.src });
    this.audio.pause();
  }

  playSample():void {
    if(this.state === AudioState.Loading) {
      console.debug("Deferring playing sample because it is loading", { url:this.audio.src });
      this.stateChangeHandlers.push(() => {
        this.playSample();
      });
      return;
    } else if(this.state === AudioState.Queued || this.state === AudioState.Playing) {
      console.debug("Not starting to play sample because it is already playing", { url:this.audio.src });
      return;
    } else {
      console.debug("Stopping audio before playing sample", { url:this.audio.src });
      audios.forEach((ctrl) => ctrl.stop());
    }

    console.debug("Playing a sample!", { audio:this.audio });

    const shiftLength = 20;
    const volumeSteps = 100;
    const stepPeriodMs = 1000 * shiftLength / volumeSteps;

    const rawDuration = this.audio.duration;
    const minOffset = 1/8;
    const maxOffset = 7/8;
    const offsetRatio = Math.random() * (maxOffset - minOffset) + minOffset;
    const startTime = (() => {
      if(isFinite(rawDuration)) {
        // Hopefully our offset ratio gets us a good random spot in the file.
        if((rawDuration - (rawDuration * offsetRatio)) > (shiftLength * 3)) {
          return rawDuration * offsetRatio;
        }
        // Try for a later spot in the episode.
        for(let i = maxOffset ; i >= 0; i -= minOffset) {
          if((rawDuration - (rawDuration * i)) > (shiftLength * 3)) {
            return rawDuration * i;
          }
        }
      }
      // Just skip 1 second in (in case there's ads or intro music or whatever).
      return 1;
    })();
    this.audio.currentTime = startTime;
    this.audio.volume = 0.001;
    this.audio.play();

    let hasStopped = false;
    const checkHasStopped = () => {
      if(hasStopped) return;
      const newState = this.state;
      if(newState === AudioState.Playing || newState === AudioState.Queued) {
        this.stateChangeHandlers.push(checkHasStopped);
      } else {
        hasStopped = true;
      }
    };
    defer(checkHasStopped);

    const nextStep = (fn:()=>void) => setTimeout(() => {
      if(hasStopped) {
        console.debug("Aborting function because play has stopped");
      } else {
        fn();
      } 
    }, stepPeriodMs);
    const volumeUp = () => {
      nextStep(() => {
        if(this.state === AudioState.Playing) {
          this.audio.volume = Math.min(1, this.audio.volume + 3*(1/volumeSteps));
          console.debug("Increased volume", this.audio.volume);
        } else {
          console.debug("Not increasing volume because of state", this.state);
        }
        if(this.audio.volume < 1) volumeUp();
      });
    };
    const volumeDown = () => {
      nextStep(() => {
        if(this.state === AudioState.Playing) {
          this.audio.volume = Math.max(0, this.audio.volume - (1/volumeSteps));
          console.debug("Decreased volume", this.audio.volume);
        } else {
          console.debug("Not decreasing volume because of state", this.state);
        }
        if(0 < this.audio.volume) {
          volumeDown();
        } else {
          hasStopped = true;
          this.audio.pause();
        }
      });
    };
 
    volumeUp();
    setTimeout(volumeDown, 1000 * shiftLength * 2);
  }
}

export function useAudio(url:string):AudioCtrl {
  // useMemo to not recreate the value on each render (it's expensive)
  // useRef to hold onto the value, b/c useMemo might flush the cache.
  const initAudio = useMemo(() => new AudioCtrl(url), [ url ]);
  const { current:audio } = useRef(initAudio);
  useEffect(() => {
    audios.push(audio);
    return () => { 
      audio.stop();
      pull(audios, audio); 
    };
  }, [ url, audio ]);
  return audio;
}

export function useAudioState(audio:AudioCtrl):AudioState {
  const [audioState, setAudioState] = useState(audio.state);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAudioState(audio.state);
    }, 500);
    return () => { clearInterval(intervalId); }
  }, [audio]);
  return audioState;
}
