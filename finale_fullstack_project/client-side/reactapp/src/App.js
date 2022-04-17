import "./App.css";
import React from "react";
import PlaceHolder from "./comps/PlaceHolder";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <PlaceHolder />
      </div>
    </BrowserRouter>
  );
}

export default App;
