import { Podcast } from "./hooks/podcast";

export interface WinnerArgs {
  podcast:Podcast
};

export default function Winner({ podcast }:WinnerArgs) {

  return (
    <div>
      <h1>Winner!</h1>
      <h2>{ podcast.title }</h2>
      <h3>Feed URL: { podcast.feedUrl }</h3>
    </div>
  );
}
