import bg from "./dark-brown-wood-table.jpg";
import "./App.css";

import Tip from "./components/tip";

function App() {
  const divStyle = {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
  };

  return (
    <div className="App">
      <header className="App-header" style={divStyle}>
        <h1>BJ Blayney</h1>
        <Tip />
        <a
          className="App-link"
          href="https://www.canadahelps.org/en/explore/popular-now/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate to someone in need
        </a>
      </header>
    </div>
  );
}

export default App;
