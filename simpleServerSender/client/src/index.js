import React from "react"
import ReactDOM from "react-dom"
import './index.css'
import Sockt from "./Socket";

function App() {
  return (
    <div className="App">
      <Sockt
        serverUrl="http://localhost:8081"
        topic="temperature"
      />
    </div>
  );
}

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
