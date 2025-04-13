import './App.css';
import { Podcast } from "./hooks/podcast";
import { useMatchups } from "./hooks/matchups";
import Contender from "./Contender";

export default function App() {
  const matchupOrWinner = useMatchups();
  if(matchupOrWinner instanceof Podcast) {
    return (<Contender position="Winner" podcast={matchupOrWinner} onSelect={()=>{}} />);
  } else {
    const { podcastA, podcastB, selectWinner } = matchupOrWinner;
    return (
      <div id="appContainer" className="fluid-container">
        <div className="row justify-content-evenly">
          <Contender position="A" podcast={podcastA} onSelect={() => selectWinner("A")} />
          { podcastA !== podcastB && <Contender position="B" podcast={podcastB} onSelect={() => selectWinner("B")} /> }
        </div>
      </div>
    );
  }
};
