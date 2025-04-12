import $ from "jquery";
import { useState, useDeferredValue, useEffect } from "react";
import { defer,isFinite,isEmpty } from "lodash";

const audios:Map<string,AudioCtrl> = new Map();

export enum AudioState {
  Error,
  Loading,
  Playing,
  CanPlay,
}

export class AudioCtrl {
  audio:HTMLAudioElement
  state:AudioState=AudioState.Loading
  stateChangeHandlers:(()=>void)[]=[]

  constructor(url:string) {
    this.audio = new Audio(url);
    const setState = (newState:AudioState) => () => {
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
      console.error("Error loading audio", { url, event });
      setState(AudioState.Error);
    });
  }

  stop():void {
    if(this.state === AudioState.Playing) {
      this.audio.pause();
    }
  }

  playSample():void {
    if(this.state === AudioState.Loading) {
      this.stateChangeHandlers.push(() => {
        this.playSample();
      });
      return;
    } else if(this.state === AudioState.Playing) {
      return;
    } else {
      audios.forEach((ctrl) => ctrl.stop());
    }

    const shiftLength = 5;
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
  const [audioState, setAudioState] = useState(AudioState.CanPlay);
  useEffect(() => {
    setAudioState(audio.state);
    let ignoreCallback = false;
    audio.stateChangeHandlers.push(() => {
      if(!ignoreCallback) setAudioState(audio.state)
    });
    return () => { ignoreCallback = true; };
  }, [ audio, audio.state ]);
  return useDeferredValue(audioState);
}
