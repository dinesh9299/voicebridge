import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed here
import Home from "./components/Home";
import Speechtotext from "./components/Speechtotext";
import TextToSpeech from "./components/Texttospeech";

function App() {
  return (
    <div
      className="App w-100 bg-info bg-opacity-25 overflow-y-auto  "
      style={{ minHeight: "100vh" }}
    >
      <BrowserRouter>
        {" "}
        {/* Fixed here */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/stot" element={<Speechtotext />}></Route>
          <Route path="/ttos" element={<TextToSpeech />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
