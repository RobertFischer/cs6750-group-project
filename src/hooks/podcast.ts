import Parser from "rss-parser";
import { useState, useEffect} from "react";
import { map,shuffle,sortBy,compact } from "lodash";
import { parseDate } from "chrono-node";
import htmlToMd from "html-to-md";
import silentMp3 from "./500-milliseconds-of-silence.mp3";

export type PodcastStatus = Podcast | "Loading" | "Error";

const podcasts:Map<string,Podcast> = new Map();

export type Episode = {
  itunes?: {
    image?: string
    summary?: string
    subtitle?: string
  }
}

function tryDehtml(str:string|null):string|null {
  if(!str) return str;
  try {
    return htmlToMd(str) || str;
  } catch(e:unknown) {
    console.warn("Error converting from HTML to Markdown", { str, e });
    return str;
  }
}

export class PodcastEpisode {
  mp3Url:string
  title:string|null
  pubDate:Date|null
  imageUrl:string|null
  summary:string|null
  key:string

  constructor(rssItem:Parser.Item&Episode) {
    if(!rssItem) {
      console.error("No RSS item provided", rssItem);
      throw new Error("No RSS item provided");
    }
    console.debug(rssItem);
    this.mp3Url = rssItem.enclosure?.url || silentMp3
    this.title = rssItem.title || null
    this.pubDate = rssItem.pubDate ? parseDate(rssItem.pubDate) : null
    this.imageUrl = rssItem.itunes?.image || null
    this.summary = tryDehtml(
      rssItem.content || rssItem.contentSnippet || rssItem.itunes?.summary || rssItem.itunes?.subtitle || null
    );
    this.key = `${this.mp3Url} ${this.pubDate?.toISOString()} ${this.title}`;
  }
}

export class Podcast {

  title:string|null
  feedUrl:string
  imageUrl:string|null
  description:string|null
  oldestEpisode:PodcastEpisode|null
  sampleEpisodes:PodcastEpisode[]
  mostRecentEpisode:PodcastEpisode|null

  constructor(feedUrl:string, rss:Parser.Output<Episode>) {
    if(!rss) {
      console.error("No RSS provided", rss);
      throw new Error("No RSS provided");
    }
    console.debug(rss);
    this.title = rss.title || rss.itunes?.owner?.name || null;
    this.feedUrl = rss.feedUrl || rss.paginationLinks?.self || feedUrl;
    this.imageUrl = rss.itunes?.image || rss.image?.url || null;
    this.description = tryDehtml(
      rss.description || rss.itunes?.summary || rss.itunes?.["subtitle"] || null
    );
    const episodes = sortBy(
      map( rss.items || [], (item) => new PodcastEpisode(item) ),
      "pubDate"
    )
    this.oldestEpisode = episodes.shift() || null;
    this.mostRecentEpisode = episodes.pop() || null;
    this.sampleEpisodes = sortBy(
      compact(shuffle(episodes).slice(0, 3)),
      "pubDate"
    )
  }

}

export function usePodcast(feedUrl:string):PodcastStatus {
  const [ state, setState ] = useState<PodcastStatus>("Loading");
  useEffect(() => {
    const loadedPodcast = podcasts.get(feedUrl);
    if(loadedPodcast) {
      setState(loadedPodcast);
      return;
    } else {
      setState("Loading");
    }
    new Parser().parseURL(feedUrl).then(
      (result) => {
        const pod = new Podcast(feedUrl, result);
        podcasts.set(feedUrl, pod);
        setState(pod);
      }
    ).catch((error:unknown) => {
      console.error("Error parsing RSS feed", { feedUrl, error });
      setState("Error");
    });
  }, [ feedUrl ]);
  return state;
}
