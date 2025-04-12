import $ from "jquery";
import { useState, useEffect } from "react";
import { defer,isFinite,isEmpty } from "lodash";

const audios:Map<string,AudioCtrl> = new Map();

export enum AudioState {
  Error="Error",
  Loading="Loading",
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
        const handler = this.stateChangeHandlers.shift();
        if(handler) defer(handler);
      }
    };
    const $audio = $(this.audio);
    $audio.one("canplaythrough", setState(AudioState.CanPlay));
    $audio.on("playing", setState(AudioState.Playing));
    $audio.on("play", setState(AudioState.Playing));
    $audio.on("pause", setState(AudioState.CanPlay));
    $audio.on("ended", setState(AudioState.CanPlay));
    $audio.on("error", (event) => {
      console.error("Audio error", { url, event });
      setState(AudioState.Error);
    });
  }

  stop():void {
    if(this.state === AudioState.Playing) {
      console.debug("Stopping audio", { url:this.audio.src });
      this.audio.pause();
    }
  }

  playSample():void {
    if(this.state === AudioState.Loading) {
      console.debug("Deferring playing sample because it is loading", { url:this.audio.src });
      this.stateChangeHandlers.push(() => {
        this.playSample();
      });
      return;
    } else if(this.state === AudioState.Playing) {
      console.debug("Not starting to play sample because it is already playing", { url:this.audio.src });
      return;
    } else {
      console.debug("Stopping audio before playing sample", { url:this.audio.src });
      audios.forEach((ctrl) => ctrl.stop());
    }

    const shiftLength = 3.5;
    const volumeSteps = 100;
    const stepPeriodMs = 1000 * shiftLength / volumeSteps;

    const rawDuration = this.audio.duration;
    const startTime = isFinite(rawDuration) && rawDuration > (shiftLength * 3 + 1) ? rawDuration / 3 : 0
    this.audio.currentTime = startTime;
    this.audio.volume = 0;
    this.audio.play();

    let hasStopped = false;
    const checkHasStopped = () => {
      if(hasStopped) return;
      const newState = this.state;
      if(newState === AudioState.Playing || newState === AudioState.Loading) {
        this.stateChangeHandlers.push(checkHasStopped);
      } else {
        hasStopped = true;
      }
    };
    defer(checkHasStopped);

    const nextStep = (fn:()=>void) => setTimeout(() => {
      if(!hasStopped) fn();
    }, stepPeriodMs);
    const volumeUp = () => {
      nextStep(() => {
        this.audio.volume = Math.min(1, this.audio.volume + (1/volumeSteps));
        if(this.audio.volume < 1) volumeUp();
      });
    };
    const volumeDown = () => {
      nextStep(() => {
        this.audio.volume = Math.max(0, this.audio.volume - (1/volumeSteps));
        if(this.audio.volume === 0) {
          this.audio.pause();
        } else {
          volumeDown();
        }
      });
    };

    defer(volumeUp);
    setTimeout(volumeDown, 1000 * shiftLength * 2);
  }
}

export function useAudio(url:string):AudioCtrl {
  let audio = audios.get(url);
  if(!audio) {
    audio = new AudioCtrl(url);
    audios.set(url, audio);
  }
  return audio;
}

export function useAudioState(audio:AudioCtrl):AudioState {
  const [audioState, setAudioState] = useState(audio.state);
  useEffect(() => {
    let ignoreCallback = false;
    const attachHandler = () => {
      audio.stateChangeHandlers.push(() => {
        if(!ignoreCallback) {
          setAudioState(audio.state);
          attachHandler();
        }
      });
    };
    attachHandler();
    return () => { ignoreCallback = true; };
  }, [ audio, audio.state ]);
  return audioState;
}
