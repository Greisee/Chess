import Board from './components/Board.jsx';
import "./components/chess.css";
import {Helmet} from "react-helmet";
import CapturedList from "./components/CapturedList.jsx";

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
          <Board/>
          <CapturedList/>
      </div>
    </div>
  );
}

export default App;
