import { usePodcast, Podcast, PodcastStatus } from "./podcast";
import { shuffle,uniq,defer } from "lodash";
import { useState } from "react";

const podcastUrls = shuffle(uniq([
  "https://anchor.fm/s/ea4895dc/podcast/rss",
  "https://anchor.fm/s/ff612a4c/podcast/rss",
  "https://audioboom.com/channels/4322549.rss",
  "https://feed.cdnstream1.com/zjb/feed/download/56/66/3d/56663d4c-d661-4806-a679-ccea6058f935.xml",
  "https://feed.podbean.com/themagicianswife/feed.xml",
  "https://feed.skeptoid.com",
  "https://feeds.blubrry.com/feeds/whyaredads.xml",
  "https://feeds.buzzsprout.com/1101152.rss",
  "https://feeds.buzzsprout.com/1411126.rss",
  "https://feeds.megaphone.fm/ADV8582947768",
  "https://feeds.megaphone.fm/ARML1766556837",
  "https://feeds.megaphone.fm/blank-check",
  "https://feeds.megaphone.fm/craigfinnpod",
  "https://feeds.megaphone.fm/decoderring",
  "https://feeds.megaphone.fm/SBP3707703183",
  "https://feeds.megaphone.fm/sciencevs",
  "https://feeds.megaphone.fm/thebestshow",
  "https://feeds.megaphone.fm/YMRT7068253588",
  "https://feeds.publicradio.org/public_feeds/spectacular-failures",
  "https://feeds.redcircle.com/7655b7ec-dc57-47c9-ab96-1a8fa02f6573",
  "https://feeds.redcircle.com/b78540f3-d05f-4269-bdb3-e22c1aca55ed",
  "https://feeds.simplecast.com/Ao0C24M8",
  "https://feeds.simplecast.com/BqbsxVfO",
  "https://feeds.simplecast.com/byb4nhvN",
  "https://feeds.simplecast.com/FxPyOlup",
  "https://feeds.simplecast.com/l2i9YnTd",
  "https://feeds.simplecast.com/LDNgBXht",
  "https://feeds.simplecast.com/q8x9cVws",
  "https://feeds.simplecast.com/xKJ93w_w",
  "https://feeds.simplecast.com/Y8lFbOT4",
  "https://illrepute.libsyn.com/rss",
  "https://knowledgefight.libsyn.com/rss",
  "https://rss.art19.com/newcomers",
  "https://rss.art19.com/too-scary-didnt-watch",
  "https://tituspodcast.libsyn.com/rss",
  "https://werewolfambulance.libsyn.com/rss",
  "https://www.omnycontent.com/d/playlist/796469f9-ea34-46a2-8776-ad0f015d6beb/eb9aa0b9-9618-418c-88f3-b07c011ee6e9/81371812-755e-4015-9587-b07c011ee71c/podcast.rss",
  "https://www.omnycontent.com/d/playlist/89050f29-3cfb-4513-a5d2-ac79004bd7ba/55c64838-70c7-4576-b4e4-ac800012ec27/05855b96-adce-4eaa-9d54-ac8300634c30/podcast.rss",
  "https://www.omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/0e563f45-9d14-4ce8-8ef0-ae32006cd7e7/0d4cc74d-fff7-4b89-8818-ae32006cd7f0/podcast.rss",
]));


export interface Matchup {
  podcastA:PodcastStatus
  podcastB:PodcastStatus
  selectWinner:(winner:"A"|"B")=>void
}

export type Matchups = Matchup | Podcast

function getInitialPodcastUrl():string {
  const url = podcastUrls.pop();
  if(!url) throw new Error("No initial podcast URL");
  return url;
}

const initialPodcastAUrl = getInitialPodcastUrl();
const initialPodcastBUrl = getInitialPodcastUrl();

export function useMatchups():Matchups|Podcast {
  const [ podcastAUrl, setPodcastAUrl ] = useState(initialPodcastAUrl);
  const [ podcastBUrl, setPodcastBUrl ] = useState(initialPodcastBUrl);
  const [ winner, setWinner ] = useState<Podcast|null>(null);

  const podcastA = usePodcast(podcastAUrl);
  const podcastB = usePodcast(podcastBUrl);

  function selectWinner(roundWinner:"A"|"B"):void {
    const nextContender = podcastUrls.pop();
    console.info("Selected a podcast", {roundWinner, podcastAUrl, podcastBUrl, nextContender});

    if(!nextContender) {
      console.info("No next contender!  We have a winner!", { roundWinner, nextContender });
      if(roundWinner === "A") {
        if(podcastA instanceof Podcast) {
          setWinner(podcastA);
        } else {
          console.error("Can't set a winner that is not successfully loaded");
        }
      } else if(roundWinner === "B") {
        if(podcastB instanceof Podcast) {
          setWinner(podcastB);
        } else {
          console.error("Can't set a winner that is not successfully loaded");
        }
      }
    } else if(roundWinner === "A") {
      console.info("Podcast A won; replacing B", { nextContender });
      setPodcastBUrl(nextContender);
    } else if(roundWinner === "B") {
      console.info("Podcast B won; replacing A", { nextContender });
      setPodcastAUrl(nextContender);
    } else {
      throw new Error("Unreachable code reached");
    }
  }

  if(podcastA === "Error" && podcastB === "Error") {
    defer(selectWinner, "A");
  } 

  return winner || { podcastA, podcastB, selectWinner };
}
