import "./components/chess.css";
import {Helmet} from "react-helmet";
import Game from "./components/Game.jsx";

function App() {
  return (
    <div className="App">
      <header>
        <h1 className='title'>Chess</h1>
        <Helmet>
          <title>Chess</title>
        </Helmet>
      </header>
      <div className="main">
          <Game/>
      </div>
    </div>
  );
}

export default App;
