import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, About, Editor } from "./components";
import './index.css';
function App() {
    return (
      <div className="App" class="scrollbar">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about/" exact component={() => <About />} />
            <Route path="/helper/" exact component={() => <Editor />} />
          </Switch>
        </Router>
      </div>
    );
  }
  export default App;