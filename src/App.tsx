import './App.css';
import { useAudio, useAudioState } from "./hooks/audio";

const App = () => {
  const audio = useAudio("https://robertfischer.github.io/cs6750-individual-project/part3.mp3");
  useAudioState(audio);
  return (
    <div id="appContainer" className="container">
      <div className="row">
        <div className="col-12">
          <h3>Pick Your Podcast Preference</h3>
        </div>
      </div>
      <div className="row justify-content-evenly">
        <div className="col-12 col-md-4">
          Option 1
        </div>
        <div className="col-12 col-md-4">
          Option 2
        </div>
      </div>
    </div>
  );
};

export default App;
