import bg from "./dark-brown-wood-table.jpg";
import "./App.css";

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
        <a
          className="App-link"
          href="https://www.google.com/search?q=sit+and+know+youre+sitting"
          target="_blank"
          rel="noopener noreferrer"
        >
          Risky Click
        </a>
      </header>
    </div>
  );
}

export default App;
