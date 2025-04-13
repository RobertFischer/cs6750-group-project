import { PodcastStatus, Podcast, PodcastEpisode } from "./hooks/podcast";
import { useAudio, useAudioState, AudioState } from "./hooks/audio";

export interface EpisodePillArgs {
  audioState:AudioState
}

export function EpisodePill({ audioState }:EpisodePillArgs) {
  let style:string;
  let icon:string;
  switch(audioState) {
    case AudioState.CanPlay:
      style = "primary"
      icon = "play"
      break;
    case AudioState.Queued:
      style = "secondary"
      icon = "play"
      break;
    case AudioState.Playing:
      style = "success"
      icon = "play"
      break;
    case AudioState.Loading:
      style = "warning"
      icon = "cloud-arrow-down"
      break;
    case AudioState.Error:
      style = "danger"
      icon = "exclamation"
      break;
  }
  return (
    <i className={`fa-solid fa-${icon} text-bg-${style}`}></i>
  );
}

export interface EpisodeArgs {
  podcast:Podcast
  episode:PodcastEpisode
}


export function Episode({ episode }:EpisodeArgs) {
  const audio = useAudio(episode.mp3Url);
  const audioState = useAudioState(audio);
  const onClick = () => {
    if(audioState === AudioState.CanPlay) audio.playSample();
  };
  return (
    <li className="list-group-item p-0" key={episode.mp3Url}>
      <button type="button" onClick={onClick} className="btn btn-outline-info text-start w-100">
        <EpisodePill audioState={audioState} />
        <span className="ms-2">{ episode.title }</span>
      </button>
    </li>
  );
}

export interface CommonContenderArgs {
  position:"A"|"B"|"Winner"
  onSelect:()=>void
};

export type ContenderArgs = CommonContenderArgs & {
  podcast:PodcastStatus
};

export type LoadedContenderArgs = CommonContenderArgs & {
  podcast:Podcast
};

export default function Contender(args:ContenderArgs) { 
  const { podcast } = args;
  if(!podcast) {
    console.warn("No podcast found", { podcast });
    return null;
  } else if (podcast === "Error") {
    return (<ErrorContender {...args} />);
  } else if (podcast === "Loading") {
    return (<LoadingContender {...args} />);
  } else {
    return (<LoadedContender {...args} podcast={podcast} />);
  } 
}

function LoadedContender({ podcast, position, onSelect }:LoadedContenderArgs) {
  return (
    <div className="col-12 col-md-10 col-lg-4 col-xl-3">
      <div className="card">
        <h4 className="card-header">{ position === "Winner" ? "Winner!" : `Podcast ${position}` }</h4>
        { podcast.imageUrl && <img src={podcast.imageUrl} className="card-img-top ratio ratio-1x1 " /> }
        <div className="card-body">
          <h3 className="card-title text-body-primary">{ podcast.title || "[No Title!]" }</h3>
          <pre className="card-text text-body-secondary ws-pre-line">{ podcast.description || "[No Description!]" }</pre>
        </div>
        <div className="card-body">
          <h4 className="card-title text-body-primary">Sample Episodes</h4>
          <ul className="list-group list-group-flush">
            { 
              podcast.oldestEpisode && (<Episode podcast={podcast} episode={podcast.oldestEpisode} />)
            }
            { 
              podcast.sampleEpisodes.map( 
                (episode) => (<Episode podcast={podcast} episode={episode} key={episode.key} />)
              )
            }
            {
              podcast.mostRecentEpisode && (<Episode podcast={podcast} episode={podcast.mostRecentEpisode} />)
            }
          </ul>
        </div>
        { position !== "Winner" && (
          <div className="card-footer">
            <center><button type="button" onClick={onSelect} className="btn btn-primary btn-lg">Select Podcast {position}</button></center>
          </div>
        ) }
      </div>
    </div>
  );
}

function ErrorContender({position}:CommonContenderArgs) {
  return (
    <div className="col-12 col-md-10 col-lg-4 col-xl-3">
      <div className="card">
        <h4 className="card-header">
          Podcast {position}
        </h4>
        <div className="card-body">
          <h3 className="card-title text-body-primary text-danger-emphasis">
            <center><i className="fa-solid fa-skull-crossbones fa-fade fa-2xl"></i></center>
          </h3>
        </div>
      </div>
    </div>
  );
}

function LoadingContender({position}:CommonContenderArgs) {
  return (
    <div className="col-12 col-md-11 col-lg-4">
      <div className="card">
        <h4 className="card-header">
          Podcast {position}
        </h4>
        <div className="card-body">
          <h3 className="card-title text-body-primary text-warning-emphasis">
            <center><i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i></center>
          </h3>
        </div>
      </div>
    </div>
  );
}

