import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Home, About, Editor, Sources} from "./components";
import './index.css';
function App() {
    return (
      <div className="App" class="scrollbar">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/" element={<About />} />
            <Route path="/sources/" element={<Sources />} />
            <Route path="/helper/" element={<Editor />} />
          </Routes>
        </Router>
      </div>
    );
  }
  export default App;