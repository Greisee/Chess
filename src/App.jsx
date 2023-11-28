import Board from './components/Board.jsx';
import "./components/chess.css";
import {Helmet} from "react-helmet";

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
      </div>
    </div>
  );
}

export default App;
